"use client";

import { useState } from "react";
import { Building2, BarChart3, Calculator, Map, ChevronDown } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import MarketOverview from "@/components/MarketOverview";
import PriceChart from "@/components/PriceChart";
import MortgageCalc from "@/components/MortgageCalc";
import PropertyMap from "@/components/PropertyMap";
import { PROPERTIES } from "@/lib/propertyData";

type Tab = "market" | "charts" | "mortgage" | "map";

const TABS: { id: Tab; label: string; icon: typeof Building2 }[] = [
  { id: "market", label: "Market", icon: Building2 },
  { id: "charts", label: "Charts", icon: BarChart3 },
  { id: "mortgage", label: "Mortgage", icon: Calculator },
  { id: "map", label: "Map", icon: Map },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("market");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen noise-overlay"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient background glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background:
            "radial-gradient(ellipse, rgba(200, 134, 30, 0.04) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: "-20%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(ellipse, rgba(200, 134, 30, 0.03) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-4 md:px-6 py-3"
        style={{
          borderBottom: "1px solid rgba(200, 134, 30, 0.15)",
          background: "rgba(8, 13, 20, 0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #c8861e, #875212)",
              boxShadow: "0 0 20px rgba(200, 134, 30, 0.3)",
            }}
          >
            <span
              className="text-white font-bold text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Z
            </span>
          </div>
          <div>
            <h1
              className="text-base font-bold leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(135deg, #f2d9a8, #c8861e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Zayed
            </h1>
            <p className="text-xs leading-tight" style={{ color: "var(--text-muted)" }}>
              UAE Property Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="hidden md:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(74, 222, 128, 0.08)",
              border: "1px solid rgba(74, 222, 128, 0.2)",
              color: "#4ade80",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
            />
            Live Market Data
          </div>

          {/* Mobile sidebar toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--text-secondary)", border: "1px solid rgba(200,134,30,0.2)" }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronDown
              size={16}
              style={{
                transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="relative z-10 flex h-[calc(100vh-57px)]">
        {/* Left: Chat panel */}
        <div
          className="flex flex-col"
          style={{
            flex: "1 1 0%",
            minWidth: 0,
            borderRight: "1px solid rgba(200, 134, 30, 0.12)",
          }}
        >
          <ChatInterface />
        </div>

        {/* Right: Analytics panel */}
        <div
          className={`
            flex-col
            md:flex md:w-80 lg:w-96
            ${sidebarOpen ? "flex absolute inset-0 z-20 md:relative md:z-auto" : "hidden"}
          `}
          style={{ background: "var(--bg-secondary)" }}
        >
          {/* Tab navigation */}
          <div
            className="flex"
            style={{ borderBottom: "1px solid rgba(200, 134, 30, 0.15)" }}
          >
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setSidebarOpen(true);
                }}
                className="flex-1 flex flex-col items-center gap-0.5 py-3 text-xs transition-all"
                style={{
                  color: activeTab === id ? "var(--gold)" : "var(--text-muted)",
                  borderBottom: activeTab === id ? "2px solid var(--gold)" : "2px solid transparent",
                  background: activeTab === id ? "rgba(200,134,30,0.04)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "market" && <MarketOverview />}
            {activeTab === "charts" && (
              <div className="space-y-4">
                <PriceChart
                  neighborhoods={["Downtown Dubai", "Dubai Marina", "Palm Jumeirah"]}
                  title="Dubai — Price/Sqft Trends"
                />
                <PriceChart
                  neighborhoods={["Saadiyat Island", "Al Reem Island"]}
                  title="Abu Dhabi — Price/Sqft Trends"
                />
              </div>
            )}
            {activeTab === "mortgage" && <MortgageCalc />}
            {activeTab === "map" && (
              <PropertyMap
                properties={PROPERTIES}
                center={{ lat: 24.8, lng: 54.8 }}
                zoom={8}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
