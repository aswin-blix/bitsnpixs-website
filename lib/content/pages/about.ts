import { image } from "../images";
import { digitizeCtaBlock, whyBitsNPixsBlock } from "../shared";
import { routes } from "../site";
import type { PageContent } from "../types";

export const aboutPage: PageContent = {
  meta: {
    title: "About Us | Top Rated Embroidery Digitizing & Vector Art Services",
    description:
      "Leading embroidery digitizing and vector art conversion service in the US, UK, Australia, and India, serving since 2011.",
    path: routes.about,
  },
  hero: {
    variant: "page",
    eyebrow: "Who we are",
    title: "Expert digitizers that you can trust.",
    lead: "BitsNPixs has been providing embroidery digitizing, vector conversion and software development services since 2011.",
    image: image("about-team"),
  },
  blocks: [
    {
      type: "prose",
      eyebrow: "About Us",
      title: "A 24 hours turnaround is not just a promise but a commitment.",
      paragraphs: [
        "We are highly skilled in providing our clients with the best digitized embroidered patterns in a variety of machine-readable formats. We have a team of creative professionals in embroidery digitizing as part of our embroidery digitizing platform.",
        "Our success in digitizing and vector services results from our dedication to providing the best quality results, with enhanced details, a lower rate of thread breakages, crisper designs, less wastage and an increased production rate. Our robust, reliable, and scalable solutions make us successful in software development. We work hard to meet the deadlines of our clients.",
        "We are proud of our team of highly capable experts who make all this possible. They are trained to handle large orders and meet deadlines so that we don't keep our clients waiting. We have the latest technology in both hardware and software, and all these forces enable us to provide the 24 hours turnaround time.",
      ],
    },
    {
      type: "features",
      layout: "grid",
      eyebrow: "Precision",
      title: "Where your design meets precision stitching.",
      items: [
        {
          title: "Flawless Detailing",
          body: "Every stitch is carefully planned to reflect your original artwork with unmatched accuracy. Our expert digitizing ensures clean lines, smooth curves, and flawless detailing on any fabric.",
        },
        {
          title: "Premium Finish",
          body: "Standard embroidery delivers a timeless, elegant look that enhances the value of your product. Our digitized files ensure consistent, professional stitching for a truly polished finish.",
        },
        {
          title: "Versatile & Reliable",
          body: "Ideal for logos, text, and intricate designs, our standard embroidery digitizing suits any garment or product, maintaining clarity, durability, and quality stitch after stitch.",
        },
        {
          title: "Optimized for Production",
          body: "Our digitized files are engineered to run seamlessly on all major embroidery machines. This minimizes thread breaks and reduces machine downtime, ensuring faster and more efficient production.",
        },
        {
          title: "Cost-Effective Precision",
          body: "We carefully optimize stitch counts without compromising design quality. This helps you lower production costs while still achieving clean, professional embroidery every time.",
        },
        {
          title: "Consistent Results Every Time",
          body: "Whether it's a single piece or a bulk order, our digitizing ensures uniform stitching, maintaining the same high-quality finish across all your garments and products.",
        },
      ],
    },
    whyBitsNPixsBlock,
    {
      type: "testimonials",
      eyebrow: "Clients",
      title: "Listen to real reviews about our service.",
      items: [
        {
          quote:
            "We sent BitsNPixs a logo for a small run of polo shirts. The lettering was fairly small, so I was concerned about how it would stitch. The file came back within the agreed time, and our sample looked clean on the garment. I also appreciated being asked about the fabric and finished size before they started. We have kept the file for future orders.",
          name: "Michael Turner",
        },
        {
          quote:
            "I ordered a cap logo for our embroidery shop and needed a minor adjustment after running a sample. BitsNPixs listened to what was happening on the machine and sent a revised file that worked better for our setup. The communication was straightforward, and I never had to explain the same issue twice. That support mattered more to me than simply receiving a file quickly.",
          name: "Sarah Mitchell",
        },
        {
          quote:
            "We manage artwork for several promotional apparel customers, and keeping customer files organized can get messy. BitsNPixs delivered DST and PES files with clear design references, which made handing them to our embroidery operator easier. The quote was confirmed before any work began, so there were no surprises. For the next batch, I would use them again and provide the same order details upfront.",
          name: "James Walker",
        },
      ],
    },
    digitizeCtaBlock,
  ],
};
