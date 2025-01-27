// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (request, context) => {
  try {
    const url = new URL(request.url);
    const city = url.searchParams.get("city") || "World";
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
    );

    const weatherData = await data.json();

    return new Response(JSON.stringify(weatherData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return { statusCode: 500, error: error.toString() };
  }
};
