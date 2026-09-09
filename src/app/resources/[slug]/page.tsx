import Link from "next/link";
import Image from "next/image";
import { resources, getResourceBySlug } from "@/data/resources";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const r = getResourceBySlug(slug);
  if (!r) return { title: "Not Found | Med Way" };
  return { title: `${r.title} | Med Way`, description: r.description };
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const r = getResourceBySlug(slug);
  if (!r) notFound();

  return (
    <article className="pt-24 pb-16">
      <Container className="max-w-3xl">
        <Link href="/resources" className="text-sm text-muted hover:text-primary mb-8 inline-block">← Back to Resources</Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">{r.category}</p>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-8">{r.title}</h1>
        <div className="relative aspect-[16/9] overflow-hidden mb-12">
          <Image src={r.image} alt={r.title} fill className="object-cover" sizes="800px" />
        </div>
        <div className="space-y-6">
          {r.content.map((p, i) => (
            <p key={i} className="text-muted text-body leading-relaxed">{p}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
