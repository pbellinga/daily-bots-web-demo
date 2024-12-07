import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Semantic search route");
  const originalQuestionParam = request.nextUrl.searchParams.get("original_question");
//   if (!originalQuestionParam) {
//     return Response.json({ error: "Unknown original question" });
//   }
  const originalQuestion = decodeURI(originalQuestionParam!);
//   const levelParam = request.nextUrl.searchParams.get("level");
//   if (!levelParam) {
//     return Response.json({ error: "Unknown level" });
//   }
//   const level = decodeURI(levelParam);
  console.log("Original question:", originalQuestion);
//   console.log("Level:", level);

//   if (originalQuestion && level) {
    
//   }
  return Response.json({
    similar_questions: ["Why is the sky blue?","Why is the sky turn red durign the evening", "Woohoo! Ahadeb spirit!", ]
  });
}
