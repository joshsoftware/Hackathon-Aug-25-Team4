import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, ArrowLeft, Plus, Minus } from "lucide-react";
import { useUserData } from "@/context/user";
import { USER_ROLES } from "@/constants/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createOrder, updateOrder } from "@/api/order";
import { createPayment } from "@/api/payment";
import { useEvent } from "@/hooks/useEvent";
import { EventTime } from "@/components/EventTime";
import { createBookings } from "@/api/events";
import { Booking } from "@/types/events";
import { applyCoupon, ApplyCouponRequest } from "@/api/coupon";
import { CreateCoupon } from "@/components/CreateCoupon";

export default function EventDetail() {
  const { data } = useUserData();
  const { event } = useEvent();

  const [selectedTickets, setSelectedTickets] = useState<
    Record<number, number>
  >({});
<<<<<<< Updated upstream
  const navigate = useNavigate();
=======
  const [ticketNames, setTicketNames] = useState<Record<number, string[]>>({});
>>>>>>> Stashed changes
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [backendFinalAmount, setBackendFinalAmount] = useState<number | null>(
    null
  );
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleTicketQuantityChange = (ticketId: number, change: number) => {
    setSelectedTickets((prev) => {
<<<<<<< Updated upstream
      const currentQuantity = prev[ticketId] || 0;
      const category = event.tickets.find((c) => c.id === ticketId);
      const maxQuantity = Math.min(category?.available || 0, 10);
      const newQuantity = Math.max(
        0,
        Math.min(maxQuantity, currentQuantity + change)
      );

      if (newQuantity === 0) {
=======
      const current = prev[ticketId] || 0;
      const category = event!.tickets.find((c) => c.id === ticketId);
      const maxQty = Math.min(category?.available || 0, 10);
      const next = Math.max(0, Math.min(maxQty, current + change));
      if (next === 0) {
>>>>>>> Stashed changes
        const { [ticketId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [ticketId]: next };
    });
  };

<<<<<<< Updated upstream
  const getTotalAmount = () => {
    return Object.entries(selectedTickets).reduce(
      (total, [ticketId, quantity]) => {
        const category = event.tickets.find((c) => String(c.id) === ticketId);
        return total + (Number(category?.price) || 0) * quantity;
      },
      0
    );
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce(
      (total, qty) => total + qty,
      0
    );
=======
  const getTotalAmount = () =>
    Object.entries(selectedTickets).reduce((sum, [id, qty]) => {
      const ticket = event!.tickets.find((t) => String(t.id) === id);
      return sum + (Number(ticket?.price) || 0) * qty;
    }, 0);

  const getFinalAmount = () =>
    backendFinalAmount !== null ? backendFinalAmount : getTotalAmount();

  const getTotalTickets = () =>
    Object.values(selectedTickets).reduce((sum, x) => sum + x, 0);

  const getDiscountAmount = () =>
    backendFinalAmount !== null ? getTotalAmount() - backendFinalAmount : 0;

  const handleApplyCoupon = async () => {
    setCouponError("");
    setIsApplyingCoupon(true);

    try {
      const body: ApplyCouponRequest = {
        event_id: Number(event!.id),
        total_amount: getTotalAmount(),
        coupon_code: couponCode,
      };
      const res = await applyCoupon(body);

      setBackendFinalAmount(res.discounted_price);
    } catch (err: any) {
      setCouponError("Invalid coupon");
      setBackendFinalAmount(null);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleBookNow = async () => {
    try {
      const total = getTotalAmount();
      const finalAmt = getFinalAmount();

      const order = await createOrder({
        user_id: data?.user?.id || 0,
        event_id: Number(event!.id),
        coupon_id: null, // You can adjust if you want to track coupon id
        total_amount: total,
        discount_applied: getDiscountAmount(),
        final_amount: finalAmt,
        payment_status: "pending",
      });

      setOrderId(order.id);
      setIsBookingModalOpen(true);
    } catch (err) {
      console.error("Create order failed:", err);
      alert("Failed to create order. Please try again.");
    }
>>>>>>> Stashed changes
  };

  const bookings: Booking[] = Object.entries(selectedTickets).flatMap(
    ([idStr, qty]) => {
      const id = Number(idStr);
      const names = ticketNames[id] || [];
      return Array.from({ length: qty }).map((_, idx) => ({
        ticket_id: id,
        name: names[idx] || "",
      }));
    }
  );

  const handleTicketNameChange = (
    ticketId: number,
    idx: number,
    name: string
  ) => {
    setTicketNames((prev) => {
      const arr = prev[ticketId] || [];
      const copy = [...arr];
      copy[idx] = name;
      return { ...prev, [ticketId]: copy };
    });
  };

  const handlePayment = (bookings: Booking[]) => {
    const amountPaise = getFinalAmount() * 100;
    if (!orderId) {
      alert("Order ID not found. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_R8SxN8FrDdN8KF",
      amount: amountPaise,
      currency: "INR",
      name: event!.title,
      description: "Ticket Booking",
      handler: async (response: any) => {
        try {
          await updateOrder(orderId, { payment_status: "paid" });
          await createPayment({
            order_id: orderId,
            method: "upi",
            transaction_id: response.razorpay_payment_id,
            amount: amountPaise / 100,
            status: "success",
          });
<<<<<<< Updated upstream

          await createBookings({ order_id: orderId, bookings: bookings });
          navigate("/history");
=======
          await createBookings({ bookings });
>>>>>>> Stashed changes
        } catch (err) {
          console.error("Post-payment failure", err);
          alert("Payment succeeded, but saving order failed.");
        }
        setIsBookingModalOpen(false);
        setSelectedTickets({});
        setOrderId(null);
        setCouponCode("");
        setBackendFinalAmount(null);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        eventId: event!.id,
        tickets: JSON.stringify(selectedTickets),
      },
      theme: { color: "#3399cc" },
    };

<<<<<<< Updated upstream
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBookNow = async () => {
    try {
      const total = getTotalAmount();

      const order = await createOrder({
        user_id: 1, // TODO: replace with actual user ID
        event_id: Number(event.id),
        coupon_id: null,
        total_amount: total,
        discount_applied: 0,
        final_amount: total,
        payment_status: "pending",
      });

      setOrderId(order.id);
      setIsBookingModalOpen(true);
    } catch (error) {
      console.error("Create order failed:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  const handleTicketNameChange = (
    ticketId: number,
    index: number,
    name: string
  ) => {
    setTicketNames((prev) => {
      const currentNames = prev[ticketId] || [];
      const updatedNames = [...currentNames];
      updatedNames[index] = name;
      return { ...prev, [ticketId]: updatedNames };
    });
  };

  // Inside Booking Modal
  const bookings = Object.entries(selectedTickets).flatMap(
    ([ticketIdStr, quantity]) => {
      const ticketId = Number(ticketIdStr);
      const names = ticketNames[ticketId] || [];
      return Array.from({ length: quantity }).map((_, idx) => ({
        ticket_id: ticketId,
        name: names[idx] || "",
      }));
    }
  );

  if (!event) return <></>;
=======
    new window.Razorpay(options).open();
  };

  if (!event) return null;
>>>>>>> Stashed changes

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/events"
          className="inline-flex items-center text-primary hover:text-primary-hover mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
        </Link>

        <div
          className={`grid grid-cols-1 ${
            data?.user?.role === USER_ROLES.ORGANIZER
              ? "lg:grid-cols-1"
              : "lg:grid-cols-3"
          } gap-8`}
        >
          {/* Event Details section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-gradient-subtle rounded-lg mb-6 flex items-center justify-center overflow-hidden">
              {event.image_url ? (
                <img
                  src={event.image_url}
                  alt="Event"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Event Image</p>
                </div>
              )}
            </div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {event.category}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <EventTime
                      start_time={event.start_time}
                      end_time={event.end_time}
                    />
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Organizers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.organizers.map((org, i) => (
                    <Badge key={i} variant="outline">
                      {org.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            {data?.user?.role === USER_ROLES.ORGANIZER && (
              <CreateCoupon eventId={event.id} />
            )}
          </div>

          {/* Tickets & Booking section */}
          {data?.user?.role !== USER_ROLES.ORGANIZER && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Tickets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {event.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-semibold">{ticket.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          ₹{ticket.price} | Available: {ticket.available}
                        </p>
                      </div>
<<<<<<< Updated upstream

                      {ticket.available > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleTicketQuantityChange(ticket.id, -1)
                              }
                              disabled={!selectedTickets[ticket.id]}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>

                            <span className="px-4 font-medium">
                              {selectedTickets[ticket.id] || 0}
                            </span>

                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleTicketQuantityChange(ticket.id, 1)
                              }
                              disabled={
                                (selectedTickets[ticket.id] || 0) >=
                                Math.min(ticket.available, 10)
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Render input fields for each selected ticket */}
                          {Array.from({
                            length: selectedTickets[ticket.id] || 0,
                          }).map((_, idx) => (
                            <input
                              key={idx}
                              type="text"
                              placeholder={`Name for ticket ${idx + 1}`}
                              value={ticketNames[ticket.id]?.[idx] || ""}
                              onChange={(e) =>
                                handleTicketNameChange(
                                  ticket.id,
                                  idx,
                                  e.target.value
                                )
                              }
                              className="w-full border rounded p-2 mt-1"
                            />
                          ))}
                        </div>
                      )}

                      {ticket.available === 0 && (
                        <Button disabled className="w-full">
                          Sold Out
                        </Button>
                      )}

                      <Separator />
                    </div>
                  ))}

                  {getTotalTickets() > 0 ? (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex justify-between font-semibold">
                        <span>Total ({getTotalTickets()} tickets)</span>
                        <span>₹{getTotalAmount()}</span>
=======
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleTicketQuantityChange(ticket.id, -1)
                          }
                          disabled={
                            !selectedTickets[ticket.id] ||
                            selectedTickets[ticket.id] <= 0
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span>{selectedTickets[ticket.id] || 0}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleTicketQuantityChange(ticket.id, 1)
                          }
                          disabled={
                            (selectedTickets[ticket.id] || 0) >=
                            Math.min(ticket.available, 10)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
>>>>>>> Stashed changes
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Input attendee names per ticket */}
              {Object.entries(selectedTickets).map(([idStr, qty]) => {
                const id = Number(idStr);
                return (
                  <Card key={id}>
                    <CardHeader>
                      <CardTitle>
                        Enter names for {qty} {qty === 1 ? "ticket" : "tickets"}{" "}
                        - {event.tickets.find((t) => t.id === id)?.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {Array.from({ length: qty }).map((_, idx) => (
                        <input
                          key={idx}
                          type="text"
                          placeholder={`Name for ticket ${idx + 1}`}
                          value={ticketNames[id]?.[idx] || ""}
                          onChange={(e) =>
                            handleTicketNameChange(id, idx, e.target.value)
                          }
                          className="w-full rounded border px-2 py-1 mb-2"
                        />
                      ))}
                    </CardContent>
                  </Card>
                );
              })}

              {/* Coupon code */}
              <Card>
                <CardHeader>
                  <CardTitle>Apply Coupon</CardTitle>
                </CardHeader>
<<<<<<< Updated upstream
                <CardContent className="space-y-4">
                  {event.tickets.map((ticket) => (
                    <div key={ticket.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {ticket.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {ticket.available > 0
                              ? `${ticket.available} tickets remaining`
                              : "Sold out"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{ticket.price}</p>
                        </div>
                      </div>

                      {ticket.available > 0 ? (
                        <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setShowLoginOverlay(true)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>

                          <span className="px-4 font-medium">0</span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setShowLoginOverlay(true)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button disabled className="w-full">
                          Sold Out
                        </Button>
                      )}

                      <Separator />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Login Overlay */}
              <Dialog
                open={showLoginOverlay}
                onOpenChange={setShowLoginOverlay}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Please Login
                    </DialogTitle>
                  </DialogHeader>
                  <p className="text-center text-muted-foreground mb-4">
                    You need to login to book tickets.
                  </p>
=======
                <CardContent className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                    disabled={isApplyingCoupon}
                  />
>>>>>>> Stashed changes
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode.trim()}
                  >
                    {isApplyingCoupon ? "Applying..." : "Apply Coupon"}
                  </Button>
                  {couponError && (
                    <p className="text-sm text-red-600">{couponError}</p>
                  )}
                </CardContent>
              </Card>

              {/* Totals & Booking */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total ({getTotalTickets()} tickets)</span>
                  <span>{getTotalAmount()}₹</span>
                </div>
                {backendFinalAmount !== null && getDiscountAmount() > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{getDiscountAmount()}₹</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Amount to Pay</span>
                  <span>{getFinalAmount()}₹</span>
                </div>
                <Button
                  className="w-full"
                  onClick={handleBookNow}
                  disabled={getTotalTickets() === 0}
                >
                  Book Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {isBookingModalOpen && (
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <DialogTitle>Booking Confirmation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                {Object.entries(selectedTickets).map(([idStr, qty]) => {
                  const id = Number(idStr);
                  const ticket = event.tickets.find((c) => c.id === id);
                  return (
                    <div key={id} className="flex justify-between">
                      <span>
                        {ticket?.name} × {qty}
                      </span>
<<<<<<< Updated upstream
                      <span>₹{(Number(ticket?.price) || 0) * quantity}</span>
=======
                      <span>{(Number(ticket?.price) || 0) * qty}₹</span>
>>>>>>> Stashed changes
                    </div>
                  );
                })}
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{getTotalAmount()}</span>
              </div>
              {backendFinalAmount !== null && getDiscountAmount() > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{getDiscountAmount()}₹</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-primary border-t pt-2">
                <span>Final Amount</span>
                <span>{getFinalAmount()}₹</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsBookingModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handlePayment(bookings)}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Login Overlay */}
      {showLoginOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm mx-auto">
            <p>Please login to book tickets.</p>
            <Button onClick={() => setShowLoginOverlay(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
