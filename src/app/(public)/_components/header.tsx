"use client"

import { type ReactNode, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { LogIn, Menu, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession } from "next-auth/react"
import { handleRegister } from "@/app/(public)/_actions/login"

interface NavItem {
  href: string
  label: string
  icon: ReactNode
}

interface NavLinksProps {
  handleLogin: () => Promise<void>
  navItems: NavItem[]
  session: ReturnType<typeof useSession>["data"]
  setIsOpen: (value: boolean) => void
  status: ReturnType<typeof useSession>["status"]
}

function NavLinks({ handleLogin, navItems, session, setIsOpen, status }: NavLinksProps) {
  return (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-foreground shadow-none">

          <Link href={item.href} className="text-base">
            {item.icon}
            {item.label}
          </Link>
        </Button>
      ))}
      {status === "loading" ? (
        <></>
      ) : session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-5 rounded-md self-center font-medium transition-colors hover:bg-primary/90">
          Acessar Painel
        </Link>
      ) : (
        <Button onClick={handleLogin} className="cursor-pointer self-center">
          <LogIn />
          Fazer Login
        </Button>
      )}
    </>
  )
}

export function Header() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)


  const navItems = [
    { href: "#profissionais", label: "Profissionais", icon: <Users /> }
  ]

  async function handleLogin() {
    await handleRegister("github")
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-999 py-4 px-6 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-foreground">
          Schedule<span className="text-primary">PRO</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks
            handleLogin={handleLogin}
            navItems={navItems}
            session={session}
            setIsOpen={setIsOpen}
            status={status}
          />
                  <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="scale-95 origin-right" />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button className="text-foreground hover:bg-transparent cursor-pointer" variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-60 sm:w-75 z-9999">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Veja nossos links
              </SheetDescription>
              <nav className="flex flex-col space-y-4 mt-6 items-start">
                <NavLinks
                  handleLogin={handleLogin}
                  navItems={navItems}
                  session={session}
                  setIsOpen={setIsOpen}
                  status={status}
                />
              </nav>
            </SheetHeader>
          </SheetContent>

        </Sheet>
      </div>
    </header>
  )
}
