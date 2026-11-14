import { image } from "../images";
import {
  coloreelFaqBlock,
  digitizeCtaBlock,
  digitizingFaqBlock,
  embroideryFormatsBlock,
  turnaroundBlock,
  vectorFormats,
  whyVectorBlock,
} from "../shared";
import { routes } from "../site";
import type { PageContent } from "../types";

const embroideryPage: PageContent = {
  meta: {
    title: "Leading Embroidery Service Provider for Custom Designs and Digitizing",
    description:
      "Reliable embroidery service provider offering digitizing, custom designs, and stitch-ready files for businesses and individuals.",
    path: routes.embroidery,
  },
  hero: {
    variant: "page",
    eyebrow: "Services",
    title: "Embroidery Digitizing",
    lead: "BitsNPixs is the reliable and professional embroidery digitizing service provider since 2011. When it comes to embroidery digitizing, we stand on top using the most advanced techniques.",
    image: image("embroidery-hero"),
    actions: [{ label: "Contact Us", href: routes.contact }],
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "The best embroidery digitizers",
      title: "Elegant, sharp artwork, in any machine-readable format you desire.",
      image: image("embroidery-files"),
      imageSide: "right",
      paragraphs: [
        "Our team members are highly efficient and skilful at embroidery digitizing; they create elegant and sharp artwork. We have a team of in-house professional embroidery digitizers who can convert any embroidery design to any machine-readable format that you desire.",
        "We make your embroidery digitizing art crisp and perfectly blended from edge to edge. We can assure you that our work is smooth, perfect, aesthetically pleasing, and error-free. Customer satisfaction is always our top priority.",
        "We mainly work with customers in the U.S.A, U.K, Australia, and Canada. Our embroidery digitizers will offer you support starting from the quote until the delivery of the digitized file. Our main aim is to maintain good quality, make our clients happy, and grow together.",
        "Our main objective is to provide sharp designs, lower thread breakage rates, enhanced details, and lower wastage, thus ensuring a faster production process to meet our clients' deadlines, on all kinds of fabrics and textures.",
      ],
    },
    {
      type: "features",
      layout: "rows",
      title: "Our embroidery digitizing services",
      items: [
        {
          title: "Our payment is flexible",
          body: "We accept payments made using PayPal, Credit Cards, Debit Cards, and Wire Transfers.",
        },
        {
          title: "Anything free is a bonus",
          body: "We give you free edits if you are unsatisfied with the outcome, provided there is no deviation from the original design.",
        },
        {
          title: "Quotations are always free",
          body: "You will receive the price estimates and stitch counts within 2 to 24 hours after contacting us and requesting the quotes.",
        },
        {
          title: "Stitch count pricing",
          body: "Our pricing is based on the order quantity, for instance, per 1000 stitches. This model is also known as the stitch count pricing structure.",
        },
      ],
    },
    turnaroundBlock,
    embroideryFormatsBlock,
    {
      type: "specialties",
      eyebrow: "Extras",
      title: "We also specialize in",
      placements: [
        { id: "cap", label: "Cap Digitizing" },
        { id: "left-chest", label: "Left Chest Digitizing" },
        { id: "jacket-back", label: "Jacket Back Digitizing" },
      ],
      techniques: [
        "Custom Digitizing",
        "Logo Digitizing",
        "Logo Vectorizing",
        "Applique Digitizing",
        "Patch Digitizing",
        "Small Text Digitizing",
        "Image Digitizing",
        "3D Puff Digitizing",
        "Chenille Digitizing",
      ],
    },
    {
      type: "portfolio",
      surface: "light",
      eyebrow: "Portfolio",
      title: "We create beautiful design that makes a difference.",
      category: "embroidery",
      limit: 3,
      action: { label: "View All", href: routes.portfolio },
    },
    {
      type: "prose",
      surface: "tint",
      title: "Editing",
      paragraphs: [
        "At BitsNPixs, we hold strict standards for quality and pay close attention to the needs of our clients. If by any chance you are not satisfied with the design, we will edit the whole thing free of cost, as long as there is no change in the original design and the editing is requested within 30 days of the delivery of the original product.",
      ],
      list: {
        title: "Not covered in editing",
        tone: "cross",
        items: [
          "Changes to the original artwork",
          "Changes in fabrics (density and pull compensation)",
          "Change of design size",
          "Email support",
        ],
      },
    },
    digitizingFaqBlock,
    digitizeCtaBlock,
  ],
};

