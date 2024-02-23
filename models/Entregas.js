module.exports = (sequelize, DataTypes) => {
    const Entrega = sequelize.define('Entrega', {
        dataentrega: DataTypes.DATE,
        valorentrega: DataTypes.DECIMAL,
        tempoentrega: {
            allowNull: false,
            type: DataTypes.ENUM({
                values: ['Selecionar', '5min', '15min', '30min', '45min', '1h', '1h15min', '1h30min', '2hs'],
            }),
            defaultValue: '5min'
        },
        formaentrega: {
            allowNull: false,
            type: DataTypes.ENUM({
                values: ['Selecionar', 'Retirar', 'Motoboy'],
            }),
            defaultValue: 'Selecionar'

        },

        //recebendo os foreignKey tabela externa
        //pedidosid: DataTypes.INTEGER,
    }, {
        timestamps: false,
        tableName: 'entregas',
    }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos

    /*
        Entrega.associate = (models) => {
            Entrega.belongsTo(models.Pedido, {
                foreignKey: 'pedidosid',
            });
        };
        /*
        Entrega.associate = (models) => {
            Entrega.belongsTo(models.Usuario, {
                foreignKey: 'usuariosid',
            });
        };
    */
    return Entrega;
};