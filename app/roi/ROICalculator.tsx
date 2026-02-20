"use client";

import { useState, useMemo, useCallback } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { roiDefaults } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ROICalculator() {
  const [laborRateStr, setLaborRateStr] = useState(String(roiDefaults.laborRate));
  const [shiftsPerDay, setShiftsPerDay] = useState(roiDefaults.shiftsPerDay);
  const [weeksPerYearStr, setWeeksPerYearStr] = useState(String(roiDefaults.weeksPerYear));
  const [copied, setCopied] = useState(false);

  const laborRate = Number(laborRateStr) || 0;
  const weeksPerYear = Math.min(Number(weeksPerYearStr) || 0, 52);

  const calculations = useMemo(() => {
    const hoursPerShift = roiDefaults.hoursPerShift;
    const daysPerWeek = roiDefaults.daysPerWeek;
    const robotInvestment = roiDefaults.robotInvestment;

    const annualHours = hoursPerShift * daysPerWeek * weeksPerYear * shiftsPerDay;
    const annualLaborCost = annualHours * laborRate;
    const monthlySavings = annualLaborCost / 12;
    const paybackMonths =
      monthlySavings > 0 ? Math.ceil(robotInvestment / monthlySavings) : Infinity;
    const threeYearSavings = annualLaborCost * 3 - robotInvestment;

    // Payback range: ±20% investment variance
    const investLow = robotInvestment * 0.8;
    const investHigh = robotInvestment * 1.3;
    const paybackLow =
      monthlySavings > 0 ? Math.ceil(investLow / monthlySavings) : Infinity;
    const paybackHigh =
      monthlySavings > 0 ? Math.ceil(investHigh / monthlySavings) : Infinity;

    return {
      annualHours,
      annualLaborCost,
      monthlySavings,
      paybackMonths,
      paybackLow,
      paybackHigh,
      threeYearSavings,
      robotInvestment,
    };
  }, [laborRate, shiftsPerDay, weeksPerYear]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const buildSummaryText = useCallback(() => {
    const c = calculations;
    const lines = [
      "Eagle Automation — ROI Estimate",
      "================================",
      "",
      "Parameters:",
      `  Labor Rate: $${laborRate}/hr`,
      `  Shifts/Day: ${shiftsPerDay}`,
      `  Production Weeks/Year: ${weeksPerYear}`,
      "",
      "Results:",
      `  Annual Labor Cost: ${formatCurrency(c.annualLaborCost)}`,
      `  Monthly Savings: ${formatCurrency(c.monthlySavings)}`,
      `  Estimated Payback: ${c.paybackMonths === Infinity ? "N/A" : `${c.paybackMonths} months`}`,
      `  Payback Range: ${c.paybackLow === Infinity ? "N/A" : `${c.paybackLow}–${c.paybackHigh} months`}`,
      `  3-Year Net Savings: ${formatCurrency(c.threeYearSavings)}`,
      `  Investment Estimate: ${formatCurrency(c.robotInvestment)}`,
      "",
      "Disclaimer: These are estimates. Final ROI depends on your specific application.",
      "Contact: (817) 472-5178 | sales@eaglemachine.net | eagleautomation.com",
    ];
    return lines.join("\n");
  }, [calculations, laborRate, shiftsPerDay, weeksPerYear]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard API unavailable */
    }
  };

  const handleDownload = () => {
    const blob = new Blob([buildSummaryText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eagle-automation-roi-estimate.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Inputs */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold text-white mb-6">
          Your Labor Parameters
        </h3>

        <div className="space-y-6">
          {/* Labor Rate */}
          <div>
            <label className="input-label">Labor Rate ($/hour)</label>
            <input
              type="text"
              inputMode="numeric"
              value={laborRateStr}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || /^\d*\.?\d*$/.test(v)) setLaborRateStr(v);
              }}
              onBlur={() => {
                if (laborRateStr === "") setLaborRateStr("0");
              }}
              className="input-field"
              placeholder="22"
            />
            <p className="mt-1 text-xs text-dark-500">
              Base hourly rate excluding benefits and overhead
            </p>
          </div>

          {/* Shifts */}
          <div>
            <label className="input-label">Shifts Per Day</label>
            <div className="flex gap-2">
              {[1, 2, 3].map((shift) => (
                <button
                  key={shift}
                  type="button"
                  onClick={() => setShiftsPerDay(shift)}
                  className={cn(
                    "flex-1 py-3 rounded-lg font-semibold transition-colors",
                    shiftsPerDay === shift
                      ? "bg-eagle-orange text-dark-950"
                      : "bg-dark-800 text-dark-400 hover:bg-dark-700"
                  )}
                >
                  {shift} Shift{shift > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Weeks */}
          <div>
            <label className="input-label">Production Weeks Per Year</label>
            <input
              type="text"
              inputMode="numeric"
              value={weeksPerYearStr}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || /^\d*$/.test(v)) setWeeksPerYearStr(v);
              }}
              onBlur={() => {
                const n = Number(weeksPerYearStr) || 0;
                if (weeksPerYearStr === "") setWeeksPerYearStr("0");
                else if (n > 52) setWeeksPerYearStr("52");
              }}
              className="input-field"
              placeholder="50"
            />
            <p className="mt-1 text-xs text-dark-500">
              Accounting for holidays and planned downtime
            </p>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card padding="lg" className="bg-dark-950 border-eagle-orange/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Estimated ROI Analysis
          </h3>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-md bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
              title="Copy summary"
            >
              {copied ? (
                <Check className="w-4 h-4 text-eagle-orange" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="p-2 rounded-md bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
              title="Download summary"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Annual Labor Cost */}
          <div className="p-4 rounded-lg bg-dark-900">
            <div className="text-xs text-dark-500 uppercase tracking-wider">
              Annual Labor Cost
            </div>
            <div className="mt-1 text-3xl font-black text-[#4ade80]">
              {formatCurrency(calculations.annualLaborCost)}
            </div>
            <div className="mt-1 text-xs text-dark-500">
              {calculations.annualHours.toLocaleString()} hours &times; $
              {laborRate}/hr
            </div>
          </div>

          {/* Payback */}
          <div className="p-4 rounded-lg bg-eagle-orange/10 border border-eagle-orange/20">
            <div className="text-xs text-eagle-orange uppercase tracking-wider">
              Estimated Payback Period
            </div>
            <div className="mt-1 text-4xl font-bold text-eagle-orange">
              {calculations.paybackMonths === Infinity
                ? "—"
                : `${calculations.paybackMonths} Months`}
            </div>
            {calculations.paybackLow !== Infinity && (
              <div className="mt-1 text-xs text-dark-400">
                Range: {calculations.paybackLow}–{calculations.paybackHigh}{" "}
                months depending on configuration
              </div>
            )}
            <div className="mt-1 text-xs text-dark-400">
              Based on {formatCurrency(calculations.robotInvestment)} base
              investment
            </div>
          </div>

          {/* 3-Year Savings */}
          <div className="p-4 rounded-lg bg-dark-900">
            <div className="text-xs text-dark-500 uppercase tracking-wider">
              3-Year Net Savings
            </div>
            <div className="mt-1 text-3xl font-black text-[#4ade80]">
              {formatCurrency(calculations.threeYearSavings)}
            </div>
            <div className="mt-1 text-xs text-dark-500">
              After recovering initial investment
            </div>
          </div>

          {/* Monthly + Cost Per Hour */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-dark-900">
              <div className="text-xs text-dark-500 uppercase tracking-wider">
                Monthly Savings
              </div>
              <div className="mt-1 text-xl font-black text-[#4ade80]">
                {formatCurrency(calculations.monthlySavings)}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-dark-900">
              <div className="text-xs text-dark-500 uppercase tracking-wider">
                Investment
              </div>
              <div className="mt-1 text-xl font-bold text-white">
                {formatCurrency(calculations.robotInvestment)}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-dark-900">
              <div className="text-xs text-dark-500 uppercase tracking-wider">
                Robot Cost/Hr
              </div>
              <div className="mt-1 text-xl font-bold text-eagle-accent">
                $0.30
              </div>
              <div className="mt-0.5 text-xs text-dark-500">
                vs ${laborRate}/hr manual
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-dark-800">
          <Button href="/contact" className="w-full">
            Get Custom Analysis
          </Button>
          <p className="mt-3 text-xs text-dark-500 text-center">
            These are estimates. Final ROI depends on your specific application.
          </p>
        </div>
      </Card>
    </div>
  );
}
