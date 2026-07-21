# Planes de Mifily — estado actual y guía para activarlos

## Estado actual (2026-07-21)

Todos los workspaces son 100% gratis e ilimitados por decisión de negocio, no por un bug.
Ver `apps/web/app/api/workspaces/route.ts`: cada workspace nuevo se crea con
`plan: "enterprise"` y todos los límites (`usageLimit`, `linksLimit`, `domainsLimit`,
`tagsLimit`, `foldersLimit`, `partnersLimit`, `groupsLimit`, `usersLimit`, `aiLimit`,
`payoutsLimit`, `partnerTagsLimit`, `networkInvitesLimit`) en `INFINITY_NUMBER`
(1,000,000,000). Esto es intencional: usamos el plan "enterprise" porque es el único
tier que ya trae 0 gating de features en `lib/plan-capabilities.ts` y desactiva el
tope de links en `lib/api/links/usage-checks.ts`.

La página `/[slug]/settings/billing/upgrade` (donde se ven los 4 planes de pago) se
redirige automáticamente a `/settings/billing` cuando el workspace está en
`enterprise` y no tiene `stripeId` (o sea, cuando es "enterprise gratis por defecto",
no un cliente enterprise real pagando). Así queda oculta sin borrar nada.

**No se borró ningún código.** Toda la lógica de Stripe, checkout, webhooks, límites
por plan y feature-gating sigue intacta — simplemente todos entran hoy al plan más
alto. El día que se quiera cobrar, basta con cambiar el default en
`app/api/workspaces/route.ts` (y migrar los workspaces existentes a "free") para que
todo el sistema de planes que ya existe en el código empiece a aplicar.

### Para revertir esto cuando se activen los pagos

1. En `apps/web/app/api/workspaces/route.ts`, quitar el bloque `UNLIMITED_LIMIT` /
   `plan: "enterprise"` (o cambiarlo a `plan: "free"` y quitar los campos `*Limit`
   para que vuelvan a tomar los defaults de Prisma).
2. Quitar el `redirect` agregado al inicio de
   `app/app.dub.co/(dashboard)/[slug]/(ee)/settings/billing/upgrade/page.tsx`.
3. Migrar los workspaces existentes que quedaron en "enterprise gratis" a "free" (o al
   plan que corresponda) con un UPDATE en la tabla `Project`.
4. Seguir la sección "Checklist para activar Stripe" más abajo.

---

## Los 5 planes definidos en el código (heredados de Dub)

Fuente: `packages/utils/src/constants/pricing/pricing-plans.tsx`. Esto es lo que
ya está construido — feature-gating, precios, límites — listo para usarse o para
ajustar los montos/límites a lo que se decida cobrar en Mifily.

| Plan | Precio mensual | Precio anual (equiv./mes) | Links/mes | Clicks/mes | Dominios | Usuarios | Retención analytics |
|---|---|---|---|---|---|---|---|
| Free | $0 | $0 | 25 | 1,000 | 3 | 1 | 30 días |
| Pro | $30 | $25 | 1,000 | 50,000 | 10 | 3 | 1 año |
| Business | $90 | $75 | 10,000 | 250,000 | 100 | 10 | 3 años |
| Advanced | $300 | $250 | 50,000 | 1,000,000 | 250 | 20 | 5 años |
| Enterprise | Custom | Custom | 500,000 | 5,000,000 | 250 | 30 | Ilimitado |

Pro, Business y Advanced también tienen "tiers" (2 y hasta 3 para Advanced) con más
cupo al doble/triple de precio — ver el archivo fuente para los números exactos.

### Qué desbloquea cada plan (`lib/plan-capabilities.ts`)

- **Pro** (sobre Free): carpetas de links.
- **Business** (sobre Pro): permisos de carpetas, gestión de clientes (customers),
  webhooks, programa de afiliados/partners, tracking de conversiones.
- **Advanced** (sobre Business): reward logic avanzada, mensajería con partners,
  campañas de email, descubrimiento de partners, gestión de fraude, integraciones
  avanzadas, referral rewards.
- **Enterprise** (sobre Advanced): audit logs, límite de rewards, soporte prioritario
  por Slack.

---

## Checklist para activar Stripe (cuando se decida cobrar)

1. **Crear cuenta de Stripe propia** (no la de Dub — ahora mismo nada apunta a Stripe
   porque no hay llaves configuradas).
2. **Crear productos y precios en Stripe** para Pro/Business/Advanced (mensual y
   anual, y los tiers 2/3 si se van a usar). A cada precio ponerle un `lookup_key`
   con el formato que ya espera el código:
   - `pro_monthly`, `pro_yearly`
   - `business_monthly`, `business_yearly`
   - `advanced_monthly`, `advanced_yearly`
   - Para tiers: `pro2_monthly`, `business2_monthly`, `advanced2_monthly`,
     `advanced3_monthly` (y sus `_yearly`).

   (Ver `app/api/workspaces/[idOrSlug]/billing/upgrade/route.ts` — el checkout busca
   el precio por `lookup_key`, así que esto es lo único que la ruta de checkout
   necesita.)

3. **⚠️ Punto crítico — reemplazar los `price_...` hardcodeados de Dub:**
   `packages/utils/src/constants/pricing/pricing-plans.tsx` tiene los IDs de precio
   *reales de la cuenta de Stripe de Dub.co* (todos empiezan con
   `price_1...AlJJEpqkPV...`). El webhook (`getPlanAndTierFromPriceId`, usado en
   `checkout-session-completed.ts` y los handlers de suscripción) busca el `priceId`
   que Stripe manda en el evento dentro de esa lista para saber a qué plan subir al
   workspace. **Si se conecta una cuenta de Stripe propia sin cambiar estos IDs, el
   cliente paga pero el webhook nunca reconoce el plan y el workspace se queda sin
   actualizar.** Hay que reemplazar cada array de IDs (`LEGACY_PRO_PRICE_IDS`,
   `NEW_PRO_PRICE_IDS`, `PRO_TIER_PRICE_IDS`, etc.) por los IDs reales de los nuevos
   precios de Stripe.
