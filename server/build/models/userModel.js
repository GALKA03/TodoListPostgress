var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Model, Table, Column, DataType, PrimaryKey, Default, IsEmail, Unique, AllowNull, BeforeSave, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;
let User = class User extends Model {
    static async hashPassword(instance) {
        if (instance.changed('user_password')) {
            instance.user_password = await bcrypt.hash(instance.user_password, SALT_ROUNDS);
        }
    }
    async verifyPassword(password) {
        return bcrypt.compare(password, this.user_password);
    }
};
__decorate([
    PrimaryKey,
    Default(DataType.UUIDV4),
    Column(DataType.UUID),
    __metadata("design:type", String)
], User.prototype, "user_id", void 0);
__decorate([
    AllowNull(false),
    Column,
    __metadata("design:type", String)
], User.prototype, "user_name", void 0);
__decorate([
    IsEmail,
    AllowNull(false),
    Unique,
    Column,
    __metadata("design:type", String)
], User.prototype, "user_email", void 0);
__decorate([
    AllowNull(false),
    Column,
    __metadata("design:type", String)
], User.prototype, "user_password", void 0);
__decorate([
    BeforeSave,
    BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
User = __decorate([
    Table
], User);
export default User;
//# sourceMappingURL=userModel.js.map