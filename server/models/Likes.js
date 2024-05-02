//const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {

    const Likes = Sequelize.define("Likes");

    return Likes;
};