export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  image: string;
  badge?: "Popular" | "New" | "Best Seller";
  specs: { label: string; value: string }[];
  features: string[];
  priceRange?: string;
  published: boolean;
  series?: string;
  brand?: string;
  inverterType?: "hybrid" | "on-grid" | "off-grid";
}

export interface ProductCategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
}

// Helper variables to dynamically compile the full entity list
let productIndex = 1;
const productsList: Product[] = [];

// Helper function to build products programmatically
function addProduct(data: Omit<Product, "id" | "published"> & { published?: boolean }) {
  productsList.push({
    id: (productIndex++).toString(),
    ...data,
    published: data.published !== false, // Defaults to true unless explicitly false
  } as Product);
}

// ==========================================
// 1. Xerox G4 Pro On-Grid Inverters (5-25kW)
// ==========================================
const xeroxG4ProSmallModels = [
  { name: "5K/8kpV", power: "5kW", pv: "7,500 Wp", current: "16 A", cooling: "Natural Convection", weight: "16 kg" },
  { name: "6K/9kpV", power: "6kW", pv: "9,000 Wp", current: "16 A", cooling: "Natural Convection", weight: "16 kg" },
  { name: "8K/12kpV", power: "8kW", pv: "12,000 Wp", current: "20 A", cooling: "Natural Convection", weight: "16 kg" },
  { name: "10K/17kpV", power: "10kW", pv: "18,000 Wp", current: "32 A", cooling: "Natural Convection", weight: "16 kg" },
  { name: "13K/20kpV", power: "13kW", pv: "19,500 Wp", current: "32 A", cooling: "Active Cooling", weight: "17 kg" },
  { name: "15K/23kpV", power: "15kW", pv: "22,500 Wp", current: "32 A", cooling: "Active Cooling", weight: "17 kg" },
  { name: "17K/26kpV", power: "17kW", pv: "25,500 Wp", current: "32 A", cooling: "Active Cooling", weight: "17 kg" },
  { name: "20K/30kpV", power: "20kW", pv: "30,000 Wp", current: "32 A", cooling: "Active Cooling", weight: "17 kg" },
  { name: "25K/38kpV", power: "25kW", pv: "37,500 Wp", current: "40 A", cooling: "Active Cooling", weight: "18.6 kg" },
];

const xeroxG4ProSmallFeatures = [
  "150% PV array oversizing for higher energy yields",
  "Dual MPPT trackers for maximum power tracking efficiency",
  "IP66 waterproof and dustproof design for outdoor installations",
  "All-aluminium design helps reduce internal temperature",
  "Quick setup and commissioning via AI Solar app",
  "Built-in internal fan for heat circulation on 13-25kW models",
];

xeroxG4ProSmallModels.forEach((model, idx) => {
  addProduct({
    slug: `xerox-g4-pro-${model.name.replace("/", "-").toLowerCase()}`,
    name: `Xerox G4 Pro ${model.name} Three Phase On-Grid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Xerox",
    inverterType: "on-grid",
    description: `The Knox Xerox G4 Pro ${model.name} is a high-performance three-phase grid-tied string inverter with a rated AC output of ${model.power} and support for up to ${model.pv} PV array power. Featuring dual MPPT trackers and an IP66 rated all-aluminium casing, it is perfect for residential and commercial solar installations. Real-time commissioning is done via the AI Solar app.`,
    shortDescription: `Three-phase on-grid inverter, rated at ${model.power} with dual MPPT and IP66 casing.`,
    image: "/images/Xerox-G4-Pro-5-25kw.png",
    badge: idx === 0 ? "Popular" : undefined,
    specs: [
      { label: "Model", value: `G4 Pro ${model.name}` },
      { label: "Rated Power", value: model.power },
      { label: "Max. PV Array Power", value: model.pv },
      { label: "MPPT Channels", value: "2" },
      { label: "Max. DC Input Current", value: `${model.current} per MPPT` },
      { label: "Cooling Type", value: model.cooling },
      { label: "Weight", value: model.weight },
      { label: "Dimensions", value: "503 × 435 × 183 mm" },
      { label: "Protection Class", value: "IP66" },
      { label: "Certification", value: "CE, IEC 61215, IEC 61730" },
    ],
    features: xeroxG4ProSmallFeatures,
    priceRange: "Contact for Price",
    published: false,
  });
});

// ==========================================
// 2. Xerox G4 Pro On-Grid Inverters (30-60kW)
// ==========================================
const xeroxG4ProLargeModels = [
  { name: "30K/45kpV", power: "30kW", pv: "45,000 Wp", mppts: "3", current: "50A/25A/50A", weight: "20.0 kg", dim: "488 × 425.5 × 179 mm" },
  { name: "40K/60kpV", power: "40kW", pv: "60,000 Wp", mppts: "4", current: "50A/40A/25A/25A", weight: "29.5 kg", dim: "574 × 513.5 × 234.5 mm" },
  { name: "50K/75kpV", power: "50kW", pv: "75,000 Wp", mppts: "4", current: "50A/50A/25A/40A", weight: "30.5 kg", dim: "574 × 513.5 × 234.5 mm" },
  { name: "60K/90kpV", power: "60kW", pv: "90,000 Wp", mppts: "5", current: "60A/48A/48A/60A/48A", weight: "42.5 kg", dim: "670 × 640 × 270 mm" },
];

const xeroxG4ProLargeFeatures = [
  "Up to 5 MPPTs for flexible PV array designs on uneven roofs",
  "ShadeSol technology improves generation under partially shaded conditions",
  "Phoenix Contact connectors for reliable tool-free DC connection",
  "Fuse-free design lowers BOS and long-term maintenance costs",
  "Type II AC & DC surge protection built-in",
  "Integrated DC switches for safe isolating during maintenance",
];

xeroxG4ProLargeModels.forEach((model, idx) => {
  addProduct({
    slug: `xerox-g4-pro-${model.name.replace("/", "-").toLowerCase()}`,
    name: `Xerox G4 Pro ${model.name} Three Phase On-Grid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Xerox",
    inverterType: "on-grid",
    description: `Designed for commercial and industrial rooftops, the Xerox G4 Pro ${model.name} is a high-power three-phase string inverter with a rated AC output of ${model.power}. It features ${model.mppts} MPPT trackers for flexible PV array designs under complex conditions and ShadeSol technology to optimize generation under shade. Includes Phoenix Contact connectors and Type II AC & DC surge protection.`,
    shortDescription: `Commercial three-phase inverter, rated at ${model.power} with ${model.mppts} MPPTs and ShadeSol.`,
    image: "/images/Xerox-G4-Pro-30-60kw.png",
    badge: idx === 3 ? "Best Seller" : undefined,
    specs: [
      { label: "Model", value: `G4 Pro ${model.name}` },
      { label: "Rated Power", value: model.power },
      { label: "Max. PV Array Power", value: model.pv },
      { label: "MPPT Trackers", value: model.mppts },
      { label: "Max. DC Input Current", value: model.current },
      { label: "Weight", value: model.weight },
      { label: "Dimensions", value: model.dim },
      { label: "Surge Protection", value: "Type II AC & DC built-in" },
      { label: "Protection Class", value: "IP66" },
      { label: "Certification", value: "IEC 62109, G98/G99, CE" },
    ],
    features: xeroxG4ProLargeFeatures,
    priceRange: "Contact for Price",
    published: false,
  });
});

