import express from 'express';
import sha256 from 'sha256';
import { 
    User
   } from '../database/models';

/**
 * GET/
 * retrieve and display all Users in the User Model
 */

const app = express();
app.use(express.Router());
const userController = express.Router();

 userController.get('/api/get-users',(req,res)=>{
    console.log("GET Users")
    User.find({},(err,result)=>{
        res.status(200).json({
            data:result,
        });
    });
});

/**
 * POST/
 * Add a new User to your database
 */

 
 userController.post('/api/add-user',(req,res)=>{
     console.log(req.body);
     if(req.body){
     const { email , password , name , username,image,score,medalId,remark } = req.body;

     const userData = {
         email,
         hashedPassword:sha256(password),
         name , username,image,score,medalId,remark
     }

     const newUser = new User(userData);
     User.findOne({email:email},(err,user)=>{
        if(err) console.log(err);
        if(user){
            res.status(200).send("This user already exists");
        }else{
            newUser.save().then(data=>{
                res.status(200).send(data);
            }).catch(err => {
               res.status(400).send("unable to save to database");
            })
        }
     });
    }else{
        res.status(400).send("unable to save to database");
    }
 }) 

/* userController.get('/', (req, res) => {
   res.status(200).json({
      status: 'success'
   });
}); */
export default userController;