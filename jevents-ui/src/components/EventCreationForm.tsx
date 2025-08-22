import { useState } from "react";
import { Calendar, MapPin, Tag, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { axiosPrivate } from "@/axios/instance";
import { CreateEventRequest, Ticket } from "@/types/events";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventCreationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const handleTicketChange = (
    index: number,
    field: keyof Ticket,
    value: string | number,
  ) => {
    const updated = [...tickets];
    updated[index] = { ...updated[index], [field]: value };
    setTickets(updated);
  };

  const addTicket = () => {
    setTickets([
      ...tickets,
      {
        name: `Ticket ${tickets.length + 1}`,
        price: 0,
        status: 1,
        opening_start: "",
        opening_end: "",
        capacity: 0,
      },
    ]);
  };

  const removeTicket = (index: number) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateEventRequest = {
      event: {
        title,
        description,
        category,
        start_time: startDate,
        end_time: endDate,
        location: `${venue}, ${address}`,
      },
      tickets,
    };

    try {
      const res = await axiosPrivate.post("/events", payload);
      console.log("Event created:", res.data);
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-6">Event</h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Event Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Category Dropdown */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="meetup">Meetup</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Date & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Date & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <Input
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Tickets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="h-5 w-5 mr-2 text-primary" />
                Ticket Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 space-y-4 relative"
                >
                  <div className="flex justify-end items-center">
                    {tickets.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTicket(index)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  {/* Ticket Name on its own line */}
                  <div>
                    <label className="text-sm font-medium">Ticket Name</label>
                    <Input
                      placeholder="Ticket Name"
                      value={ticket.name}
                      onChange={(e) =>
                        handleTicketChange(index, "name", e.target.value)
                      }
                      className="mt-2"
                    />
                  </div>

                  {/* Other fields in grid 3 per line */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Price ($)</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={ticket.price}
                        onChange={(e) =>
                          handleTicketChange(
                            index,
                            "price",
                            Number(e.target.value),
                          )
                        }
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Quantity</label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={ticket.capacity ?? ""}
                        onChange={(e) =>
                          handleTicketChange(
                            index,
                            "capacity",
                            Number(e.target.value),
                          )
                        }
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Sales Start</label>
                      <Input
                        type="datetime-local"
                        value={ticket.opening_start}
                        onChange={(e) =>
                          handleTicketChange(
                            index,
                            "opening_start",
                            e.target.value,
                          )
                        }
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Sales End</label>
                      <Input
                        type="datetime-local"
                        value={ticket.opening_end}
                        onChange={(e) =>
                          handleTicketChange(
                            index,
                            "opening_end",
                            e.target.value,
                          )
                        }
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addTicket}>
                + Add Another Ticket
              </Button>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" className="btn-hero" size="lg">
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
