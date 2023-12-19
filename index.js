const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

// Define PORT and wrap app in express:
const PORT = process.env.PORT || 8080;
const app = express();

// import DB:
const db = require("./db/models/index");
const { users, risktable, riskscenario, risktable_riskscenario } = db;

// importing Routers
const UsersRouter = require("./routers/usersRouter");
const RisktableRouter = require("./routers/risktableRouter");
const RiskscenarioRouter = require("./routers/riskscenarioRouter");
const RisktableriskscenarioRouter = require("./routers/RisktableriskscenarioRouter");

// importing Controllers
const UsersController = require("./controllers/usersController");
const RisktableController = require("./controllers/risktableController");
const RiskscenarioController = require("./controllers/riskscenarioController");
const RisktableriskscenarioController = require("./controllers/risktableriskscenarioController");

// initializing Controllers
const usersController = new UsersController(users);
const risktableController = new RisktableController(
  risktable,
  users,
  riskscenario,
  risktable_riskscenario
);
const riskscenarioController = new RiskscenarioController(
  riskscenario,
  risktable_riskscenario
);
const risktableriskscenarioController = new RisktableriskscenarioController(
  riskscenario,
  risktable_riskscenario,
  risktable
);

// inittializing Routers
const usersRouter = new UsersRouter(usersController, checkJwt).routes();
const risktableRouter = new RisktableRouter(
  risktableController,
  checkJwt
).routes();
const riskscenarioRouter = new RiskscenarioRouter(
  riskscenarioController,
  checkJwt
).routes();
const risktableriskscenarioRouter = new RisktableriskscenarioRouter(
  risktableriskscenarioController,
  checkJwt
).routes();

// using middleware, boilerplate for CORS, Express (JSON and URLencoded):
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// using the routers
app.use("/users", usersRouter);
app.use("/risktable", risktableRouter);
app.use("/riskscenario", riskscenarioRouter);
app.use("/risktableriskscenario", risktableriskscenarioRouter);

// middleware for Auth0:
const checkJwt = auth({
  audience: "https://project3bootcamp/api",
  issuerBaseURL: `https://dev-uun7isc4ev72mwao.us.auth0.com/`,
});

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
