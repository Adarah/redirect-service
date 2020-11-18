import 'reflect-metadata';

import dotenv from 'dotenv';
import { buildProviderModule } from 'inversify-binding-decorators';

import app from './app';
// import IRedirectRepository from './core/IRedirectRepository';
import { iocContainer } from './ioc';
dotenv.config({ path: __dirname+'/env.test' });


// import TYPES from './types';

// const repo = iocContainer.get<IRedirectRepository>(TYPES.IRedirectRepository);
// console.log(repo);
iocContainer.load(buildProviderModule());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
