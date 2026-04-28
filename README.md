# ZAYED — UAE PROPERTY INTELLIGENCE

### Your AI-Powered Real Estate Advisor for Dubai and Abu Dhabi

![Status](https://img.shields.io/badge/Status-Production-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Claude AI](https://img.shields.io/badge/Claude_AI-Anthropic-D97706?style=flat-square)

An AI-powered real estate intelligence platform for the UAE — combining a conversational property advisor, live market data, price trend charts, an interactive map, and a mortgage calculator in a single application.

**LIVE DEMO:** https://uae-real-estate-kappa.vercel.app

> Add screenshots here — drag and drop images into this file on GitHub.
https://github.com/SHAHINA-02/UAE-REAL-ESTATE/blob/90855b64417f2e4db26afab27b9f7f7109df3743/ZAYED%20SC/Screenshot%202026-04-29%20022507.png
---

## ABOUT

Zayed is a UAE property intelligence assistant that allows users to research, compare, and evaluate real estate across Dubai and Abu Dhabi through natural conversation. Unlike traditional property portals, Zayed combines AI-driven advisory with live market data, neighbourhood insights, price-per-sqft trend charts, and an interactive property map — eliminating the need to switch between multiple tools.

---

## HOW IT WORKS

```
User Query  →  Claude AI (Anthropic)  →  Property Analysis + Market Data
                                              ↓
                          Charts  |  Map (Leaflet)  |  Mortgage Calculator
```

---

## FEATURES

**AI Advisor — Zayed**
- Conversational property search across Dubai and Abu Dhabi
- Neighbourhood comparisons with average price per sqft and rental yields
- Investment analysis: YoY growth, foreign buyer share, off-plan market data
- Sub-community breakdowns (e.g. JBR, JVC, JVT, Saadiyat Island, Al Reem Island)

**Market Dashboard**
- 2024 market snapshot: 177K+ transactions, AED 634B total value (+36% YoY)
- Hottest neighbourhoods ranked by price growth and rental yield
- Live market data indicator

**Price Trend Charts**
- Dubai: Downtown Dubai, Dubai Marina, Palm Jumeirah — Price/Sqft trends from 2022–2024
- Abu Dhabi: Saadiyat Island, Al Reem Island — historical price trends

**Interactive Map**
- Property pins across Dubai and Abu Dhabi via Leaflet + OpenStreetMap
- Visual exploration of listings by location

**Mortgage Calculator**
- Property price, down payment, interest rate, and loan term inputs
- Outputs: monthly payment, loan amount, total interest, total cost
- UAE-specific costs included: DLD registration (4%) and agency fee (2%)

---

## TECH STACK

| Layer            | Technology                     |
|------------------|--------------------------------|
| Framework        | Next.js 15 (App Router)        |
| Language         | TypeScript                     |
| Styling          | Tailwind CSS                   |
| AI Engine        | Claude API (Anthropic)         |
| Map              | Leaflet + OpenStreetMap        |
| Charts           | Recharts / Chart.js            |
| Deployment       | Vercel                         |

---

## INSTALLATIONS

**Prerequisites:** Node.js 18+, Anthropic API key

```bash
git clone https://github.com/YOUR_USERNAME/uae-real-estate.git
cd uae-real-estate
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## ROADMAP

- [ ] Arabic language support
- [ ] Live property listings API integration (Bayut / Property Finder)
- [ ] User saved searches and favourites
- [ ] ROI and rental yield calculator
- [ ] Off-plan project tracker

---

## AUTHOR

**SHAHINA S** — Full Stack Developer & AI Engineer, UAE

- Portfolio: https://yoursite.com
- LinkedIn: https://linkedin.com/in/yourhandle
- Email: you@email.com

---

*MIT License. Open source. Powered by Claude AI.*
