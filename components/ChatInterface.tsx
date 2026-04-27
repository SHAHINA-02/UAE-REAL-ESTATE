"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import { PROPERTIES, NEIGHBORHOODS, calculateMortgage } from "@/lib/propertyData";
import PropertyCard from "./PropertyCard";
import PriceChart from "./PriceChart";
import MortgageCalc from "./MortgageCalc";
import PropertyMap from "./PropertyMap";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  properties?: typeof PROPERTIES;
  chart?: { neighborhoods: string[] };
  mortgage?: { price: number };
  map?: boolean;
}

const SUGGESTIONS = [
  "Find me a 2BR apartment in Dubai Marina under AED 3M",
  "Compare Downtown Dubai vs Palm Jumeirah for investment",
  "What's the rental yield in Abu Dhabi's Saadiyat Island?",
  "Calculate mortgage for a AED 2.5M property",
  "Best neighborhoods for ROI in Dubai 2024",
  "Show me luxury villas on Palm Jumeirah",
];

function parseCommands(text: string) {
  const result: {
    cleanText: string;
    properties?: typeof PROPERTIES;
    chart?: { neighborhoods: string[] };
    mortgage?: { price: number };
    map?: boolean;
  } = { cleanText: text };

  // Parse FILTER_PROPERTIES
  const filterMatch = text.match(/\[FILTER_PROPERTIES:\s*({[^}]+})\]/);
  if (filterMatch) {
    try {
      const params = JSON.parse(filterMatch[1]);
      let filtered = [...PROPERTIES];
      if (params.city) filtered = filtered.filter((p) => p.city === params.city);
      if (params.maxPrice) filtered = filtered.filter((p) => p.price <= params.maxPrice);
      if (params.minPrice) filtered = filtered.filter((p) => p.price >= params.minPrice);
      if (params.bedrooms !== undefined)
        filtered = filtered.filter((p) => p.bedrooms >= params.bedrooms);
      if (params.type) filtered = filtered.filter((p) => p.type === params.type);
      result.properties = filtered.slice(0, 4);
      result.cleanText = text.replace(filterMatch[0], "").trim();
    } catch {}
  }

  // Parse SHOW_CHART
  const chartMatch = text.match(/\[SHOW_CHART:\s*({[^}]+})\]/);
  if (chartMatch) {
    try {
      const params = JSON.parse(chartMatch[1]);
      const name = params.neighborhood || params.neighborhoods?.[0];
      result.chart = {
        neighborhoods: name
          ? NEIGHBORHOODS.map((n) => n.name).filter((n) =>
              n.toLowerCase().includes(name.toLowerCase())
            )
          : Object.keys({ "Downtown Dubai": 1, "Dubai Marina": 1, "Palm Jumeirah": 1 }),
      };
      result.cleanText = result.cleanText.replace(chartMatch[0], "").trim();
    } catch {}
  }

  // Parse CALC_MORTGAGE
  const mortgageMatch = text.match(/\[CALC_MORTGAGE:\s*({[^}]+})\]/);
  if (mortgageMatch) {
    try {
      const params = JSON.parse(mortgageMatch[1]);
      result.mortgage = { price: params.price || 2000000 };
      result.cleanText = result.cleanText.replace(mortgageMatch[0], "").trim();
    } catch {}
  }

  // Parse SHOW_NEIGHBORHOOD
  const neighborhoodMatch = text.match(/\[SHOW_NEIGHBORHOOD:\s*({[^}]+})\]/);
  if (neighborhoodMatch) {
    result.map = true;
    result.cleanText = result.cleanText.replace(neighborhoodMatch[0], "").trim();
  }

  return result;
}

function formatMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--gold-light)">$1</strong>')
    .replace(/^### (.*)/gm, '<h3 style="font-family:var(--font-display);color:var(--gold-light);font-size:0.95rem;margin:0.8rem 0 0.3rem">$1</h3>')
    .replace(/^## (.*)/gm, '<h2 style="font-family:var(--font-display);color:var(--gold-light);font-size:1.05rem;margin:0.8rem 0 0.3rem">$1</h2>')
    .replace(/^• (.*)/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:var(--gold);margin-top:2px">◆</span><span>$1</span></div>')
    .replace(/^- (.*)/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:var(--gold);margin-top:2px">◆</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "**Marhaba! I'm Zayed**, your UAE property intelligence advisor.\n\nI can help you search Dubai and Abu Dhabi real estate, analyze prices, explore neighborhoods, calculate mortgages, and identify the best investment opportunities.\n\nWhat are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const aiMsgId = (Date.now() + 1).toString();
    const aiMsg: Message = { id: aiMsgId, role: "assistant", content: "" };
    setMessages((prev) => [...prev, aiMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                const parsed2 = parseCommands(fullText);
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === aiMsgId
                      ? {
                          ...m,
                          content: parsed2.cleanText,
                          properties: parsed2.properties,
                          chart: parsed2.chart,
                          mortgage: parsed2.mortgage,
                          map: parsed2.map,
                        }
                      : m
                  )
                );
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiMsgId
            ? { ...m, content: "I encountered an error. Please check your API key and try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        role: "assistant",
        content:
          "**Marhaba! I'm Zayed**, your UAE property intelligence advisor.\n\nI can help you search Dubai and Abu Dhabi real estate, analyze prices, explore neighborhoods, calculate mortgages, and identify the best investment opportunities.\n\nWhat are you looking for today?",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`fade-in flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-full w-full ${msg.role === "user" ? "message-user" : "message-ai"} rounded-xl p-4`}
            >
              {msg.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #c8861e, #875212)",
                    }}
                  >
                    <Sparkles size={12} color="white" />
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--gold)", fontFamily: "var(--font-display)" }}
                  >
                    Zayed
                  </span>
                </div>
              )}

              <div
                className={`text-sm leading-relaxed ${
                  idx === messages.length - 1 &&
                  isLoading &&
                  msg.role === "assistant" &&
                  !msg.content
                    ? "cursor-blink"
                    : ""
                }`}
                style={{ color: "var(--text-primary)" }}
                dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }}
              />

              {/* Rich content */}
              {msg.properties && msg.properties.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-3">
                  {msg.properties.map((p) => (
                    <PropertyCard key={p.id} property={p} compact />
                  ))}
                </div>
              )}

              {msg.chart && (
                <div className="mt-4">
                  <PriceChart neighborhoods={msg.chart.neighborhoods} />
                </div>
              )}

              {msg.mortgage && (
                <div className="mt-4">
                  <MortgageCalc initialPrice={msg.mortgage.price} />
                </div>
              )}

              {msg.map && (
                <div className="mt-4">
                  <PropertyMap properties={PROPERTIES.slice(0, 6)} />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && messages[messages.length - 1]?.content === "" && (
          <div className="flex justify-start">
            <div className="message-ai rounded-xl p-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #c8861e, #875212)" }}
                >
                  <Sparkles size={12} color="white" />
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full shimmer"
                      style={{
                        background: "var(--gold)",
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: "rgba(200,134,30,0.08)",
                  border: "1px solid rgba(200,134,30,0.2)",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(200,134,30,0.15)";
                  e.currentTarget.style.color = "var(--gold-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(200,134,30,0.08)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div
        className="p-4 border-t"
        style={{ borderColor: "rgba(200, 134, 30, 0.15)" }}
      >
        <div
          className="flex items-end gap-3 rounded-xl p-3"
          style={{
            background: "var(--bg-card)",
            border: "1px solid rgba(200, 134, 30, 0.2)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about UAE properties, prices, neighborhoods..."
            className="flex-1 bg-transparent text-sm resize-none outline-none"
            style={{
              color: "var(--text-primary)",
              caretColor: "var(--gold)",
              maxHeight: "120px",
              minHeight: "40px",
            }}
            rows={1}
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={resetChat}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--text-muted)" }}
              title="Reset chat"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="btn-gold p-2 rounded-lg disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
        <div className="text-center mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
          Powered by Claude AI · UAE Real Estate Intelligence
        </div>
      </div>
    </div>
  );
}
