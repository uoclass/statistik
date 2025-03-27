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
import { Attribute, BelongsToMany } from "@sequelize/core/decorators-legacy";
import { Diagnosis } from "./diagnosis.model.ts";
/* Ticket Model Definition */
export class Ticket extends Model {
}
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "ticket_id", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "title", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "assigned_to", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "requestor", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "email", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "department", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "location", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "room", void 0);
__decorate([
    Attribute(DataTypes.DATE),
    __metadata("design:type", Object)
], Ticket.prototype, "created", void 0);
__decorate([
    Attribute(DataTypes.DATE),
    __metadata("design:type", Object)
], Ticket.prototype, "modified", void 0);
__decorate([
    Attribute(DataTypes.STRING),
    __metadata("design:type", Object)
], Ticket.prototype, "status", void 0);
__decorate([
    BelongsToMany(() => Diagnosis, {
        through: "MarkedDiagnoses",
    }),
    __metadata("design:type", Object)
], Ticket.prototype, "diagnoses", void 0);
