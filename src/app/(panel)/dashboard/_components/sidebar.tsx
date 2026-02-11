"use client"

import React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button";
import { Banknote, CalendarCheck, ChevronLeft, ChevronRight, Folder, List, Settings } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen w-full">

      <aside className={clsx("flex flex-col border-r bg-background transition-all duration-300 p-4 h-full", {
        "w-20": isCollapsed,
        "w-64": !isCollapsed,
        "hidden md:flex md:fixed": true
      })}>
        <div className="mb-6 mt-4">
          <Link href="/" className="text-2xl font-bold text-foreground">
            {!isCollapsed && (
              <>Schedule</>
            )}
            <span className="text-primary">PRO</span>
          </Link>
        </div>
        <Button
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground self-end mb-2"
          onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight className="w-12 h-12" /> : <ChevronLeft className="w-12 h-12" />}
        </Button>

        {isCollapsed && (
          <nav className="flex flex-col gap-1 overflow-hidden mt-5">
            <SidebarLink
              href="/dashboard"
              label="Agendamentos"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<CalendarCheck className="w-6 h-6" />}
            />

            <SidebarLink
              href="/dashboard/services"
              label="Serviços"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<Folder className="w-6 h-6" />}
            />
            <SidebarLink
              href="/dashboard/profile"
              label="Configurações"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<Settings className="w-6 h-6" />}
            />

            <SidebarLink
              href="/dashboard/plans"
              label="Planos"
              pathname={pathname}
              isCollapsed={isCollapsed}
              icon={<Banknote className="w-6 h-6" />}
            />
          </nav>
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-muted-foreground font-medium mt-1 uppercase">
                Painel
              </span>
              <SidebarLink
                href="/dashboard"
                label="Agendamentos"
                pathname={pathname}
                isCollapsed={isCollapsed}
                icon={<CalendarCheck className="w-6 h-6" />}
              />

              <SidebarLink
                href="/dashboard/services"
                label="Serviços"
                pathname={pathname}
                isCollapsed={isCollapsed}
                icon={<Folder className="w-6 h-6" />}
              />

              <span className="text-sm text-muted-foreground font-medium mt-1 uppercase">
                Minha conta
              </span>

              <SidebarLink
                href="/dashboard/profile"
                label="Configurações"
                pathname={pathname}
                isCollapsed={isCollapsed}
                icon={<Settings className="w-6 h-6" />}
              />

              <SidebarLink
                href="/dashboard/plans"
                label="Planos"
                pathname={pathname}
                isCollapsed={isCollapsed}
                icon={<Banknote className="w-6 h-6" />}
              />

            </nav>
          </CollapsibleContent>
        </Collapsible>

        <ThemeToggle className={clsx("mt-auto", isCollapsed && "w-10 p-0 overflow-hidden")} />

      </aside>

      <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
        "md:ml-20": isCollapsed,
        "md:ml-64": !isCollapsed
      })}>

        <header className="md:hidden flex items-center justify-between border-b border-border/60 px-2 md:px-6 h-14 z-10 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsCollapsed(false)}>
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <h1 className="text-base md:text-lg font-semibold">Menu</h1>
            </div>
            <SheetContent side="right" className="sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  SchedulePRO
                </SheetTitle>

                <nav className="grid gap-2 text-base pt-5">
                  <SheetDescription>
                    DASHBOARD
                  </SheetDescription>
                  <SidebarLink
                    href="/dashboard"
                    label="Agendamentos"
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                    icon={<CalendarCheck className="w-6 h-6" />}
                  />

                  <SidebarLink
                    href="/dashboard/services"
                    label="Serviços"
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                    icon={<Folder className="w-6 h-6" />}
                  />

                  <SheetDescription>
                    MINHA CONTA
                  </SheetDescription>

                  <SidebarLink
                    href="/dashboard/profile"
                    label="Configurações"
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                    icon={<Settings className="w-6 h-6" />}
                  />

                  <SidebarLink
                    href="/dashboard/plans"
                    label="Planos"
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                    icon={<Banknote className="w-6 h-6" />}
                  />
                </nav>

              </SheetHeader>
            </SheetContent>
          </Sheet>

          <ThemeToggle className="scale-90 origin-right" />

        </header>

        <main className="flex-1 py-4 px-2 md:p-6">
          {children}
        </main>

      </div>
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  pathname: string
  isCollapsed: boolean
}

function SidebarLink({ href, icon, label, pathname, isCollapsed }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div className={clsx("flex items-center gap-2 px-3 py-2 rounded-md transition-colors", {
        "bg-primary text-primary-foreground": pathname === href,
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground": pathname !== href,
      })}>
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  )
}
