import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Index";
import Events from "./Events";
import Dashboard from "./Dashboard";
import CreateEvent from "./CreateEvent";
import Login from "./Login";
import Signup from "./Signup";
import EventDetail from "./EventDetail";
import NotFound from "./NotFound";
import { USER_ROLES } from "@/constants/user";
import { useUserRole } from "@/context/user";

const Router = () => {
  const { role } = useUserRole();

  // ATTENDEE
  if (role == USER_ROLES.ATTENDEE) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // ORGANIZER
  if (role == USER_ROLES.ORGANIZER) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
