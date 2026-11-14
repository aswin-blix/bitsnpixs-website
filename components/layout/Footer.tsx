import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { navigation, routes, site, studios } from "@/lib/content";

const headingClass = "mb-5 font-mono text-xs tracking-[0.18em] text-accent-text uppercase";
const linkClass = "link-stitch text-ink hover:text-strong";

export function Footer() {
  const office = studios[0];

  return (
    <footer data-surface="dark" className="relative overflow-hidden border-t border-line">
      <div className="container-page grid gap-14 pt-20 pb-14 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <div className="flex flex-col items-start gap-6">
          <SmartLink href={routes.home} className="rounded-control">
            <Logo />
          </SmartLink>
          <p className="max-w-sm text-muted">{site.footerBlurb}</p>
          <div>
            <h2 className={headingClass}>Social Media</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {site.social.map((entry) => (
                <li key={entry.platform}>
                  <SmartLink href={entry.href} className={linkClass}>
                    {entry.platform}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {navigation.footer.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className={headingClass}>{column.title}</h2>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <SmartLink href={link.href} className={linkClass}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className={headingClass}>Get in touch</h2>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3">
              <Icon name="mail" className="mt-1 shrink-0 text-accent" />
              <SmartLink href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </SmartLink>
            </li>
            {site.phones.map((phone) => (
              <li key={phone.href} className="flex gap-3">
                <Icon name="phone" className="mt-1 shrink-0 text-accent" />
                <SmartLink href={phone.href} className={linkClass}>
                  {phone.display} <span className="text-muted">({phone.region})</span>
                </SmartLink>
              </li>
            ))}
            <li className="flex gap-3">
              <Icon name="pin" className="mt-1 shrink-0 text-accent" />
              <address className="text-muted not-italic">{office.address}</address>
            </li>
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="stitch-x w-full text-accent opacity-50" />
      <div className="container-page flex flex-col justify-between gap-3 py-6 text-sm text-muted sm:flex-row">
        <p>{site.copyright}</p>
        <SmartLink href={site.signIn.href} className={linkClass}>
          {site.signIn.label}
        </SmartLink>
      </div>

      {/* Decorative wordmark, drawn as generated content so it is not exposed as text. */}
      <div
        aria-hidden="true"
        data-text="bitsnpixs"
        className="pointer-events-none -mb-[5vw] text-center font-display text-[19vw] leading-none font-bold tracking-tighter text-raised select-none before:content-[attr(data-text)]"
      />
    </footer>
  );
}
