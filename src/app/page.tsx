// File: app/page.js
import Sidebar from "../components/Sidebar";
import MenuTree from "@/components/MenuTree";
export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8 overflow-auto">
        <MenuTree></MenuTree>
      </main>
    </div>
  );
}
