export interface Property {
  id: string;
  title: string;
  type: "apartment" | "villa" | "penthouse" | "townhouse" | "studio";
  city: "Dubai" | "Abu Dhabi";
  neighborhood: string;
  price: number;
  pricePerSqft: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  amenities: string[];
  lat: number;
  lng: number;
  roi: number;
  yearBuilt: number;
  developer: string;
  description: string;
}

export interface Neighborhood {
  name: string;
  city: "Dubai" | "Abu Dhabi";
  avgPricePerSqft: number;
  priceGrowthYoY: number;
  rentalYield: number;
  description: string;
  highlights: string[];
  lat: number;
  lng: number;
}

export const PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Luxury Marina Apartment",
    type: "apartment",
    city: "Dubai",
    neighborhood: "Dubai Marina",
    price: 2850000,
    pricePerSqft: 1650,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1727,
    amenities: ["Pool", "Gym", "Concierge", "Marina View", "Parking"],
    lat: 25.0819,
    lng: 55.1367,
    roi: 6.2,
    yearBuilt: 2021,
    developer: "Emaar",
    description:
      "Stunning 2BR in the heart of Dubai Marina with panoramic sea views and world-class amenities.",
  },
  {
    id: "p2",
    title: "Downtown Burj View Penthouse",
    type: "penthouse",
    city: "Dubai",
    neighborhood: "Downtown Dubai",
    price: 12500000,
    pricePerSqft: 3200,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 3906,
    amenities: ["Private Pool", "Burj Khalifa View", "Smart Home", "Butler", "Spa"],
    lat: 25.1972,
    lng: 55.2744,
    roi: 4.8,
    yearBuilt: 2020,
    developer: "Emaar",
    description:
      "Iconic penthouse with direct Burj Khalifa views. The pinnacle of Downtown living.",
  },
  {
    id: "p3",
    title: "Palm Jumeirah Signature Villa",
    type: "villa",
    city: "Dubai",
    neighborhood: "Palm Jumeirah",
    price: 18000000,
    pricePerSqft: 2800,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6428,
    amenities: ["Private Beach", "Pool", "Home Cinema", "Garden", "4-Car Garage"],
    lat: 25.1124,
    lng: 55.139,
    roi: 5.1,
    yearBuilt: 2019,
    developer: "Nakheel",
    description:
      "Frond villa on the Palm with private beachfront and unobstructed sea views.",
  },
  {
    id: "p4",
    title: "JBR Beachfront Studio",
    type: "studio",
    city: "Dubai",
    neighborhood: "Jumeirah Beach Residence",
    price: 980000,
    pricePerSqft: 1420,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 690,
    amenities: ["Beach Access", "Pool", "Gym", "Retail Below"],
    lat: 25.0759,
    lng: 55.1309,
    roi: 7.4,
    yearBuilt: 2022,
    developer: "Dubai Properties",
    description:
      "High-yield studio steps from JBR beach. Perfect for investors seeking strong rental returns.",
  },
  {
    id: "p5",
    title: "Business Bay Canal Apartment",
    type: "apartment",
    city: "Dubai",
    neighborhood: "Business Bay",
    price: 1650000,
    pricePerSqft: 1380,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 1195,
    amenities: ["Canal View", "Pool", "Gym", "Co-working Space", "Lounge"],
    lat: 25.1855,
    lng: 55.2654,
    roi: 6.8,
    yearBuilt: 2023,
    developer: "DAMAC",
    description:
      "Contemporary 1BR overlooking the Dubai Water Canal. Walking distance to Downtown.",
  },
  {
    id: "p6",
    title: "Arabian Ranches Family Villa",
    type: "villa",
    city: "Dubai",
    neighborhood: "Arabian Ranches",
    price: 4200000,
    pricePerSqft: 980,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4285,
    amenities: ["Garden", "Pool", "Golf Course Access", "Gated Community", "Schools Nearby"],
    lat: 25.0505,
    lng: 55.2694,
    roi: 5.6,
    yearBuilt: 2018,
    developer: "Emaar",
    description:
      "Spacious family villa in a lush gated community with golf course access and top schools.",
  },
  {
    id: "p7",
    title: "Saadiyat Island Cultural District Apartment",
    type: "apartment",
    city: "Abu Dhabi",
    neighborhood: "Saadiyat Island",
    price: 3100000,
    pricePerSqft: 1720,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1802,
    amenities: ["Beach Club", "Louvre Abu Dhabi Nearby", "Pool", "Gym", "Concierge"],
    lat: 24.5432,
    lng: 54.4328,
    roi: 5.9,
    yearBuilt: 2022,
    developer: "Aldar",
    description:
      "Premium apartment near the Louvre Abu Dhabi in the emirate's most prestigious cultural district.",
  },
  {
    id: "p8",
    title: "Al Reem Island Tower Apartment",
    type: "apartment",
    city: "Abu Dhabi",
    neighborhood: "Al Reem Island",
    price: 1420000,
    pricePerSqft: 1150,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1234,
    amenities: ["Sea View", "Pool", "Gym", "Nursery", "Supermarket"],
    lat: 24.5025,
    lng: 54.4088,
    roi: 6.5,
    yearBuilt: 2021,
    developer: "Aldar",
    description:
      "Well-priced 2BR on Al Reem Island, Abu Dhabi's fastest-growing investment district.",
  },
  {
    id: "p9",
    title: "Yas Island Waterfront Villa",
    type: "villa",
    city: "Abu Dhabi",
    neighborhood: "Yas Island",
    price: 6800000,
    pricePerSqft: 1580,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4303,
    amenities: ["Ferrari World Nearby", "Yas Marina", "Pool", "Garden", "Smart Home"],
    lat: 24.4883,
    lng: 54.6048,
    roi: 5.3,
    yearBuilt: 2020,
    developer: "Aldar",
    description:
      "Waterfront villa on Yas Island, home to world-class entertainment and F1 circuit.",
  },
  {
    id: "p10",
    title: "Creek Harbour 3BR Apartment",
    type: "apartment",
    city: "Dubai",
    neighborhood: "Dubai Creek Harbour",
    price: 2200000,
    pricePerSqft: 1480,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1486,
    amenities: ["Creek Tower View", "Pool", "Gym", "Retail Promenade", "Metro Access"],
    lat: 25.1965,
    lng: 55.3439,
    roi: 6.1,
    yearBuilt: 2023,
    developer: "Emaar",
    description:
      "Future-forward 3BR in Dubai Creek Harbour, set to host the world's next iconic tower.",
  },
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    name: "Dubai Marina",
    city: "Dubai",
    avgPricePerSqft: 1620,
    priceGrowthYoY: 11.2,
    rentalYield: 6.4,
    description:
      "Dubai's most iconic waterfront neighbourhood. A self-contained city within a city featuring the world's largest man-made marina.",
    highlights: ["Marina Walk", "JBR Beach nearby", "Metro access", "Nightlife hub"],
    lat: 25.0819,
    lng: 55.1367,
  },
  {
    name: "Downtown Dubai",
    city: "Dubai",
    avgPricePerSqft: 2950,
    priceGrowthYoY: 14.7,
    rentalYield: 5.2,
    description:
      "Home to Burj Khalifa and Dubai Mall. The ultimate address for prestige and lifestyle, with unmatched capital appreciation.",
    highlights: ["Burj Khalifa", "Dubai Fountain", "Premium dining", "Cultural events"],
    lat: 25.1972,
    lng: 55.2744,
  },
  {
    name: "Palm Jumeirah",
    city: "Dubai",
    avgPricePerSqft: 2750,
    priceGrowthYoY: 18.3,
    rentalYield: 5.5,
    description:
      "The world-famous palm-shaped island. Ultra-luxury villas and apartments with private beaches and Atlantis views.",
    highlights: ["Private beaches", "5-star hotels", "Nakheel Mall", "Atlantis access"],
    lat: 25.1124,
    lng: 55.139,
  },
  {
    name: "Business Bay",
    city: "Dubai",
    avgPricePerSqft: 1350,
    priceGrowthYoY: 9.8,
    rentalYield: 6.9,
    description:
      "Dubai's central business district with a thriving residential community. Excellent ROI and rapidly improving infrastructure.",
    highlights: ["Canal views", "Proximity to Downtown", "Metro planned", "Co-working spaces"],
    lat: 25.1855,
    lng: 55.2654,
  },
  {
    name: "Jumeirah Beach Residence",
    city: "Dubai",
    avgPricePerSqft: 1390,
    priceGrowthYoY: 10.5,
    rentalYield: 7.2,
    description:
      "Beachfront living at its most accessible. High rental yields driven by tourists and long-term residents alike.",
    highlights: ["JBR Beach", "The Walk promenade", "Beach clubs", "Dining and retail"],
    lat: 25.0759,
    lng: 55.1309,
  },
  {
    name: "Arabian Ranches",
    city: "Dubai",
    avgPricePerSqft: 960,
    priceGrowthYoY: 8.2,
    rentalYield: 5.8,
    description:
      "Dubai's favourite family destination. Lush green communities with top schools, golf, and a village-like atmosphere.",
    highlights: ["Emaar Golf Club", "Top schools", "Community retail", "Gated security"],
    lat: 25.0505,
    lng: 55.2694,
  },
  {
    name: "Saadiyat Island",
    city: "Abu Dhabi",
    avgPricePerSqft: 1680,
    priceGrowthYoY: 15.1,
    rentalYield: 6.1,
    description:
      "Abu Dhabi's cultural crown jewel. Home to world-class museums and pristine beaches — the emirate's most prestigious address.",
    highlights: ["Louvre Abu Dhabi", "Guggenheim (coming)", "Natural beach", "NYU Abu Dhabi"],
    lat: 24.5432,
    lng: 54.4328,
  },
  {
    name: "Al Reem Island",
    city: "Abu Dhabi",
    avgPricePerSqft: 1120,
    priceGrowthYoY: 12.4,
    rentalYield: 6.8,
    description:
      "Abu Dhabi's fastest-growing investment hotspot. Modern towers, competitive pricing, and strong rental demand from professionals.",
    highlights: ["City views", "Reem Central Park", "Shams Abu Dhabi", "Banking district nearby"],
    lat: 24.5025,
    lng: 54.4088,
  },
  {
    name: "Yas Island",
    city: "Abu Dhabi",
    avgPricePerSqft: 1550,
    priceGrowthYoY: 13.6,
    rentalYield: 5.8,
    description:
      "Entertainment capital of Abu Dhabi. F1 Grand Prix, Ferrari World, and Yas Marina make it a global destination.",
    highlights: ["F1 Circuit", "Ferrari World", "Waterpark", "Yas Mall"],
    lat: 24.4883,
    lng: 54.6048,
  },
];

