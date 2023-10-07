const userModel = require("../../DB/model/User");
const { auth } = require("../../middlewear/auth");
const handelValidation = require("../../middlewear/handelValidation");
const { handeSignUp, displaySignUp, displayLogin, handelLogin, displayHome } = require("./controller/registration");
const endPoint = require("./endpoint");
const { signUpValidator } = require("./user.validation");


const router = require("express").Router();

router.get('/',  displaySignUp)
router.post('/signup', signUpValidator,  handelValidation('/'), handeSignUp)


router.get("/login" , displayLogin)
router.post("/login" , signUpValidator[1,2],  handelValidation('/login'), handelLogin)



router.get("/home" , auth(endPoint.Home) , displayHome)
router.get("/logout" , (req,res)=>{
    req.session.destroy()
    res.redirect("/login")
})


router.get("/allUser" ,async (req,res)=>{


    const allUser = await userModel.find({}).select("-password")

    res.render("allUser" , {allUser})
})

module.exports = router