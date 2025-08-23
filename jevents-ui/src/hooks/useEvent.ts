import { useEffect, useState } from "react";
import { EventDetail } from "@/types/events";
import { getEvent } from "@/api/events";
import { useParams } from "react-router-dom";

interface UseEventsResult {
  event: EventDetail;
  loading: boolean;
  error: string | null;
}

export function useEvent(): UseEventsResult {
  const params = useParams();
  const id = params.id ?? null;

  const [event, setEvent] = useState<EventDetail>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("ho");

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getEvent(id);
        console.log("ho", res);
        setEvent(res);
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return { event, loading, error };
}