export const PRICE_HISTORY = {
  labels: ["Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022", "Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
  datasets: {
    "Downtown Dubai": [2100, 2200, 2380, 2500, 2600, 2700, 2780, 2850, 2900, 2930, 2950, 2950],
    "Dubai Marina": [1200, 1260, 1340, 1400, 1460, 1510, 1550, 1580, 1600, 1610, 1620, 1620],
    "Palm Jumeirah": [1900, 2050, 2200, 2350, 2450, 2530, 2620, 2680, 2720, 2740, 2750, 2750],
    "Saadiyat Island": [1200, 1280, 1360, 1430, 1490, 1540, 1580, 1610, 1640, 1660, 1680, 1680],
    "Al Reem Island": [820, 870, 920, 960, 1000, 1040, 1070, 1090, 1100, 1110, 1120, 1120],
  },
};

export const MARKET_STATS = {
  totalTransactions2024: 177000,
  totalValueBn: 634,
  yoyGrowth: 36.2,
  offPlanShare: 58,
  foreignBuyerShare: 42,
  topNationalities: ["Indian", "British", "Russian", "Chinese", "Pakistani"],
};

export function calculateMortgage(
  propertyPrice: number,
  downPaymentPct: number,
  annualRatePercent: number,
  termYears: number
) {
  const principal = propertyPrice * (1 - downPaymentPct / 100);
  const monthlyRate = annualRatePercent / 100 / 12;
  const numPayments = termYears * 12;
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;
  const registrationFee = propertyPrice * 0.04; // DLD fee
  const agencyFee = propertyPrice * 0.02;
  return {
    principal,
    monthlyPayment,
    totalPayment,
    totalInterest,
    registrationFee,
    agencyFee,
    totalCost: totalPayment + registrationFee + agencyFee + propertyPrice * (downPaymentPct / 100),
  };
}
