import { useEffect, useState } from "react";
import { UserHistory } from "@/types/history";
import { getUserHisotry } from "@/api/history";

interface UseUserHistoryResult {
  history: UserHistory[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUserHistory(): UseUserHistoryResult {
  const [userHistory, setUserHistory] = useState<UserHistory[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const history = await getUserHisotry();
      setUserHistory(history);
    } catch (err) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { history: userHistory, loading, error, refetch: fetchEvents };
}
