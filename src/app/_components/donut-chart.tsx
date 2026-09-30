"use client";

import { PieChart, Pie, ResponsiveContainer } from "recharts";

export interface DonutCharProps {
    depositsTotal: number;
    expensesTotal: number;
    investimentsTotal: number;
    balance: number;
}


export function DonutChart({
    depositsTotal,
    expensesTotal,
    investimentsTotal,
    balance,
}: DonutCharProps) {
    const data = [
        {
            name: "Ganhos",
            value: Math.round(depositsTotal * 100) / 100,
            fill: "#9333ea",
        },
        {
            name: "Gastos",
            value: Math.round(expensesTotal * 100) / 100,
            fill: "#f43f5e",
        },
        {
            name: "Invest",
            value: Math.round(investimentsTotal * 100) / 100,
            fill: "#3b82f6",
        }
    ].filter((item) => item.value > 0);

    const total = data.reduce((acc, item) => acc + item.value, 0);

    const getPercent = (value: number) => {
        return total > 0 ? Math.round((value / total) * 100) : 0;
    }

    const balancePercent = total > 0 ? Math.round((balance / total) * 100) : 0;


    if (data.length === 0) {
        return (
            <div className="w-full flex items-center justify-center py-16 text-muted-foreground">
                <span className="text-sm">Nenhuma transação neste mês</span>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col">
            <div className="relative w-full h-64 min-h-64 rounded-2xl">
            <ResponsiveContainer width="100%" height={256}>
                    <PieChart>
                        <Pie data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={80}
                            outerRadius={90}
                            paddingAngle={data.length > 1 ? 6 : 0}
                            stroke="none"
                        />
                    </PieChart>
                </ResponsiveContainer>

                        {/* centro do Dout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-muted-foreground">Saldo</span>

                    <span className="text-2xl font-bold">
                        {balance.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            maximumFractionDigits: 0,
                        })}
                    </span>

                    {total > 0 && (
                        <span className="text-xs text-muted-foreground mt-0.5">
                            {balancePercent}% do total
                        </span>
                    )}
                </div>
            </div>
                {/* Legenda */}
            <div className="mt-8 flex w-full flex-wrap justify-center gap-6 border-t border-card-dark pt-6">
                {data.map((entry) => (
                    <div key={entry.name} className="flex flex-col items-center gap-1 min-w-25">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-2xl"
                             style={{ backgroundColor: entry.fill }}
                              aria-hidden />
                            <span className="text-[10px] font-bold uppercase tracking-[-0.05em] text-border-aside">
                                {entry.name}
                            </span>
                        </div>

                        <span className="text-ld font-bold text-text-primary">
                            {getPercent(entry.value)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}