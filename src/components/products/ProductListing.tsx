"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products, Product, getProductDisplayName } from "@/data/products";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getCategoryImage } from "@/data/images";
import Container from "@/components/ui/Container";
import { MotionStagger, MotionStaggerItem } from "@/components/animations/MotionInView";

type SortOption = "default" | "name-az" | "name-za";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  groupName: string;
}

function CategoryFilter({ selectedCategory, onCategoryChange, groupName }: CategoryFilterProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 text-foreground">Category</h3>
      <div className="space-y-1 max-h-52 overflow-y-auto text-sm">
        <label className="flex items-center gap-3 cursor-pointer min-h-10 px-2 rounded-lg hover:bg-background">
          <input
            type="radio"
            name={groupName}
            checked={selectedCategory === ""}
            onChange={() => onCategoryChange("")}
            className="accent-primary w-4 h-4"
          />
          All Categories
        </label>
        {categories.map((cat) => (
          <label
            key={cat.slug}
            className="flex items-center gap-3 cursor-pointer min-h-10 px-2 rounded-lg hover:bg-background"
          >
            <input
              type="radio"
              name={groupName}
              checked={selectedCategory === cat.slug}
              onChange={() => onCategoryChange(cat.slug)}
              className="accent-primary w-4 h-4"
            />
            {cat.name}
          </label>
        ))}
      </div>
    </div>
  );
}

interface ProductListingProps {
  initialCategory?: string;
  title?: string;
  description?: string;
}

export default function ProductListing({
  initialCategory,
  title = "All Products",
  description = "Find the right mobility solution for your everyday journey.",
}: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categoryData = initialCategory ? getCategoryBySlug(initialCategory) : null;
  const bannerImage = categoryData ? categoryData.image : getCategoryImage("mobility-scooters");

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const defaultCategory = initialCategory || "";

  const hasActiveFilters =
    selectedCategory !== defaultCategory ||
    search.trim() !== "" ||
    sort !== "default";

  const clearFilters = () => {
    setSelectedCategory(defaultCategory);
    setSearch("");
    setSort("default");
  };

  const filtered = useMemo(() => {
    let result: Product[] = [...products];
    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((p) => {
        const categoryName = getCategoryBySlug(p.category)?.name.toLowerCase() || "";
        const displayName = getProductDisplayName(p).toLowerCase();
        return (
          displayName.includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          categoryName.includes(query) ||
          p.sku.toLowerCase().includes(query)
        );
      });
    } else if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sort === "name-az") {
      result.sort((a, b) => getProductDisplayName(a).localeCompare(getProductDisplayName(b)));
    }
    if (sort === "name-za") {
      result.sort((a, b) => getProductDisplayName(b).localeCompare(getProductDisplayName(a)));
    }
    return result;
  }, [selectedCategory, search, sort]);

  return (
    <div className="pt-14 lg:pt-[5.5rem] bg-background bg-pattern">
      <div className="relative h-44 sm:h-52 md:h-60 lg:h-72 overflow-hidden">
        <Image src={bannerImage} alt={title} fill className="object-cover scale-105" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        <Container className="relative z-10 h-full flex items-end">
          <div className="pb-6 sm:pb-8 lg:pb-10 w-full">
            <p className="section-accent text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary-light mb-2">
              Catalogue
            </p>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">{title}</h1>
            <p className="text-white/75 mt-2 max-w-2xl text-xs sm:text-sm md:text-base">{description}</p>
          </div>
        </Container>
      </div>

      <Container className="py-6 sm:py-8 lg:py-10">
        <div className="surface-elevated p-3 sm:p-4 mb-5 sm:mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="text"
              role="searchbox"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onInput={(e) => setSearch(e.currentTarget.value)}
              placeholder="Search products..."
              autoComplete="off"
              className="w-full pl-11 pr-10 py-3 min-h-11 border border-border bg-background text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 touch-target inline-flex items-center justify-center rounded-md text-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm border border-border px-4 py-3 min-h-11 bg-background rounded-lg font-medium sm:min-w-[160px]"
          >
            <option value="default">Featured</option>
            <option value="name-az">Name A–Z</option>
            <option value="name-za">Name Z–A</option>
          </select>
        </div>

        {/* Mobile category pills */}
        <div className="lg:hidden mb-5">
          <div className="filter-scroll flex gap-2 overflow-x-auto px-1 pb-1">
            <button
              onClick={() => setSelectedCategory("")}
              className={`filter-pill ${!selectedCategory ? "filter-pill-active" : ""}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`filter-pill ${selectedCategory === cat.slug ? "filter-pill-active" : ""}`}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => setSidebarOpen(true)}
              className="filter-pill border-dashed"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 inline" />
              More
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <aside className="hidden lg:block w-60 xl:w-64 shrink-0">
            <div className="surface-card p-5 sticky top-24">
              <h2 className="font-display font-bold text-base mb-5 pb-3 border-b border-border">Refine Results</h2>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                groupName="product-category-desktop"
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <p className="text-sm text-muted">
                <span className="font-semibold text-foreground">{filtered.length}</span> products
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-primary hover:text-primary-dark"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="surface-card py-16 text-center">
                <p className="text-muted mb-4">No products match your filters.</p>
                <button
                  type="button"
                  onClick={() => { clearFilters(); setSidebarOpen(false); }}
                  className="text-sm font-semibold text-primary mb-3"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <MotionStagger
                key={`${selectedCategory}-${search.trim()}-${sort}`}
                className="product-grid"
              >
                {filtered.map((p) => (
                  <MotionStaggerItem key={p.slug}>
                    <ProductCard product={p} compact />
                  </MotionStaggerItem>
                ))}
              </MotionStagger>
            )}
          </div>
        </div>
      </Container>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col rounded-l-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background">
              <h2 className="font-display font-bold text-lg">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="touch-target rounded-lg hover:bg-white" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                groupName="product-category-mobile"
              />
            </div>
            <div className="p-4 border-t border-border bg-background pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full min-h-11 border border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors"
                >
                  Clear filters
                </button>
              )}
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="w-full min-h-12 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Show {filtered.length} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
