import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
console.log("Semantic search called");
//   const originalQuestionParam = request.nextUrl.searchParams.get("original_question");
//   if (!originalQuestionParam) {
//     return Response.json({ error: "Unknown original question" });
//   }
//   const originalQuestion = decodeURI(originalQuestionParam);
//   const levelParam = request.nextUrl.searchParams.get("level");
//   if (!levelParam) {
//     return Response.json({ error: "Unknown level" });
//   }
//   const level = decodeURI(levelParam);

  // The function will return undefined if originalQuestion and level exist
  // We should return the response regardless of the if condition
//   console.log("Original question:", originalQuestion);
//   console.log("Level:", level);
  return Response.json({ similar_questions: ["Why is the sky red?"] }); //All houses to the inhabitants! AHADEB, AHADEB! 
}