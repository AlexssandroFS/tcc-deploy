module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
        nomeprod: DataTypes.STRING(255),
        qtdeminima: DataTypes.INTEGER,

        //importando chaves estrangeiras
        categoriasid: DataTypes.INTEGER,
    }, {
        timestamps: false,
        tableName: 'produtos',
    }, {});
    Produto.associate = (models) => {
        Produto.belongsTo(models.Categoria, {
            foreignKey: 'categoriasid',
        });
        Produto.hasOne(models.ProdutoEntrada, {
            foreignKey: 'produtosid',
        });
    };
    return Produto;
};

 //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos