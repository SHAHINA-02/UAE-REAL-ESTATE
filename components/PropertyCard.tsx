"use client";

import { Property } from "@/lib/propertyData";
import { Bed, Bath, Square, TrendingUp, MapPin } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export default function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const formatPrice = (price: number) =>
    price >= 1_000_000
      ? `AED ${(price / 1_000_000).toFixed(2)}M`
      : `AED ${(price / 1_000).toFixed(0)}K`;

  return (
    <div
      className="property-card glass-card rounded-xl overflow-hidden cursor-pointer"
      style={{ borderColor: "rgba(200, 134, 30, 0.15)" }}
    >
      {/* Header gradient */}
      <div
        className="h-2 w-full"
        style={{
          background: "linear-gradient(90deg, #c8861e, #875212)",
        }}
      />

      <div className={compact ? "p-3" : "p-4"}>
        {/* Title & Location */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-display font-semibold leading-tight ${compact ? "text-sm" : "text-base"}`}
              style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
            >
              {property.title}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
              style={{
                background: "rgba(200, 134, 30, 0.15)",
                color: "var(--gold-light)",
                border: "1px solid rgba(200, 134, 30, 0.3)",
              }}
            >
              {property.type}
            </span>
          </div>
          <div
            className="flex items-center gap-1 mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            <MapPin size={11} />
            <span className="text-xs">
              {property.neighborhood}, {property.city}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div
            className="text-xl font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--gold-light)",
            }}
          >
            {formatPrice(property.price)}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
            AED {property.pricePerSqft.toLocaleString()} / sqft
          </div>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-3 mb-3 text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          {property.bedrooms > 0 ? (
            <span className="flex items-center gap-1">
              <Bed size={12} />
              {property.bedrooms} BR
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Bed size={12} />
              Studio
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={12} />
            {property.bathrooms} BA
          </span>
          <span className="flex items-center gap-1">
            <Square size={12} />
            {property.sqft.toLocaleString()} sqft
          </span>
        </div>

        {/* ROI & Developer */}
        <div
          className="flex items-center justify-between text-xs pt-3"
          style={{ borderTop: "1px solid rgba(200, 134, 30, 0.1)" }}
        >
          <span className="flex items-center gap-1" style={{ color: "#4ade80" }}>
            <TrendingUp size={11} />
            {property.roi}% ROI
          </span>
          <span style={{ color: "var(--text-muted)" }}>{property.developer}</span>
          <span style={{ color: "var(--text-muted)" }}>{property.yearBuilt}</span>
        </div>

        {/* Amenities */}
        {!compact && (
          <div className="flex flex-wrap gap-1 mt-3">
            {property.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--text-secondary)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {a}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ color: "var(--text-muted)" }}
              >
                +{property.amenities.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
