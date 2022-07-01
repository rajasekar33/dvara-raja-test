const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./controllers/userController");
const router = require("express").Router();
const multer = require('multer')
const upload = multer({ dest: '/uploads' })
const fs = require('fs')
const path = require('path')

const db = require("./models");
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb'}));
app.use("/", express.static(path.join(__dirname, 'build')))

router.post("/", upload.single('file'), (req, res, next) => {
    users.create(req, res)
} );
router.get("/", users.findAll);
router.get("/:number", users.findByNumber);
app.use('/api/users', router);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});