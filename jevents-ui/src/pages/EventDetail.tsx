import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";
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

// --- Interfaces ---
interface TicketCategory {
  id: string;
  name: string;
  price: number;
  totalCount: number;
  remainingCount: number;
  description?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  organizers: string[];
  category: string;
  image: string;
  ticketCategories: TicketCategory[];
}

// --- Mock Data ---
const mockEvent: Event = {
  id: "1",
  title: "Tech Innovation Summit 2024",
  description: "...",
  date: "2024-09-15",
  time: "09:00 AM - 06:00 PM",
  location: "San Francisco, CA",
  venue: "Moscone Center, Hall A",
  organizers: ["TechEvents Inc.", "Innovation Hub"],
  category: "Technology",
  image: "/placeholder.svg",
  ticketCategories: [
    {
      id: "vip",
      name: "VIP Access",
      price: 299,
      totalCount: 50,
      remainingCount: 12,
      description:
        "Premium seating, exclusive networking session, complimentary lunch",
    },
    {
      id: "standard",
      name: "Standard",
      price: 149,
      totalCount: 200,
      remainingCount: 87,
      description: "Access to all sessions and networking area",
    },
    {
      id: "student",
      name: "Student",
      price: 49,
      totalCount: 100,
      remainingCount: 45,
      description: "Special rate for students (ID verification required)",
    },
  ],
};

export default function EventDetail() {
  const { data } = useUserData();
  const { id } = useParams();

  const [selectedTickets, setSelectedTickets] = useState<
    Record<string, number>
  >({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const event = mockEvent; // TODO: fetch by ID later

  const handleTicketQuantityChange = (categoryId: string, change: number) => {
    setSelectedTickets((prev) => {
      const currentQuantity = prev[categoryId] || 0;
      const category = event.ticketCategories.find((c) => c.id === categoryId);
      const maxQuantity = Math.min(category?.remainingCount || 0, 10);
      const newQuantity = Math.max(
        0,
        Math.min(maxQuantity, currentQuantity + change)
      );

      if (newQuantity === 0) {
        const { [categoryId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [categoryId]: newQuantity };
    });
  };

  const getTotalAmount = () => {
    return Object.entries(selectedTickets).reduce(
      (total, [categoryId, quantity]) => {
        const category = event.ticketCategories.find(
          (c) => c.id === categoryId
        );
        return total + (category?.price || 0) * quantity;
      },
      0
    );
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce(
      (total, qty) => total + qty,
      0
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePayment = () => {
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
      image: event.image,
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

          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
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
              <div className="aspect-video bg-gradient-subtle rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Event Image</p>
                </div>
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
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}, {event.location}
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
                      {org}
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
                  {event.ticketCategories.map((category) => (
                    <div key={category.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {category.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.remainingCount > 0
                              ? `${category.remainingCount} tickets remaining`
                              : "Sold out"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${category.price}</p>
                        </div>
                      </div>

                      {category.remainingCount > 0 && (
                        <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleTicketQuantityChange(category.id, -1)
                            }
                            disabled={!selectedTickets[category.id]}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>

                          <span className="px-4 font-medium">
                            {selectedTickets[category.id] || 0}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleTicketQuantityChange(category.id, 1)
                            }
                            disabled={
                              (selectedTickets[category.id] || 0) >=
                              Math.min(category.remainingCount, 10)
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      )}

                      {category.remainingCount === 0 && (
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
                        <span>${getTotalAmount()}</span>
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
                  {event.ticketCategories.map((category) => (
                    <div key={category.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {category.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.remainingCount > 0
                              ? `${category.remainingCount} tickets remaining`
                              : "Sold out"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${category.price}</p>
                        </div>
                      </div>

                      {category.remainingCount > 0 ? (
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
                {Object.entries(selectedTickets).map(
                  ([categoryId, quantity]) => {
                    const category = event.ticketCategories.find(
                      (c) => c.id === categoryId
                    );
                    return (
                      <div key={categoryId} className="flex justify-between">
                        <span>
                          {category?.name} × {quantity}
                        </span>
                        <span>${(category?.price || 0) * quantity}</span>
                      </div>
                    );
                  }
                )}
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${getTotalAmount()}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsBookingModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handlePayment}>
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
