import { inject, injectable } from 'inversify';

import { ApiError, ApiErrorType } from '../api/error';
import { IRedirect, Redirect } from '../core';
import IRedirectRepository from '../core/IRedirectRepository';
import IRedirectService from '../core/IRedirectService';
import RedirectRepository from '../infrastructure/redirectRepository';

@injectable()
class RedirectService implements IRedirectService {
  private redirectRepository: IRedirectRepository;

  constructor(@inject(RedirectRepository) redirectRepository: IRedirectRepository) {
    this.redirectRepository = redirectRepository;
  }

  async get(alias: string): Promise<IRedirect> {
    const redirect = await this.redirectRepository.get(alias);
    if (redirect === null) {
      throw new ApiError(
        404,
        ApiErrorType.RedirectNotFound,
        `Redict with alias '${alias}' does not exist in the database.`,
      );
    }
    return redirect;
  }

  async create(redirect: IRedirect): Promise<IRedirect> {
    return this.redirectRepository.create(redirect);
  }

  async bulkCreate(redirects: IRedirect[]): Promise<IRedirect[]> {
    return this.redirectRepository.bulkCreate(redirects);
  }
}

export default RedirectService;
