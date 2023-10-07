const userModel = require("../DB/model/User");

const roles = {
    User: "User",
    Admin: "Admin",
    HR: "HR"
}


const auth = (data) => {

    return async(req, res, next) => {
        if (req.session.user) {
            if (req.session.user._id != undefined && req.session.user._id != null && req.session.user._id != "" && req.session.user.isLoggedIn == true) {

                const user = await userModel.findOne({ _id: req.session.user._id }).select("-password")
                if (user) {
                    if (data.includes(user.role)) {
                        req.session.user = user
                        next()
                    } else {
                        req.flash("message", 'not auth')
                        res.redirect("/login")
                    }

                } else {
                    req.flash("message", "In-valid session")

                    res.redirect("/login")
                }
            } else {
                req.flash("message", "In-valid session")
                res.redirect("/login")

            }
        } else {
            req.flash("message", "In-valid session")
            res.redirect("/login")

        }

    }
}

module.exports = {
    auth,
    roles
}