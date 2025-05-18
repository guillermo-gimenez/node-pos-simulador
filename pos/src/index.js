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
// /pos/venta-ux
if (request.method === 'POST' && pathname === '/pos/venta-ux') {
  const body = await parseBody(request);
  const { facturaNro, cuotas, plan } = body || {};
  if (facturaNro < 1 || facturaNro > 99999999999) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "Número de factura inválido"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  if (cuotas < 0 || cuotas > 99 || plan < 0 || plan > 1) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "Combinación inválida de Cuotas/Plan"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  const nsuBin = {
	nsu: "UX" + randomInt(1, 9999999),
	bin: "UX" + randomInt(1, 999999)
  };
  return new Response(JSON.stringify(nsuBin), {
	status: 200,
	headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

// /pos/venta/credito
if (request.method === 'POST' && pathname === '/pos/venta/credito') {
  const body = await parseBody(request);
  const { facturaNro, cuotas, plan } = body || {};
  if (facturaNro < 1 || facturaNro > 99999999999) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "Número de factura inválido"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  if (cuotas < 0 || cuotas > 99 || plan < 0 || plan > 1) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "Combinación inválida de Cuotas/Plan"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  const nsuBin = {
	nsu: randomInt(1, 9999999).toString(),
	bin: randomInt(1, 999999).toString()
  };
  return new Response(JSON.stringify(nsuBin), {
	status: 200,
	headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

// /pos/venta/debito
if (request.method === 'POST' && pathname === '/pos/venta/debito') {
  const body = await parseBody(request);
  const { facturaNro } = body || {};
  if (facturaNro < 1 || facturaNro > 99999999999) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "Número de factura inválido"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  const nsuBin = {
	nsu: randomInt(1, 9999999).toString(),
	bin: randomInt(1, 999999).toString()
  };
  return new Response(JSON.stringify(nsuBin), {
	status: 200,
	headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

// /pos/descuento
if (request.method === 'POST' && pathname === '/pos/descuento') {
  const body = await parseBody(request);
  const { nsu, bin, monto } = body || {};
  if (!nsu || !bin || monto < 1) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "NSU o BIN o MONTO inválido"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  if (monto > 1000000) {
	return new Response(JSON.stringify({
	  statusCode: 400,
	  error: "Bad request",
	  message: "Saldo insuficiente"
	}), {
	  status: 400,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  const resp = {
	codigoAutorizacion: randomInt(1, 999999).toString(),
	codigoComercio: randomInt(1, 9999999999).toString(),
	issuerId: "ZZ",
	mensajeDisplay: "APROBADA",
	montoVuelto: randomInt(0, 500000),
	saldo: randomInt(1, 500000000),
	nombreCliente: "Nombre de Alguien",
	pan: randomInt(1, 9999),
	nombreTarjeta: "VISA ZZZZZZZ",
	nroBoleta: randomInt(1, 9999999999).toString()
  };
  return new Response(JSON.stringify(resp), {
	status: 200,
	headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

// /pos/venta-qr
if (request.method === 'POST' && pathname === '/pos/venta-qr') {
  const body = await parseBody(request);
  const { facturaNro, monto } = body || {};
  if (monto < 10 || facturaNro < 10) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "NÚMERO DE FACTURA o MONTO inválido"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  if (monto > 1000000) {
	return new Response(JSON.stringify({
	  statusCode: 400,
	  error: "Bad request",
	  message: "Saldo insuficiente"
	}), {
	  status: 400,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  const resp = {
	codigoAutorizacion: randomInt(1, 999999).toString(),
	codigoComercio: randomInt(1, 9999999999).toString(),
	issuerId: "ZZ",
	mensajeDisplay: "APROBADA (QR)",
	montoVuelto: randomInt(0, 500000),
	saldo: randomInt(1, 500000000),
	nombreCliente: "Nombre de Alguien",
	pan: randomInt(1, 9999),
	nombreTarjeta: "VISA ZZZZZZZ",
	nroBoleta: randomInt(1, 9999999999).toString()
  };
  return new Response(JSON.stringify(resp), {
	status: 200,
	headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

// /pos/venta-canje
if (request.method === 'POST' && pathname === '/pos/venta-canje') {
  const body = await parseBody(request);
  const { facturaNro, monto } = body || {};
  if (monto < 10 || facturaNro < 10) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "NÚMERO DE FACTURA o MONTO inválido"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  if (monto > 1000000) {
	return new Response(JSON.stringify({
	  statusCode: 400,
	  error: "Bad request",
	  message: "Saldo insuficiente"
	}), {
	  status: 400,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  const resp = {
	codigoAutorizacion: randomInt(1, 999999).toString(),
	codigoComercio: randomInt(1, 9999999999).toString(),
	issuerId: "ZZ",
	mensajeDisplay: "APROBADA (CANJE)",
	montoVuelto: randomInt(0, 500000),
	saldo: randomInt(1, 500000000),
	nombreCliente: "Nombre de Alguien",
	pan: randomInt(1, 9999),
	nombreTarjeta: "VISA ZZZZZZZ",
	nroBoleta: randomInt(1, 9999999999).toString()
  };
  return new Response(JSON.stringify(resp), {
	status: 200,
	headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

// /pos/venta-billetera
if (request.method === 'POST' && pathname === '/pos/venta-billetera') {
  const body = await parseBody(request);
  const { facturaNro, monto } = body || {};
  if (monto < 10 || facturaNro < 10) {
	return new Response(JSON.stringify({
	  statusCode: 406,
	  error: "Bad request",
	  message: "NÚMERO DE FACTURA o MONTO inválido"
	}), {
	  status: 406,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  if (monto > 1000000) {
	return new Response(JSON.stringify({
	  statusCode: 400,
	  error: "Bad request",
	  message: "Saldo insuficiente"
	}), {
	  status: 400,
	  headers: { 'Content-Type': 'application/json; charset=utf-8' }
	});
  }
  const resp = {
	codigoAutorizacion: randomInt(1, 999999).toString(),
	codigoComercio: randomInt(1, 9999999999).toString(),
	issuerId: "ZZ",
	mensajeDisplay: "APROBADA (BILLETERA)",
	montoVuelto: randomInt(0, 500000),
	saldo: randomInt(1, 500000000),
	nombreCliente: "Nombre de Alguien",
	pan: randomInt(1, 9999),
	nombreTarjeta: "VISA ZZZZZZZ",
	nroBoleta: randomInt(1, 9999999999).toString()
  };
  return new Response(JSON.stringify(resp), {
	status: 200,
	headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
    // 404 por defecto
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
};