const coloreelPage: PageContent = {
  meta: {
    title: "Vibrant & Precise Coloreel Embroidery Digitizing Service",
    description:
      "BitsNPixs is an Authorized Digitizing Partner of Coloreel, offering Coloreel embroidery digitizing with every colour on a single thread.",
    path: routes.coloreel,
  },
  hero: {
    variant: "page",
    eyebrow: "One thread, one needle. All the colours!",
    title: "Coloreel Embroidery Digitizing",
    lead: "BitsNPixs is now an Authorized Digitizing Partner of Coloreel.",
    image: image("coloreel-hero"),
    actions: [{ label: "Contact Us", href: routes.contact }],
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "BitsNPixs offers Coloreel embroidery digitizing",
      title: "Every colour in a single thread? Possible!",
      callout: "Midas may turn everything into gold, but the new Coloreel turns white thread into an infinite rainbow.",
      paragraphs: [
        "As a Coloreel embroidery digitizing company, we offer the most sought-after Coloreel embroidery digitizing service, which imposes all the colours you need before the thread enters the embroidery machine.",
        "The play with colours ends right before the sewing action. We specialize in planning and implementing your requirements correctly, considering every colour and its gradients. Attention to detail is what puts us ahead of our competitors.",
        "We digitize your design into a machine-readable embroidery file format. We have a team of skilled digitizers who can digitize your design without reducing the appeal of the art.",
      ],
    },
    {
      type: "story",
      mode: "horizontal",
      thread: "spectrum",
      surface: "dark",
      eyebrow: "The process",
      title: "Eight steps to vibrant Coloreel embroideries.",
      steps: [
        {
          title: "Design",
          body: "We're going to create your required design using digitizing software. All we need is your basic concept.",
        },
        { title: "Export design", body: "The digitized design will then be exported to a DST file." },
        {
          title: "Do colorization",
          body: "We import the DST file into the free Coloreel Studio software from Coloreel, which does the magic you are waiting for.",
        },
        {
          title: "Add effects",
          body: "You can select from your choice of solid colours, smooth colour transitions, or any effect you can imagine.",
        },
        {
          title: "Input DST",
          body: "We input the DST file from our digitizing software into the embroidery machine.",
        },
        { title: "Input CSE", body: "We input the CSE file from the Coloreel Studio to the Coloreel Unit." },
        {
          title: "Start",
          body: "We start production with our fingers crossed to see your design embroidered with the Instant Thread Coloring technology: Coloreel.",
        },
        { title: "Final act", body: "Watch your vibrant Coloreel embroidery being produced." },
      ],
    },
    {
      type: "prose",
      eyebrow: "Who we are",
      title: "Why Coloreel?",
      image: image("coloreel-works"),
      imageSide: "left",
      paragraphs: [
        "Coloreel uses a single thread, so inventories and stock usage are kept to a minimum, leading to a sustainable environment. This also reduces wastage without any reduction in the precision of the colourful art. Coloreel technology is a single instant colouring unit that saves time and effort to maintain.",
        "The stand-alone thread colouring machine can be used with various machines without any constraints. It is flexible enough to create any complex colour combination by just colouring the base thread. The transition from one colour to another is seamless: gradual transition or solid colour change, Coloreel brings it all to the fabric. No needle change or reel change, so moving from one order to another is that quick. This reduces setup time and increases productivity by 300 per cent.",
      ],
    },
    {
      type: "features",
      layout: "grid",
      surface: "tint",
      title: "Coloreel embroidery digitizing service",
      lead: "We offer Coloreel embroidery digitizing services that produce designs with any colour combination from just one base thread. For a multi-colour logo or multi-gradient fabric embroidery, choosing the right Coloreel embroidery digitizer will help you get quality output.",
      items: [
        {
          title: "Speedy Delivery",
          body: "We offer a single day Coloreel embroidery digitizing service, which takes 24 hours to deliver. All your instant embroidery needs are taken care of!",
        },
        {
          title: "Precise & Accurate",
          body: "The Coloreel embroidery digitization we deliver has no reduction in precision or accuracy. Every complexity is handled with care!",
        },
        {
          title: "Exact Colouring",
          body: "Our final DST file will match your colour requirements and produce a gradient as per your need.",
        },
      ],
    },
    {
      type: "prose",
      title: "Coloreel embroidery digitizers",
      image: image("coloreel-multicolor"),
      imageSide: "right",
      paragraphs: [
        "BitsNPixs has expertly trained Coloreel embroidery digitizers who are hardworking, lifelong learners of the latest Coloreel embroidery digitization advancements. Our commitment to quality and delivery time has brought us this many clients since we started.",
        "Every creation means a lot to us, so we ensure you are satisfied. We help you with the design planning and work on iterations till you are satisfied, and we try our best to deliver designs that exactly match your requirements.",
        "Our Coloreel embroidery digitizing service comes at the best possible price in the market, allowing you to live your colourful dream at a reasonable price.",
      ],
    },
    {
      type: "portfolio",
      surface: "light",
      eyebrow: "Why BitsNPixs?",
      title: "We create beautiful design that makes a difference.",
      category: "coloreel",
      action: { label: "View All", href: routes.portfolio },
    },
    {
      type: "prose",
      surface: "tint",
      title: "Coloreel technology",
      image: image("coloreel-working"),
      imageSide: "left",
      paragraphs: [
        "With changing times, our requirements for mass production of designs for tablecloths, dresses, shirts and more are huge. The sewing and embroidery industry has evolved with all sorts of technology additions, and the dyeing industry hopes to evolve into a green enterprise, constantly innovating for a brighter future.",
        "Coloreel is a technology in embroidery that helps to accurately bring life to design with an unlimited array of colours. If you need a large arrangement of rainbow-themed thread on fabric, Coloreel does it all on a single spool of thread by dyeing.",
        "Gradients, combinations, and textures are produced with a dyeing speed of 200mm of embroidery thread per second. This process is just like printing with colours using the CMYK process.",
        "Since only one thread is used, it creates a smoother lining, eliminating bindings and embellishments. In terms of sustainability, inventories are kept to a minimum.",
      ],
    },
    coloreelFaqBlock,
    digitizeCtaBlock,
  ],
};

