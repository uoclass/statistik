import {
  Model,
  DataTypes,
} from "@sequelize/core";

import type {
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyCreateAssociationMixin,
} from "@sequelize/core";
import { Attribute, HasMany } from "@sequelize/core/decorators-legacy";
import { Display } from "./display.model.ts";

/* User Model Definition */
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Attribute(DataTypes.STRING)
  declare username: string | null;

  @Attribute(DataTypes.STRING)
  declare fullName: string | null;

  @Attribute(DataTypes.CHAR(60).BINARY)
  declare password: string | null;

  @HasMany(() => Display, "userId")
  declare displays?: NonAttribute<Display[]>;

  declare getDisplays: HasManyGetAssociationsMixin<Display>;

  declare createDisplay: HasManyCreateAssociationMixin<Display, "userId">;

  declare removeDisplay: HasManyRemoveAssociationMixin<Display, Display["id"]>;
}
