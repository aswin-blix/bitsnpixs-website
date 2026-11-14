import { image } from "../images";
import { digitizeCtaBlock, embroideryFormats, whyBitsNPixsBlock } from "../shared";
import { routes } from "../site";
import type { PageContent } from "../types";

export const homePage: PageContent = {
  meta: {
    title: "Reliable and Expert Embroidery Digitizing Service Online",
    description:
      "BitsNPixs digitizes your artwork into stitch-ready embroidery files, converts raster art to vector and delivers Coloreel embroidery digitizing. Serving clients since 2011.",
    path: routes.home,
  },
  hero: {
    variant: "immersive",
    eyebrow: "Embroidery Digitizing · Vector Art Conversion · Coloreel",
    title: "The modern way of using threads & needle.",
    lead: "BitsNPixs ensures your artwork is professionally digitized so that it looks sharp and professional on any material.",
    actions: [
      { label: "Digitize Your Design", href: routes.shop },
      { label: "Portfolio", href: routes.portfolio },
    ],
  },
  blocks: [
    {
      type: "statement",
      eyebrow: "BitsNPixs",
      title: "Embroidery digitizing service online",
      statement: "Do you get frustrated with embroidery designs that don't stitch out as you dreamed?",
      paragraphs: [
        "Our team has more than 10 years of experience creating stitchable designs that are easy to stitch and always exceed your expectations.",
        "If you want an embroidery digitizing service in the USA with fast turnaround, competitive pricing, and unlimited revisions until you are completely satisfied, we have you covered. No more stressing about sloppy stitches, omitted details, or poor quality files.",
        "Whether it is a design, text, or logo, we send your designs in the correct format for your machine. With BitsNPixs, you receive fast turnaround, consistent quality, and embroidery-ready designs that stitch perfectly every time.",
      ],
      image: image("home-intro"),
    },
    {
      type: "marquee",
      items: embroideryFormats,
    },
    {
      type: "services",
      eyebrow: "Services",
      title: "What we do",
      lead: "BitsNPixs is the reliable and professional embroidery digitizing service provider since 2011. When it comes to embroidery digitizing, we stand on top using the most advanced techniques.",
      serviceIds: ["embroidery", "vector", "coloreel", "software"],
    },
    {
      type: "story",
      mode: "stack",
      thread: "brand",
      surface: "dark",
      eyebrow: "How we do it",
      title: "Steps to follow for placing the order.",
      action: { label: "Shop Now", href: routes.shop },
      steps: [
        {
          title: "Sign up & share your design",
          body: "Sign up, fill in your embroidery requirements, upload your design at checkout, and make a quick, secure payment to get your digitizing journey started seamlessly.",
        },
        {
          title: "We digitize your artwork",
          body: "Once we receive your request, our expert team carefully analyzes your artwork and digitizes it according to your embroidery specifications. We ensure precision at every stage to eliminate thread breakage during production.",
        },
        {
          title: "Tested for perfection",
          body: "After digitizing, we run your design on our machines to ensure smooth stitching with zero thread breakage. This extra step saves you time and guarantees flawless results before delivery.",
        },
        {
          title: "Quality check",
          body: "Our quality assurance team thoroughly reviews the digitized file to ensure it meets your exact requirements. Only after it passes our strict quality standards is it approved for delivery.",
        },
        {
          title: "Order delivery",
          body: "Once the quality check is complete, we'll deliver the final digitized files straight to your inbox in your preferred format. Plus, we offer 100% free revisions to make any adjustments you need.",
        },
      ],
    },
    {
      type: "portfolio",
      surface: "light",
      eyebrow: "Portfolio",
      title: "We create beautiful design that makes a difference.",
      limit: 3,
      action: { label: "View All", href: routes.portfolio },
    },
    whyBitsNPixsBlock,
    {
      type: "stats",
      surface: "dark",
      eyebrow: "Company facts",
      title: "We are proud of our works",
      items: [
        { value: 1000, suffix: "K+", label: "Digitizing" },
        { value: 130, suffix: "+", label: "Digitizers & Designers" },
        { value: 13, suffix: "+", label: "Years in Business" },
        { value: 400, suffix: "+", label: "Coloreel Digitizing" },
      ],
    },
    {
      type: "testimonials",
      surface: "light",
      eyebrow: "Clients",
      title: "Listen to real reviews about our service.",
      items: [
        {
          quote:
            "I wanted to embroider our company logo onto polo shirts for a last-minute business trip. All the embroidery stores I called could do the work today but needed at least 3 days to create a DST file! Seby was able to create the embroidery file (without any need for correction) from my company logo files in less than 1 hour and 15 minutes.",
          name: "David Gitman",
          company: "Car Part Kings",
          location: "US",
        },
        {
          quote:
            "Bitsnpixs created a dynamic website perfectly tailored to suit our needs. We are a high level event management company and we need to run a number of events from Social Media summit to the World Aviation Safety summit. The custom CMS allows us to change the style to suit our needs and they have always provided us with high level of support.",
          name: "Emil Del Rosario III",
          company: "Streamline Marketing Group",
          location: "UAE",
        },
        {
          quote: "Nice Team, Communication was good, Did exactly the one I wanted. Thumbs up.",
          name: "Shawn Hopwood",
          company: "Vincita Networks Inc.",
          location: "USA",
        },
        {
          quote:
            "Provided amazing work that was beyond my expectations. Will definitely use again should we need additional graphic/vector work.",
          name: "Kathleen",
          company: "Kathleen DiPaolo Designs",
          location: "USA",
        },
        {
          quote:
            "Pleasure to work with! Follows all instructions, excellent quality. Looking forward to working with again!",
          name: "Julie",
          company: "Designs by JuJu",
          location: "USA",
        },
      ],
    },
    digitizeCtaBlock,
  ],
};
