import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import { Attribute } from "@sequelize/core/decorators-legacy";
import { MySqlDialect } from "@sequelize/mysql";

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
  @Attribute(DataTypes.JSON)
  declare data: TicketFields | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export type { TicketFields as TicketFieldsType };
