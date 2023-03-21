const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
     require:true
  },
  email: {
    type: String,
    require:true
  },
  password: {
    type: String,
    require:true
  
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});
module.exports= mongoose.model("User", userSchema);