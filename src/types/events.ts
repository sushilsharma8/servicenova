export interface Event {
  event_date: string;
  location: string;
  guest_count: number;
  client_id: string;
}

export interface EventServiceRequest {
  id: string;
  events: Event;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}