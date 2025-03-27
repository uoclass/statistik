import {
  Model,
  DataTypes,
} from "@sequelize/core";

import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";

import {
  NotNull,
  Attribute,
  PrimaryKey,
  AutoIncrement,
} from "@sequelize/core/decorators-legacy";

export class Display extends Model<
  InferAttributes<Display>,
  InferCreationAttributes<Display>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  // foreign key
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @Attribute(DataTypes.JSON)
  @NotNull
  declare viewConfig: ViewConfig;
}

export interface ViewConfig {
  // display
  layout: string;
  grouping: string;

  // filters
  termStart?: string;
  termEnd?: string;
  building: Array<{ value: string; label: string }>;
  requestor: Array<{ value: string; label: string }>;
  diagnoses: Array<{ value: string; label: string }>;
  room?: string;
  titleSubstring?: string;
  matchAllDiagnoses?: boolean;
}