4. **Variables de entorno** (`apps/web/.env`):
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - (Si se usa Stripe Connect para pagar a partners: `STRIPE_CONNECT_WEBHOOK_SECRET`,
     `STRIPE_CONNECT_V2_WEBHOOK_SECRET`)
5. **Registrar el webhook** en el dashboard de Stripe apuntando a
   `https://app.mifily.com/api/stripe/webhook`.
6. Decidir montos/límites definitivos (los de la tabla de arriba son los de Dub,
   se pueden ajustar libremente en `pricing-plans.tsx`).
7. Revertir el default "enterprise gratis" (ver sección de arriba).

---

## Control manual de planes (ya disponible, sin Stripe)

En `admin.mifily.com` → Workspaces → (elegir workspace) se puede editar a mano
`plan`, `planTier`, y los límites de cualquier workspace — útil para dar cuentas de
cortesía o planes custom sin pasar por checkout.

---

## Apéndice: rebranding Dub → Mifily (2026-07-21)

Barrido completo hecho en esta sesión sobre `apps/web`, `apps/admin`,
`packages/utils`, `packages/ui`, `packages/email`. **416 archivos** modificados
(texto "Dub" → "Mifily" por reemplazo de palabra completa, mas fixes puntuales
de links/lógica). Nada se borró — solo texto, valores por defecto y config de
dominio.

### Bugs reales encontrados y corregidos (no solo cosmético)

- **`API_DOMAIN` y `PARTNERS_DOMAIN` resolvían a `localhost` en producción**
  (`packages/utils/src/constants/main.ts`). Usaban `NEXT_PUBLIC_VERCEL_ENV`,
  una variable que solo existe en Vercel — como este deploy es self-hosted,
  esa variable nunca estaba definida y esos dominios siempre caían al fallback
  de desarrollo. Cambiado a `NODE_ENV`, igual que `APP_DOMAIN`. También se
  agregó `partners.mifily.com` a `PARTNERS_HOSTNAMES` (antes solo reconocía
  `partners.dub.co`, así que aunque configuraran el dominio no hubiera
  funcionado).
- **Alertas de Slack por errores nunca se enviaban en producción**
  (`packages/utils/src/functions/log.ts`) — mismo problema, chequeaba
  `VERCEL_ENV` en vez de `NODE_ENV`.
- **El remitente ("From") de TODOS los emails de la plataforma apuntaba a
  direcciones reales de Dub** (`packages/email/src/resend/constants.ts`):
  `system@dub.co`, `notifications@mail.dub.co`, `steven@ship.dub.co`. Cambiado
  a `system@mifily.com` / `notifications@mifily.com` / `hello@mifily.com` —
  **falta verificar estas direcciones como dominio de envío en Resend** antes
  de que esto entregue correo de verdad.
- **El fallback global de `replyTo`** (cuando un email no especifica uno)
  apuntaba a `support@dub.co` (`packages/email/src/send-via-resend.ts`) —
  corregido a `support@mifily.com`.
- 8 archivos con `replyTo: "steven.tey@dub.co"` hardcodeado (el fundador real
  de Dub) — corregidos a `support@mifily.com`. El email de feedback de
  cancelación además firmaba como "Steven Tey, Founder, Dub.co" — reescrito
  completo.
- Varios links rotos con `https://app.dub.co/...` / `https://partners.dub.co/...`
  hardcodeados en emails transaccionales y componentes de UI (mandaban a
  usuarios nuevos al dashboard real de Dub, no al de Mifily).

### Pendiente — requiere decisión de negocio, no es un simple find-replace

- **`packages/email/src/components/footer.tsx`**: la dirección legal
  "Dub Technologies, Inc. / San Francisco" se quitó del footer de todos los
  emails. Queda un placeholder ("Mifily") — **falta el nombre legal real y
  dirección física de Mifily**, obligatorio por la ley CAN-SPAM en emails
  comerciales.
- **`packages/embeds/core/`**: el script de embed que cargan sitios de
  clientes expone la API pública `window.Dub.init(...)`. Renombrarlo a
  `window.Mifily` es un cambio incompatible para cualquier integración ya
  hecha — no se tocó, queda pendiente decidir si renombrar (mejor ahora, antes
  de tener clientes con el embed integrado, que después).
- **`packages/cli/`**: publica un binario global `dub` (via
  `npm install -g` con `"bin": { "dub": ... }`). Si se va a publicar como
  paquete propio necesita otro nombre de paquete/binario — no se tocó.
- **`packages/stripe-app/`**: listing para el Stripe App Marketplace bajo el
  nombre de Dub — solo relevante si van a publicar ahí bajo su propia marca.

### Prioridad baja — no se tocó, es contenido real de terceros

- `packages/email/src/templates/broadcasts/*`: campañas de marketing pasadas
  de Dub (launch week, product updates) con contenido específico de su
  producto — no son templates transaccionales en uso, no aplican a Mifily.
- Enlaces `dub.co/help/...` y `dub.co/docs` en tooltips — documentación real
  de Dub, se dejaron porque Mifily no tiene un equivalente propio todavía.
- `packages/utils/src/constants/regions.ts`: "Dubăsari" es un distrito real de
  Moldova, no está relacionado con la marca — no se tocó (por supuesto).
