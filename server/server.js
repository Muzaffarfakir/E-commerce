//////require all need libs here 
let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser")
let cookieparser = require("cookie-parser")
let port = process.env.PORT || 8000;
let path = require("path");
let mongoose = require("mongoose");
let multer = require('multer');
let jwt = require("jsonwebtoken");
let session = require("express-session");
let expressValidator = require("express-validator")
let paypal = require('paypal-rest-sdk');
const { ok } = require("assert");
const authCheck = require("./midleware/auth-check");

////connect db
let uri = "mongodb://fakirmuzaffar771:Muzaffar@ac-h67nl0n-shard-00-00.tvcalfs.mongodb.net:27017,ac-h67nl0n-shard-00-01.tvcalfs.mongodb.net:27017,ac-h67nl0n-shard-00-02.tvcalfs.mongodb.net:27017/?ssl=true&replicaSet=atlas-ifuuv7-shard-0&authSource=admin&retryWrites=true&w=majority"
let par = {
    useNewUrlParser: true
}
mongoose.connect(uri, par).then(() => {
    console.log("Connection eastablish")
}).catch((er) => {
    console.log(er)
})
///multer 
let storage = multer.diskStorage({
    destination: "upload/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: storage,
})

////midelwares here
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "./upload")))
app.use(cookieparser());

//app.use(authh)
//////create a schema 
let sc = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,

    },
    pass: {
        type: String,
        required: true,

    },
    mob: {
        type: Number,
        required: true,
    },
    des: String,
    img: String
})
let pr = new mongoose.Schema({
    Category: String,
    Description: String,
    Price: Number,
    Img: String,
    Title: String


})

let Users = new mongoose.model("Users", sc);
let Products = new mongoose.model("Products", pr);

////Routing here
app.post("/", authCheck, (req, res) => {
})
let img;
app.post("/signdataImg", upload.single("img"), (req, res) => {
    img = req.file.filename;

})

app.post("/signData", async (req, res) => {
    let d = await Users.findOne({ email: req.body.email, pass: req.body.pass, mob: req.body.mob });
    if (d) {
        res.json("cExist")


    }
    else {
        let url = req.protocol + "://" + req.get("host");
        let data = new Users({
            name: req.body.name,
            email: req.body.email,
            pass: req.body.pass,
            mob: req.body.mob,
            des: req.body.des,
            img: url + "/" + img

        })
        data.save();
        res.json("not")
    }

})
let email, pass, name;
app.post("/login", async (req, res) => {
    email = req.body.email;
    pass = req.body.pass;
    name = req.body.name;

    let opt={
        httpOnly:true
    }
    let data = await Users.findOne({ email, pass, name })
    if (data) {
        let token = jwt.sign({ id: data._id }, "muju", { expiresIn: "5d" });
        res.status(200).cookie(token,opt).json({
            mess:"exits",
            token:token,
            id:data._id
        })
        //res.status(201).json({
          //  mess:"exist",
         //   token:token,

   //     })
       // res.json({ mess: "exits", token: token, userId: data._id});




    }
    else {
        res.send("notexist");



    }





})
app.get("/profile", async (req, res) => {
    let data = await Users.findOne({ email: email, pass: pass, name: name });
    res.send([data])
})
app.post("/products", (req, res) => {
    let pr = new Products({
        Category: req.body.el.category,
        Description: req.body.el.description,
        Img: req.body.el.image,
        Title: req.body.el.title,
        Price: req.body.el.price,
    });
    pr.save();
})
app.get("/getProduct",  async (req, res) => {
    try {
        let data = await Products.find();
        res.json(data)

    } catch (er) {
        console.log(er)
    }
})


app.delete("/delOne:id", async (req, res) => {
    await Products.findByIdAndDelete(req.params.id);
})
app.delete("/del", async (req, res) => {
    await Products.deleteMany();
})


////////paypal configuration 
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': 'AX-Mt8Ib-I7zwlXUMEPORYe-s_yP70GNzB0RABbgq_vvMvjsnxVnPrPqSwm18PTVIfHChZMJ-SDTv_qM'
    ,
    'client_secret': 'EAjcBKNk1Rz_8uVet8i60-RDNGaLwcHTiF_B8SPGLyLfnGxliu1LlO07SGglNsf6eWkpf-P5DAq1xf7P'
});
let amount, des;
app.post("/amount", (req, res) => {
    amount = req.body.price;
    des = req.body.des
})
app.get('/Pay', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://google.com",
            "cancel_url": "https://facebook.com"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "HELP TO THE DEVELOPER",
                    "sku": "001",
                    "price": `${amount}`,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": `${amount}`
            },
            "description": `${des}`
        }]
    };
    paypal.payment.create(create_payment_json, (err, payment) => {
        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    res.send({ url: payment.links[i].href })

                }

            }
        }
    })










})









/// listen port
app.listen(port);
