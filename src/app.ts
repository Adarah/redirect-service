import bodyParser from 'body-parser';
import express, { Request as ExRequest, Response as ExResponse } from 'express';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../build/routes';
import dbConnection from './infrastructure/connection';

const app = express();
dbConnection.sync();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});

RegisterRoutes(app);

export default app;
