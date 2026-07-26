import Link from "next/link";
import { navigationLinks } from "../data/navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Garber Lab home">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-skin" />
          <span className="brand-cell" />
          <span className="brand-label">CD14</span>
        </span>
        <span>
          <strong>Garber Lab</strong>
          <small>UMass Chan Medical School</small>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        {navigationLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
