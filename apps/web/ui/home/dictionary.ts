export type Lang = "es" | "en";

export const dictionary = {
  es: {
    nav: {
      features: "Funciones",
      howItWorks: "Cómo funciona",
      pricing: "Precios",
      faq: "Preguntas",
      login: "Iniciar sesión",
      signup: "Regístrate gratis",
    },
    hero: {
      badge: "Gestión de enlaces, simplificada",
      title: ["Enlaces cortos que trabajan", "tan duro como tú."],
      subtitle:
        "Crea enlaces cortos de marca, códigos QR y páginas link-in-bio en segundos — y descubre quién hizo clic, desde dónde y en qué dispositivo.",
      ctaPrimary: "Regístrate gratis",
      ctaSecondary: "Ver cómo funciona",
      note: "No se requiere tarjeta de crédito · Plan gratuito disponible",
    },
    mockup: {
      urlBar: "app.mifily.com/links",
      links: [
        {
          short: "mify.co/oferta-verano",
          dest: "tienda.ejemplo.com/verano",
          clicks: "1.204",
        },
        {
          short: "mify.co/lanzamiento",
          dest: "ejemplo.com/nuevo-producto",
          clicks: "842",
        },
        { short: "mify.co/bio", dest: "ejemplo.com/enlaces", clicks: "3.015" },
      ],
      clicksThisWeek: "Clics esta semana",
      topCountries: "Países principales",
      countries: [
        { country: "Estados Unidos", pct: 62 },
        { country: "México", pct: 21 },
        { country: "España", pct: 17 },
      ],
      clicksLabel: "clics",
    },
    stats: [
      { value: "10M+", label: "Enlaces creados" },
      { value: "190+", label: "Países alcanzados" },
      { value: "99.99%", label: "Disponibilidad" },
      { value: "<50ms", label: "Velocidad de redirección" },
    ],
    features: {
      title: "Todo lo que necesitas para compartir mejor",
      subtitle: "Una sola plataforma para cada enlace, código QR y clic que te importa.",
      items: [
        {
          title: "Enlaces cortos de marca",
          description:
            "Convierte URLs largas y confusas en enlaces cortos y memorables con rutas personalizadas que reflejan tu marca.",
        },
        {
          title: "Analíticas potentes",
          description:
            "Sigue los clics en tiempo real con desgloses por ubicación, dispositivo, navegador y referente.",
        },
        {
          title: "Códigos QR integrados",
          description:
            "Cada enlace incluye un código QR personalizable, listo para imprimir, empaques o presentaciones.",
        },
        {
          title: "Tus propios dominios",
          description:
            "Conecta dominios personalizados ilimitados para que cada enlace refuerce tu marca, no la nuestra.",
        },
        {
          title: "Pensado para equipos",
          description:
            "Comparte espacios de trabajo, organiza enlaces en carpetas y etiquetas, y colabora sin el caos.",
        },
        {
          title: "Seguridad de nivel empresarial",
          description:
            "Enlaces protegidos con contraseña, fechas de expiración y segmentación por dispositivo mantienen tus enlaces seguros y precisos.",
        },
      ],
    },
    spotlight1: {
      eyebrow: "Crear",
      title: "Crea un enlace en segundos",
      description:
        "Pega cualquier URL y obtén un enlace corto y de marca al instante — con rutas personalizadas, parámetros UTM y códigos QR incluidos.",
      bullets: [
        "Rutas personalizadas que reflejan tu marca",
        "Generador de UTM integrado para campañas",
        "Páginas link-in-bio para tus redes sociales",
      ],
    },
    spotlight2: {
      eyebrow: "Medir",
      title: "Sabe exactamente quién hace clic",
      description:
        "Cada enlace incluye analíticas en tiempo real, para que veas qué está funcionando y le apuestes más.",
      bullets: [
        "Desgloses por ubicación, dispositivo y navegador",
        "Seguimiento de clics en tiempo real, sin demoras",
        "Reportes exportables para todo tu equipo",
      ],
    },
    createLinkVisual: {
      destLabel: "URL de destino",
      destUrl: "https://tienda.ejemplo.com/productos/coleccion-verano?utm_source=ig",
      shortLabel: "Tu enlace corto",
      copy: "Copiar",
    },
    analyticsVisual: {
      clicks30d: "Clics — últimos 30 días",
      devices: [
        { label: "Móvil", pct: 58 },
        { label: "Escritorio", pct: 34 },
        { label: "Tablet", pct: 8 },
      ],
    },
    testimonial: {
      quote:
        '"Reemplazamos tres herramientas distintas con Mifily. Enlaces de marca, códigos QR y analíticas finalmente viven en un solo lugar — y nuestro equipo realmente lo usa."',
      name: "Alex Morgan",
      role: "Head of Growth",
    },
    pricing: {
      title: "Precios simples y transparentes",
      subtitle:
        "Mifily es gratis para empezar — sin tarjeta de crédito, sin reloj de prueba.",
      free: "Gratis",
      forWorkspace: "para todo tu espacio de trabajo",
      included: [
        "Enlaces cortos ilimitados",
        "Analíticas de clics en tiempo real",
        "Dominios personalizados",
        "Códigos QR integrados",
        "Espacios de trabajo en equipo",
      ],
      cta: "Regístrate gratis",
      needMore: "¿Necesitas algo más grande?",
      talkToUs: "Hablemos de Enterprise",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Necesito una tarjeta de crédito para registrarme?",
          answer:
            "No. Puedes crear tu espacio de trabajo y empezar a acortar enlaces de inmediato — sin tarjeta de crédito.",
        },
        {
          question: "¿Puedo usar mi propio dominio?",
          answer:
            "Sí. Conecta cualquier dominio que poseas y úsalo para tus enlaces cortos para que cada clic refuerce tu marca.",
        },
        {
          question: "¿Qué analíticas obtengo por cada enlace?",
          answer:
            "Clics en tiempo real, además de desgloses por país, dispositivo, navegador, sistema operativo y referente — todo en un panel.",
        },
        {
          question: "¿Hay un límite de enlaces que puedo crear?",
          answer:
            "No. Crea tantos enlaces, códigos QR y páginas link-in-bio como tu espacio de trabajo necesite.",
        },
      ],
    },
    finalCta: {
      title: "¿Listo para aprovechar más tus enlaces?",
      subtitle:
        "Únete a los equipos que usan Mifily para compartir mejor y ver cada clic que importa.",
      cta: "Regístrate gratis",
    },
    footer: {
      tagline:
        "Enlaces cortos, analíticas potentes. Un solo lugar para crear, compartir y medir cada enlace que importa.",
      columns: {
        product: "Producto",
        company: "Compañía",
        resources: "Recursos",
        legal: "Legal",
      },
      links: {
        features: "Funciones",
        howItWorks: "Cómo funciona",
        pricing: "Precios",
        login: "Iniciar sesión",
        signup: "Regístrate",
        contact: "Contacto",
        faq: "Preguntas",
        support: "Soporte",
        privacy: "Política de privacidad",
        terms: "Términos de servicio",
      },
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      features: "Features",
      howItWorks: "How it works",
      pricing: "Pricing",
      faq: "FAQ",
      login: "Log in",
      signup: "Sign up free",
    },
    hero: {
      badge: "Link management, made simple",
      title: ["Short links that work", "as hard as you do."],
      subtitle:
        "Create branded short links, QR codes, and link-in-bio pages in seconds — then see exactly who clicked, from where, and on what device.",
      ctaPrimary: "Sign up free",
      ctaSecondary: "See how it works",
      note: "No credit card required · Free plan available",
    },
    mockup: {
      urlBar: "app.mifily.com/links",
      links: [
        {
          short: "mify.co/summer-sale",
          dest: "shop.example.com/summer",
          clicks: "1,204",
        },
        {
          short: "mify.co/launch",
          dest: "example.com/product-launch",
          clicks: "842",
        },
        { short: "mify.co/bio", dest: "example.com/links", clicks: "3,015" },
      ],
      clicksThisWeek: "Clicks this week",
      topCountries: "Top countries",
      countries: [
        { country: "United States", pct: 62 },
        { country: "Mexico", pct: 21 },
        { country: "Spain", pct: 17 },
      ],
      clicksLabel: "clicks",
    },
    stats: [
      { value: "10M+", label: "Links created" },
      { value: "190+", label: "Countries reached" },
      { value: "99.99%", label: "Uptime" },
      { value: "<50ms", label: "Redirect speed" },
    ],
    features: {
      title: "Everything you need to share smarter",
      subtitle: "One platform for every link, QR code, and click you care about.",
      items: [
        {
          title: "Branded short links",
          description:
            "Turn long, messy URLs into short, memorable links with custom back-halves that match your brand.",
        },
        {
          title: "Powerful analytics",
          description:
            "Track clicks in real time with breakdowns by location, device, browser, and referrer.",
        },
        {
          title: "Built-in QR codes",
          description:
            "Every link comes with a customizable QR code, ready to drop into print, packaging, or slides.",
        },
        {
          title: "Your own domains",
          description:
            "Connect unlimited custom domains so every link you share reinforces your brand, not ours.",
        },
        {
          title: "Built for teams",
          description:
            "Share workspaces, organize links into folders and tags, and collaborate without the chaos.",
        },
        {
          title: "Enterprise-grade security",
          description:
            "Password-protected links, expiration dates, and device targeting keep your links safe and precise.",
        },
      ],
    },
    spotlight1: {
      eyebrow: "Create",
      title: "Create a link in seconds",
      description:
        "Paste any URL and get a short, branded link instantly — with custom back-halves, UTM parameters, and QR codes built in.",
      bullets: [
        "Custom back-halves that match your brand",
        "Built-in UTM builder for campaign tracking",
        "Link-in-bio pages for social profiles",
      ],
    },
    spotlight2: {
      eyebrow: "Measure",
      title: "Know exactly who's clicking",
      description:
        "Every link comes with real-time analytics, so you can see what's working and double down on it.",
      bullets: [
        "Geography, device, and browser breakdowns",
        "Real-time click tracking, no delay",
        "Exportable reports for your whole team",
      ],
    },
    createLinkVisual: {
      destLabel: "Destination URL",
      destUrl: "https://shop.example.com/products/summer-collection?utm_source=ig",
      shortLabel: "Your short link",
      copy: "Copy",
    },
    analyticsVisual: {
      clicks30d: "Clicks — last 30 days",
      devices: [
        { label: "Mobile", pct: 58 },
        { label: "Desktop", pct: 34 },
        { label: "Tablet", pct: 8 },
      ],
    },
    testimonial: {
      quote:
        '"We swapped three different tools for Mifily. Branded links, QR codes, and analytics finally live in one place — and our team actually uses it."',
      name: "Alex Morgan",
      role: "Head of Growth",
    },
    pricing: {
      title: "Simple, transparent pricing",
      subtitle: "Mifily is free to get started — no credit card, no trial clock.",
      free: "Free",
      forWorkspace: "for your whole workspace",
      included: [
        "Unlimited short links",
        "Real-time click analytics",
        "Custom domains",
        "Built-in QR codes",
        "Team workspaces",
      ],
      cta: "Sign up free",
      needMore: "Need something bigger?",
      talkToUs: "Talk to us about Enterprise",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "Do I need a credit card to sign up?",
          answer:
            "No. You can create your workspace and start shortening links right away — no credit card required.",
        },
        {
          question: "Can I use my own domain?",
          answer:
            "Yes. Connect any domain you own and use it for your short links so every click reinforces your brand.",
        },
        {
          question: "What analytics do I get for each link?",
          answer:
            "Real-time clicks, plus breakdowns by country, device, browser, OS, and referrer — all in one dashboard.",
        },
        {
          question: "Is there a limit on how many links I can create?",
          answer:
            "No. Create as many links, QR codes, and link-in-bio pages as your workspace needs.",
        },
      ],
    },
    finalCta: {
      title: "Ready to get more out of your links?",
      subtitle:
        "Join teams using Mifily to share smarter and see every click that matters.",
      cta: "Sign up free",
    },
    footer: {
      tagline:
        "Short links, powerful analytics. One place to create, share, and track every link that matters.",
      columns: {
        product: "Product",
        company: "Company",
        resources: "Resources",
        legal: "Legal",
      },
      links: {
        features: "Features",
        howItWorks: "How it works",
        pricing: "Pricing",
        login: "Log in",
        signup: "Sign up",
        contact: "Contact",
        faq: "FAQ",
        support: "Support",
        privacy: "Privacy policy",
        terms: "Terms of service",
      },
      rights: "All rights reserved.",
    },
  },
} satisfies Record<Lang, any>;
