import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "@sequelize/core";
import { Attribute } from "@sequelize/core/decorators-legacy";

// const sequelize = new Sequelize({ dialect: MySqlDialect });

/* User Model Definition */
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Attribute(DataTypes.STRING)
  declare username: string | null;

  @Attribute(DataTypes.CHAR(60).BINARY)
  declare password: string | null;
}
