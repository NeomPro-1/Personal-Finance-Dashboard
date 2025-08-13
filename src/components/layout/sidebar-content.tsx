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

// Mobile-only icon wrapper
function MobileOnlyIcon({ Icon, className }: { Icon: React.ElementType, className?: string }) {
  return (
    <Icon
      className={`w-8 h-8 text-primary md:hidden ${className || ""}`} // Larger size + hidden on tablet/desktop
    />
  )
}

export function SidebarContent() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          {/* This icon only appears in mobile view */}
          <MobileOnlyIcon Icon={Wallet} />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">FinanceFlow</h1>
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

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.includes('/settings')} onClick={handleLinkClick}>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarBody>

      <SidebarFooter className="hidden md:flex">
        <ThemeToggle />
      </SidebarFooter>
    </>
  )
}
