import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({
    message: `Let's start exploring this topic together! 
    I'll guide you through some key concepts and we can discuss any questions you have along the way.
    Here is a first question to understand why the sky is blue: what object in sky provides the light for us on earth during the day?
    `
  });
}
