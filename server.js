const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
var cors = require("cors");
const uuid = require("uuid");

const bodyparser = require("body-parser");

const path = require("path");

const connectDB = require("./database connection/connection");

const app = express();
const Stripe = require("stripe")(
  "sk_test_51JyPOpFZgwIaQO35VIccYHoj2MavOlEETrM7830htvcnZwtZBsIAkUSUoKjxfxcttUmNO4cV9UG1KsMXc2ozguA600QXemRlKc"
);

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],

  allowedHeaders: ["Content-Type", "token"],
};
// log requests
app.use(morgan("tiny"));

//allowing other localhost to access APIs
app.use(cors(corsOpts));

// mongodb connection
connectDB();

//Payment
app.post("/pay", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempotencyKey = uuid();

  return Stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      Stripe.Charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: "purchase of ${product.name}",
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

// parse request to body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set view engine
app.set("view engine", "ejs");

// load assets
//app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
//app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
//app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
// load routers
app.use("/", require("./routes/router"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
