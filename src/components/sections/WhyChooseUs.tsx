"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { whyChooseUs } from "@/data/solutions";
import { getWhyChooseUsPhotoClassName, whyChooseUsImages } from "@/data/images";
import Container from "@/components/ui/Container";

export default function WhyChooseUs() {
  return (
    <section className="section-py relative overflow-hidden bg-background bg-pattern">
      <Container>
        <div className="mb-10 text-center sm:mb-12">
          <p className="section-accent mx-auto justify-center text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
            Why Med Way
          </p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Built on Trust, Not Hype
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex gap-4 overflow-hidden rounded-2xl border border-border/80 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:gap-5 sm:p-5"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:h-28 sm:w-28">
                <Image
                  src={whyChooseUsImages[i] ?? whyChooseUsImages[0]}
                  alt=""
                  fill
                  className={`${getWhyChooseUsPhotoClassName()} transition-transform duration-500 group-hover:scale-[1.03]`}
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-display text-3xl font-extrabold text-primary/20 sm:text-4xl">{item.num}</span>
                <h3 className="-mt-1 font-display text-sm font-extrabold tracking-wide text-foreground sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
