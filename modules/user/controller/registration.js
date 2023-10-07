const userModel = require("../../../DB/model/User")

const displaySignUp = async(req, res) => {

    let message = req.flash("message")[0];

    if (!message) {
        message = ''
    }
    let oldInputs =   req.flash("oldInputs")[0]
    if (!oldInputs) {
      oldInputs= { userName: "", email: "", password: "", cPassword: ""}
    }
    let validationMessage = req.flash("ValidationMessage")
    console.log(validationMessage);
    res.render("signup", { message, oldInputs , validationMessage})
}

const handeSignUp = async(req, res) => {
console.log(req.files);
  if (!req.file) {
      req.flash("message","image required")
      res.redirect("/")
      
  }else{
    const image = `${req.protocol}://${req.headers.host}/${req.file.destination}/${req.file.filename}`;
    const { userName, email, password  } = req.body

    const user = await userModel.findOne({ email });

    if (!user) {

        const newUser = new userModel({ userName, email, password , image })
        const savedUser = await newUser.save()
        req.flash('message', "Done")
        res.redirect('/login')
    } else {
        req.flash("oldInputs", req.body)
        req.flash('message', "userExist")
        res.redirect("/")
    }
  }
 
}

const displayLogin = async(req, res) => {

    let message = req.flash("message")[0];

    if (!message) {
        message = ''
    }
    let oldInputs =   req.flash("oldInputs")[0]
    if (!oldInputs) {
      oldInputs= {email: "", password: ""}
    }
    let validationMessage = req.flash("ValidationMessage")
    res.render("login", { message, oldInputs , validationMessage})
}


const handelLogin =  async(req,res)=>{


    const {email ,password} = req.body;


    const user = await userModel.findOne({email , password})
    if (user) {
        req.session.user = {_id:user._id , isLoggedIn:true}
      
        res.redirect("/home")
    } else {
      req.flash("message","email password mismatch")  ;
      req.flash("oldInputs" , req.body)
      res.redirect("/login")
    }
}
const displayHome = async(req,res)=>{
    res.render("home" , {user:req.session.user})
}
module.exports = {
    displaySignUp,
    handeSignUp,
    displayLogin,
    handelLogin,
    displayHome
}