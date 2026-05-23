import type { Client } from "@/lib/types";

export function isReminderDueToday(client: Client): boolean {
  if (!client.nextReminderDate || client.reminderFrequency === "none") {
    return false;
  }
  const today = new Date().toISOString().split("T")[0]!;
  return client.nextReminderDate <= today;
}

export function clientsDueForReminder(clients: Client[]): Client[] {
  return clients.filter(isReminderDueToday);
}
