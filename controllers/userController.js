const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const { blobtoBase64, base64ToBlob } = require('./utilities/imageFormat')


exports.create = (req, res) => {

    console.log(req)
    if (!req.body.number) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const user = {
        name: req.body.name,
        number: req.body.number,
        picture: req.body.file
    };
    User.create(user)
        .then(data => {
            res.send([data]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the users."
            });
        });
};

exports.findByNumber = (req, res) => {
    const number = req.query.number;
    var condition = number ? { number: { [Op.like]: `%${number}%` } } : null;
    User.findAll({ where: condition })
        .then(data => {
            res.send(blobtoBase64(data));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findAll = (req, res) => {
    const number = req.params.number;
    User.findAll()
        .then(data => {
            if (data) {
                res.send(blobtoBase64(data));
            } else {
                res.status(404).send({
                    message: `Cannot find Users`
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Error retrieving Users"
            });
        });
};
