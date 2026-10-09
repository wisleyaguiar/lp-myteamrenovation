import { createFileRoute } from "@tanstack/react-router";
import { handleLead } from "@/lib/lead.server";

export const Route = createFileRoute("/api/lead")({
  server: { handlers: { POST: ({ request }) => handleLead(request) } },
});