const vectorPage: PageContent = {
  meta: {
    title: "Reliable Raster to Vector Artwork Conversion Service at BitsNPixs",
    description:
      "Quality raster to vector art conversion with a standard 24 hours turnaround, for promotional product firms, sign-makers and label makers worldwide.",
    path: routes.vector,
  },
  hero: {
    variant: "page",
    eyebrow: "Services",
    title: "Vector Artwork Conversion",
    lead: "We provide quality raster to vector art conversion and produce the product quickly, with our standard 24 hours turnaround process.",
    image: image("vector-hero"),
    actions: [{ label: "Contact Us", href: routes.contact }],
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "Vector artwork conversion service",
      title: "Even the best product cannot be sold if the artwork does not look right.",
      paragraphs: [
        "Vector artwork creation is one of the key tasks involved in selling promotional products. Generally, distributors help the customer get the current artwork or, at times, create the artwork for the customer. Distributors then interface with the manufacturers or suppliers and send them the correct artwork in the valid format and size, which can be printed on the products.",
        "Artwork designers convert the images (mostly raster) received from customers to vector format so they can be printed on any product without losing quality.",
        "Our highly talented team consists of experienced and competent designers, with the latest technology in both hardware and software. We work with promotional product firms, renowned sign-makers, label makers and more, worldwide.",
      ],
    },
    {
      type: "prose",
      surface: "tint",
      title: "The best vector artwork conversion service",
      paragraphs: [
        "Our group of qualified designers can assist you with forming a vector record, vector design or vector drawing, and can vectorize any image. Our group has numerous experts, so orders are processed rapidly.",
        "We have the best services at the most economical rates in the whole market: for instance, just $10 for a simple logo, although the rate may vary depending on the intricacies of the design. You can ask for a quotation before placing an order.",
      ],
    },
    {
      type: "features",
      layout: "rows",
      title: "Our vector conversion services range",
      items: [
        {
          title: "Quotes are always free of cost",
          body: "You will receive your quotation within the first 12 to 24 hours of the request.",
        },
        {
          title: "Additional benefits",
          body: "We provide free edits (only if not different from the original order).",
        },
        {
          title: "Hassle-free payment",
          body: "Most e-wallets are accepted, like PayPal, as well as Credit Card payments.",
        },
      ],
    },
    turnaroundBlock,
    {
      type: "formats",
      surface: "dark",
      title: "Available formats",
      lead: "All the files can be provided in the given formats.",
      formats: vectorFormats,
    },
    {
      type: "portfolio",
      surface: "light",
      eyebrow: "Portfolio",
      title: "We create beautiful design that makes a difference.",
      category: "vector",
      action: { label: "View All", href: routes.portfolio },
    },
    {
      type: "prose",
      surface: "tint",
      title: "Editing",
      paragraphs: [
        "BitsNPixs strives to provide the best quality through strict quality control measures. Even if you are not satisfied with the design, we will edit it without a charge. The only things you must pay for are changes from the original design, or belated edit requests that come more than 30 days after the delivery of the original project.",
      ],
    },
    whyVectorBlock,
    digitizingFaqBlock,
    digitizeCtaBlock,
  ],
};

