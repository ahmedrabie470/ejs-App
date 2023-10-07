const { validationResult } = require("express-validator")

const handelValidation = (url) => {
    return (req, res, next) => {
        try {
            const validationError = validationResult(req)


            if (validationError.isEmpty()) {
                next()
            } else {

                req.flash("oldInputs" , req.body)
                req.flash("ValidationMessage" ,  validationError.errors )
                res.redirect(url)
            }


        } catch (error) {
            req.flash("ServerError" , "error validation")
            res.redirect(url)

        }

    }
}


module.exports = handelValidation