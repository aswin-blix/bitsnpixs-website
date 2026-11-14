import type { LinkRef, Studio } from "./types";

/**
 * The existing Odoo site keeps handling checkout, sign-in and blog articles.
 * When the new site takes over the main domain, point this at wherever Odoo
 * lives (for example a shop. subdomain) and every outbound link follows.
 */
export const LEGACY_BASE = "https://www.bitsnpixs.com";

export const legacyUrl = (path: string) => `${LEGACY_BASE}${path}`;

export const routes = {
  home: "/",
  about: "/about-us",
  embroidery: "/services/embroidery-digitizing",
  coloreel: "/services/coloreel-embroidery-digitizing",
  vector: "/services/vector-artwork-conversion",
  software: "/software-development-service",
  portfolio: "/portfolio",
  career: "/career",
  contact: "/contact-us",
  blog: "/blog",
  shop: "/shop",
  stitchLab: "/stitch-lab",
} as const;

export const site = {
  name: "BitsNPixs",
  legalName: "BitsNPixs Technologies Private Limited",
  url: "https://www.bitsnpixs.com",
  locale: "en_US",
  description:
    "Embroidery digitizing, Coloreel embroidery digitizing, vector artwork conversion and software development. Serving clients since 2011.",
  footerBlurb:
    "BitsNPixs Technologies Pvt Ltd has been serving the digitizing needs of clients for the past decade, using the latest embroidery software to deliver quality files on time.",
  copyright: "© 2026 BitsNPixs Technologies Private Limited. All rights reserved.",
  email: "info@bitsnpixs.com",
  phones: [
    { region: "US", display: "+1 (631) 353-4291", href: "tel:+16313534291" },
    { region: "India", display: "+91 808 670 0015", href: "tel:+918086700015" },
  ],
  social: [
    { platform: "Facebook", href: legacyUrl("/website/social/facebook") },
    { platform: "Twitter", href: legacyUrl("/website/social/twitter") },
    { platform: "Instagram", href: legacyUrl("/website/social/instagram") },
    { platform: "YouTube", href: legacyUrl("/website/social/youtube") },
    { platform: "LinkedIn", href: legacyUrl("/website/social/linkedin") },
  ],
  signIn: { label: "Sign in", href: legacyUrl("/web/login"), external: true } satisfies LinkRef,
} as const;

export interface NavItem extends LinkRef {
  children?: LinkRef[];
}

export const serviceLinks: LinkRef[] = [
  { label: "Embroidery Digitizing", href: routes.embroidery },
  { label: "Coloreel Embroidery", href: routes.coloreel },
  { label: "Vector Artwork Conversion", href: routes.vector },
  { label: "Software Development", href: routes.software },
];

export const navigation = {
  main: [
    { label: "About Us", href: routes.about },
    { label: "Services", href: routes.embroidery, children: serviceLinks },
    { label: "Portfolio", href: routes.portfolio },
    { label: "Career", href: routes.career },
    { label: "Contact Us", href: routes.contact },
  ] satisfies NavItem[],
  primaryAction: { label: "Shop", href: routes.shop } satisfies LinkRef,
  footer: [
    { title: "Services", links: serviceLinks },
    {
      title: "Quick Links",
      links: [
        { label: "About Us", href: routes.about },
        { label: "Portfolio", href: routes.portfolio },
        { label: "Blogs", href: routes.blog },
        { label: "Career", href: routes.career },
        { label: "Contact Us", href: routes.contact },
      ],
    },
  ] satisfies { title: string; links: LinkRef[] }[],
};

export const studios: Studio[] = [
  {
    id: "bengaluru",
    kind: "Corporate Office (India)",
    city: "Bengaluru",
    address:
      "Ground Floor, #68, Transpade Tower, Jyoti Nivas College Road, Koramangala Industrial Layout, 5th Block, Koramangala, Bengaluru, Karnataka 560 095",
    lat: 12.93,
    lng: 77.62,
  },
  {
    id: "coimbatore",
    kind: "Design Center",
    city: "Coimbatore",
    address: "50/1, Sri Manis Classic, Dr. Jaganathan Nagar, Peelamedu, Coimbatore, Tamil Nadu 641 014",
    lat: 11.03,
    lng: 77.03,
  },
  {
    id: "trivandrum",
    kind: "Design Center",
    city: "Trivandrum",
    address:
      "Module No. T-7, 7th floor, Thejaswini Building, Technopark Phase 1, Trivandrum, Kerala 695 581",
    lat: 8.56,
    lng: 76.88,
  },
  {
    id: "marthandam",
    kind: "Design Center",
    city: "Marthandam",
    address: "Adhesh Tower, Eraviputhoorkadai, Kattathurai P.O, Marthandam, Tamil Nadu 629 158",
    lat: 8.31,
    lng: 77.22,
  },
];

export const contactForm = {
  submitLabel: "Send Message",
  fields: [
    { name: "name", label: "Name", type: "text", autoComplete: "name" },
    { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    { name: "country", label: "Country", type: "text", autoComplete: "country-name" },
    { name: "company", label: "Company", type: "text", autoComplete: "organization" },
    { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
    { name: "question", label: "Question", type: "textarea", autoComplete: "off" },
  ],
} as const;

export type ContactFieldName = (typeof contactForm.fields)[number]["name"];
