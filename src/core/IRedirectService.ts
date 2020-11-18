import { IRedirect, Redirect } from './index';

interface IRedirectService {
  get(alias: string): Promise<IRedirect>;
  create(redirect: IRedirect): Promise<IRedirect>;
  bulkCreate(redirects: IRedirect[]): Promise<IRedirect[]>;
}

export default IRedirectService;
