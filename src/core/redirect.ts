import { injectable } from 'inversify';
import {
  DataTypes,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  Model,
  Optional,
} from 'sequelize';

import conn from '../infrastructure/connection';
import Visitor from './visitor';

interface IRedirect {
  id?: string;
  target: string;
  alias?: string;
}

interface RedirectCreationAttributes extends Optional<IRedirect, 'id' | 'alias'> {}

@injectable()
class Redirect extends Model<IRedirect, RedirectCreationAttributes> implements IRedirect {
  public id?: string;

  public target!: string;

  public alias?: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public getVisitors!: HasManyGetAssociationsMixin<Visitor>;

  public addVisitor!: HasManyAddAssociationsMixin<Visitor, string>;

  // source: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  public static makeId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

Redirect.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    target: {
      type: DataTypes.TEXT,
      validate: {
        isURL: {
          args: [
            {
              require_protocol: true,
            },
          ],
        },
      },
      allowNull: false,
    },
    alias: {
      type: DataTypes.STRING(30),
      validate: { is: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/, len: [3, 30] },
      allowNull: false,
      unique: true,
      defaultValue: () => Redirect.makeId(7),
    },
  },
  {
    indexes: [{ unique: true, fields: ['alias'] }],
    tableName: 'redirects',
    sequelize: conn,
  },
);

export default Redirect;
export { IRedirect, Redirect };
