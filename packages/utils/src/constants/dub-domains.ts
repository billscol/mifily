import { SHORT_DOMAIN } from "./main";

// Workspace that owns the shared default-domain pool below. Must match the
// `Project.id` seeded on the server (see deploy/seed-default-domains.md).
export const OPERATOR_WORKSPACE_ID = "ws_operator";

export const DUB_DOMAINS = [
  {
    id: "domain_mifily_com",
    slug: SHORT_DOMAIN,
    verified: true,
    primary: true,
    archived: false,
    placeholder: "https://mifily.com",
    allowedHostnames: [],
    description: "El dominio por defecto para todas las cuentas nuevas.",
    projectId: OPERATOR_WORKSPACE_ID,
  },
  {
    id: "domain_mifi_uno",
    slug: "mifi.uno",
    verified: true,
    primary: false,
    archived: false,
    placeholder: "https://mifi.uno",
    allowedHostnames: [],
    description: "Dominio corto alternativo.",
    projectId: OPERATOR_WORKSPACE_ID,
  },
];

export const DUB_DOMAINS_ARRAY = DUB_DOMAINS.map((domain) => domain.slug);

export const DUB_DEMO_LINKS = [
  {
    id: "clqo10sum0006js08vutzfxt3",
    domain: "d.to",
    key: "try",
    dashboardId: "dash_Rqy6tVEO5Ib4iVFvmYYTK4kO",
  },
  {
    id: "cltshzzpd0005126z3rd2lvo4",
    domain: "dub.sh",
    key: "try",
    dashboardId: "dash_bUNOfMQVcKS0VMDa2HaYhOjg",
  },
  {
    id: "clot0z5rg000djp08ue98hxkn",
    domain: "chatg.pt",
    key: "domains",
    dashboardId: "dash_lX4or5Yj6ZrPk3qW4SwgrQ5t",
  },
  {
    id: "clp4jh9av0001l308ormavtlu",
    domain: "spti.fi",
    key: "hans",
    dashboardId: "dash_v2Ygwn3hZNYx6kFYfBT4IApM",
  },
  {
    id: "cltgtsex40003ck8z444hum5u",
    domain: "git.new",
    key: "dub",
    dashboardId: "dash_FX5HKOKhtQ6uoIeSDxWM8eIb",
  },
  {
    id: "clymd5vqj0005jgkorsopklsk",
    domain: "fig.page",
    key: "dub",
    dashboardId: "dash_no9BFlfSjHDG6K7XIAuwLt5p",
  },
  {
    id: "clp3k3yoi0001ju0874nz899q",
    domain: "amzn.id",
    key: "tv",
    dashboardId: "dash_fKwai9V9nsLcC0IaY0rTF1yA",
  },
  {
    id: "clymd73o50001ulmzzxjumr8l",
    domain: "ggl.link",
    key: "dub",
    dashboardId: "dash_rx5c7pQPnx2MUCX3cL4t1Zpn",
  },
  {
    id: "cm24785ki0001ainw2qks4uq5",
    domain: "cal.link",
    key: "demo",
    dashboardId: "dash_zbzP2UVvTrv5SkIEPP2pV5pC",
  },
];
