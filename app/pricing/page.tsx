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

  const tier = tiers.find((t) => t.id === tierId) ?? tiers[1];
  const monthlyIntakes = Math.round((members * ratePercent) / 100);
  const intakeRevenue = monthlyIntakes * tier.intakeFee;
  const monthlyRevenue = tier.baseFee + intakeRevenue;
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
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-white">Revenue Calculator</h2>
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
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly license</span>
                <span className="text-gray-100">{formatUSD(tier.baseFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Intakes per month</span>
                <span className="text-gray-100">
                  {monthlyIntakes.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">
                  Intake fees ({formatUSD(tier.intakeFee)} each)
                </span>
                <span className="text-gray-100">{formatUSD(intakeRevenue)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                <span className="font-semibold text-white">Monthly revenue</span>
                <span className="font-semibold text-white">
                  {formatUSD(monthlyRevenue)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}