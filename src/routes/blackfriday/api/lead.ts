import { createFileRoute } from "@tanstack/react-router";
import { handleBfLead } from "@/lib/bf-lead.server";

// A LP estática em public/blackfriday chama "api/lead" relativo à pasta dela.
export const Route = createFileRoute("/blackfriday/api/lead")({
  server: { handlers: { POST: ({ request }) => handleBfLead(request) } },
});
