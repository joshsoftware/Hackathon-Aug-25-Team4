import { useState } from "react";
import { Link } from "react-router-dom";
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

export default function EventDetail() {
  const { data } = useUserData();
  const { event } = useEvent();

  const [selectedTickets, setSelectedTickets] = useState<
    Record<number, number>
  >({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [ticketNames, setTicketNames] = useState<Record<number, string[]>>({});

  const handleTicketQuantityChange = (ticketId: number, change: number) => {
    setSelectedTickets((prev) => {
      const currentQuantity = prev[ticketId] || 0;
      const category = event.tickets.find((c) => c.id === ticketId);
      const maxQuantity = Math.min(category?.available || 0, 10);
      const newQuantity = Math.max(
        0,
        Math.min(maxQuantity, currentQuantity + change),
      );

      if (newQuantity === 0) {
        const { [ticketId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [ticketId]: newQuantity };
    });
  };

  const getTotalAmount = () => {
    return Object.entries(selectedTickets).reduce(
      (total, [ticketId, quantity]) => {
        const category = event.tickets.find((c) => String(c.id) === ticketId);
        return total + (Number(category?.price) || 0) * quantity;
      },
      0,
    );
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce(
      (total, qty) => total + qty,
      0,
    );
  };

  const handlePayment = (bookings: Booking[]) => {
    const totalAmountInPaise = getTotalAmount() * 100;

    if (!orderId) {
      alert("Order ID not found. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_R8SxN8FrDdN8KF",
      amount: totalAmountInPaise,
      currency: "INR",
      name: event.title,
      description: "Ticket Booking",
      handler: async function (response: any) {
        try {
          await updateOrder(orderId, { payment_status: "paid" });

          await createPayment({
            order_id: orderId,
            method: "upi",
            transaction_id: response.razorpay_payment_id,
            amount: totalAmountInPaise / 100,
            status: "success",
          });

          // Create bookings
          await createBookings({ order_id: orderId, bookings: bookings });
        } catch (err) {
          console.error("Error saving payment/order:", err);
          alert("Payment succeeded, but order/payment update failed.");
        }

        setIsBookingModalOpen(false);
        setSelectedTickets({});
        setOrderId(null);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        eventId: event.id,
        tickets: JSON.stringify(selectedTickets),
      },
      theme: { color: "#3399cc" },
    };

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
    name: string,
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
    },
  );

  if (!event) return <></>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link
          to="/events"
          className="inline-flex items-center text-primary hover:text-primary-hover mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        <div
          className={`grid grid-cols-1 ${
            data?.user?.role === USER_ROLES.ORGANIZER
              ? "lg:grid-cols-1"
              : "lg:grid-cols-3"
          } gap-8`}
        >
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="aspect-video bg-gradient-subtle rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                {event?.image_url ? (
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
            </div>

            {/* Description */}
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

            {/* Organizers */}
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
          </div>

          {/* Ticket Booking Section */}
          {data?.user?.role === USER_ROLES.ATTENDEE && (
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Select Tickets</CardTitle>
                </CardHeader>
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
                          <p className="font-bold text-lg">${ticket.price}</p>
                        </div>
                      </div>

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
                                  e.target.value,
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
                        <span>{getTotalAmount()}₹</span>
                      </div>
                      <Button className="w-full" onClick={handleBookNow}>
                        Book Now
                      </Button>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground text-sm py-4">
                      Select tickets to proceed with booking
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* If not logged in */}
          {!data?.user?.role && (
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Select Tickets</CardTitle>
                </CardHeader>
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
                          <p className="font-bold text-lg">{ticket.price}₹</p>
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
                  <Button
                    className="w-full"
                    onClick={() => {
                      setShowLoginOverlay(false);
                      // TODO: redirect to login page
                    }}
                  >
                    Go to Login
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Booking Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {Object.entries(selectedTickets).map(([id, quantity]) => {
                  const ticket = event.tickets.find((c) => String(c.id) === id);
                  return (
                    <div key={id} className="flex justify-between">
                      <span>
                        {ticket?.name} × {quantity}
                      </span>
                      <span>{(Number(ticket?.price) || 0) * quantity}₹</span>
                    </div>
                  );
                })}
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{getTotalAmount()}₹</span>
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
