import { useEffect, useState } from "react";
import { Coupons } from "@/types/coupons";
import { getCoupons } from "@/api/coupons";

interface UseCouponsResult {
  coupons: Coupons[];
  loading: boolean;
  error: string | null;
}

export function useCoupons(eventID: number | null): UseCouponsResult {
  const [coupons, setCoupons] = useState<Coupons[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getCoupons(eventID);
        setCoupons(res);
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [eventID]);

  return { coupons, loading, error };
}
