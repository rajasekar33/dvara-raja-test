module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.BIGINT(11)
        },
        createdAt: {
            type: Sequelize.DATEONLY  
        },
        picture: {
            type: Sequelize.BLOB("long"),
        }
    });
    return User;
};