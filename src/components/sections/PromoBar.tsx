import Container from "@/components/ui/Container";
import { siteContent } from "@/data/site-content";

export default function PromoBar() {
  return (
    <div className="bg-primary text-white text-xs sm:text-sm">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-primary-dark/30">
          {siteContent.promo.map((item) => (
            <div key={item.label} className="py-3 sm:py-3.5 px-3 sm:px-4 text-center">
              <p className="font-bold uppercase tracking-wide text-[11px] sm:text-xs">{item.label}</p>
              <p className="text-white/80 text-[10px] sm:text-xs mt-0.5 leading-snug">{item.sub}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
