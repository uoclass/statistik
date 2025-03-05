import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
} from "@sequelize/core";
import { Attribute, BelongsToMany } from "@sequelize/core/decorators-legacy";

import { Diagnosis } from "./diagnosis.model.ts";

// const sequelize = new Sequelize({ dialect: MySqlDialect });

interface TicketFields {
  ticket_id: string;
  title: string;
  assigned_to: string;
  requestor: string;
  email: string;
  department: string;
  location: string;
  room: string;
  created: string;
  modified: string;
  status: string;
  diagnoses: Array<string>;
}

/* Ticket Model Definition */
export class Ticket extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  @Attribute(DataTypes.STRING)
  declare ticket_id: string | null;

  @Attribute(DataTypes.STRING)
  declare title: string | null;

  @Attribute(DataTypes.STRING)
  declare assigned_to: string | null;

  @Attribute(DataTypes.STRING)
  declare requestor: string | null;

  @Attribute(DataTypes.STRING)
  declare email: string | null;

  @Attribute(DataTypes.STRING)
  declare department: string | null;

  @Attribute(DataTypes.STRING)
  declare location: string | null;

  @Attribute(DataTypes.STRING)
  declare room: string | null;

  @Attribute(DataTypes.DATE)
  declare created: string | null;

  @Attribute(DataTypes.DATE)
  declare modified: string | null;

  @Attribute(DataTypes.STRING)
  declare status: string | null;

  @BelongsToMany(() => Diagnosis, {
    through: "MarkedDiagnoses",
  })
  declare diagnoses: NonAttribute<Diagnosis[]>;

  declare setDiagnoses: BelongsToManySetAssociationsMixin<
    Diagnosis,
    Diagnosis["id"]
  >;

  declare getDiagnoses: BelongsToManyGetAssociationsMixin<Diagnosis>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type { TicketFields as TicketFieldsType };
