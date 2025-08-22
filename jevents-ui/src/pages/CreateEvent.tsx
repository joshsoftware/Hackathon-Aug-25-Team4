import Header from "@/components/Header";
import EventCreationForm from "@/components/EventCreationForm";

export default function CreateEvent() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EventCreationForm />
    </div>
  );
}