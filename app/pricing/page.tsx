"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Tier = {
  id: string;
  name: string;
  audience: string;
  baseFee: number;
  intakeFee: number;
  range: string;
  support: string;
  reports: string;
};

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "Small or regional insurers",
    baseFee: 500,
    intakeFee: 3.0,
    range: "Up to 10,000 members",
    support: "Email support",
    reports: "Basic reports",
  },
  {
    id: "growth",
    name: "Growth",
    audience: "Mid-sized insurers",
    baseFee: 1500,
    intakeFee: 2.5,
    range: "10,000 – 100,000 members",
    support: "Email + chat support",
    reports: "Extended reports",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Large national insurers",
    baseFee: 4000,
    intakeFee: 2.0,
    range: "100,000+ members",
    support: "Dedicated account manager",
    reports: "Fully customized reports",
  },
];

type Assumption = {
  name: string;
  value: string;
  risk: string;
};

const assumptions: Assumption[] = [
  {
    name: "Intake rate",
    value: "2% of insured members use the service per month (default, editable)",
    risk: "Placeholder, not measured data. The real rate must be validated with insurers.",
  },
  {
    name: "Prices",
    value: "License and per-intake fees are the tier values shown above",
    risk: "Illustrative figures, not based on signed contracts or a willingness-to-pay study.",
  },
  {
    name: "Annual view",
    value: "Annual revenue = monthly revenue × 12",
    risk: "Ignores seasonality. Travel-related intakes probably peak in holiday periods.",
  },
  {
    name: "Tier fit by size",
    value: "Starter up to 10,000 members, Growth up to 100,000, Enterprise above",
    risk: "Thresholds are indicative. A real insurer may negotiate a different tier.",
  },
  {
    name: "Adoption",
    value: "Every insured member of the insurer has access to the service",
    risk: "In practice an insurer may start with a pilot group, which lowers volume.",
  },
  {
    name: "Currency",
    value: "USD, before taxes, discounts, and payment fees",
    risk: "Real contracts would add VAT, discounts, and payment processing costs.",
  },
  {
    name: "Costs",
    value: "The calculator shows revenue only, not profit",
    risk: "Hosting, AI usage, support staff, and sales costs are not included.",
  },
];

type Period = "monthly" | "annual";

function formatUSD(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function recommendedTierId(members: number) {
  if (members <= 10000) return "starter";
  if (members <= 100000) return "growth";
  return "enterprise";
}

export default function PricingPage() {
  const [tierId, setTierId] = useState("growth");
  const [members, setMembers] = useState(50000);
  const [ratePercent, setRatePercent] = useState(2);
  const [period, setPeriod] = useState<Period>("monthly");

  const tier = tiers.find((t) => t.id === tierId) ?? tiers[1];
  const multiplier = period === "annual" ? 12 : 1;
  const periodLabel = period === "annual" ? "year" : "month";

  const monthlyIntakes = Math.round((members * ratePercent) / 100);
  const periodIntakes = monthlyIntakes * multiplier;
  const periodLicense = tier.baseFee * multiplier;
  const periodIntakeRevenue = periodIntakes * tier.intakeFee;
  const periodRevenue = periodLicense + periodIntakeRevenue;
  const recommended = recommendedTierId(members);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto w-full text-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-white">Pricing Simulator</h1>
        <p className="text-sm text-gray-400 mb-10">
          Insurers pay a monthly license plus a small fee for every intake handled.
          All amounts are illustrative USD figures for this demo.
        </p>

        {/* Tier cards */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-white">Pricing Tiers</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {tiers.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTierId(t.id)}
                className={`text-left border rounded-md p-4 ${
                  t.id === tierId ? "border-blue-500 bg-gray-800" : "border-gray-700"
                }`}
              >
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-xs text-gray-400 mb-3">{t.audience}</p>
                <p className="text-2xl font-bold text-white">
                  {formatUSD(t.baseFee).replace(".00", "")}
                  <span className="text-sm font-normal text-gray-400"> / month</span>
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  + {formatUSD(t.intakeFee)} per intake
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>{t.range}</li>
                  <li>{t.support}</li>
                  <li>{t.reports}</li>
                </ul>
              </button>
            ))}
          </div>
        </section>

        {/* Calculator */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white">Revenue Calculator</h2>
            <div className="flex border border-gray-700 rounded-md overflow-hidden text-sm">
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`px-3 py-1 ${
                  period === "monthly" ? "bg-blue-600 text-white" : "text-gray-300"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setPeriod("annual")}
                className={`px-3 py-1 ${
                  period === "annual" ? "bg-blue-600 text-white" : "text-gray-300"
                }`}
              >
                Annual
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Choose a tier above, then enter the insurer&apos;s size and how many members
            are expected to use the service each month.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Insured members
              </label>
              <input
                type="number"
                min={0}
                value={members}
                onChange={(e) => setMembers(Math.max(0, Number(e.target.value)))}
                className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Intake rate (% of members per month)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={ratePercent}
                onChange={(e) =>
                  setRatePercent(Math.min(100, Math.max(0, Number(e.target.value))))
                }
                className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-100"
              />
            </div>
          </div>

          {recommended !== tier.id && (
            <p className="text-xs text-yellow-400 mb-4">
              Note: {members.toLocaleString("en-US")} members usually fits the{" "}
              {tiers.find((t) => t.id === recommended)?.name} tier.
            </p>
          )}

          <div className="border border-gray-700 rounded-md p-4 bg-gray-900">
            <p className="text-sm text-gray-400 mb-3">
              Selected tier: <span className="text-white font-medium">{tier.name}</span>
              {" · "}
              <span className="text-white font-medium">
                {period === "annual" ? "Annual" : "Monthly"} view
              </span>
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">License (per {periodLabel})</span>
                <span className="text-gray-100">{formatUSD(periodLicense)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Intakes (per {periodLabel})</span>
                <span className="text-gray-100">
                  {periodIntakes.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Intake fees ({formatUSD(tier.intakeFee)} each)
                </span>
                <span className="text-gray-100">{formatUSD(periodIntakeRevenue)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                <span className="font-semibold text-white">
                  {period === "annual" ? "Annual revenue" : "Monthly revenue"}
                </span>
                <span className="font-semibold text-white">
                  {formatUSD(periodRevenue)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Assumptions table */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-white">Assumptions</h2>
          <p className="text-sm text-gray-400 mb-4">
            What the calculator takes for granted, written down so it can be questioned.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="py-2 pr-4 text-white">Assumption</th>
                  <th className="py-2 pr-4 text-white">Value used</th>
                  <th className="py-2 text-white">Why it may be wrong</th>
                </tr>
              </thead>
              <tbody>
                {assumptions.map((a) => (
                  <tr key={a.name} className="border-b border-gray-800 align-top">
                    <td className="py-2 pr-4 font-medium text-gray-100">{a.name}</td>
                    <td className="py-2 pr-4 text-gray-300">{a.value}</td>
                    <td className="py-2 text-gray-500">{a.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}