// ===========================================
// 3. Xerox G4 Pro On-Grid Inverters (100-125kW)
// ===========================================
const xeroxG4ProMaxModels = [
  { name: "100K-LV", power: "100kW", pv: "150,000 Wp", mppts: "8", weight: "85 kg" },
  { name: "110K-LV", power: "110kW", pv: "165,000 Wp", mppts: "10", weight: "88 kg" },
  { name: "125K-LV", power: "125kW", pv: "187,500 Wp", mppts: "10", weight: "88 kg" },
];

const xeroxG4ProMaxFeatures = [
  "8 to 10 MPPT trackers for maximum rooftop coverage and yields",
  "Built-in AFCI (Arc Fault Circuit Interrupter) protection for premium fire safety",
  "High input current (21A per string), fully compatible with large bifacial modules",
  "Smart fan cooling for optimized thermal control",
  "String-level monitoring and remote online troubleshooting",
  "Fuse-free design and Type II AC & DC surge protection",
];

xeroxG4ProMaxModels.forEach((model, idx) => {
  addProduct({
    slug: `xerox-g4-pro-${model.name.toLowerCase()}`,
    name: `Xerox G4 Pro ${model.name} Three Phase On-Grid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Xerox",
    inverterType: "on-grid",
    description: `The industrial-grade Xerox G4 Pro ${model.name} series delivers high-power three-phase conversion with ${model.mppts} MPPT trackers. Designed to support modern high-power bifacial solar modules (up to 21A per string), it achieves an outstanding maximum efficiency of 99.0%. Includes built-in AFCI protection, smart fan cooling, and Type II SPD protection on both AC and DC sides.`,
    shortDescription: `Utility-scale three-phase inverter, rated at ${model.power} with ${model.mppts} MPPTs and built-in AFCI.`,
    image: "/images/Xerox-G4-Pro-100-125kw.png",
    badge: idx === 2 ? "New" : undefined,
    specs: [
      { label: "Model", value: `G4 Pro ${model.name}` },
      { label: "Rated Power", value: model.power },
      { label: "Max. PV Array Power", value: model.pv },
      { label: "MPPT Trackers", value: model.mppts },
      { label: "Max. DC Input Current per MPPT", value: "42 A" },
      { label: "Max. Efficiency", value: idx === 2 ? "99.0%" : "98.8%" },
      { label: "Cooling Type", value: "Smart Fan Cooling" },
      { label: "Weight", value: model.weight },
      { label: "Dimensions", value: "930 × 650 × 300 mm" },
      { label: "Protection Class", value: "IP66" },
    ],
    features: xeroxG4ProMaxFeatures,
    priceRange: "Contact for Price",
    published: false,
  });
});

// ===========================================
// 4. Xerox G4 On-Grid Inverters (3-25kW)
// ===========================================
const xeroxG4Models = [
  { name: "3K/5kpV", power: "3kW", pv: "4,500 Wp" },
  { name: "4K/6kpV", power: "4kW", pv: "6,000 Wp" },
  { name: "5K/8kpV", power: "5kW", pv: "7,500 Wp" },
  { name: "6K/9kpV", power: "6kW", pv: "9,000 Wp" },
  { name: "8K/12kpV", power: "8kW", pv: "12,000 Wp" },
  { name: "10K/15kpV", power: "10kW", pv: "15,000 Wp" },
  { name: "12K/18kpV", power: "12kW", pv: "18,000 Wp" },
  { name: "13K/20kpV", power: "13kW", pv: "19,500 Wp" },
  { name: "15K/23kpV", power: "15kW", pv: "22,500 Wp" },
  { name: "17K/26kpV", power: "17kW", pv: "25,500 Wp" },
  { name: "20K/30kpV", power: "20kW", pv: "30,000 Wp" },
  { name: "25K/38kpV", power: "25kW", pv: "32,500 Wp" },
];

const xeroxG4Features = [
  "Dual MPPT tracking for split-orientation rooftop arrays",
  "Compact wall mount design with lightweight all-aluminium casing",
  "IP66 dustproof and waterproof casing for outdoor installation",
  "Natural convection cooling ensures quiet operation",
  "Integrated ground fault and DC reverse polarity protection",
];

xeroxG4Models.forEach((model) => {
  addProduct({
    slug: `xerox-g4-${model.name.replace("/", "-").toLowerCase()}`,
    name: `Xerox G4 ${model.name} Three Phase On-Grid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Xerox",
    inverterType: "on-grid",
    description: `The standard Xerox G4 ${model.name} series provides cost-effective, high-efficiency three-phase grid-tied conversion. Perfect for residential and commercial systems, it features a rated AC output of ${model.power} and supports up to ${model.pv} PV input power. Includes dual MPPTs, IP66-rated enclosure, and quiet natural convection cooling.`,
    shortDescription: `Standard three-phase grid-tied string inverter, rated at ${model.power} with dual MPPT.`,
    image: "/images/Xerox-G4-3-25kw.png",
    specs: [
      { label: "Model", value: `G4 ${model.name}` },
      { label: "Rated Power", value: model.power },
      { label: "Max. PV Array Power", value: model.pv },
      { label: "MPPT Trackers", value: "2" },
      { label: "Max. DC Input Current", value: "16A / 20A / 32A per MPPT" },
      { label: "Max. Efficiency", value: "98.6%" },
      { label: "Cooling Type", value: "Natural Convection" },
      { label: "Weight", value: "16 kg" },
      { label: "Dimensions", value: "503 × 435 × 183 mm" },
      { label: "Protection Class", value: "IP66" },
    ],
    features: xeroxG4Features,
    priceRange: "Contact for Price",
    published: false,
  });
});

