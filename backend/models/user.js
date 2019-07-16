const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    }
})
userSchema.methods.generateAuthToken = function(){
    const user=this;
    const token = jwt.sign({_id:user._id}, SECRET_AUTH_JWT, {expiresIn:"10d"});
    user.tokens=[...user.tokens, {token, type:"auth"}]
    return user.save().then(()=>token)
    .catch(console.log())
}
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;