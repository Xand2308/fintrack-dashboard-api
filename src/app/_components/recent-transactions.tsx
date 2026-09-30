import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import Link from "next/link";
import { AddTransactionButton } from "./add-transaction-button";
import { TransactionIcon } from "./transaction-icon";
import { TRANSACTION_CATEGORY_LABELS } from "../_constants/transaction";
import { getRecentTransactions } from "../_data/get-recent-transactions";

export const RecentTransaction = async () => {
  const recentTransactions = await getRecentTransactions();

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl font-bold ">Transações Recentes</p>
        <AddTransactionButton />
      </div>

      <div className="bg-[#161b26] rounded-3xl border border-[#1d293d] overflow-hidden">
        {recentTransactions.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">
            Nenhuma transação cadastrada.
          </p>
        ) : (
          recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 flex gap-4 border-b last:border-none border-[#1d293d] hover:bg-slate-800/50 transition-colors"
            >
              <TransactionIcon type={transaction.type} />

              <div className="flex-1">
                <p>{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {dayjs(transaction.date)
                    .locale("pt-br")
                    .format("DD [de] MMMM")}{" "}
                  {TRANSACTION_CATEGORY_LABELS[transaction.category]}
                </p>
              </div>

              <span
                className={
                  transaction.type === "EXPENSE"
                    ? "text-rose-500"
                    : "text-emerald-500"
                }
              >
                {transaction.type === "EXPENSE" ? "-" : "+"}
                {transaction.amount.toNumber().toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          ))
        )}
        <div className="p-4 bg-slate-800/20 text-center">
          <Link
            className="text-primary text-sm hover:underline"
            href="/transactions"
          >
            Ver todo o histórico
          </Link>
        </div>
      </div>
    </div>
  );
};
