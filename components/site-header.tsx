import { navigationLinks } from "../data/navigation";

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label="Garber Lab home">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-skin" />
          <span className="brand-cell" />
          <span className="brand-label">CD14</span>
        </span>
        <span>
          <strong>Garber Lab</strong>
          <small>UMass Chan Medical School</small>
        </span>
      </a>
      <nav aria-label="Main navigation">
        {navigationLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
