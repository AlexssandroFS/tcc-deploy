module.exports = (sequelize, DataTypes) => {
    const DespesaSaida = sequelize.define('DespesaSaida', {
        datapagto: DataTypes.DATE,
        descricaosaida: DataTypes.STRING(255),
        valortotalsaida: DataTypes.DOUBLE(10, 2),

        //importando chaves estrangeiras
        despesasidentradas: DataTypes.INTEGER,
        formaspagtosid: DataTypes.INTEGER,

    }, {
        timestamps: false,
        tableName: 'despesassaidas',
    }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos

    DespesaSaida.associate = (models) => {
        DespesaSaida.belongsTo(models.DespesaEntrada, {
            foreignKey: 'despesasidentradas',
        });
        DespesaSaida.belongsTo(models.Formapagto, {
            foreignKey: 'formaspagtosid',
        });
    }
    return DespesaSaida;

    //É fazer o include do model de categorias 
    // no  find de produtos
};