import { DataTypes, Model, Optional } from 'sequelize';

import conn from '../infrastructure/connection';
import Redirect from './redirect';

interface VisitorAttributes {
  id: string;
  ip: string;
}

interface VisitorCreationAttributes extends Optional<VisitorAttributes, 'id'> {}

class Visitor
  extends Model<VisitorAttributes, VisitorCreationAttributes>
  implements VisitorAttributes {
  public id!: string;

  public ip!: string;

  public createdAt!: Date;

  public updatedAt!: Date;
}

Visitor.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        isIP: true,
      },
    },
  },
  {
    tableName: 'visitors',
    sequelize: conn,
  },
);

export default Visitor;
