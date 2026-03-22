import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-background">
        <div className="px-6 py-4">
          <SidebarTrigger />
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-10">{children}</div>
      </main>
    </SidebarProvider>
  )
}
