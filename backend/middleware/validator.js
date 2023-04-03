
const { check, validationResult } = require('express-validator');

// sign up
exports.registerRules=() => 
[
    check("name","name is require").notEmpty(),
    check("lastname","lastname is require").notEmpty(),
    check("email","email is require").notEmpty(),
    check("email","check email again").isEmail(),
    check("password","passwordis require").isLength(
    { min: 5 }),
];

exports.validation = (req,res,next)=> {
    const errors=validationResult(req);
    console.log(errors);
    if (  !errors.isEmpty () ){
        return res.status(400).send({
             errors: errors.array().map((el)=> ({
                msg :el.msg,
            })) ,
        });
    }
    next();
 };

 //login
 exports.loginRules=() => 
    [
        check("email","email is require").notEmpty(),
        check("email","check email again").isEmail(),
        check("password","passwordis length isse").isLength(
        { min: 5 }),
    ];



    