module.exports = (sequelize,DataTypes) => {

    const Fees = sequelize.define("Fees", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })

    return Fees
}