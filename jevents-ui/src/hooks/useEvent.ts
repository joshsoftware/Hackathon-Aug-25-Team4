import { useEffect, useState } from "react";
import { Event } from "@/types/events";
import { getEvent } from "@/api/events";

interface UseEventsResult {
  event: Event;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEvent(eventId: string | null): UseEventsResult {
  const [event, setEvent] = useState<Event>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getEvent(eventId);
      setEvent(res);
    } catch (err) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  return { event: event, loading, error, refetch: fetchEvent };
}
