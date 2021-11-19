const express = require('express')
const app = express();
const jwt = require("jsonwebtoken")
const db = require('./models')
var cors = require('cors')

const {Groups, Students, Student_notification, Student_fees_history, Fees} = require('./functions')

app.use(express.json())
app.use(cors())

// ===============================    Create A Group    ======================================

app.post("/group-create", async(req,res) => {

    try {
        const groups = await Groups.create({name:req.body.name})
        res.send(groups)
    } catch (error) {
        res.send(error)
    }
})



// ================================    Create Fees For  Groups    ===========================

app.post("/add-group-fees", async(req,res) => {

    const { amount, group } = req.body

    try {

        const groups = await Groups.findOne({where:{name:group}})
        const fees = await Fees.create({amount:amount,GroupId:groups.id })
        
        res.send({groups,fees})

    } catch (error) {
        res.send(error)
    }
})


// ================================    Create Student & Add him to Groups    =================

app.post("/add-student", async(req,res) => {

    const { fname, lname, phone, address, group } = req.body

    try {

        const groups = await Groups.findOne({where:{name:group}})
        const student = await Students.create({first_name:fname, last_name:lname, phone:phone, address:address,GroupId:groups.id })
        const fees = await Fees.findOne({ GroupId:student.GroupId })
        const fees_history = await Student_fees_history.create({ paid_months:0, total_months:1, additional_charges:0, StudentId:student.id, FeeId:fees.id })

        await res.send({groups,student,fees_history})

    } catch (error) {
        res.send(error)
    }
})


// ================================    Edit Student Fees History    ===========================

app.get("/add-group-fees", async(req,res) => {

    const { f_name, l_name } = req.body

    try {

        const student = await Students.findOne({ where:{ first_name:f_name, last_name:l_name } })
        const fees = await Fees.findOne({ GroupId:student.GroupId })

        const fees_history = await Student_fees_history.findOne({where:{StudentId:student.id}})
        
        if(student==null){
            res.send("Record Not Found")
        }else{
            res.send({ student, fees, fees_history })
        }
        

    } catch (error) {
        res.send(error)
    }
})






app.post("/login", async(req,res) => {

    console.log(req.body)
    const users = await Users.findAll().then((u)=>{
           return u
        }).catch((err)=>{
            console.log(err)
        });

    const loginUser = users.find((uzer)=>{
            if(uzer.username === req.body.username && uzer.password === req.body.password){
                return uzer.username;
            }else{
                return null;
            }
        })
    if(loginUser){
        const accesstoken = jwt.sign({username: loginUser.username, type:loginUser.type},"mySecretKey",{ expiresIn:"15s" })
        res.json({
            accesstoken,
            status:"success"
        })
    }else{
        res.json({accesstoken:null,status:"failed"})
    }
})

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(" ")[1];
        
        jwt.verify(token, "mySecretKey", (err, user) => {
            if(err){
                return res.status(401).json("Json Token Not Valid")
            }
            req.user = user;
            next();
        })
    }else{
        res.status(401).json("You are not Authenticated")
    }
}

app.post("/adduser", verify, async(req,res) => {
    if(req.user.type === "admin"){
        res.status(200).json("Elligible! :" + req.user.username + " " + req.user.type)
    }else{
        res.status(403).json("Not Elligible! :" + req.user.username + " " + req.user.type)
    }
})

app.post("/student-insert", async(req,res) => {

    const groups = await Groups.findOne({where:{name:"Junior"}})

    await Students.create({
        name:"Abdullah",
        class:"bachelors",
        dues:"cleared",
        GroupId:groups.id
    }).catch(err=>{
        if(err){
            console.log(err)
        }
    })
    res.send('inserted')
})







app.get("/delete", async(req,res) => {
    await Students.destroy({where: {id:2} });
    await res.send("user Deleted");
})

app.get("/update", async(req,res) => {
    await Students.update({name:"Updated Abdullah"},{where: { id:1 } });
    await res.send("User Deleted")
})






db.sequelize.sync().then((req)=>{
    app.listen(3001, ()=>{
        console.log('Server Running on port 3001')
    })
})