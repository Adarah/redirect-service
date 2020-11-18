import * as express from 'express';
import { inject, injectable } from 'inversify';
import { Controller, Get, Path, Request, Res, Route, SuccessResponse, TsoaResponse } from 'tsoa';

import RedirectService from '../application/redirectService';
import IRedirectService from '../core/IRedirectService';
import provideSingleton from '../utils/provideSingleton';
import { ApiError } from './error';

@Route('/')
// @provideSingleton(TYPES.RedirectController)
@injectable()
class RedirectController extends Controller {
  private redirectService: IRedirectService;

  constructor(@inject(RedirectService) redirectService: IRedirectService) {
    super();
    this.redirectService = redirectService;
  }

  @Get('{alias}')
  @SuccessResponse(301, 'Redirects user to intended target')
  public async getRedirect(
    @Path() alias: string,
    @Request() request: express.Request,
    @Res() notFoundResponse: TsoaResponse<404, ApiError>,
  ): Promise<void> {
    try {
      const redirect = await this.redirectService.get(alias);
      const res = (<any>request).res as express.Response;
      res.redirect(redirect.target);
      res.header('Cache-Control', 'no-store, no-cache');
      this.setStatus(301);
    } catch (err) {
      notFoundResponse(404, err);
    }
  }
}

export { RedirectController };
