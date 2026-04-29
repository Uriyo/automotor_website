import YardSidebar from "@/components/dashboard/YardSidebar";

export default function YardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <YardSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
