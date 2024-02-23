module.exports = (sequelize, DataTypes) => {
    const DespesaEntrada = sequelize.define('DespesaEntrada', {
        descricao: DataTypes.STRING(255),
        nrodocto: DataTypes.STRING(255),
        datavalidade: DataTypes.DATE,
        //statusvalidade: DataTypes.STRING(255),
        valortotal: DataTypes.DOUBLE(10, 2),

        //importando chaves estrangeiras
        despesasid: DataTypes.INTEGER,
    }, {
        timestamps: false,
        tableName: 'despesasentradas',
    }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos
    DespesaEntrada.associate = (models) => {
        DespesaEntrada.belongsTo(models.Despesa, {
            foreignKey: 'despesasid',
        });
        DespesaEntrada.hasOne(models.DespesaSaida, {
            foreignKey: 'despesasidentradas',
        });
    };
    return DespesaEntrada;

    //É fazer o include do model de categorias 
    // no  find de produtos
};