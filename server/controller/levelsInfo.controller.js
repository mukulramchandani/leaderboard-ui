import express from 'express';
import { LevelsInfo } from '../database/models';

/** Get/ 
 * Levels Info */

const app = express();
app.use(express.Router());
const levelsController = express.Router();

 levelsController.get('/api/get-levels-info',(req,res)=>{
    console.log("GET Levels Data")
    LevelsInfo.find({},(err,result)=>{
        res.status(200).json({
            data:result,
        });
    });
});


/** POST/ 
 * Add/Update Levels Info */

 levelsController.post('/api/add-levels-info',(req,res)=>{
    console.log(req.body);
    if(req.body){
    const { maxScore,levels,medalsInfo,remark } = req.body;

    const levelsData = {
        maxScore,
        levels,
        medalsInfo,
        remark
    }

    const newLevelsInfo = new LevelsInfo(levelsData);
       newLevelsInfo.save().then(data=>{
               res.status(200).send(data);
           }).catch(err => {
              res.status(400).send("unable to save to database");
           });
   }else{
       res.status(400).send("unable to save to database");
   }
});

export default levelsController;