// ===========================================
// 5. Argon Series Single Phase Hybrid Inverters
// ===========================================
const argonModels = [
  { name: "1500", modelNo: "1.5kW-12-pV2000", power: "1.5 kW", pv: "2,000 W", bat: "12 VDC", weight: "3.8 kg", parallel: "No" },
  { name: "2500", modelNo: "2.5kW-24-pV3000", power: "2.5 kW", pv: "3,000 W", bat: "24 VDC", weight: "3.95 kg", parallel: "No" },
  { name: "3500", modelNo: "3.5kW-24-pV4000", power: "3.5 kW", pv: "4,000 W", bat: "24 VDC", weight: "3.95 kg", parallel: "No" },
  { name: "4200", modelNo: "4.2kW-24-pV5000-Twin", power: "4.2 kW", pv: "5,000 W", bat: "24 VDC", weight: "6.7 kg", parallel: "No" },
  { name: "6200", modelNo: "6.2kW-48-pV6500-Twin", power: "6.2 kW", pv: "6,500 W", bat: "48 VDC", weight: "11.0 kg", parallel: "No" },
  { name: "8500", modelNo: "8.5kW-48-pV10000-TwinPL", power: "8.5 kW", pv: "10,000 W", bat: "48 VDC", weight: "14.5 kg", parallel: "Yes, up to 6 units" },
  { name: "11000", modelNo: "11kW-48-pV11000-TwinPL", power: "11.0 kW", pv: "11,000 W", bat: "48 VDC", weight: "14.8 kg", parallel: "Yes, up to 6 units" },
];

const argonFeatures = [
  "Battery-independent design runs loads directly from PV arrays",
  "Vibrant RGB indicator lights showing active mode, load, and battery status",
  "Detailed colored LCD display for parameter setup and monitoring",
  "Compatible with Lithium batteries (LiFePO4) via RS485 communication",
  "Dual output for smart load management (4200/6200/8500/11000)",
  "Anti-shock design terminals for safety during installation",
];

