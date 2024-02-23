module.exports = (sequelize, DataTypes) => {
    const Cardapio = sequelize.define('Cardapio', {
        itemcardapio: DataTypes.STRING(255),
        descricao: DataTypes.STRING(255),
        valor: DataTypes.DECIMAL,

        //recebendo os foreignKey tabela externa
        // produtosid: DataTypes.INTEGER,
        categoriasid: DataTypes.INTEGER

    }, {
        timestamps: false,
        tableName: 'cardapios',
    }, {});


    Cardapio.associate = (models) => {
        Cardapio.belongsTo(models.Categoria, {
            foreignKey: 'categoriasid',
        });

        /*  Cardapio.belongsTo(models.Produto, {
            foreignKey: 'produtosid',
        });
*/
    };
    return Cardapio;
};

//belongsTo = 1 pertence a 1
//belongsToMany = pertence a muitos
//hasOne = tem 1
//hasMany = tem muitos

/*
Comment.associate = function(models){
    Comment.belongsTo(models.User, {foreignKey: 'userId'})
};
*/