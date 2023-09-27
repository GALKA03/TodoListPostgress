import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'newTask'
})
export default class TasksModel extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id!: number;

    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.TEXT)
    text!: string;

   @Column({
        type: DataType.ENUM,
        values: ['inProgress', 'done'],
        allowNull: false,
        defaultValue: 'inProgress'
    })
    status!: 'inProgress' | 'done';
    // ... Add other columns if necessary
}
