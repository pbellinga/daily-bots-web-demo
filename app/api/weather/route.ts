import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const locationParam = request.nextUrl.searchParams.get("location");
  if (!locationParam) {
    return Response.json({ error: "Unknown location" });
  }
  const location = decodeURI(locationParam);
  const excludeParam = request.nextUrl.searchParams.get("exclude");
  const exclude = ["minutely", "hourly", "daily"];
  if (excludeParam) {
    exclude.concat(excludeParam.split(","));
  }
  const locationReq = await fetch(
    //`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=52c6049352e0ca9c979c3c49069b414d`
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=knmi_seamless"
  );
  console.log(locationReq);
  const locJson = await locationReq.json();
  console.log(locJson);
  const loc = { lat: locJson.latitude, lon: locJson.longitude };
  console.log(loc)
  const weatherRec = await fetch(
    // `https://api.openweathermap.org/data/3.0/onecall?lat=${loc.lat}&lon=${
    //   loc.lon
    // }&exclude=${exclude.join(",")}&appid=52c6049352e0ca9c979c3c49069b414d`
    `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=knmi_seamless`
  );
  const weatherJson = await weatherRec.json();
  return Response.json({ weather: locJson });
}