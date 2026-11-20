import Link from "next/link";
import type { ReactNode } from "react";
import type { RentalSeoPage, RentalSeoSection } from "@/data/rental-seo-content";

function linkifyRelated(text: string, links: { label: string; href: string }[]) {
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest = -1;
    let match: { label: string; href: string } | null = null;
    for (const link of links) {
      const idx = remaining.toLowerCase().indexOf(link.label.toLowerCase());
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        match = link;
      }
    }
    if (earliest === -1 || !match) {
      parts.push(remaining);
      break;
    }
    if (earliest > 0) parts.push(remaining.slice(0, earliest));
    const end = earliest + match.label.length;
    parts.push(
      <Link key={key++} href={match.href} className="font-semibold text-primary hover:underline">
        {remaining.slice(earliest, end)}
      </Link>
    );
    remaining = remaining.slice(end);
  }

  return parts;
}

function SectionBlock({ section }: { section: RentalSeoSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mt-12 sm:mt-14 mb-4">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight mt-8 mb-3">
          {section.text}
        </h3>
      );
    case "paragraph":
      return <p className="text-muted leading-relaxed text-sm sm:text-base mb-4">{section.text}</p>;
    case "list":
      return (
        <ul className="space-y-2.5 mb-6">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "priceTable":
    case "specTable": {
      const table = section.type === "priceTable" ? section.table : section.table;
      const notes = section.type === "priceTable" ? section.table.notes : undefined;
      const footnote = section.type === "specTable" ? section.table.footnote : undefined;
      return (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-sm">
            <thead>
              <tr className="bg-navy text-white">
                {table.headers.map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-semibold first:rounded-tl-lg last:rounded-tr-lg">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-background"}>
                  {row.map((cell, j) => (
                    <td key={`${i}-${j}`} className="border border-border px-3 py-2.5 text-muted align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {notes && notes.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {notes.map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {note}
                </li>
              ))}
            </ul>
          )}
          {footnote && <p className="mt-3 text-sm text-muted leading-relaxed">{footnote}</p>}
        </div>
      );
    }
    case "related":
      return (
        <div className="mt-12 sm:mt-14 surface-card p-5 sm:p-6">
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-3">You may also need</h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            {linkifyRelated(section.text, section.links)}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function RentalSeoContent({ page }: { page: RentalSeoPage }) {
  return (
    <div className="max-w-3xl">
      <p className="text-muted leading-relaxed text-sm sm:text-base mb-8 sm:mb-10">{page.intro}</p>
      {page.sections.map((section, i) => (
        <SectionBlock key={`${section.type}-${i}`} section={section} />
      ))}

      {page.faqs.length > 0 && (
        <section className="mt-12 sm:mt-14">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-6">
            {page.pageName.toLowerCase()} FAQs
          </h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="surface-card group open:shadow-sm">
                <summary className="cursor-pointer list-none px-4 py-3.5 sm:px-5 sm:py-4 font-semibold text-sm sm:text-base flex items-start justify-between gap-3">
                  <span>{faq.question}</span>
                  <span className="text-primary shrink-0 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm sm:text-base text-muted leading-relaxed border-t border-border/70 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
