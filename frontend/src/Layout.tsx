import type { ReactNode } from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-muted/20">
        <div className="flex items-center gap-3 border-b bg-background px-4 py-3 md:px-6">
          <SidebarTrigger />
          <div>
            <p className="text-sm font-semibold">Puri Bunda Queue Systems</p>
            <p className="text-xs text-muted-foreground">
              Dashboard and clinic queue monitoring
            </p>
          </div>
        </div>
        <div className="px-4 py-6 md:px-6">{children}</div>
      </main>
    </SidebarProvider>
  )
}
