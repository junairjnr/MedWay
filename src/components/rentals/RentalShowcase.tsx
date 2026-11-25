import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { rentalItems, type RentalItem } from "@/data/rentals";
import { getPhotoCoverClassName } from "@/data/images";

type HeadingLevel = "h2" | "h3";

export function splitFeaturedRentals(items: RentalItem[] = rentalItems) {
  const featured = items.find((item) => item.slug === "hospital-bed-rental") ?? items[0];
  const rest = featured ? items.filter((item) => item.slug !== featured.slug) : [];
  return { featured, rest };
}

export function FeaturedRental({
  item,
  heading = "h2",
  priority = false,
}: {
  item: RentalItem;
  heading?: HeadingLevel;
  priority?: boolean;
}) {
  const Title = heading;

  return (
    <Link
      href={`/rentals/${item.slug}`}
      className="group grid overflow-hidden rounded-3xl bg-navy shadow-[0_18px_50px_rgba(26,35,50,0.16)] outline-none ring-1 ring-black/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:grid-cols-12"
    >
      <div className="relative min-h-[16rem] sm:min-h-[20rem] lg:col-span-7 lg:min-h-[28rem]">
        <Image
          src={item.image}
          alt=""
          fill
          priority={priority}
          className={`${getPhotoCoverClassName(item.image)} transition-transform duration-700 group-hover:scale-[1.04]`}
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-navy/30" />
      </div>
      <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:col-span-5 lg:p-10">
        <div>
          <Title className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {item.title}
          </Title>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-white/80 sm:text-base">{item.detail}</p>
          {item.highlights.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-light">
          View Details
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function RentalTile({ item, heading = "h2" }: { item: RentalItem; heading?: HeadingLevel }) {
  const Title = heading;

  return (
    <Link
      href={`/rentals/${item.slug}`}
      className="group relative flex min-h-[18rem] overflow-hidden rounded-3xl outline-none ring-1 ring-black/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-h-[22rem]"
    >
      <Image
        src={item.image}
        alt=""
        fill
        className={`${getPhotoCoverClassName(item.image)} transition-transform duration-700 group-hover:scale-105`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
      <div className="relative z-10 mt-auto flex w-full flex-col p-5 sm:p-6">
        {item.highlights[0] ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-light">{item.highlights[0]}</p>
        ) : null}
        <Title className="mt-2 font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl">{item.title}</Title>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">{item.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          View Details
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
