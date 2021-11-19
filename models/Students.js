module.exports = (sequelize, DataTypes) => {
    
    const Students = sequelize.define("Students", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        phone:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        address:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })

    return Students
}