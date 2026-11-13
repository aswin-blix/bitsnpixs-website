import { PageHero } from "@/components/sections/PageHero";
import { routes } from "@/lib/content";

export default function NotFound() {
  return (
    <PageHero
      hero={{
        variant: "page",
        eyebrow: "404",
        title: "This thread ends here.",
        breadcrumb: "Page not found",
        lead: "The page you are looking for does not exist or has moved.",
        actions: [
          { label: "Home", href: routes.home },
          { label: "Contact Us", href: routes.contact },
        ],
      }}
    />
  );
}
