// source: https://tsoa-community.github.io/docs/di.html#inversifyjs
import { fluentProvide } from 'inversify-binding-decorators';
import { interfaces } from 'inversify';

function provideSingleton<T>(identifier: interfaces.ServiceIdentifier<T>) {
  return fluentProvide(identifier).inSingletonScope().done();
};

export default provideSingleton;
