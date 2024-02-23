module.exports = (sequelize, DataTypes) => {
    const ProdutoSaida = sequelize.define('ProdutoSaida', {

        qtdsaida: DataTypes.INTEGER,
        datasaida: DataTypes.DATE,
        valorunitariosaida: DataTypes.DOUBLE(10, 2),
        valortotalsaida: DataTypes.DOUBLE(10, 2),

        //importando chaves estrangeiras
        produtosidentradas: DataTypes.INTEGER,

    }, {
        timestamps: false,
        tableName: 'produtossaidas',
    }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos

    ProdutoSaida.associate = (models) => {
        ProdutoSaida.belongsTo(models.ProdutoEntrada, {
            foreignKey: 'produtosidentradas',
        });
    };

    return ProdutoSaida;

    //É fazer o include do model de categorias 
    // no  find de produtos
};