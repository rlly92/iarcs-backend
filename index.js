const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

// Define PORT and wrap app in express:
const PORT = process.env.PORT || 8080;
const app = express();

// middleware for Auth0:
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: process.env.TOKEN_SIGNING,
});

// import DB:
const db = require("./db/models/index");
const { users, riskscenarios, users_riskscenarios } = db;

// importing Routers
const UsersRouter = require("./routers/usersRouter");
const RiskscenariosRouter = require("./routers/riskscenariosRouter");
const UsersriskscenariosRouter = require("./routers/usersriskscenariosRouter");

// importing Controllers
const UsersController = require("./controllers/usersController");
const RiskscenariosController = require("./controllers/riskscenariosController");
const UsersriskscenariosController = require("./controllers/usersriskscenariosController");

// initializing Controllers
const usersController = new UsersController(users);
const riskscenariosController = new RiskscenariosController(
  riskscenarios,
  users
);
const usersriskscenariosController = new UsersriskscenariosController(
  users_riskscenarios,
  users,
  riskscenarios
);

// inittializing Routers
const usersRouter = new UsersRouter(usersController, checkJwt).routes();
const riskscenariosRouter = new RiskscenariosRouter(
  riskscenariosController,
  checkJwt
).routes();
const usersriskscenariosRouter = new UsersriskscenariosRouter(
  usersriskscenariosController,
  checkJwt
).routes();

// using middleware, boilerplate for CORS, Express (JSON and URLencoded):
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// using the routers
app.use("/users", usersRouter);
app.use("/riskscenarios", riskscenariosRouter);
app.use("/usersriskscenarios", usersriskscenariosRouter);

// Auth0 Route that requires authentication:
app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
