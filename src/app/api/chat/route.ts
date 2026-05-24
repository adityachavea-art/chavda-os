export async function POST(req: Request) {
  const body = await req.json();

  const userMessage = body.message.toLowerCase();

  let reply = "";

  if (userMessage.includes("finance")) {
    reply =
      "📊 Finance module active. Revenue, expenses and profit analytics ready.";
  } else if (userMessage.includes("crm")) {
    reply =
      "👨‍💼 CRM connected. Client management and lead tracking enabled.";
  } else if (userMessage.includes("tasks")) {
    reply =
      "✅ Task manager running. Productivity workflow optimized.";
  } else if (userMessage.includes("analytics")) {
    reply =
      "📈 Analytics dashboard connected with smart business insights.";
  } else {
    reply =
      "🚀 Hello Aditya! Chavda OS AI Assistant is online and fully operational.";
  }

  return Response.json({
    reply,
  });
}