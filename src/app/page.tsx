import Sidebar from "@/src/app/_components/sidebar";
import Header from "@/src/app/_components/header";
import BalanceCard from "./_components/balance-card";
import { FinancialMetricCard } from "./_components/financial-metric-card";
import { ChartCard } from "./_components/chart-card";
import { AiInsights } from "./_components/ai-insights";
import { RecentTransaction } from "./_components/recent-transactions";
import { getDashboard } from "./_data/get-dashboard";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

interface DashboardPageProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const month = params.month ?? dayjs().format("MM");
  console.log("MÊS SELECIONADO:", month);
  const data = await getDashboard(month);

  return (
    <div className="flex min-h-screen bg-background-dark-header">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header userName={data.session.user.name} date={new Date()} />
        <main className="p-8 space-y-8">
          <section className="grid lg:grid-cols-3 grid-cols-1 gap-6">
            <div className="lg:col-span-2 col-span-1">
              <BalanceCard
                balance={data.balance}
                revenues={data.depositsTotal}
                expenses={data.expensesTotal}
              />
            </div>
            <FinancialMetricCard />
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex-1">
              <ChartCard
                depositsTotal={data.depositsTotal}
                expensesTotal={data.expensesTotal}
                investmentsTotal={data.investmentsTotal}
                balance={data.balance}
              />
            </div>

            <div className="flex-1">
              <AiInsights
                month={month}
                year={data.year}
                depositsTotal={data.depositsTotal}
                expensesTotal={data.expensesTotal}
                investmentsTotal={data.investmentsTotal}
                balance={data.balance}
                totalExpensesPerCategory={data.totalExpensesPerCategory}
              />
            </div>
          </section>

          <section>
            <RecentTransaction />
          </section>
        </main>
      </div>
    </div>
  );
}
