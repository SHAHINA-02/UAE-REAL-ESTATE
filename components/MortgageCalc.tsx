"use client";

import { useState, useEffect } from "react";
import { calculateMortgage } from "@/lib/propertyData";
import { DollarSign, TrendingUp, Calendar, Home } from "lucide-react";

interface MortgageCalcProps {
  initialPrice?: number;
}

export default function MortgageCalc({ initialPrice = 2000000 }: MortgageCalcProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);

  const result = calculateMortgage(price, downPayment, rate, years);

  const fmt = (n: number) =>
    n >= 1_000_000
      ? `AED ${(n / 1_000_000).toFixed(2)}M`
      : `AED ${Math.round(n).toLocaleString()}`;

  const SliderRow = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    display,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    display: string;
  }) => (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1.5">
        <span style={{ color: "var(--text-secondary)" }}>{label}</span>
        <span style={{ color: "var(--gold-light)" }} className="font-medium">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--gold) ${((value - min) / (max - min)) * 100}%, rgba(200,134,30,0.2) 0%)`,
          outline: "none",
        }}
      />
    </div>
  );

  const StatBox = ({
    icon: Icon,
    label,
    value,
    sub,
    highlight,
  }: {
    icon: typeof DollarSign;
    label: string;
    value: string;
    sub?: string;
    highlight?: boolean;
  }) => (
    <div
      className="rounded-lg p-3"
      style={{
        background: highlight ? "rgba(200, 134, 30, 0.1)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${highlight ? "rgba(200, 134, 30, 0.3)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={12} style={{ color: highlight ? "var(--gold)" : "var(--text-muted)" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
      </div>
      <div
        className="text-sm font-semibold"
        style={{
          color: highlight ? "var(--gold-light)" : "var(--text-primary)",
          fontFamily: "var(--font-display)",
        }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          {sub}
        </div>
      )}
    </div>
  );

  return (
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
          Mortgage Calculator
        </h3>
      </div>

      <SliderRow
        label="Property Price"
        value={price}
        min={500000}
        max={20000000}
        step={50000}
        onChange={setPrice}
        display={fmt(price)}
      />
      <SliderRow
        label="Down Payment"
        value={downPayment}
        min={20}
        max={50}
        step={5}
        onChange={setDownPayment}
        display={`${downPayment}% (${fmt(price * downPayment / 100)})`}
      />
      <SliderRow
        label="Interest Rate"
        value={rate}
        min={2}
        max={8}
        step={0.25}
        onChange={setRate}
        display={`${rate}% p.a.`}
      />
      <SliderRow
        label="Loan Term"
        value={years}
        min={5}
        max={25}
        step={5}
        onChange={setYears}
        display={`${years} years`}
      />

      <div className="grid grid-cols-2 gap-2 mt-4">
        <StatBox
          icon={DollarSign}
          label="Monthly Payment"
          value={fmt(result.monthlyPayment)}
          highlight
        />
        <StatBox
          icon={Home}
          label="Loan Amount"
          value={fmt(result.principal)}
        />
        <StatBox
          icon={TrendingUp}
          label="Total Interest"
          value={fmt(result.totalInterest)}
          sub="over loan term"
        />
        <StatBox
          icon={Calendar}
          label="Total Cost"
          value={fmt(result.totalCost)}
          sub="inc. DLD + agency"
        />
      </div>

      <div
        className="mt-3 rounded-lg p-3 text-xs"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          color: "var(--text-muted)",
        }}
      >
        <strong style={{ color: "var(--text-secondary)" }}>UAE Costs included:</strong> DLD
        registration (4% = {fmt(result.registrationFee)}) + Agency fee (2% ={" "}
        {fmt(result.agencyFee)})
      </div>
    </div>
  );
}
