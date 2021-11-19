module.exports = (sequelize, DataTypes) => {
    
    const Student_fees_history = sequelize.define("Student_fees_history", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        paid_months:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        total_months:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        additional_charges:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })

    return Student_fees_history
}