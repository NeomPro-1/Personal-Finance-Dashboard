
"use client"

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent as SidebarBody
} from "@/components/ui/sidebar"
import { LayoutDashboard, Settings, Wallet, BarChart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from '@/components/theme-toggle'

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Wallet className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">FinanceFlow</h1>
        </div>
      </SidebarHeader>
      <SidebarBody>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/dashboard')}>
                <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/investments')}>
                <Link href="/investments">
                    <TrendingUp />
                    <span>Investments</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/analysis')}>
                <Link href="/analysis">
                    <BarChart />
                    <span>Forecast &amp; Tools</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/settings')}>
                <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarBody>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </>
  )
}
