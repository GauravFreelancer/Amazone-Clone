import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { Stripe } from "stripe";
const stripe = new Stripe(
  "sk_test_51IVYcLJwabuxSCd3B5w5IcIUf3lRuchfzngyh3EViiOB4NGoFnfIXRrKsPflK6oL7pA2kXFRwaSNhqsbame230eb00ok4gTdtS",
  { apiVersion: "2020-08-27" }
);

// app config
const app = express();

// middleware
const cor = cors({ origin: true });
app.use(express.json());

// route
app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return cor(req, res, () => {res.status(200).send("hello Word") });
  }
);

app.post(
  "/payments/create",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const total = Number(req.query.total);
    const paymetIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "INR",
    });
    return cor(req, res, () => {res.status(201).send({
      clientSecret: paymetIntent.client_secret,
    })});
  }
);

// Listen command
exports.api = functions.https.onRequest(app);
