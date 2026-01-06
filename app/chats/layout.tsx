import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import TestWSComponent from "../components/TestWSComponent";


export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <SidebarProvider>
      <TestWSComponent></TestWSComponent>
      <AppSidebar />
      <main className="w-full">
        
        {children}
      </main>
    </SidebarProvider>
  );
}
