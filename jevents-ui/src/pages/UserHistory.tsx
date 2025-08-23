import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Search, Eye, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import { Booking } from "@/types/history";
import { useUserHistory } from "@/hooks/useUserHistory";

export default function UserHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());

  const { history } = useUserHistory();

  const filteredOrders = history.filter((order) => {
    const eventTitle = order.bookings[0]?.ticket.event.title || "";
    return eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleOrderExpansion = (orderId: number) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }

    setExpandedOrders(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTotalTickets = (bookings: Booking[]) => {
    return bookings.reduce((total, booking) => total + booking.count, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-muted-foreground">
            View your past and current ticket orders
          </p>
        </div>

        {/* Search filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by event name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const event = order.bookings[0]?.ticket.event;
            return (
              <Card key={order.id} className="overflow-hidden">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <div
                      className="w-full cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      <CardContent className="p-6 flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {event?.title}
                          </h3>
                          <span className="flex items-center gap-1">
                            <Ticket className="w-4 h-4" />
                            {getTotalTickets(order.bookings)} tickets
                          </span>
                          <p className="text-sm text-muted-foreground">
                            Order #{order.id} • {formatDate(order.created_at)}
                          </p>
                        </div>
                        <motion.div
                          animate={{
                            rotate: expandedOrders.has(order.id) ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </CardContent>
                    </div>
                  </CollapsibleTrigger>

                  <AnimatePresence initial={false}>
                    {expandedOrders.has(order.id) && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Separator />
                        <CardContent className="p-6 pt-4 bg-muted/20">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Ticket className="w-4 h-4" /> Ticket Details
                          </h4>

                          {order.bookings.map((b) => (
                            <div
                              key={b.id}
                              className="flex justify-between items-center p-3 mb-2 bg-background rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{b.ticket.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  ₹{b.ticket.price} × {b.count || 1}
                                </p>
                              </div>
                              <p className="font-semibold">
                                ₹
                                {(
                                  parseFloat(b.ticket.price) * (b.count || 1)
                                ).toFixed(2)}
                              </p>
                            </div>
                          ))}

                          <div className="flex gap-2 mt-4">
                            <Button
                              asChild
                              variant="outline"
                              className="flex-1"
                            >
                              <Link to={`/event/${event?.id}`}>
                                <Eye className="w-4 h-4 mr-2" /> View Event
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
