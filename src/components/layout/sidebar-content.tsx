
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
import { LayoutDashboard, Settings, Wallet, BarChart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "../theme-toggle"
import { Sidebar, SidebarTrigger } from '../ui/sidebar';

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
      <SidebarHeader>
        <div className="flex items-center gap-2">
           <Wallet className={`w-8 h-8 text-primary ${state === 'collapsed' && 'w-10 h-10'}`} />
        </div>
      </SidebarHeader>

      <SidebarBody>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/dashboard')} onClick={handleLinkClick}>
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/investments')} onClick={handleLinkClick}>
              <Link href="/investments">
                <TrendingUp />
                <span>Investments</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/forecast')} onClick={handleLinkClick}>
              <Link href="/forecast">
                <BarChart />
                <span>Forecast &amp; Tools</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarBody>
      
      <SidebarFooter className={isMobile ? 'flex' : 'hidden md:flex'}>
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.includes('/settings')} onClick={handleLinkClick}>
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
