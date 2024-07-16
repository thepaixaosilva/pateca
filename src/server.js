import express from "express";
const app = express();

import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname + "/./../.env" });

import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/config.js";

let corsOptions = {
    origin: process.env.VERSION === "DEV" ? "*" : "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
};

const port = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/healthcheck", (req, res) => {
    res.send("Ok!");
});

app.use(routes);

/*
//swagger
app.use(
    "/apidocs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explore: true })
);
*/

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
