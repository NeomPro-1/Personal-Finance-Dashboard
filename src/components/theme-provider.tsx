
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ClientLayout } from "@/components/layout/client-layout"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ClientLayout>
        {children}
      </ClientLayout>
    </NextThemesProvider>
  )
}
