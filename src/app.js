const express = require("express");
const rotas = require("./rotas");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(rotas);

app.listen(port, () => {
  console.log(port);
});
