module.exports = (sequelize, DataTypes) => {
    const ProdutoEntrada = sequelize.define('ProdutoEntrada', {
        marca: DataTypes.STRING(255),
        doctofiscal: DataTypes.STRING(255),
        datacompra: DataTypes.DATE,
        datafabricacao: DataTypes.DATE,
        datavalidade: DataTypes.DATE,
        statusvalidade: DataTypes.STRING(255),
        qtdecompra: DataTypes.INTEGER,
        valorunit: DataTypes.DOUBLE(10, 2),
        valortotal: DataTypes.DOUBLE(10, 2),
        dataatual:DataTypes.DATE,
        //importando chaves estrangeiras
        produtosid: DataTypes.INTEGER,
        fornecedoresid: DataTypes.INTEGER,


    }, {
        timestamps: false,
        tableName: 'produtosentradas',
    }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos

    ProdutoEntrada.associate = (models) => {
        ProdutoEntrada.belongsTo(models.Produto, {
            foreignKey: 'produtosid',
        });
        
        ProdutoEntrada.belongsTo(models.Fornecedore, {
            foreignKey: 'fornecedoresid',
        });

        ProdutoEntrada.hasOne(models.ProdutoSaida, {
            foreignKey: 'produtosidentradas',
        });

    };

    return ProdutoEntrada;

    //É fazer o include do model de categorias 
    // no  find de produtos
};