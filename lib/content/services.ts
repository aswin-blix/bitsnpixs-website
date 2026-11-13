import { image } from "./images";
import { routes } from "./site";
import type { ServiceId, ServiceSummary } from "./types";

/** Short service cards, used on the home page and anywhere services are listed. */
export const services: Record<ServiceId, ServiceSummary> = {
  embroidery: {
    id: "embroidery",
    name: "Embroidery Digitizing",
    path: routes.embroidery,
    summary:
      "BitsNPixs is the professional embroidery digitizing service provider who can perfectly digitize your artwork into a stitch-ready file format without any thread breakage.",
    image: image("service-embroidery-card"),
  },
  vector: {
    id: "vector",
    name: "Vector Artwork Conversion",
    path: routes.vector,
    summary:
      "Vector art conversion is vital for promotional products, helping distributors provide customers with clean, scalable designs by converting existing artwork or creating new files.",
    image: image("service-vector-card"),
  },
  coloreel: {
    id: "coloreel",
    name: "Coloreel Embroidery Digitizing",
    path: routes.coloreel,
    summary:
      "Instantaneously dyeing the thread on demand allows for more unique and creative designs while also substantially improving overall economic competitiveness.",
    image: image("service-coloreel-card"),
  },
  software: {
    id: "software",
    name: "Software Development",
    path: routes.software,
    summary:
      "BitsNPixs offers robust, reliable, and scalable software development solutions to fulfil your enterprise needs.",
    image: image("software-hero"),
  },
};

export const getServices = (ids: ServiceId[]): ServiceSummary[] => ids.map((id) => services[id]);
