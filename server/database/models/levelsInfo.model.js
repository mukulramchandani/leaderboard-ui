import mongoose from "mongoose";
import levelsInfoSchema from "../schemas/levelsInfo.schema";



const LevelsInfo = mongoose.model('LevelsInfo',levelsInfoSchema);

export default LevelsInfo;