import { IRedirect, Redirect } from './redirect';
import Visitor from './visitor';

Visitor.belongsTo(Redirect);
Redirect.hasMany(Visitor);

export { IRedirect, Redirect, Visitor };
