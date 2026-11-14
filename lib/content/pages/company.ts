import { image } from "../images";
import { digitizeCtaBlock, orderStepsBlock } from "../shared";
import { legacyUrl, routes } from "../site";
import type { PageContent } from "../types";

export const portfolioPage: PageContent = {
  meta: {
    title: "Embroidery Portfolio | Vector Art Portfolio | Sample Embroidery Design",
    description:
      "Before and after samples of BitsNPixs embroidery digitizing, Coloreel embroidery digitizing and vector artwork conversion.",
    path: routes.portfolio,
  },
  hero: {
    variant: "page",
    eyebrow: "Portfolio",
    title: "We create beautiful design that makes a difference.",
    breadcrumb: "Portfolio",
  },
  blocks: [
    { type: "portfolio", surface: "light", explorer: { allLabel: "All", filterLabel: "Filter samples" } },
    digitizeCtaBlock,
  ],
};

export const careerPage: PageContent = {
  meta: {
    title: "Career",
    description:
      "Life at BitsNPixs: flexible working hours, a modern workplace, annual leave and healthcare. Let's grow together.",
    path: routes.career,
  },
  hero: {
    variant: "page",
    eyebrow: "Career",
    title: "Intellectuals wanted!",
    breadcrumb: "Career",
    lead: 'At BitsNPixs, we ensure that our team always works with pleasure and not under pressure. We believe the office is anyone\'s second home, and we always believe in our motto: "let\'s grow together".',
    image: image("career-workplace"),
    actions: [{ label: "Apply Now", href: routes.contact }],
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "Equal opportunity",
      title: "Your life at BitsNPixs",
      paragraphs: [
        "BitsNPixs is an equal opportunity employer and makes employment decisions on the basis of merit. We want to have the best qualified people in every job.",
        "BitsNPixs policy prohibits unlawful discrimination based on race, color, religion or religious creed, sex, sexual orientation, gender, age, or any other consideration made unlawful by applicable laws.",
      ],
    },
    {
      type: "features",
      layout: "grid",
      surface: "tint",
      eyebrow: "Perks",
      title: "Work with pleasure, not under pressure.",
      items: [
        {
          title: "Flexible Working Hours",
          body: "Wish to log in a bit later than usual? At BitsNPixs, you can start your day as you want and complete your working hours.",
        },
        {
          title: "Modern Workplace",
          body: "Our offices are modern, spacious and equipped with the latest technology to ensure a comfortable working environment for everyone.",
        },
        {
          title: "Annual Leaves",
          body: "Ten days of annual leave are given to all employees to have their best time with family and plan a vacation.",
        },
        {
          title: "Healthcare",
          body: "Taking care of our team is about more than what happens in the office. We've got your healthcare covered so you can work with peace of mind.",
        },
      ],
    },
    {
      type: "cta",
      eyebrow: "Our job offers",
      title: "Let's grow together.",
      lead: "There are currently no open job opportunities, but feel free to contact us for a spontaneous application.",
      actions: [{ label: "Contact Us", href: routes.contact }],
    },
  ],
};

export const contactPage: PageContent = {
  meta: {
    title: "Contact Us for All Your Embroidery Digitizing and Vector Art Needs",
    description:
      "Reach BitsNPixs through the contact form, by email or by phone. Corporate office in Bengaluru with design centers in Trivandrum, Coimbatore and Marthandam.",
    path: routes.contact,
  },
  hero: {
    variant: "page",
    eyebrow: "Contact Us",
    title: "Reach out and we will get back to you.",
    breadcrumb: "Contact Us",
    lead: "Our dedicated team is available 24/7 to assist with any inquiries or issues.",
  },
  blocks: [
    {
      type: "contact",
      title: "Reach out through our contact form",
      stat: { value: 5000, suffix: "+", label: "Satisfied Clients" },
      image: image("contact-office"),
    },
  ],
};

const BLOG_CATEGORY = "Embroidery Digitizing";
const blogPath = (slug: string) => legacyUrl(`/blog/embroidery-digitizing-4/${slug}`);

export const blogPage: PageContent = {
  meta: {
    title: "Blog Posts",
    description: "Guides and answers on embroidery digitizing from the BitsNPixs team.",
    path: routes.blog,
  },
  hero: {
    variant: "page",
    eyebrow: "Blogs",
    title: "Our latest posts",
    breadcrumb: "Blogs",
  },
  blocks: [
    {
      type: "posts",
      posts: [
        {
          title: "Embroidery Digitizing Quality Checklist: 15 Things to Check Before Production",
          date: "2026-08-25",
          slug: "embroidery-digitizing-quality-checklist-15-things-to-check-before-production-69",
        },
        {
          title: "From Logo to Thread: How an Artwork Becomes an Embroidery Design",
          date: "2026-08-24",
          slug: "from-logo-to-thread-how-an-artwork-becomes-an-embroidery-design-68",
        },
        {
          title: "Understanding Embroidery Stitch Types: Satin, Fill, and Running Stitch",
          date: "2026-08-24",
          slug: "understanding-embroidery-stitch-types-satin-fill-and-running-stitch-67",
        },
        {
          title: "Why is My Embroidery Design Puckering? Causes and Solutions",
          date: "2026-08-21",
          slug: "why-is-my-embroidery-design-puckering-causes-and-solutions-66",
        },
        {
          title: "Why Are There Gaps Between Embroidery Elements?",
          date: "2026-08-21",
          slug: "why-are-there-gaps-between-embroidery-elements-65",
        },
        {
          title: "Why You Should Not Simply Rename an Embroidery File Extension",
          date: "2026-08-20",
          slug: "why-you-should-not-simply-rename-an-embroidery-file-extension-64",
        },
        {
          title: "What Makes an Embroidery File Production-Ready?",
          date: "2026-08-20",
          slug: "what-makes-an-embroidery-file-production-ready-63",
        },
        {
          title: "What Information Should You Give an Embroidery Digitizer With Your Order?",
          date: "2026-08-12",
          slug: "what-information-should-you-give-an-embroidery-digitizer-with-your-order-62",
        },
        {
          title: "Why Your Embroidery Design Looks Different From the Original Logo",
          date: "2026-08-12",
          slug: "why-your-embroidery-design-looks-different-from-the-original-logo-61",
        },
        {
          title: "How to Get Better Embroidery Results Every Time",
          date: "2026-08-05",
          slug: "how-to-get-better-embroidery-results-every-time-60",
        },
        {
          title: "Why Small Logos Need Special Digitizing Techniques",
          date: "2026-08-05",
          slug: "why-small-logos-need-special-digitizing-techniques-59",
        },
        {
          title: "Why Professional Embroidery Digitizing Delivers Better Results",
          date: "2026-08-04",
          slug: "why-professional-embroidery-digitizing-delivers-better-results-58",
        },
      ].map(({ slug, ...post }) => ({ ...post, category: BLOG_CATEGORY, href: blogPath(slug) })),
    },
    digitizeCtaBlock,
  ],
};

export const shopPage: PageContent = {
  meta: {
    title: "Products",
    description:
      "Order embroidery digitizing and vector conversion online: standard embroidery, Coloreel embroidery and simple or complex vector conversion.",
    path: routes.shop,
  },
  hero: {
    variant: "page",
    eyebrow: "Shop",
    title: "All products",
    breadcrumb: "Shop",
    lead: "Choose a product, set your options and request your order as a quote. Quotations are always free.",
  },
  blocks: [
    { type: "products", eyebrow: "Catalog", title: "Digitizing and vector conversion", actionLabel: "View Details" },
    orderStepsBlock,
    digitizeCtaBlock,
  ],
};
