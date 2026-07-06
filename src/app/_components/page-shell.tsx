import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type PageShellProps = {
  children: React.ReactNode;
  eyebrow: string;
  heroVariant?: "default" | "services" | "contact";
  title: string;
  text: string;
};

export function PageShell({
  children,
  eyebrow,
  heroVariant = "default",
  title,
  text,
}: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className={`subpage-hero subpage-hero-${heroVariant}`}>
          <div className="container subpage-hero-inner">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{text}</p>
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
