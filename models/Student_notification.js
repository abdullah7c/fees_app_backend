module.exports = (sequelize, DataTypes) => {
    
    const Student_notification = sequelize.define("Student_notification", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        notifications:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })

    return Student_notification
}