import { useState } from "react";
import { Calendar, MapPin, Tag, Trash, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { axiosPrivate } from "@/axios/instance";
import { Ticket } from "@/types/events";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/constants/event";
import { useUserData } from "@/context/user";

export default function EventCreationForm() {
  const { data } = useUserData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<File | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Event details
    formData.append("event[title]", title);
    formData.append("event[description]", description);
    formData.append("event[category]", category);
    formData.append("event[start_time]", startDate);
    formData.append("event[end_time]", endDate);
    formData.append("event[location]", `${venue}, ${address}`);

    if (image) {
      formData.append("event[image]", image);
    }

    // Tickets - append each ticket in "tickets[][field]" format
    tickets.forEach((ticket) => {
      formData.append(`tickets[][name]`, ticket.name);
      formData.append(`tickets[][price]`, ticket.price.toString());

      formData.append(`tickets[][capacity]`, ticket.capacity.toString());
      formData.append(`tickets[][available]`, ticket.available.toString());

      if (ticket.opening_start) {
        formData.append(`tickets[][opening_start]`, ticket.opening_start);
      }

      if (ticket.opening_end) {
        formData.append(`tickets[][opening_end]`, ticket.opening_end);
      }

      // If user_id is required, you can append it here (replace with real user id)
      formData.append(`tickets[][user_id]`, "1");
    });

    try {
      const res = await axiosPrivate.post("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: data.token,
        },
      });
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
                    {categories.map((category) => (
                      <SelectItem value={category.value}>
                        category.title
                      </SelectItem>
                    ))}
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

          {/* Event Image */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2 text-primary" /> Event Banner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="event-image-upload"
                />
                <label
                  htmlFor="event-image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Image className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    {image ? image.name : "Upload a high-quality banner image"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recommended: 1200x600px, JPG or PNG, max 5MB
                  </p>
                </label>
              </div>
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