argonModels.forEach((model, idx) => {
  addProduct({
    slug: `argon-${model.name.toLowerCase()}`,
    name: `Argon ${model.name} Single Phase Hybrid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Argon",
    inverterType: "off-grid",
    description: `The Argon ${model.name} is a highly customizable single-phase hybrid and off-grid inverter rated at ${model.power}. It features a built-in MPPT controller supporting up to ${model.pv} PV input power, a colored LCD with status-responsive RGB lights, and a battery-independent design. It is fully compatible with Lithium batteries (LiFePO4) via RS485 communication, and high-power models support parallel stacking.`,
    shortDescription: `Single-phase hybrid/off-grid inverter, rated at ${model.power} with colored LCD and status RGB lights.`,
    image: "/images/Argon-Single-Phase-Hybrid-Inverter.png",
    badge: idx === 4 ? "Popular" : undefined,
    specs: [
      { label: "Model", value: `Argon ${model.name}` },
      { label: "Model Number", value: model.modelNo },
      { label: "Rated Power", value: model.power },
      { label: "Max. PV Input Power", value: model.pv },
      { label: "Battery Voltage", value: model.bat },
      { label: "Parallel Stacking", value: model.parallel },
      { label: "Waveform", value: "Pure Sine Wave" },
      { label: "Peak Efficiency", value: "94% - 96%" },
      { label: "Weight", value: model.weight },
      { label: "Ingress Protection", value: "IP21" },
    ],
    features: argonFeatures,
    priceRange: "Contact for Price",
    published: (model as any).published,
  });
});

// ===========================================
// 6. Krypton Eco Series Hybrid Inverters
// ===========================================
const kryptonEcoModels = [
  { name: "Eco 4000", modelNo: "3kW-24-pV4000", power: "4.0 kW", gridFeed: "3.0 kW", bat: "24 VDC", weight: "7.1 kg", dim: "95 × 288 × 357 mm" },
  { name: "Eco 5000", modelNo: "4kW-24-pV5000-TWIN", power: "5.0 kW", gridFeed: "4.2 kW", bat: "24 VDC", weight: "9.0 kg", dim: "115 × 300 × 435 mm" },
  { name: "Eco 6600", modelNo: "6.2kW-48-pV6600-TWIN", power: "6.6 kW", gridFeed: "6.2 kW", bat: "48 VDC", weight: "10.4 kg", dim: "115 × 300 × 435 mm" },
];

const kryptonEcoFeatures = [
  "Enables feeding surplus solar power directly back into the grid",
  "Battery independent design runs directly from PV arrays",
  "Built-in anti-dust kit for reliability in dusty environments",
  "Smart battery equalization optimizes battery lifecycle",
  "Microprocessor control ensures efficient energy routing",
];

kryptonEcoModels.forEach((model) => {
  addProduct({
    slug: `krypton-eco-${model.name.replace(" ", "-").toLowerCase()}`,
    name: `Krypton ${model.name} Hybrid Inverter with Grid Feeding`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Krypton",
    inverterType: "hybrid",
    description: `The Krypton Eco ${model.name} is a single-phase hybrid inverter with grid-feeding capability. Featuring a rated power of ${model.power} and grid-feeding capacity of ${model.gridFeed}, it supports battery-independent operation, a built-in anti-dust kit, and smart battery equalization. Ideal for residential users seeking to lower electricity bills by feeding excess solar energy back into the grid.`,
    shortDescription: `Single-phase grid-feeding hybrid inverter, rated at ${model.power} with anti-dust kit.`,
    image: "/images/knox-Krypton-eco-series.png",
    specs: [
      { label: "Model", value: `Krypton Eco ${model.name}` },
      { label: "Model Number", value: model.modelNo },
      { label: "Rated Power", value: model.power },
      { label: "Grid Feed Capacity", value: model.gridFeed },
      { label: "Battery Voltage", value: model.bat },
      { label: "Max. Charging Current", value: "80A to 120A" },
      { label: "Dimensions", value: model.dim },
      { label: "Weight", value: model.weight },
      { label: "Protection Rating", value: "IP21" },
    ],
    features: kryptonEcoFeatures,
    priceRange: "Contact for Price",
    published: false,
  });
});

// ===========================================
// 7. Krypton Series Touchscreen Hybrid Inverters
// ===========================================
const kryptonModels = [
  { name: "6000", modelNo: "4kW-24-pV6000-TWIN", power: "4.0 kW", bat: "24 VDC", weight: "10.0 kg", dim: "119 × 313.6 × 457.5 mm" },
  { name: "6500", modelNo: "4.5kW-24-pV6500-TWIN", power: "4.5 kW", bat: "24 VDC", weight: "12.0 kg", dim: "119 × 313.6 × 457.5 mm" },
  { name: "9000", modelNo: "6.2kW-48-pV9000-TWIN", power: "6.2 kW", bat: "48 VDC", weight: "13.7 kg", dim: "138 × 320 × 550 mm" },
  { name: "9055", modelNo: "6.5kW-48-pV9055-TWIN", power: "6.5 kW", bat: "48 VDC", weight: "13.5 kg", dim: "140 × 295 × 468 mm" },
  { name: "11008", modelNo: "8kW-48-pV12000-DU", power: "8.0 kW", bat: "48 VDC", weight: "13.5 kg", dim: "140 × 295 × 468 mm" },
  { name: "12002", modelNo: "8.5kW-48-pV12kW-TWIN", power: "8.5 kW", bat: "48 VDC", weight: "18.4 kg", dim: "156.1 × 460 × 551.8 mm" },
  { name: "13002", modelNo: "10kW-48-pV13kW-TWIN", power: "10.0 kW", bat: "48 VDC", weight: "18.4 kg", dim: "156.1 × 460 × 551.8 mm" },
  { name: "15002", modelNo: "11.5kW-48-pV15kW-TWIN", power: "11.5 kW", bat: "48 VDC", weight: "18.4 kg", dim: "156.1 × 460 × 551.8 mm" },
];

const kryptonFeatures = [
  "Large HMI touchscreen for intuitive parameter configuration (9055+)",
  "Supports parallel stacking up to 9 units for light commercial scaling",
  "High PV input current (up to 30A), matching modern high-power panels",
  "Dual outputs for smart load management and essential circuit backup",
  "Compatible with utility grid, generator, and battery sources",
  "Built-in DC output for 12V DC fans, LED bulbs, or routers",
];

kryptonModels.forEach((model, idx) => {
  addProduct({
    slug: `krypton-${model.name.toLowerCase()}`,
    name: `Krypton ${model.name} Touchscreen Hybrid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Krypton",
    inverterType: "hybrid",
    description: `The Krypton ${model.name} is a premium single-phase grid-feeding hybrid inverter rated at ${model.power}. It features a large HMI touchscreen on advanced models, supporting high PV input currents (up to 30A), dual outputs for smart load management, and parallel expansion up to 9 units (9000/9055 models) or 6 units (12002-15002 models). Compatible with utility grids, generators, and batteries.`,
    shortDescription: `Premium single-phase hybrid inverter, rated at ${model.power} with HMI touchscreen and parallel capability.`,
    image: "/images/knox-Krypton-series.png",
    badge: idx === 3 ? "Best Seller" : undefined,
    specs: [
      { label: "Model", value: `Krypton ${model.name}` },
      { label: "Model Number", value: model.modelNo },
      { label: "Rated Power", value: model.power },
      { label: "Battery Voltage", value: model.bat },
      { label: "HMI Control", value: idx >= 3 ? "Large Touchscreen" : "LCD Buttons" },
      { label: "Peak Efficiency", value: "95%" },
      { label: "Parallel Stacking", value: idx < 5 ? "Up to 9 Units" : "Up to 6 Units" },
      { label: "Weight", value: model.weight },
      { label: "Dimensions", value: model.dim },
    ],
    features: kryptonFeatures,
    priceRange: "Contact for Price",
    published: false,
  });
});

