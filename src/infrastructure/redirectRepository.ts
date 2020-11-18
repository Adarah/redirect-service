import { injectable } from 'inversify';

import { IRedirect, Redirect } from '../core';
import IRedirectRepository from '../core/IRedirectRepository';

@injectable()
class RedirectRepository implements IRedirectRepository {
  async get(alias: string): Promise<IRedirect | null> {
    return Redirect.findOne({ where: { alias } });
  }

  async create(redirect: IRedirect): Promise<IRedirect> {
    return Redirect.create(redirect);
  }

  async bulkCreate(redirects: IRedirect[]): Promise<IRedirect[]> {
    return Redirect.bulkCreate(redirects, { validate: true });
  }
}

export default RedirectRepository;
