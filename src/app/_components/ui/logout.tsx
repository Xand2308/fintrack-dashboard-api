"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth-client";
import logoutIcon from "@/src/assets/logout.png";
import Image from "next/image";

export const Logout = () => {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/sign-in");
  }

  return (
    <button
      className="flex items-center gap-2 rounded-xl px-7 py-7 text-[#94a3b8] cursor-pointer"
      onClick={handleLogout}
    >
      <Image src={logoutIcon} alt="" />

      <span className="text-base font-medium leading-normal text-center">
        Sair
      </span>
    </button>
  );
};
