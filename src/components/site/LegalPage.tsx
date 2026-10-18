import { Breadcrumbs } from "./primitives";

export function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <Breadcrumbs items={[{ label: title }]} />
      <article className="container-site max-w-3xl py-16">
        <h1 className="display-lg">{title}</h1>
        <p className="mt-6 border-l-2 border-foreground pl-4 text-sm text-muted-foreground">
          This is informational draft content for review. It has not been reviewed or approved by a legal professional.
        </p>
        {sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-xl font-bold">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
      </article>
    </>
  );
}
