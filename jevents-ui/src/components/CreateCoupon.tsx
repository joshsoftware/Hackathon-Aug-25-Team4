import { useState } from "react";
import { createCoupon, CouponCreateRequest } from "@/api/coupon"; // adjust path
import { Button } from "@/components/ui/button";
import { useCoupons } from "@/hooks/useCoupouns";

interface CreateCouponProps {
  eventId: number;
}

export const CreateCoupon: React.FC<CreateCouponProps> = ({ eventId }) => {
  const { coupons } = useCoupons(eventId);

  const [coupon, setCoupon] = useState<CouponCreateRequest>({
    code: "",
    discount_value: 0,
    discount_type: "percentage",
    usage_limit: 1,
    valid_from: new Date().toISOString().slice(0, 16), // yyyy-MM-ddTHH:mm format
    valid_until: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) // +7 days
      .toISOString()
      .slice(0, 16),
    active: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    setCoupon((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "discount_value" || name === "usage_limit"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await createCoupon(eventId, coupon);
      setMessage("Coupon created successfully!");
      // Optionally reset form here
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Failed to create coupon. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-4 border rounded space-y-6"
    >
      <h2 className="text-xl font-semibold mb-4">Create Coupon</h2>

      {/* Code */}
      <div className="flex items-center space-x-4">
        <label htmlFor="code" className="w-40 font-medium">
          Code
        </label>
        <input
          id="code"
          name="code"
          type="text"
          value={coupon.code}
          onChange={handleChange}
          required
          className="flex-1 border rounded px-3 py-2"
          placeholder="e.g. WELCOME50"
        />
      </div>

      {/* Discount Value & Type */}
      <div className="flex items-center space-x-4">
        <label htmlFor="discount_value" className="w-40 font-medium">
          Discount Value
        </label>
        <input
          id="discount_value"
          name="discount_value"
          type="number"
          min={0}
          value={coupon.discount_value}
          onChange={handleChange}
          required
          className="w-32 border rounded px-3 py-2"
        />
        <select
          id="discount_type"
          name="discount_type"
          value={coupon.discount_type}
          onChange={handleChange}
          className="w-40 border rounded px-3 py-2"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
      </div>

      {/* Usage Limit */}
      <div className="flex items-center space-x-4">
        <label htmlFor="usage_limit" className="w-40 font-medium">
          Usage Limit
        </label>
        <input
          id="usage_limit"
          name="usage_limit"
          type="number"
          min={1}
          value={coupon.usage_limit}
          onChange={handleChange}
          required
          className="w-32 border rounded px-3 py-2"
        />
      </div>

      {/* Valid From & Valid Until */}
      <div className="flex items-center space-x-4">
        <label htmlFor="valid_from" className="w-40 font-medium">
          Valid From
        </label>
        <input
          id="valid_from"
          name="valid_from"
          type="datetime-local"
          value={coupon.valid_from}
          onChange={handleChange}
          required
          className="flex-1 border rounded px-3 py-2"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="valid_until" className="w-40 font-medium">
          Valid Until
        </label>
        <input
          id="valid_until"
          name="valid_until"
          type="datetime-local"
          value={coupon.valid_until}
          onChange={handleChange}
          required
          className="flex-1 border rounded px-3 py-2"
        />
      </div>

      {/* Active Checkbox */}
      <div className="flex items-center space-x-4">
        <label htmlFor="active" className="w-40 font-medium">
          Active
        </label>
        <input
          id="active"
          name="active"
          type="checkbox"
          checked={coupon.active}
          onChange={handleChange}
          className="w-5 h-5"
        />
      </div>

      {/* Message */}
      {message && (
        <div className="text-center text-sm font-medium text-red-600">
          {message}
        </div>
      )}

      <div className="text-right">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Coupon"}
        </Button>
      </div>

      <div>
        {coupons.map((coupon) => (
          <div>{coupon.name}</div>
        ))}
      </div>
    </form>
  );
};
