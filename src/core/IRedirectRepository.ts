import { IRedirect, Redirect } from './index';

interface IRedirectRepository {
  get(alias: string): Promise<IRedirect | null>;
  create(redirect: IRedirect): Promise<IRedirect>;
  bulkCreate(redirects: IRedirect[]): Promise<IRedirect[]>;
}

export default IRedirectRepository;
