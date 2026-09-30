import Image from "next/image"
import Avatar from "@/src/assets/avatar.png"
import { Inter } from "next/font/google"


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
})

interface HeaderProps {
  userName: string
  date: Date
}

export const Header = ({
  userName,
  date
}: HeaderProps) => {
  const firstName = userName.split(" ")[0]
  const greeting = `Bem vindo de volta, ${firstName}! 😊`

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-background-dark-header border-b sticky top-0 border-[#1d293d]">
      <div>
        <h2 className="text-lg font-semibold">
          {greeting}
        </h2>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long"
          }).replace(/^\w/, (c)=> c.toUpperCase())}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <Image
            src={Avatar}
            alt="Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  )
}

export default Header;