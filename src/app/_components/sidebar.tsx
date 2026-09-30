import Link from "next/link";
import Image from "next/image";
import DashboardIcon from "@/src/assets/reports-icon.png";
import TransactionsIcon from "@/src/assets/transactions-icon.png";
import Logo from "@/src/assets/logo.png";
import { Logout } from "./ui/logout";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-[#1d293d] flex flex-col bg-background-dark-header">
      <div className="p-6 flex items-center gap-3 ">
        <div className="bg-[#8e51ff] p-2 rounded-xl">
          <Image src={Logo} alt="" />
        </div>
        <h1 className="text-xl font-bold ">FinTrack</h1>
      </div>

      <nav className="flex-1 px-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 bg-[#8e51ff] rounded-xl"
        >
          <Image src={DashboardIcon} alt="" />
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-text-secondary hover:bg-white/5"
        >
          <Image src={TransactionsIcon} alt="" />
          Transações
        </Link>
      </nav>

      <div className="border-t border-[#1e293] px-6 py-6">
        <Logout />
      </div>
    </aside>
  );
}
