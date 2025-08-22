import Header from "@/components/Header";
import OrganizerDashboard from "@/components/OrganizerDashboard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OrganizerDashboard />
    </div>
  );
}