// ===========================================
// 8. Xenon Series IP66 Hybrid Inverters
// ===========================================
const xenonModels = [
  { name: "12066", modelNo: "6.6kW-48-pV12066-TWIN", phase: "Single Phase", power: "6.6 kW", weight: "32 kg", dim: "192 × 414 × 630 mm" },
  { name: "18000", modelNo: "12kW-48-pV18000-TWIN", phase: "Three Phase", power: "12.0 kW", weight: "70 kg", dim: "255 × 660 × 750 mm" },
  { name: "22500", modelNo: "15kW-48-pV22500-TWIN", phase: "Three Phase", power: "15.0 kW", weight: "73 kg", dim: "255 × 660 × 750 mm" },
];

const xenonFeatures = [
  "IP66 waterproof/dustproof casing allows outdoor installation anywhere",
  "Large 7-inch HMI color touchscreen for clear system visualization",
  "Dual MPPT trackers with high current input matching bifacial panels",
  "Support for generator inputs with automatic switching",
  "Parallel stacking up to 9 units (single phase) or 6 units (three phase)",
  "Dual output support for smart critical/non-critical load management",
];

xenonModels.forEach((model) => {
  addProduct({
    slug: `xenon-${model.name.toLowerCase()}`,
    name: `Xenon ${model.name} ${model.phase} Hybrid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Xenon",
    inverterType: "hybrid",
    description: `The Xenon ${model.name} is an IP66 rated waterproof and dustproof ${model.phase.toLowerCase()} hybrid inverter rated at ${model.power}. It features a large 7-inch HMI color touchscreen, dual MPPT trackers, a battery-independent design, and support for parallel operation. Fully compatible with generator inputs and high-power PV panels.`,
    shortDescription: `IP66 waterproof ${model.phase.toLowerCase()} hybrid inverter, rated at ${model.power} with 7" touchscreen.`,
    image: "/images/knox-Xenon-series.png",
    specs: [
      { label: "Model", value: `Xenon ${model.name}` },
      { label: "Model Number", value: model.modelNo },
      { label: "Phase Type", value: model.phase },
      { label: "Rated Power", value: model.power },
      { label: "MPPT Trackers", value: "2" },
      { label: "Display", value: "7-inch Color HMI Touchscreen" },
      { label: "Battery Voltage", value: "48 VDC" },
      { label: "Protection Rating", value: "IP66 Rated Enclosure" },
      { label: "Weight", value: model.weight },
      { label: "Dimensions", value: model.dim },
    ],
    features: xenonFeatures,
    priceRange: "Contact for Price",
    published: false,
  });
});

// ===========================================
// 9. Zynex Series 3-MPPT Hybrid Inverters
// ===========================================
const zynexModels = [
  { name: "ZX-3M-0816", power: "8.0 kW", pv: "16,000 Wp", current: "190 A" },
  { name: "ZX-3M-1020", power: "10.0 kW", pv: "20,000 Wp", current: "210 A" },
];

const zynexFeatures = [
  "3 independent MPPT channels for complex multi-oriented PV arrays",
  "IP66 waterproof enclosure suitable for indoor and outdoor mounting",
  "UPS-level transfer time (<10ms) ensures computers never reset",
  "ShadeSol shadow management optimizes output under dynamic shade",
  "Up to 200% PV array oversizing to maximize winter solar yields",
  "Compatible with both lithium and lead-acid battery chemistries",
];

