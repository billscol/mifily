# Estado del despliegue de Mifily (Dub self-hosted)

Última actualización: 2026-07-06

## Qué es esto

Fork de [dubinc/dub](https://github.com/dubinc/dub) adaptado para auto-alojarse
(sin Vercel) en un VPS propio, sirviendo como acortador multi-dominio:
`mifily.com` (principal) y `mifi.uno` (adicional), con selector de dominio
por defecto nativo de Dub. `mifi.ly` se puede sumar más adelante (1 línea de
código + 1 dominio nuevo).

- **Repo**: https://github.com/billscol/mifily (rama `main`) — privado.
- **Imagen Docker**: `ghcr.io/billscol/mifily:latest` — pública (sin secretos
  reales dentro, solo placeholders de build).
- **Servidor**: `51.91.158.103` (aaPanel + OpenLiteSpeed + Docker), acceso
  por llave SSH ya instalada (`root@51.91.158.103`, sin password).
- **Carpeta en servidor**: `/www/wwwroot/mifily/` (`.env` real ahí, permisos
  600, root only — NO está en el repo git).
- **Local**: clon de trabajo en `C:\Users\xBills\Desktop\mifily`.

## Arquitectura

- App Next.js (standalone) en contenedor `mifily_app`, puerto interno
  `127.0.0.1:3010`.
- MinIO (storage S3-compatible) en `mifily_minio`, puertos `3011`/`3012`.
- Contenedor `mifily_cron` (alpine + crond) reemplaza los Vercel Cron Jobs,
  llamando `/api/cron/*` por la red interna de Docker (`http://app:3000`).
- MariaDB del propio VPS (no un contenedor) — DB `mifily_dub`, usuario
  `mifily_dub`, permiso `Everyone` (necesario: el contenedor llega por la IP
  del puente de Docker, no `localhost`). Regla de firewall UFW añadida:
  `172.17.0.0/16 -> 3306/tcp` (solo red interna de Docker, no expone a
  internet).
- Servicios externos (SaaS, capa gratuita): **Upstash** (Redis + QStash),
  **Tinybird** (analytics — ya desplegado y en estado Live), **GitHub OAuth**
  (login). **Resend** (magic links) — pendiente, pospuesto a propósito.
- Dominios y SSL: los 4 subdominios (`mifily.com`, `mifi.uno`,
  `app.mifily.com`, `cdn.mifily.com`) ya existen como sitios en aaPanel con
  certificados Let's Encrypt reales (válidos hasta octubre), y reverse proxy
  de OpenLiteSpeed configurado a mano hacia los puertos de arriba. DNS en
  Cloudflare, ya activo.

## Checklist

- [x] Fork + adaptación del código (dominios por defecto, Dockerfile,
      docker-compose, GitHub Actions → GHCR)
- [x] Base de datos MariaDB dedicada + firewall
- [x] Cuentas externas: GitHub OAuth, Upstash, Tinybird (Resend pendiente)
- [x] Reverse proxy + SSL para los 4 dominios
- [x] Contenedores levantados (`docker compose up -d`)
- [ ] **Build de la imagen con el fix de PlanetScale — EN CURSO cuando se
      cerró la sesión.** Ver "Qué falta ahora mismo" abajo.
- [ ] Verificación end-to-end (login, crear link corto en cada dominio,
      analytics, subida de logo)
- [ ] Migraciones/schema de Prisma contra la base de datos real (`prisma db
      push` o `migrate deploy`) — **todavía no se ha corrido en la DB real**
- [ ] Seed: crear el primer workspace (vía onboarding normal con GitHub
      login) y luego insertar/verificar los registros `Domain` +
      `DefaultDomains` para mifily.com/mifi.uno apuntando a ese workspace
- [ ] Repasar seguridad: rotar el password root (quedó en texto plano en
      el chat) y considerar deshabilitar SSH por password
- [ ] Rebranding: quedó a medias (ver abajo)
- [ ] Resend: cuenta + verificación de dominio (pospuesto)

## Qué falta ahora mismo (justo donde se cortó la sesión)

Se encontró y arregló un bug real de arquitectura: varias partes del código
(el middleware de redirección de links, entre otras) usan un driver HTTP de
PlanetScale (`@planetscale/database`) que solo tiene sentido en Vercel Edge
Runtime. Como corremos Node.js normal, se reemplazó por un shim que usa
Prisma directo contra MariaDB (commits `8ee9ea2` y `f99c0d2` en el repo).

Nota: el primer intento de este fix (commit `f99c0d2`) falló el build por un
error de tipos (el shim de `conn.execute` no era genérico y un archivo admin
lo llama como `conn.execute<Tipo>(...)`) — ya corregido en el commit
`4f1852a`. Si al retomar hay MÁS errores de tipos en archivos que usan
`conn.execute` (hay ~15 en todo el repo, no solo los que se tocaron a mano),
lo más probable es que sea el mismo patrón: revisar
`apps/web/lib/planetscale/connection.ts` primero.

Un build de GitHub Actions con este fix quedó **corriendo** al cerrar la
sesión (tarda ~12 min). Al retomar:

1. Revisar si el workflow terminó bien:
   `gh run list --repo billscol/mifily --limit 3`
2. Si es exitoso, en el servidor:
   ```
   cd /www/wwwroot/mifily
   docker compose pull app
   docker compose up -d app
   ```
3. Probar: `curl -sk -o /dev/null -w '%{http_code}\n' https://app.mifily.com/`
   (antes daba 500 por el bug de PlanetScale — debería dar 200/redirect
   ahora). Si sigue en 500, revisar logs: `docker logs mifily_app --tail 60`.
4. **Correr las migraciones de Prisma contra la DB real** (no se ha hecho
   todavía):
   ```
   docker compose run --rm -e DATABASE_URL="mysql://mifily_dub:TL4THbi5XnRxrRAG@host.docker.internal:3306/mifily_dub" app npx prisma db push --schema=./prisma/schema --skip-generate
   ```
   (ajustar si el comando exacto de acceso al contenedor cambia).
5. Entrar a `https://app.mifily.com`, loguearse con GitHub, crear el primer
   workspace por el onboarding normal.
6. Anotar el `id` real de ese workspace (`Project.id` en la tabla) y
   actualizar `OPERATOR_WORKSPACE_ID` en
   `packages/utils/src/constants/dub-domains.ts` si se quiere que quede
   sincronizado (aunque, ojo: ese campo no se usa en runtime, es solo
   documentación — no es bloqueante).
7. Crear a mano los registros `Domain` (mifily.com, mifi.uno) y
   `DefaultDomains` para ese workspace si el flujo normal de la app no los
   crea solo al añadir los dominios desde Settings → Domains.
8. Probar crear un link corto en cada dominio y visitarlo.

## Rebranding (a medias, "casi nulo" es imposible del todo)

Importante: Dub es AGPL-3.0. Esa licencia **obliga** a ofrecer el código
fuente a quien use el servicio por red — no se puede ocultar del todo (y no
se debe intentar). Lo que sí es 100% legítimo: quitar toda mención/logo de
"Dub" de la interfaz y dejar solo un link discreto de "código fuente" en el
footer. El repo actualmente es **privado** — para cumplir la licencia
tendría que ser accesible a los usuarios del servicio.

Ya se cambió (commit en `main`):
- Título/descripción por defecto (`constructMetadata` en
  `packages/utils/src/functions/construct-metadata.ts`), favicon paths,
  `metadataBase`, se quitó el twitter handle `@dubdotco`.
- Emails de soporte hardcodeados (`support@dub.co` → `mifily.com` /
  `info@mifily.com`) en 5 archivos.
- `adminEmails` en los 4 vhost de aaPanel → `info@mifily.com`.

Pendiente (no se tocó):
- Logos/wordmark: `DUB_LOGO`, `DUB_LOGO_SQUARE`, `DUB_QR_LOGO`,
  `DUB_WORDMARK`, `DUB_THUMBNAIL` en `packages/utils/src/constants/main.ts`
  siguen apuntando a `assets.dub.co` — necesitan archivos de logo reales de
  Mifily antes de cambiarse (si no, se rompen los `<Image>` que los usan).
- ~340 menciones sueltas de "Dub"/"dub.co" en el resto de la UI (la mayoría
  en features "ee" de partners/admin que ni siquiera están expuestas por
  DNS en este despliegue — bajo impacto real, pero ahí están).
- Decidir y agregar el link de "código fuente" en el footer (requisito de
  licencia) y hacer público el repo `billscol/mifily`.

## Credenciales y dónde viven

Las credenciales reales (DB, Upstash, Tinybird, GitHub OAuth, MinIO) están
en `/www/wwwroot/mifily/.env` en el servidor (chmod 600), **no** en este
archivo ni en el repo. Si se pierde el hilo, se pueden releer por SSH:
`ssh root@51.91.158.103 "cat /www/wwwroot/mifily/.env"`.

Cuentas creadas (login con las credenciales del usuario, no aquí):
GitHub OAuth App "Mifily" (owner: billscol), Upstash (región eu-central),
Tinybird (workspace `workspace_mifily`, región `aws-eu-west-1`).
