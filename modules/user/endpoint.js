const { roles } = require("../../middlewear/auth");


const endPoint = {
    Home :[roles.Admin , roles.User]
}


module.exports = endPoint