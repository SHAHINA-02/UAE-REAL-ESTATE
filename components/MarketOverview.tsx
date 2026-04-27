"use client";

import { MARKET_STATS, NEIGHBORHOODS } from "@/lib/propertyData";
import { TrendingUp, Building2, Globe, Users } from "lucide-react";

export default function MarketOverview() {
  const topNeighborhoods = NEIGHBORHOODS.sort(
    (a, b) => b.priceGrowthYoY - a.priceGrowthYoY
  ).slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Market KPIs */}
      <div
        className="glass-card rounded-xl p-4"
        style={{ border: "1px solid rgba(200, 134, 30, 0.2)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #c8861e, #875212)" }}
          />
          <h3
            className="text-sm font-medium"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-display)" }}
          >
            2024 Market Snapshot
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            {
              icon: Building2,
              label: "Transactions",
              value: "177K+",
              sub: "record high",
              color: "#4ade80",
            },
            {
              icon: TrendingUp,
              label: "Total Value",
              value: "AED 634B",
              sub: "+36% YoY",
              color: "var(--gold)",
            },
            {
              icon: Globe,
              label: "Foreign Buyers",
              value: "42%",
              sub: "of market",
              color: "#60a5fa",
            },
            {
              icon: Users,
              label: "Off-Plan Share",
              value: "58%",
              sub: "of sales",
              color: "#f472b6",
            },
          ].map(({ icon: Icon, label, value, sub, color }) => (
            <div
              key={label}
              className="rounded-lg p-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Icon size={14} style={{ color }} className="mb-1" />
              <div
                className="text-base font-bold"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
              >
                {value}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {label}
              </div>
              <div className="text-xs mt-0.5" style={{ color }}>
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top neighborhoods by growth */}
      <div
        className="glass-card rounded-xl p-4"
        style={{ border: "1px solid rgba(200, 134, 30, 0.2)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #c8861e, #875212)" }}
          />
          <h3
            className="text-sm font-medium"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-display)" }}
          >
            Hottest Neighborhoods
          </h3>
        </div>

        <div className="space-y-3">
          {topNeighborhoods.map((n, i) => (
            <div key={n.name} className="flex items-center gap-3">
              <span
                className="text-xs font-bold w-5 flex-shrink-0 text-center"
                style={{ color: i === 0 ? "var(--gold)" : "var(--text-muted)" }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span
                    className="text-xs font-medium truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {n.name}
                  </span>
                  <span className="text-xs ml-2 flex-shrink-0" style={{ color: "#4ade80" }}>
                    +{n.priceGrowthYoY}%
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="h-1 rounded-full flex-1"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(n.priceGrowthYoY / 20) * 100}%`,
                        background:
                          i === 0
                            ? "linear-gradient(90deg, #c8861e, #e8c06e)"
                            : "rgba(200,134,30,0.4)",
                      }}
                    />
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                    {n.rentalYield}% yield
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top buyer nationalities */}
      <div
        className="glass-card rounded-xl p-4"
        style={{ border: "1px solid rgba(200, 134, 30, 0.2)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #c8861e, #875212)" }}
          />
          <h3
            className="text-sm font-medium"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-display)" }}
          >
            Top Buyer Nationalities
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {MARKET_STATS.topNationalities.map((n, i) => (
            <span
              key={n}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background:
                  i === 0 ? "rgba(200, 134, 30, 0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 0 ? "rgba(200,134,30,0.3)" : "rgba(255,255,255,0.08)"}`,
                color: i === 0 ? "var(--gold-light)" : "var(--text-secondary)",
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
