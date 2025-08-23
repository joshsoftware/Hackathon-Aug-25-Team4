import { useEffect, useState } from "react";
import { EventDetail } from "@/types/events";
import { getEvent } from "@/api/events";

interface UseEventsResult {
  event: EventDetail;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEvent(userId: string | null): UseEventsResult {
  const [event, setEvent] = useState<EventDetail>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getEvent(userId);
      setEvent(res);
    } catch (err) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [userId]);

  return { event: event, loading, error, refetch: fetchEvent };
}
