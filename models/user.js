//modelo de usuario para MongoDB

const {Schema,model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    role:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    },
});

//con fines visuales realizamos este método para modificar el nombre de _id
UserSchema.method('toJSON',function(){
    const {__v, _id, password,...object} = this.toObject();
    object.uid = _id;
    return object;
})

//por defecto mongoose agrega una s a user (genera el plural en la BD)
module.exports = model('User',UserSchema);//podemos hacer CRUD sobre ese modelo