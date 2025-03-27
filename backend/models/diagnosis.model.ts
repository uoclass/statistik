import {
  Model,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
  type CreationOptional,
} from "@sequelize/core";
import {
  NotNull,
  Attribute,
  BelongsToMany,
  PrimaryKey,
  AutoIncrement,
} from "@sequelize/core/decorators-legacy";

import { Ticket } from "./ticket.model.ts";

export class Diagnosis extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare value: string;

  @BelongsToMany(() => Ticket, {
    through: "MarkedDiagnoses",
  })
  declare tickets?: NonAttribute<Ticket[]>;
}
