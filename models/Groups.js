module.exports = (sequelize,DataTypes) => {

    const Groups = sequelize.define("Groups", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })

    return Groups
}