module.exports = (sequelize, DataTypes) => {
    const Despesa = sequelize.define('Despesa', {
        nomedespesa: DataTypes.STRING(255),
    }, {
        timestamps: false,
        tableName: 'despesas',
    }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos

    Despesa.associate = (models) => {
        Despesa.hasOne(models.DespesaEntrada, {
            foreignKey: 'despesasid',
        });
    };

    return Despesa;

    //É fazer o include do model de categorias 
    // no  find de Despesa
};