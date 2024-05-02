//const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {

    const Comments = Sequelize.define("Comments",{
        commentBody : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        

    });

    return Comments;
};