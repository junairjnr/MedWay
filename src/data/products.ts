import { getProductImage, getProductImages } from "./images";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  sku: string;
  price?: number;
  originalPrice?: number;
  category: string;
  inStock: boolean;
  image: string;
  images: string[];
  shortDescription: string;
  description: string;
  whoItsFor: string;
  benefits: string[];
  features: string[];
  specs: ProductSpec[];
  dimensions?: string;
  weight?: string;
  weightCapacity?: string;
  battery?: string;
  range?: string;
  maxSpeed?: string;
  warranty: string;
  accessories: string[];
  usageInfo: string;
  careInfo: string;
  badges: string[];
}

export const products: Product[] = [
  {
    slug: "vitalflex-elite-hospital-bed",
    name: "Elite Electric Hospital Bed",
    brand: "VitalFlex",
    sku: "MED-BED-001",
    price: 2499,
    originalPrice: 2999,
    category: "hospital-beds",
    inStock: true,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=900&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=900&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=900&fit=crop",
    ],
    shortDescription: "Premium electric hospital bed with full positioning control and advanced features for long-term home care.",
    description: "This elite electric hospital bed delivers a smooth ordering experience and outstanding everyday performance. With extensive positioning features and reliable build quality, it is well suited as a premium hospital bed for long-term home care and recovery.",
    whoItsFor: "Designed for patients requiring long-term home care, post-surgical recovery, and those who need Trendelenburg positioning with electric head and foot elevation.",
    benefits: [
      "Electric head and foot elevation with ultra-quiet motor system",
      "Trendelenburg and reverse Trendelenburg positioning",
      "Advanced positioning features for home care comfort",
      "Remote control with backlight display",
      "Integrated side rails with easy-release mechanism",
      "White Glove delivery and setup available in Toronto & GTA",
    ],
    features: [
      "Electric head and foot elevation",
      "Trendelenburg positioning",
      "Locking casters for secure placement",
      "Integrated side rails",
      "Remote control with backlight",
      "Split pan design for easy linen changes",
    ],
    specs: [
      { label: "Bed Width", value: '36"' },
      { label: "Bed Length", value: '80"' },
      { label: "Weight Capacity", value: "450 lbs" },
      { label: "Trendelenburg", value: "Yes" },
      { label: "Motor Type", value: "Ultra-quiet electric" },
    ],
    dimensions: '36" W x 80" L',
    weightCapacity: "450 lbs",
    warranty: "5 years limited warranty on frame and motors",
    accessories: ["Full-length side rails", "Medical mattress", "Over-bed table"],
    usageInfo: "Our experience was exceptional. From purchasing with assistance to the timely delivery and set up of the bed exactly when we needed it was a flawless experience.",
    careInfo: "Wipe frame with damp cloth. Motors require no regular maintenance. Contact us for service and repair.",
    badges: ["In-Stock", "Free Shipping", "White Glove Available", "Integrity Pricing"],
  },
  {
    slug: "foxtr-auto-fold-scooter",
    name: "Auto-Fold Mobility Scooter",
    brand: "FOXTR",
    sku: "MED-SCOOTER-001",
    price: 3499,
    originalPrice: 4999,
    category: "mobility-scooters",
    inStock: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879aa3?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1576092768241-dec231879aa3?w=1200&h=900&fit=crop"],
    shortDescription: "Auto-folding mobility scooter with premium comfort and one-touch portability.",
    description: "This auto-fold mobility scooter combines cutting-edge portability with premium comfort. One-touch automatic folding makes it perfect for travel, while the airline-approved lithium battery and pneumatic tires ensure a smooth ride wherever you go.",
    whoItsFor: "Ideal for travelers, urban commuters, and anyone who needs a portable scooter that folds automatically for storage and transport.",
    benefits: [
      "One-touch automatic folding mechanism",
      "Airline-approved lithium battery",
      "Pneumatic tires for smooth ride",
      "Free Canada-wide shipping available",
    ],
    features: ["Auto-fold mechanism", "LED headlight and taillight", "Digital dashboard", "Pneumatic tires", "Airline-approved battery"],
    specs: [
      { label: "Top Speed", value: "6 mph / 9.6 km/h" },
      { label: "Range", value: "15 miles / 24 km" },
      { label: "Weight Capacity", value: "265 lbs" },
      { label: "Turning Radius", value: '33"' },
      { label: "Ground Clearance", value: '2.5"' },
    ],
    maxSpeed: "6 mph / 9.6 km/h",
    range: "15 miles / 24 km",
    weightCapacity: "265 lbs",
    battery: "Airline-approved lithium",
    warranty: "2 years limited warranty",
    accessories: ["Travel bag", "Weather cover", "Additional battery"],
    usageInfo: "Ideal for travel and everyday use. Folds automatically for easy storage and transport.",
    careInfo: "Charge battery after each use. Store in dry location. Annual service recommended.",
    badges: ["In-Stock", "Free Shipping"],
  },
  {
    slug: "vitalflex-symphony-bed",
    name: "Symphony Homecare Bed",
    brand: "VitalFlex",
    sku: "MED-BED-002",
    price: 1899,
    category: "hospital-beds",
    inStock: true,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=900&fit=crop"],
    shortDescription: "Shop our exclusive Symphony — one of Canada's top selling Homecare Beds for comfort and care at home.",
    description: "A top-selling homecare bed designed for comfort and everyday care at home. Semi-electric head and foot adjustment with tool-free assembly in under 30 minutes.",
    whoItsFor: "Home care patients and caregivers seeking a reliable, easy-to-assemble hospital bed for everyday comfort.",
    benefits: ["Tool-free assembly in under 30 minutes", "Semi-electric positioning", "Split pan for easy linen changes", "Low height range for fall prevention", "Best seller in homecare beds"],
    features: ["Semi-electric head/foot", "Tool-free assembly", "Split pan design", "Optional side rails", "Locking casters"],
    specs: [
      { label: "Bed Width", value: '36"' },
      { label: "Bed Length", value: '80"' },
      { label: "Weight Capacity", value: "450 lbs" },
      { label: "Height Range", value: '15" - 23"' },
    ],
    dimensions: '36" W x 80" L',
    weightCapacity: "450 lbs",
    warranty: "3 years limited warranty",
    accessories: ["Side rails", "Mattress", "Bed rail pads"],
    usageInfo: "Delivered on time and set up like lightning. Professional and efficient delivery team.",
    careInfo: "Regular cleaning of frame and mattress cover. Motor lubrication not required.",
    badges: ["Best Seller", "In-Stock", "Free Shipping"],
  },
  {
    slug: "golden-comfort-lift-chair",
    name: "Comfort Infinite Lift Chair",
    brand: "Golden Technologies",
    sku: "MED-LCHAIR-001",
    price: 1899,
    category: "lift-chairs",
    inStock: true,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=900&fit=crop"],
    shortDescription: "Infinite position lift chair with heat and massage for everyday comfort.",
    description: "Awesome chair with all the bells and whistles. Love the remote and how it is attached to the chair so you never drop it. Very easy to get out. Great spot for a cup and remote or phone.",
    whoItsFor: "Individuals with limited mobility who need assistance standing from a seated position, with optional heat and massage therapy.",
    benefits: ["Infinite position reclining", "Heat and massage therapy", "Remote attached to chair", "Battery backup during outage"],
    features: ["Dual motor operation", "Heat & massage", "USB charging port", "Battery backup", "Attached remote"],
    specs: [
      { label: "Chair Size", value: "Medium" },
      { label: "Seat Width", value: '20"' },
      { label: "Weight Capacity", value: "375 lbs" },
      { label: "Heat & Massage", value: "Yes" },
    ],
    weightCapacity: "375 lbs",
    warranty: "Lifetime warranty on lift mechanism",
    accessories: ["Lift chair table", "Heat massage upgrade"],
    usageInfo: "Very easy to get out. Remote attached so you never drop it.",
    careInfo: "Vacuum fabric regularly. Avoid direct sunlight on upholstery.",
    badges: ["In-Stock"],
  },
  {
    slug: "solcare-100-mattress",
    name: "Premium Therapeutic Medical Mattress",
    brand: "Drive DeVilbiss Healthcare",
    sku: "MED-MATTRESS-001",
    price: 399,
    category: "patient-care",
    inStock: true,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=900&fit=crop"],
    shortDescription: "Premium therapeutic foam mattress for patients at low to moderate risk of pressure injuries. Ships out Next Day.",
    description: "This premium therapeutic medical mattress delivers dependable comfort and protection for patients at low to moderate risk of pressure injuries. With a high-resilient foam core and transfer edges, it ensures lasting performance and even wear for superior value and durability.",
    whoItsFor: "Home care and long-term care patients at low to moderate risk of pressure injuries.",
    benefits: ["High-resilient foam core", "Transfer edges for safety", "Ships out Next Day", "Free Canada-Wide Shipping", "4 year non-prorated warranty"],
    features: ["Multi-zone pressure redistribution", "Water-resistant cover", "Transfer edges", "Standard bed frame compatible"],
    specs: [
      { label: "Mattress Width", value: '36"' },
      { label: "Mattress Length", value: '80"' },
      { label: "Mattress Height", value: '6"' },
      { label: "Weight Capacity", value: "350 lbs" },
    ],
    dimensions: '80" L x 36" W x 6" H',
    weightCapacity: "350 lbs (158 kg)",
    warranty: "4 year non-prorated warranty",
    accessories: ["Waterproof cover", "Bed bridge"],
    usageInfo: "In-Stock In-Store & Online. White Glove Toronto & GTA available.",
    careInfo: "Clean cover with mild detergent. Rotate mattress periodically.",
    badges: ["In-Stock", "Ships Next Day", "Free Shipping"],
  },
  {
    slug: "serene-elite-mattress",
    name: "Elite Pressure Redistribution System with Low Air Loss",
    brand: "VitalFlex",
    sku: "MED-MATTRESS-002",
    price: 3490,
    originalPrice: 4990,
    category: "patient-care",
    inStock: true,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=900&fit=crop"],
    shortDescription: "Advanced alternating pressure with true low air loss. In-stock in-store and online.",
    description: "This elite pressure redistribution mattress system with low air loss provides advanced support for patients at high risk of pressure injuries. Digital pump with multiple modes, CPR quick-release, and seat inflation feature.",
    whoItsFor: "Patients at high risk of pressure ulcers in home or long-term care settings.",
    benefits: ["True low air loss technology", "CPR quick-release", "Seat inflation feature", "Free Canada-wide shipping"],
    features: ["Digital multi-mode pump", "Low air loss", "Audible alarms", "CPR release", "Seat inflation"],
    specs: [
      { label: "Mattress Width", value: '35.4"' },
      { label: "Mattress Length", value: '78.7"' },
      { label: "Weight Capacity", value: "400 lbs" },
      { label: "Height", value: '8"' },
    ],
    dimensions: '78.7" L x 35.4" W x 8" H',
    weightCapacity: "400 lbs (181 kg)",
    warranty: "2 years limited warranty",
    accessories: ["Replacement pump filter", "Repair kit"],
    usageInfo: "Ships out next day. White Glove Toronto & GTA.",
    careInfo: "Check pump filters monthly. Professional inspection annually.",
    badges: ["In-Stock", "Free Shipping"],
  },
  {
    slug: "pride-victory-scooter",
    name: "Full-Size Mobility Scooter",
    brand: "Pride Mobility",
    sku: "MED-SCOOTER-002",
    price: 2799,
    category: "mobility-scooters",
    inStock: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879aa3?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1576092768241-dec231879aa3?w=1200&h=900&fit=crop"],
    shortDescription: "Full-size 4-wheel scooter with premium suspension and 28-mile range. 400 lbs weight capacity.",
    description: "This full-size mobility scooter delivers a smooth, comfortable ride with industry-leading range and performance. Full suspension, wraparound delta tiller, and feather-touch disassembly.",
    whoItsFor: "Users needing a full-size outdoor scooter with extended range and high weight capacity.",
    benefits: ["28-mile range", "Full suspension", "400 lbs capacity", "USB charger", "Feather-touch disassembly"],
    features: ["Full suspension", "LED lights", "Delta tiller", "USB port", "Disassembly"],
    specs: [
      { label: "Top Speed", value: "5.25 mph" },
      { label: "Range", value: "28 miles" },
      { label: "Weight Capacity", value: "400 lbs" },
      { label: "Turning Radius", value: '53.25"' },
    ],
    maxSpeed: "5.25 mph",
    range: "28 miles",
    weightCapacity: "400 lbs",
    battery: "U1 batteries (included)",
    warranty: "2 years limited warranty",
    accessories: ["Scooter cover", "Front basket", "Canopy"],
    usageInfo: "Free Canada-Wide Shipping. In-Stock.",
    careInfo: "Charge after each use. Check tire pressure monthly.",
    badges: ["In-Stock", "Free Shipping"],
  },
  {
    slug: "pride-transport-chair",
    name: "Lightweight Transport Wheelchair",
    brand: "Pride Mobility",
    sku: "MED-WCHAIR-001",
    price: 459,
    category: "transport-chairs",
    inStock: true,
    image: "https://images.unsplash.com/photo-1598454446420-555775f0ff6f?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1598454446420-555775f0ff6f?w=1200&h=900&fit=crop"],
    shortDescription: "I bought the transport chair for my mom — ordered and delivered within one week. Light and easy to fold.",
    description: "I bought the transport chair for my mom, and her walking has suffered. I ordered and delivered the chair within one week. The chair is very easy to move and comfortable as is for shorts trips. My mom loves the chair. The chair is light and easy to fold then I could leave it in the truck. I am a very satisfied customer.",
    whoItsFor: "Caregivers and families needing a lightweight, foldable transport chair for short trips.",
    benefits: ["Delivered within one week", "Light and easy to fold", "Comfortable for short trips", "Fits in truck easily", "Ships Next Day"],
    features: ["Aluminum frame", "Swing-away footrests", "Hand brakes", "Padded seat", "Foldable"],
    specs: [
      { label: "Seat Width", value: '18"' },
      { label: "Weight Capacity", value: "250 lbs" },
      { label: "Product Weight", value: "23 lbs" },
    ],
    weight: "23 lbs",
    weightCapacity: "250 lbs",
    warranty: "3 years limited warranty",
    accessories: ["Travel bag", "Cup holder"],
    usageInfo: "Very easy to move. Light enough to leave in the truck.",
    careInfo: "Wipe down after use. Check wheel bearings periodically.",
    badges: ["In-Stock", "Ships Next Day"],
  },
  {
    slug: "quantum-pulse-wheelchair",
    name: "Mid-Wheel Drive Power Wheelchair",
    brand: "Quantum Rehab",
    sku: "MED-PWC-001",
    price: 4299,
    category: "power-wheelchairs",
    inStock: true,
    image: "https://images.unsplash.com/photo-1598454446420-555775f0ff6f?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1598454446420-555775f0ff6f?w=1200&h=900&fit=crop"],
    shortDescription: "Mid-wheel drive power wheelchair with tight turning radius and programmable drive profiles.",
    description: "Advanced powered mobility designed around comfort and control. Mid-wheel drive for tight turning, adjustable captain's seat, and obstacle climbing capability.",
    whoItsFor: "Users requiring full-time powered mobility with indoor maneuverability and outdoor capability.",
    benefits: ["Mid-wheel drive tight turning", "16-mile range", "Programmable profiles", "Obstacle climbing", "White Glove Available"],
    features: ["Mid-wheel drive", "Captain's seat", "Elevating leg rests", "Drive profiles", "LED lights"],
    specs: [
      { label: "Drive Type", value: "Mid-wheel" },
      { label: "Top Speed", value: "5 mph" },
      { label: "Range", value: "16 miles" },
      { label: "Weight Capacity", value: "300 lbs" },
    ],
    maxSpeed: "5 mph",
    range: "16 miles",
    weightCapacity: "300 lbs",
    battery: "Group 24 batteries",
    warranty: "3 years limited warranty",
    accessories: ["Joystick covers", "Seat cushion upgrade"],
    usageInfo: "Professional setup available in Toronto & GTA.",
    careInfo: "Charge daily. Annual professional service recommended.",
    badges: ["In-Stock", "White Glove Available"],
  },
  {
    slug: "drive-nitro-rollator",
    name: "Carbon Fiber Rollator",
    brand: "Drive DeVilbiss Healthcare",
    sku: "MED-ROLLATOR-001",
    price: 349,
    category: "walkers-rollators",
    inStock: true,
    image: "https://images.unsplash.com/photo-1576765608535-5f04a1e78831?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1576765608535-5f04a1e78831?w=1200&h=900&fit=crop"],
    shortDescription: "Ultra-lightweight carbon fiber rollator — only 15 lbs with built-in seat and storage.",
    description: "Stable, lightweight support for confident movement. Carbon fiber frame, dual braking system, and height-adjustable handles.",
    whoItsFor: "Active seniors and rehabilitation patients needing lightweight walking support with rest capability.",
    benefits: ["Only 15 lbs", "Carbon fiber frame", "Built-in seat", "Dual brakes", "Free Canada-Wide Shipping"],
    features: ["Carbon fiber", "Dual brakes", "Seat & backrest", "Storage bag", "Adjustable handles"],
    specs: [
      { label: "Product Weight", value: "15 lbs" },
      { label: "Weight Capacity", value: "300 lbs" },
      { label: "Handle Height", value: '31" - 37"' },
      { label: "Wheel Size", value: '10"' },
    ],
    weight: "15 lbs",
    weightCapacity: "300 lbs",
    warranty: "5 years limited warranty",
    accessories: ["Cup holder", "Cane clip"],
    usageInfo: "In-Stock Online. Ships out next day.",
    careInfo: "Check brake pads. Clean wheels regularly.",
    badges: ["In-Stock", "Free Shipping"],
  },
  {
    slug: "healthcraft-grab-bars",
    name: "Safety Grab Bar Set",
    brand: "Healthcraft",
    sku: "MED-GRABBAR-001",
    price: 129,
    category: "bathroom-safety",
    inStock: true,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=900&fit=crop"],
    shortDescription: "Complete bathroom safety grab bar kit — stainless steel, 500 lb capacity per bar.",
    description: "Practical equipment designed to improve safety and independence. Stainless steel construction with textured grip and all mounting hardware included.",
    whoItsFor: "Anyone needing bathroom safety support for independent living or post-surgery recovery.",
    benefits: ["500 lb capacity per bar", "Stainless steel", "Easy installation", "Textured grip", "All hardware included"],
    features: ["304 stainless steel", "Brushed nickel finish", "Wall stud mounting", "Textured surface"],
    specs: [
      { label: "Material", value: "304 Stainless Steel" },
      { label: "Bar Length", value: '24"' },
      { label: "Weight Capacity", value: "500 lbs" },
    ],
    weightCapacity: "500 lbs per bar",
    warranty: "Lifetime warranty on materials",
    accessories: ["Additional bars", "Corner grab bar"],
    usageInfo: "Professional installation recommended. Wall stud required.",
    careInfo: "Wipe with damp cloth. Check mounting hardware annually.",
    badges: ["In-Stock", "Easy Install"],
  },
  {
    slug: "invacare-patient-lift",
    name: "Electric Patient Lift",
    brand: "Invacare",
    sku: "MED-LIFT-001",
    price: 1599,
    category: "patient-care",
    inStock: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d558a9a?w=1200&h=900&fit=crop",
    images: ["https://images.unsplash.com/photo-1579684385127-1ef15d558a9a?w=1200&h=900&fit=crop"],
    shortDescription: "Electric patient lift for safe transfers. Compatible with multiple sling types.",
    description: "Reliable equipment for caregivers and home-care environments. Electric lift with rechargeable battery, low base for under-bed access, and emergency manual override.",
    whoItsFor: "Caregivers performing safe patient transfers at home or in care facilities.",
    benefits: ["450 lbs capacity", "Electric operation", "Low base design", "Manual override", "Multiple sling compatible"],
    features: ["Rechargeable battery", "Six-point spreader bar", "Emergency override", "Low base"],
    specs: [
      { label: "Weight Capacity", value: "450 lbs" },
      { label: "Lift Range", value: '24" - 66"' },
      { label: "Base Width", value: '42.5"' },
    ],
    weightCapacity: "450 lbs",
    warranty: "2 years limited warranty",
    accessories: ["Slings (sold separately)", "Scale attachment"],
    usageInfo: "Patient Lift Rentals available in Toronto & GTA.",
    careInfo: "Charge battery after use. Inspect slings before each use.",
    badges: ["Out of Stock", "White Glove Available", "Rentals Available"],
  },
];

// Apply Vital Mobility CDN images (real product photography)
for (const p of products) {
  p.images = getProductImages(p.slug);
  p.image = p.images[0];
}

/** Product title for cards, detail pages, and metadata — never shows manufacturer brand. */
export function getProductDisplayName(product: Pick<Product, "name" | "brand">): string {
  let name = product.name.trim();
  const brand = product.brand?.trim();
  if (!brand) return name;

  const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  name = name.replace(new RegExp(`^${escaped}\\s+`, "i"), "");
  name = name.replace(new RegExp(`\\b${escaped}\\b`, "gi"), " ");
  return name.replace(/\s+/g, " ").trim();
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0 }).format(price);
}
