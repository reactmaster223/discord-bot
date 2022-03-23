const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Router = require("./routes");
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use("/api", Router);

app.listen(port, () => console.log(`Server Listening on port ${port}`));