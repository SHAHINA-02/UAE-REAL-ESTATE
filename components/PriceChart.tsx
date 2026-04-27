"use client";

import { useEffect, useRef } from "react";
import { PRICE_HISTORY } from "@/lib/propertyData";

interface PriceChartProps {
  neighborhoods?: string[];
  title?: string;
}

const COLORS = [
  "#c8861e",
  "#4ade80",
  "#60a5fa",
  "#f472b6",
  "#a78bfa",
];

export default function PriceChart({
  neighborhoods = Object.keys(PRICE_HISTORY.datasets),
  title = "Price Per Sqft (AED) — Historical Trends",
}: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<unknown>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const loadChart = async () => {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (chartRef.current) {
        (chartRef.current as { destroy: () => void }).destroy();
      }

      const datasets = neighborhoods
        .filter((n) => PRICE_HISTORY.datasets[n as keyof typeof PRICE_HISTORY.datasets])
        .map((name, i) => ({
          label: name,
          data: PRICE_HISTORY.datasets[name as keyof typeof PRICE_HISTORY.datasets],
          borderColor: COLORS[i % COLORS.length],
          backgroundColor: COLORS[i % COLORS.length] + "20",
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: true,
          tension: 0.4,
        }));

      chartRef.current = new Chart(canvasRef.current!, {
        type: "line",
        data: {
          labels: PRICE_HISTORY.labels,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: "index",
          },
          plugins: {
            legend: {
              labels: {
                color: "#a09070",
                font: { size: 11 },
                boxWidth: 12,
                padding: 16,
              },
            },
            tooltip: {
              backgroundColor: "rgba(13, 17, 23, 0.95)",
              borderColor: "rgba(200, 134, 30, 0.3)",
              borderWidth: 1,
              titleColor: "#f0e8d8",
              bodyColor: "#a09070",
              callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: AED ${(ctx.parsed.y ?? 0).toLocaleString()}/sqft`,  
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#5a5040",
                font: { size: 10 },
                maxRotation: 45,
              },
              grid: { color: "rgba(200, 134, 30, 0.06)" },
            },
            y: {
              ticks: {
                color: "#5a5040",
                font: { size: 10 },
                callback: (v) => `${(v as number).toLocaleString()}`,
              },
              grid: { color: "rgba(200, 134, 30, 0.06)" },
            },
          },
        },
      });
    };

    loadChart();

    return () => {
      if (chartRef.current) {
        (chartRef.current as { destroy: () => void }).destroy();
      }
    };
  }, [neighborhoods]);

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
          {title}
        </h3>
      </div>
      <div style={{ height: "220px" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
