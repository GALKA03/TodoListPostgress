
import { Model, Table, Column, DataType, PrimaryKey, Default, IsEmail, Unique, AllowNull, BeforeSave, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';



const SALT_ROUNDS = 10;

@Table
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    user_id!: string;

    @AllowNull(false)
    @Column
    user_name!: string;

    @IsEmail
    @AllowNull(false)
    @Unique
    @Column
    user_email!: string;

    @AllowNull(false)
    @Column
    user_password!: string;

    @BeforeSave
    @BeforeUpdate
    static async hashPassword(instance: User) {
    if (instance.changed('user_password')) {
        instance.user_password = await bcrypt.hash(instance.user_password, SALT_ROUNDS);
        console.log('Hashed Password:', instance.user_password); // Logging the hashed password
    }
}

    async verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.user_password);
    }
}
