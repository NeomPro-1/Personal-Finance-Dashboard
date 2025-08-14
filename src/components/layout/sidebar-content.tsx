
"use client"

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent as SidebarBody,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Settings, Wallet, BarChart, TrendingUp, CreditCard, PiggyBank } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "../theme-toggle"

export function SidebarContent() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile, state } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <>
       <SidebarHeader className="hidden md:flex">
         <div className="flex items-center gap-2">
            <Wallet className={`w-8 h-8 text-primary ${state === 'collapsed' && 'w-10 h-10'}`} />
            <span className={`text-2xl font-bold ${state === 'collapsed' && 'hidden'}`}>FinanceFlow</span>
         </div>
       </SidebarHeader>

      <SidebarBody>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/dashboard')} onClick={handleLinkClick} tooltip="Dashboard">
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/investments')} onClick={handleLinkClick} tooltip="Investments">
              <Link href="/investments">
                <TrendingUp />
                <span>Investments</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/goals')} onClick={handleLinkClick} tooltip="Savings Goals">
              <Link href="/goals">
                <PiggyBank />
                <span>Savings Goals</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/forecast')} onClick={handleLinkClick} tooltip="Forecast & Tools">
              <Link href="/forecast">
                <BarChart />
                <span>Forecast &amp; Tools</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/credit-card-health')} onClick={handleLinkClick} tooltip="Credit Health Check">
              <Link href="/credit-card-health">
                <CreditCard />
                <span>Credit Health Check</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarBody>
      
      <SidebarFooter className={isMobile ? 'flex' : 'hidden md:flex'}>
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.includes('/settings')} onClick={handleLinkClick} tooltip="Settings">
                <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <div className="hidden md:flex items-center justify-center p-2">
        <ThemeToggle />
      </div>
    </>
  )
}
