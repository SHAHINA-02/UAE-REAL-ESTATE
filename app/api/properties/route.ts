import { NextRequest, NextResponse } from "next/server";
import { PROPERTIES } from "@/lib/propertyData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  let properties = [...PROPERTIES];

  const city = searchParams.get("city");
  if (city) properties = properties.filter((p) => p.city === city);

  const type = searchParams.get("type");
  if (type) properties = properties.filter((p) => p.type === type);

  const minPrice = searchParams.get("minPrice");
  if (minPrice) properties = properties.filter((p) => p.price >= Number(minPrice));

  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice) properties = properties.filter((p) => p.price <= Number(maxPrice));

  const bedrooms = searchParams.get("bedrooms");
  if (bedrooms) properties = properties.filter((p) => p.bedrooms >= Number(bedrooms));

  const neighborhood = searchParams.get("neighborhood");
  if (neighborhood)
    properties = properties.filter((p) =>
      p.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
    );

  return NextResponse.json(properties);
}
