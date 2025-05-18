// worker.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    async function parseBody(req) {
      try {
        const text = await req.text();
        return JSON.parse(text);
      } catch {
        return null;
      }
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Rutas
    if (request.method === 'POST' && pathname === '/pos/eco') {
      const body = await parseBody(request);
      const ecoValue = body && body.eco;
      if (typeof ecoValue === 'number' && ecoValue >= 0 && ecoValue < 100) {
        // No hay setTimeout en Workers, así que devolvemos directo
        return new Response(JSON.stringify(body), {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      } else {
        return new Response(JSON.stringify({
          statusCode: 400,
          error: "Bad request",
          message: `Valor fuera del rango admitido [1-99]: ${ecoValue}`
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }
    }

    // Agrega aquí el resto de las rutas siguiendo el mismo patrón...

    // 404 por defecto
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
};