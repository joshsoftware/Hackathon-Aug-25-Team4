import { format, isSameDay } from "date-fns";

interface Props {
  start_time: string;
  end_time: string;
}

export function EventTime({ start_time, end_time }: Props) {
  const start = new Date(start_time);
  const end = new Date(end_time);

  const sameDay = isSameDay(start, end);

  return (
    <p className="text-sm text-muted-foreground">
      {format(start, "MMM d, yyyy · h:mm a")} -{" "}
      {sameDay ? format(end, "h:mm a") : format(end, "MMM d, yyyy · h:mm a")}
    </p>
  );
}
