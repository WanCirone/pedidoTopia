import xmlparser from 'express-xml-bodyparser';
import xml from 'xml2js';
import server from './product';
import pgp from 'pg-promise';


const connect = (config) => {
  const pg = pgp({
    promiseLib: promise,
    noWarnings: true
  });

  return pg(config.DATABASE_URL);
};

const connection = connect({
  DATABASE_URL: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
});

// XML Parser configurations
const xmlOptions = {
  charkey: 'value',
  trim: false,
  explicitRoot: false,
  explicitArray: false,
  normalizeTags: false,
  mergeAttrs: true,
};

// XML Builder configuration, https://github.com/Leonidas-from-XIV/node-xml2js#options-for-the-builder-class.
const product = new xml.Product({
  renderOpts: { 'pretty': false }
});

    const bustHeaders = (request, response, next) => {
      request.app.isXml = false;
    
      if (request.headers['content-type'] === 'application/xml'
        || request.headers['accept'] === 'application/xml'
      ) {
        request.app.isXml = true;
      }
    
      next();
    };

const buildResponse = (response, statusCode, data, preTag) => {
  response.format({
    'application/json': () => {
      response.status(statusCode).json(data);
    },
    'application/xml': () => {
      response.status(statusCode).send(product.buildObject({ [preTag]: data }));
    },
    'default': () => {
      // log the request and respond with 406
      response.status(406).send('Not Acceptable');
    }
  });
};

server.post('/', bustHeaders, xmlparser(xmlOptions), (request, response) => {
  const { title_soap, description_soap, sku_soap, stock_inicial_soap,precio_inicial_soap } = (request.body['Product'] || request.body);
  const sql =

  connection.one(sql, [title_soap, description_soap, sku_soap, stock_inicial_soap,precio_inicial_soap])

    .then((result) => {
      return buildResponse(response, 200, result, 'Product');
    })
    .catch((error) => buildResponse(response, 500, { message: 'INTERNAL SERVER ERROR' }));
});