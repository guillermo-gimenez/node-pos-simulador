const http = require('http');

const port = 3000;

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                resolve(null);
            }
        });
    });
}

function sendJson(res, status, obj) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(obj));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const routes = {
    '/pos/eco': async (req, res) => {
        const body = await parseBody(req);
        const ecoValue = body && body.eco;
        if (typeof ecoValue === 'number' && ecoValue >= 0 && ecoValue < 100) {
            setTimeout(() => {
                sendJson(res, 200, body);
            }, ecoValue * 10);
        } else {
            sendJson(res, 400, {
                statusCode: 400,
                error: "Bad request",
                message: `Valor fuera del rango admitido [1-99]: ${ecoValue}`
            });
        }
    },
    '/pos/venta-ux': async (req, res) => {
        const body = await parseBody(req);
        const { facturaNro, cuotas, plan } = body || {};
        if (facturaNro < 1 || facturaNro > 99999999999) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "Número de factura inválido"
            });
        }
        if (cuotas < 0 || cuotas > 99 || plan < 0 || plan > 1) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "Combinación inválida de Cuotas/Plan"
            });
        }
        const nsuBin = {
            nsu: "UX" + randomInt(1, 9999999),
            bin: "UX" + randomInt(1, 999999)
        };
        sendJson(res, 200, nsuBin);
    },
    '/pos/venta/credito': async (req, res) => {
        const body = await parseBody(req);
        const { facturaNro, cuotas, plan } = body || {};
        if (facturaNro < 1 || facturaNro > 99999999999) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "Número de factura inválido"
            });
        }
        if (cuotas < 0 || cuotas > 99 || plan < 0 || plan > 1) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "Combinación inválida de Cuotas/Plan"
            });
        }
        const nsuBin = {
            nsu: randomInt(1, 9999999).toString(),
            bin: randomInt(1, 999999).toString()
        };
        sendJson(res, 200, nsuBin);
    },
    '/pos/venta/debito': async (req, res) => {
        const body = await parseBody(req);
        const { facturaNro } = body || {};
        if (facturaNro < 1 || facturaNro > 99999999999) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "Número de factura inválido"
            });
        }
        const nsuBin = {
            nsu: randomInt(1, 9999999).toString(),
            bin: randomInt(1, 999999).toString()
        };
        sendJson(res, 200, nsuBin);
    },
    '/pos/descuento': async (req, res) => {
        const body = await parseBody(req);
        const { nsu, bin, monto } = body || {};
        if (!nsu || !bin || monto < 1) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "NSU o BIN o MONTO inválido"
            });
        }
        if (monto > 1000000) {
            return sendJson(res, 400, {
                statusCode: 400,
                error: "Bad request",
                message: "Saldo insuficiente"
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
        sendJson(res, 200, resp);
    },
    '/pos/venta-qr': async (req, res) => {
        const body = await parseBody(req);
        const { facturaNro, monto } = body || {};
        if (monto < 10 || facturaNro < 10) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "NÚMERO DE FACTURA o MONTO inválido"
            });
        }
        if (monto > 1000000) {
            return sendJson(res, 400, {
                statusCode: 400,
                error: "Bad request",
                message: "Saldo insuficiente"
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
        sendJson(res, 200, resp);
    },
    '/pos/venta-canje': async (req, res) => {
        const body = await parseBody(req);
        const { facturaNro, monto } = body || {};
        if (monto < 10 || facturaNro < 10) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "NÚMERO DE FACTURA o MONTO inválido"
            });
        }
        if (monto > 1000000) {
            return sendJson(res, 400, {
                statusCode: 400,
                error: "Bad request",
                message: "Saldo insuficiente"
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
        sendJson(res, 200, resp);
    },
    '/pos/venta-billetera': async (req, res) => {
        const body = await parseBody(req);
        const { facturaNro, monto } = body || {};
        if (monto < 10 || facturaNro < 10) {
            return sendJson(res, 406, {
                statusCode: 406,
                error: "Bad request",
                message: "NÚMERO DE FACTURA o MONTO inválido"
            });
        }
        if (monto > 1000000) {
            return sendJson(res, 400, {
                statusCode: 400,
                error: "Bad request",
                message: "Saldo insuficiente"
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
        sendJson(res, 200, resp);
    }
};

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && routes[req.url]) {
        await routes[req.url](req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});