const softwarePage: PageContent = {
  meta: {
    title: "Best Software Development Company",
    description:
      "BitsNPixs offers robust, reliable, and scalable software development solutions: desktop, e-commerce, web, mobile and CRM applications.",
    path: routes.software,
  },
  hero: {
    variant: "page",
    eyebrow: "Services",
    title: "Software Development",
    lead: "We build enterprise-scale custom software applications. From back office transaction processing to front-end eCommerce and everything in between, we help you get exactly the system you want.",
    image: image("software-hero"),
    actions: [{ label: "Contact Us", href: routes.contact }],
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "Software development",
      title: "Built to support your business processes, precisely the way you work.",
      paragraphs: [
        "Which is how we believe IT should work! BitsNPixs offers robust, reliable, and scalable software development solutions to fulfil your enterprise needs. We are experts in rightly identifying the customer's business needs, choosing the right technology, and developing a solution for the identified business need.",
        "Our technically proficient designers are well equipped with the skills required to design high-quality websites, strictly abiding by web standards and guiding principles to deliver world-class websites.",
        "Our teams of architects, technical consultants, project managers, and developers have the finest knowledge of current technologies. Our team has delivered many custom solutions to global clients and has always stood up to their intensifying expectations.",
        "We are equipped to develop applications using Microsoft technologies and Apple iOS, targeting iPad, iPhone, and iPod Touch.",
      ],
    },
    {
      type: "features",
      layout: "chips",
      surface: "tint",
      title: "Reliable, high-performing, scalable software",
      lead: "We specialize in developing reliable and high-performing, scalable software. Our services also include the development of custom applications and products, and SEO optimization for websites.",
      items: [
        { title: "Desktop applications" },
        { title: "Ecommerce applications" },
        { title: "Web applications" },
        { title: "Web sites" },
        { title: "Mobile websites" },
        { title: "Mobile applications" },
        { title: "iOS development" },
        { title: "CRM applications" },
        { title: "Custom applications & products" },
        { title: "SEO optimization" },
      ],
    },
    {
      type: "story",
      mode: "stack",
      thread: "brand",
      surface: "dark",
      eyebrow: "Method",
      title: "How do we work?",
      steps: [
        { body: "Extensive use of function prototypes, which helps clients with easy evaluation." },
        { body: "We adopt the best design patterns and proven methodologies that fit the application." },
        {
          body: "We adopt a generic coding standard in every project, which facilitates the ability to scale resources quickly.",
        },
        {
          body: "We deliver small units of functionality to the client, so that feedback can shape the rest of the development.",
        },
        {
          body: "Manual testing commences once the coding concludes. The test cases are devised from the client's requirements to deliver a bug-free application on the pre-decided milestone.",
        },
        {
          body: "We extend extensive training to the end-user, so that they can work at ease with the software.",
        },
        {
          body: "We extend our continued support to all the developed and delivered software applications throughout their life, and advise our customers on technological transformations.",
        },
      ],
    },
    {
      type: "features",
      layout: "chips",
      title: "Why choose us?",
      items: [
        { title: "Experienced developers" },
        { title: "Better project management" },
        { title: "Internal quality check" },
        { title: "High-speed connectivity" },
        { title: "Affordable rates" },
        { title: "Ability to handle large projects" },
      ],
    },
    {
      type: "cta",
      title: "Get exactly the system you want.",
      lead: "Reach out through our contact form and we will get back to you.",
      actions: [{ label: "Contact Us", href: routes.contact }],
    },
  ],
};

/** Pages served by app/services/[slug]. Keys are the URL slugs. */
export const servicePagesBySlug = {
  "embroidery-digitizing": embroideryPage,
  "coloreel-embroidery-digitizing": coloreelPage,
  "vector-artwork-conversion": vectorPage,
} satisfies Record<string, PageContent>;

export type ServiceSlug = keyof typeof servicePagesBySlug;

export { softwarePage };