zynexModels.forEach((model) => {
  addProduct({
    slug: `zynex-${model.name.toLowerCase()}`,
    name: `Zynex ${model.name} Single Phase Hybrid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Zynex",
    inverterType: "hybrid",
    description: `The Zynex ${model.name} is a high-performance single-phase hybrid inverter with 3 independent MPPT trackers. Rated at ${model.power} and supporting up to ${model.pv} PV array power, it allows flexible solar setups on complex orientations. With IP66 protection, ShadeSol shadow management, and ultra-fast <10ms UPS transfer, it ensures uninterrupted power.`,
    shortDescription: `Single-phase hybrid inverter, rated at ${model.power} with 3 independent MPPTs and IP66 rating.`,
    image: "/images/knox-Zynex-series.png",
    specs: [
      { label: "Model", value: model.name },
      { label: "Rated Power", value: model.power },
      { label: "Max. PV Array Power", value: model.pv },
      { label: "MPPT Trackers", value: "3" },
      { label: "Max. Charge Current", value: model.current },
      { label: "Battery Voltage Range", value: "40V to 60V" },
      { label: "UPS Switching Time", value: "<10 ms" },
      { label: "Weight", value: "34.5 kg" },
      { label: "Dimensions", value: "484 × 679 × 230 mm" },
      { label: "Protection Rating", value: "IP66" },
    ],
    features: zynexFeatures,
    priceRange: "Contact for Price",
    published: false,
  });
});

// ===========================================
// 10. Zapher Series Hybrid Inverters (6.6-50kW)
// ===========================================
const zapherModels = [
  { name: "XZ-6.6kW-12000pV", phase: "Single Phase", power: "6.6 kW", pv: "12,000 W", weight: "16 kg", dim: "435 × 325 × 171 mm" },
  { name: "XZ-9.2kW-16000pV", phase: "Single Phase", power: "9.2 kW", pv: "16,000 W", weight: "28 kg", dim: "192 × 418 × 633 mm" },
  { name: "XZ-11.2kW-18000pV", phase: "Single Phase", power: "11.2 kW", pv: "18,000 W", weight: "29 kg", dim: "192 × 418 × 633 mm" },
  { name: "XZ-12kW-18000pV.3P", phase: "Three Phase", power: "12.0 kW", pv: "18,000 W", weight: "54 kg", dim: "247 × 500 × 650 mm" },
  { name: "XZ-15kW-24000pV.3P", phase: "Three Phase", power: "15.0 kW", pv: "24,000 W", weight: "59 kg", dim: "247 × 504.4 × 714.4 mm" },
  { name: "XZ-30kW-48000pV", phase: "Three Phase", power: "30.0 kW", pv: "48,000 W", weight: "90 kg", dim: "290 × 580 × 900 mm" },
  { name: "XZ-50kW-65000pV", phase: "Three Phase", power: "50.0 kW", pv: "65,000 W", weight: "90 kg", dim: "290 × 580 × 900 mm" },
];

const zapherFeatures = [
  "Dual inputs (GEN and AC) for automatic switching between generator and grid",
  "High-voltage battery range (200-900V) on 30-50kW models for high efficiency",
  "Up to 4 MPPT trackers on high-power models to maximize commercial yields",
  "IP65/IP66 weather-resistant design for flexible indoor or outdoor mounting",
  "Supports parallel stacking to scale up power capacities easily",
  "User-adjustable charging currents via intuitive HMI touchscreen interface",
];

zapherModels.forEach((model, idx) => {
  addProduct({
    slug: `zapher-${model.name.replace(".3P", "-3p").toLowerCase()}`,
    name: `Zapher ${model.name} ${model.phase} Hybrid Inverter`,
    category: "Inverter",
    categorySlug: "inverter",
    brand: "Knox",
    series: "Zapher",
    inverterType: "hybrid",
    description: `The Zapher ${model.name} is a highly scalable ${model.phase.toLowerCase()} hybrid inverter with a rated power of ${model.power}. It features dual inputs (GEN/AC) for flexible generator/grid connection, support for up to ${model.pv} PV array input power, and IP65/IP66 environment protection. High-power models operate on a high-voltage battery range (200-900V) and support up to 4 MPPTs.`,
    shortDescription: `Scalable ${model.phase.toLowerCase()} hybrid inverter, rated at ${model.power} with dual GEN/AC inputs.`,
    image: "/images/Zapher-XZ-Single-Phase-Hybrid-Inverter.png",
    badge: idx === 5 ? "New" : undefined,
    specs: [
      { label: "Model", value: model.name },
      { label: "Phase Type", value: model.phase },
      { label: "Rated Power", value: model.power },
      { label: "Max. PV Input Power", value: model.pv },
      { label: "MPPT Trackers", value: idx < 5 ? "2" : "4" },
      { label: "Battery Voltage Range", value: idx < 5 ? "40 ~ 60 VDC" : "200 ~ 900 VDC" },
      { label: "Protection Rating", value: idx < 5 ? "IP66" : "IP65" },
      { label: "Weight", value: model.weight },
      { label: "Dimensions", value: model.dim },
    ],
    features: zapherFeatures,
    priceRange: "Contact for Price",
    published: (model as any).published,
  });
});

// ===========================================
// 11. Powerwall Series Lithium ESS Batteries
// ===========================================
const powerwallModels = [
  { name: "3.0", modelNo: "LIO 2.56-IP20", capacity: "100 Ah", voltage: "25.6 V", energy: "2.56 kWh", ip: "IP20", weight: "25.6 kg", dim: "470 × 300 × 150 mm" },
  { name: "4.15", modelNo: "LIO 3.84-IP54", capacity: "150 Ah", voltage: "25.6 V", energy: "3.84 kWh", ip: "IP54", weight: "25.6 kg", dim: "350 × 180 × 450 mm" },
  { name: "6.0", modelNo: "LIO 5.20-IP20", capacity: "100 Ah", voltage: "51.2 V", energy: "5.12 kWh", ip: "IP20", weight: "44.5 kg", dim: "500 × 470 × 150 mm" },
  { name: "6.11", modelNo: "LIO 5.32-IP54", capacity: "100 Ah", voltage: "51.2 V", energy: "5.12 kWh", ip: "IP54", weight: "44.1 kg", dim: "460 × 180 × 500 mm" },
];

const powerwallFeatures = [
  "Grade-A brand new prismatic LiFePO4 cells for maximum safety",
  "Built-in smart PACE BMS with cell balancing and full electrical protection",
  "Vibrant LCD status display and touch control interface (4.15, 6.11)",
  "Parallel expansion capability up to 15 units (3.0/6.0) or 8 units (6.11)",
  "Long 5-year warranty with 6000+ cycle guarantee",
  "Compatible with top inverter brands: GoodWe, Deye, Solis, SMA, Victron",
];

powerwallModels.forEach((model, idx) => {
  addProduct({
    slug: `powerwall-${model.name.replace(".", "-").toLowerCase()}`,
    name: `Knox Powerwall ${model.name} Lithium ESS Battery`,
    category: "Battery",
    categorySlug: "battery",
    brand: "Knox",
    series: "Powerwall",
    description: `The Knox Powerwall ${model.name} is a high-density, wall-mounted lithium energy storage system (ESS). Utilizing Grade-A brand new prismatic LiFePO4 cells, it offers a nominal voltage of ${model.voltage}, energy capacity of ${model.energy}, and integrates a smart PACE BMS. Built for safety and reliability, it offers up to 6000+ cycles at 90% DOD, LCD touch display monitoring, and compatibility with top hybrid inverters.`,
    shortDescription: `Wall-mounted Lithium ESS battery, capacity ${model.energy} with smart PACE BMS.`,
    image: "/images/Knox-Powerwall-Lithium-ESS-Battery.png",
    badge: idx === 3 ? "Popular" : undefined,
    specs: [
      { label: "Model", value: `Powerwall ${model.name}` },
      { label: "Model Number", value: model.modelNo },
      { label: "Energy Capacity", value: model.energy },
      { label: "Nominal Capacity", value: model.capacity },
      { label: "Nominal Voltage", value: model.voltage },
      { label: "Battery Chemistry", value: "LiFePO4 (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "6000+ Cycles @ 90% DOD" },
      { label: "BMS Type", value: "Integrated Smart PACE BMS" },
      { label: "Protection Rating", value: "IP66" },
      { label: "Dimensions", value: model.dim },
      { label: "Weight", value: model.weight },
    ],
    features: powerwallFeatures,
    priceRange: "Contact for Price",
    published: (model as any).published,
  });
});

// ==========================================
// 12. Powerbase Series Wheeled ESS Batteries
// ==========================================
const powerbaseModels = [
  { name: "Powerbase 10", capacity: "200 Ah", energy: "10.24 kWh", weight: "88.5 kg", dim: "615 × 500 × 260 mm", current: "200 A" },
  { name: "Powerbase 16", capacity: "314 Ah", energy: "16.07 kWh", weight: "119.5 kg", dim: "520 × 245 × 880 mm", current: "200 A" },
  { name: "Powerbase 32", capacity: "628 Ah", energy: "32.15 kWh", weight: "248.0 kg", dim: "760 × 400 × 760 mm", current: "300 A" },
];

const powerbaseFeatures = [
  "High-capacity floor-standing layout with heavy-duty caster wheels",
  "Robust IP54 enclosure rating for dust and splash protection",
  "Smart HMI touchable monitor for detailed cell voltage diagnostics",
  "Supports parallel linking up to 15 units (Powerbase 10) or 8 units (16/32)",
  "Outstanding cycle life of over 8000 deep discharge cycles",
  "Fast charging and high continuous discharge currents (up to 300A on Powerbase 32)",
];

powerbaseModels.forEach((model) => {
  addProduct({
    slug: model.name.toLowerCase().replace(" ", "-"),
    name: `Knox ${model.name} Wheeled ESS Battery`,
    category: "Battery",
    categorySlug: "battery",
    brand: "Knox",
    series: "Powerbase",
    description: `The Knox ${model.name} is a high-capacity floor-standing wheeled Lithium energy storage system (ESS). Specifically designed for heavy-duty residential and commercial solar backup, it offers a huge energy capacity of ${model.energy} at 51.2V. Features heavy-duty lockable caster wheels, IP54 splash protection, and a smart touchable HMI diagnostics screen.`,
    shortDescription: `Floor-standing wheeled Lithium storage battery, capacity ${model.energy} with touch HMI.`,
    image: "/images/Knox-Powerbase-Lithium-ESS-Battery.png",
    specs: [
      { label: "Model", value: model.name },
      { label: "Energy Capacity", value: model.energy },
      { label: "Nominal Capacity", value: model.capacity },
      { label: "Nominal Voltage", value: "51.2 V" },
      { label: "Max. Continuous Discharge", value: model.current },
      { label: "Battery Chemistry", value: "LiFePO4 (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "8000+ Cycles" },
      { label: "Protection Rating", value: "IP54 Rated Enclosure" },
      { label: "Dimensions", value: model.dim },
      { label: "Weight", value: model.weight },
    ],
    features: powerbaseFeatures,
    priceRange: "Contact for Price",
    published: (model as any).published,
  });
});

// ===========================================
// 13. Xentra VFD Series Solar Pump Inverters
// ===========================================
const xentraModels = [
  { name: "Xentra VFD 0.75K-3.7K", power: "0.75 kW - 3.7 kW", input: "1PH 220-240V / 3PH 380-440V" },
  { name: "Xentra VFD 5.5K-22K", power: "5.5 kW - 22 kW", input: "3PH 380V - 480V" },
];

const xentraFeatures = [
  "High MPPT tracking efficiency of 99.9% to maximize pump flow rate",
  "Supports both induction motors and permanent magnet synchronous pumps",
  "Conformal coating on PCB boards to withstand humid and dusty environments",
  "Built-in dynamic braking unit and automatic slip compensation",
  "Protections: dry-run detection, motor short-circuit, phase loss, overvoltage",
  "Control motor deceleration to a safe stop during sudden power failure",
];

xentraModels.forEach((model) => {
  addProduct({
    slug: model.name.toLowerCase().replace(/ /g, "-"),
    name: `Knox ${model.name} Solar Pump Inverter`,
    category: "VFD",
    categorySlug: "vfd",
    brand: "Knox",
    series: "Xentra VFD",
    description: `The Knox ${model.name} is a specialized solar variable frequency drive (VFD) optimized for agricultural pumping. Supporting a power output range of ${model.power}, it includes multiple control modes (V/F, SVC, FVC), 99.9% MPPT efficiency to maximize pump flow, conformal board coating for outdoor agriculture environments, and dynamic braking.`,
    shortDescription: `Solar variable frequency drive (VFD) pump inverter, supporting ${model.power}.`,
    image: "/images/Knox-Xentra-VFD-Solar-Pump-Inverter.png",
    specs: [
      { label: "Model", value: model.name },
      { label: "Power Range", value: model.power },
      { label: "AC Input Voltage", value: model.input },
      { label: "Output Voltage", value: "0 to Input Voltage" },
      { label: "Max. Frequency", value: "500 Hz" },
      { label: "MPPT Efficiency", value: "99.9%" },
      { label: "Control Modes", value: "V/F, Open-loop Vector (SVC), Close-loop Vector (FVC)" },
      { label: "Starting Torque", value: "150% at 0.5Hz" },
      { label: "Enclosure Class", value: "IP20" },
      { label: "Communication", value: "RS-485 MODBUS" },
    ],
    features: xentraFeatures,
    priceRange: "Contact for Price",
    published: (model as any).published,
  });
});

// ===========================================
// 14. Monitoring Sticks
// ===========================================
const monitoringModels = [
  { name: "Wi-Fi Stick", network: "2.4GHz Wi-Fi (802.11b/g/n)", power: "2 W" },
  { name: "4G LTE Stick", network: "4G LTE (FDD-LTE B1/B3/B5/B7/B8/B20)", power: "5 W" },
];

const monitoringFeatures = [
  "Plug-and-play DB9/USB design for instant setup",
  "IP66 waterproof casing allows outdoor inverter datalogging",
  "Local memory backup prevents data loss during internet outages",
  "QR code on stick for quick mobile app pairing and registration",
  "Enables real-time and historical graphs via Knox Cloud & mobile app",
  "Sends automated email performance reports and fault notifications",
];

monitoringModels.forEach((model) => {
  addProduct({
    slug: `knox-com-${model.name.toLowerCase().replace(/ /g, "-")}`,
    name: `Knox ${model.name} Inverter Datalogger`,
    category: "Monitoring & Accessories",
    categorySlug: "accessories",
    description: `The Knox ${model.name} is a plug-and-play datalogger designed to connect Knox inverters directly to the Knox Cloud monitoring portal. It collects operational status, battery levels, and energy generation data, uploading it via ${model.network}. Rated IP66, it operates reliably in outdoor setups and has local storage to safeguard data during network downtime.`,
    shortDescription: `Plug-and-play datalogger stick supporting ${model.network} and IP66 casing.`,
    image: "/images/no-image.svg",
    specs: [
      { label: "Model", value: model.name },
      { label: "Network Connectivity", value: model.network },
      { label: "Inverters Supported", value: "Up to 5 devices" },
      { label: "Indicators", value: "2x Status LEDs" },
      { label: "Power Consumption", value: model.power },
      { label: "Ingress Protection", value: "IP66" },
      { label: "Dimensions", value: "51 × 112 × 27 mm" },
      { label: "Operating Temperature", value: "-30°C to +70°C" },
      { label: "Data Backup Storage", value: "Minimum 7 days local buffer" },
    ],
    features: monitoringFeatures,
    priceRange: "Contact for Price",
    published: true,
  });
});

// Export all products on the website (both published and coming soon)
export const products = productsList;

// Category metadata list defining the standard categories based on product types
const rawCategories = [
  {
    name: "Inverter",
    slug: "inverter",
    description: "Knox Hybrid, Off-Grid & On-Grid Inverters",
    icon: "Zap",
  },
  {
    name: "Battery",
    slug: "battery",
    description: "Knox Lithium Energy Storage Batteries (ESS)",
    icon: "Battery",
  },
  {
    name: "VFD",
    slug: "vfd",
    description: "Knox Xentra VFD Solar Pump Inverters",
    icon: "Gauge",
  },
  {
    name: "Solar Solution",
    slug: "solar-solution",
    description: "Knox Complete Solar Solutions & Packages",
    icon: "Sun",
  },
  {
    name: "Monitoring & Accessories",
    slug: "accessories",
    description: "Knox Smart Datalogging & Communication Devices",
    icon: "Cable",
  },
];

// Dynamically generate category count based only on published models
export const productCategories: ProductCategory[] = rawCategories.map((cat) => ({
  ...cat,
  productCount: products.filter((p) => p.categorySlug === cat.slug).length,
}));
