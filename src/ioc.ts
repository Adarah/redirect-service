// source: https://tsoa-community.github.io/docs/di.html#inversifyjs
import { Container, decorate, injectable } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { Controller } from 'tsoa';

import { RedirectController } from './api/redirectController';
import RedirectService from './application/redirectService';
// import TYPES from './types';
// import { Redirect } from './core';
import RedirectRepository from './infrastructure/redirectRepository';

// Create a new container tsoa can use
const iocContainer = new Container();
decorate(injectable(), Controller); // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.bind<RedirectController>(RedirectController).toSelf();
iocContainer.bind<RedirectService>(RedirectService).toSelf();
iocContainer.bind<RedirectRepository>(RedirectRepository).toSelf();
iocContainer.load(buildProviderModule());

// export according to convention
export default iocContainer;
export { iocContainer };
