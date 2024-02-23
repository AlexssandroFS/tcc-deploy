module.exports = (sequelize, DataTypes) => {
    const Formapagto = sequelize.define('Formapagto', {
            formapagto: DataTypes.STRING(255),
        },
        //recebendo os foreignKey tabela externa

        {
            timestamps: false,
            tableName: 'formapagtos',
        }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos

    Formapagto.associate = (models) => {
        Formapagto.hasOne(models.Pedido, {
            foreignKey: 'formaagtosid',
        });
        Formapagto.hasOne(models.DespesaSaida, {
            foreignKey: 'formaspagtosid',
        });
    }
    return Formapagto;
};