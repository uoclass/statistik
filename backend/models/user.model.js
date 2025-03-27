var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Model, DataTypes, } from "@sequelize/core";
import { Attribute, HasMany } from "@sequelize/core/decorators-legacy";
import { Display } from "./display.model.ts";
/* User Model Definition */
export class User extends Model {
}
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], User.prototype, "username", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], User.prototype, "fullName", void 0);
__decorate([
    Attribute(DataTypes.CHAR(60).BINARY),
    __metadata("design:type", Object)
], User.prototype, "password", void 0);
__decorate([
    HasMany(() => Display, "userId"),
    __metadata("design:type", Object)
], User.prototype, "displays", void 0);
