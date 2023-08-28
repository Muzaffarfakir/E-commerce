let jwt = require("jsonwebtoken");
let express = require("express")
let app = express()
let cookieparser = require("cookie-parser")
app.use(cookieparser())
module.exports = (req, res, next) => {
    try {
      let  token = req.headers.authorization
        if (token) {
            let verify = jwt.verify(token, "muju");

            res.send({ mess: "valid" })


        } else {
            res.send({ mess: "invalid" })
        }

        next();

    } catch (error) {
        res.send("inavlid user")
        console.log(error)

    }

}
