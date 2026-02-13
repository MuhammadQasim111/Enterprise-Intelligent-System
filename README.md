
<div align="center">

# 🚀 Enterprise Intelligence Platform (EIP)
### *Unifying Silos. Surface Insights. Driving Decisions in Real-Time.*

[![React 19](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![Tailwind CSS 4.0](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Groq AI](https://img.shields.io/badge/AI-Groq%20LLM-orange.svg)](https://groq.com/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF.svg)](https://vitejs.dev/)

---

<p align="center">
  <b>The first platform designed to think across domains.</b><br>
  EIP bridges the gap between raw data and executive action by synthesising signals from CRM, ERP, Finance, and Operations into a single, AI-powered intelligence layer.
</p>

</div>

---

## 🌩️ The Problem: "Data-Rich, Insight-Poor"

In the modern enterprise, data is abundant but fragmented. It lives in disconnected silos, each guarded by different teams and disparate systems:

- **Client Data** (Acquisition, LTV, Churn) sits in the CRM.
- **Financial Data** (P&L, Margins, Cash Flow) lives in an ERP.
- **Operational Data** (System Health, Load) is tracked in monitoring tools.
- **Partner performance** is tracked in separate spreadsheets.

### The "Silo Execution" Trap
When an executive asks, *"Why are our client acquisition costs (CAC) rising?"*, the answers are scattered. Is it a Marketing problem? A Pricing movement by a competitor? A Product conversion issue? Or a Regional partner failure?

Currently, solving this requires days of manual "triangulation"—pulling reports from 5 different systems, manually correlating spreadsheets, and by the time the briefing reaches the board, **the data is already stale.**

> *"We have all the data. We just can't see it together, in real-time, with AI helping us understand what it means."*

---

## 🛠️ How I Solved It: The EIP Architecture

To solve this, I built **EIP (Enterprise Intelligence Platform)**. This isn't just a dashboard—it's a **Living Intelligence Layer** that acts as a 24/7 Chief Intelligence Officer for your business.

### 1. Unified Data Fabric & Real-Time Ingestion
I implemented a robust ingestion engine that bridges the gap between independent domains. 
- **Real-Time Sync**: Integrated live data streaming from **Stripe** (Finance) and **HubSpot** (Client Data) to calculate metrics like CAC and LTV as they happen, not at the end of the month.
- **Cross-Domain Mapping**: Built a synchronized state management system in React that allows the AI to "see" relationships across domains instantly.

### 2. The Intelligence Kernel (Powered by Groq)
I integrated the **Groq AI Engine** to provide semantic reasoning over the unified data. 
- **Conversational Analytics**: Executives can query the system in natural language (*"Why is CAC increasing?"*) and receive a multi-factor analysis covering competitive, financial, and operational variables.
- **Anomaly Detection**: The system proactively identifies cross-domain risks (e.g., *“Revenue risk detected because CAC rose while conversion dropped in the APAC region”*).

### 3. Predictive Monte Carlo Simulations
Raw data only tells you what happened. I built a **Simulation Console** to show what *could* happen.
- By utilizing advanced modeling algorithms, users can run scenario simulations (e.g., *"What happens to our P&L if we agresively increase marketing spend but CAC hits a ceiling?"*).
- The engine runs 10,000+ paths to provide deterministic outcomes with confidence intervals.

### 4. Proactive Multi-Channel Alerting
Insight is useless if it arrives too late. I implemented an **Automated Alerting Engine** using the **Resend API**.
- When a critical anomaly is detected (e.g., a CAC variance or revenue leak), the system dispatches high-fidelity executive briefings directly to Gmail.
- These alerts aren't just notifications—they include **AI-Recommended Action Plans**.

---

## 💎 Key Capabilities

| Capability | Description |
| :--- | :--- |
| **Unified Data Layer** | Ingests data across Clients, Finance, Partners, and Operations simultaneously. |
| **Cross-Domain Reasoning** | AI understands that a drop in Marketing spend today affects Revenue in 45 days. |
| **NLP Search** | "Ask Intelligence" anything about the business state using Groq's high-speed inference. |
| **Decision Support** | Not just "what happened," but "what to do." Provides ranked action recommendations. |
| **Predictive Early Warning** | Flags miss-targets weeks before they occurs based on leading indicators. |

---

## 💻 Technical Stack

- **Frontend**: React 19 (Strict Mode), Vite 6, TypeScript 5.8
- **Styling**: Tailwind CSS 4.0 (Custom design system with glassmorphism)
- **AI Engine**: Groq (Llama 3.1 8B Instant)
- **Email Service**: Resend (API-integrated multi-channel alerting)
- **Visualization**: Recharts (High-fidelity financial & time-series modeling)
- **Package Manager**: npm

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- API Keys for **Groq** and **Resend**

### 2. Environment Setup
Create a `.env.local` in the root directory:
```env
VITE_GROK_API_KEY=your_groq_key_here
VITE_RESEND_API_KEY=your_resend_key_here
VITE_STRIPE_API_KEY=optional_stripe_key
VITE_HUBSPOT_ACCESS_TOKEN=optional_hubspot_key
```

### 3. Execution
```bash
# Install dependencies
npm install

# Start the Intelligence Dashboard
npm run dev
```

---

<div align="center">
  <sub>Built with ❤️ by the EIP Engineering Team. <b>Unlocking the next era of decision intelligence.</b></sub>
</div>
