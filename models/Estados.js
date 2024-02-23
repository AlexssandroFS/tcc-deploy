const { STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
            estados: STRING(255),
        },
        //recebendo os foreignKey tabela externa
        {
            timestamps: false,
            tableName: 'estados',
        }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos

    Estado.associate = (models) => {
        Estado.hasOne(models.Endereco, {
            foreignKey: 'estadosid',
        });
    };
    return Estado;
};