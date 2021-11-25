const {DataTypes} = require('sequelize')
const { Groups, Students, Student_notification, Student_fees_history, Fees, Users } = require('../models')

Groups.hasMany(Students,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
})
Students.belongsTo(Groups)

Groups.hasOne(Fees,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
})
Fees.belongsTo(Groups)

Fees.hasOne(Student_fees_history,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
})
Student_fees_history.belongsTo(Fees)

Students.hasOne(Student_fees_history,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
})
Student_fees_history.belongsTo(Students)

Students.hasOne(Student_notification,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
})
Student_notification.belongsTo(Students)

module.exports ={ Groups, Students, Student_notification, Student_fees_history, Fees, Users }