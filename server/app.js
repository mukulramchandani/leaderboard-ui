// Import all dependencies & middleware here
import express from 'express';
import mongoose from 'mongoose';
 import { 
    levelsController,
    userController,
 } from './controller';
 import cors from "cors";


// Init an Express App. This later starts a server and put all dependencies into your project to use

const app = express();
app.use(cors());
app.use(express.json());

// Use your dependencies here



 


// use all controllers(APIs) here
app.use('/',userController);
app.use('/',levelsController);



app.listen(8080, () => {
   console.log('App listening on port 8080!');
   mongoose.connect('mongodb://localhost/test').then(()=>{
    console.log(`Conneted to mongoDB at port 27017`);
   }).catch((e)=>{
       console.log(e);
   })
});
// Start Anything here
