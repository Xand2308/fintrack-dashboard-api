"use client";

import Image from "next/image";
import bulbIcon from "@/src/assets/bulb-icon.png";
import insightsIcon from "@/src/assets/insights-icon.png";
import starIcon from "@/src/assets/star-icon.png";
import refreshIcon from "@/src/assets/refresh-icon.png";
import type { TransactionCategory } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

interface CategorySummary {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}

interface AiInsightsProps {
  month: string;
  year: number;
  depositsTotal: number;
  expensesTotal: number;
  investmentsTotal: number;
  balance: number;
  totalExpensesPerCategory: CategorySummary[];
}

interface AiResponse {
  suggestion: string;
  topCategory: string | null;
  topCategoryAmount: string | null;
}

export const AiInsights = ({
  year,
  month,
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  totalExpensesPerCategory,
}: AiInsightsProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [topCategory, setTopCategory] = useState<string | null>(null);
  const [topCategoryAmount, setTopCategoryAmount] = useState<string | null>(
    null,
  );

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          month,
          year,
          depositsTotal,
          expensesTotal,
          investmentsTotal,
          balance,
          totalExpensesPerCategory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Erro ao carregar análise");
        return;
      }
      // nullish coalescing operator => string => truthy
      setSuggestion((data as AiResponse).suggestion ?? null);
      setTopCategory((data as AiResponse).topCategory ?? null);
      setTopCategoryAmount((data as AiResponse).topCategoryAmount ?? null);
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [
    month,
    year,
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    balance,
    totalExpensesPerCategory,
  ]);

  useEffect(() => {
    void fetchInsights();
  }, [fetchInsights]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Image src={starIcon} alt="Star Icon" />
        <h3 className="text-xl font-bold">Insights com IA</h3>
      </div>

      {topCategory && topCategoryAmount && (
        <div className="bg-[#161b26] p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-[#a855f7]/20 p-4 rounded-xl">
            <Image src={insightsIcon} alt="Insights Icon" />
          </div>
          <div>
            <p>Categoria com maior gasto</p>
            <p className="text-sm text-[#94a388]">
              {topCategory}
              <span className="text-primary ml-1 font-semibold">
                {topCategoryAmount}
              </span>
            </p>
          </div>
        </div>
      )}

      {suggestion && (
        <div className="bg-[#10b981]/5 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-[#10b981]/20 p-4 rounded-xl">
            <Image src={bulbIcon} alt="Bulb Icon" />
          </div>
          <div>
            <p>Sugestão de economia</p>
            <p className="text-sm text-[#cbd5e1]">{suggestion}</p>
          </div>
        </div>
      )}

      {!suggestion && !topCategory && !loading && !error && (
        <div className="bg-[#161b26] p-6 rounded-2xl border border-[#1d293d] text-center text-slate-400 text-sm">
          Adicione transações no mês para receber sugestões de IA
        </div>
      )}

      {error && (
        <div className="bg-[#161b26] p-6 rounded-2xl border border-[#1d293d] text-center text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#1e293b] py-4 hover:bg-[#8e51ff] hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        onClick={fetchInsights}
        disabled={loading}
      >
        <Image src={refreshIcon} alt="" />
        <span>Atualizar análise</span>
      </button>
    </div>
  );
};
