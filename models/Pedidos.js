module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
            qtde: DataTypes.INTEGER,
            valorunit: DataTypes.DECIMAL,
            totalparcial: DataTypes.DECIMAL,
            desconto: DataTypes.DECIMAL,
            valorfinal: DataTypes.DECIMAL,
            datapedido: DataTypes.DATE,

            //recebendo os foreignKey tabela externa
            usuariosid: DataTypes.INTEGER,
            produtosid: DataTypes.INTEGER,
            formapagtoid: DataTypes.INTEGER

        },

        {
            timestamps: false,
            tableName: 'pedidos',
        }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos

    /*
    Comment.associate = function(models){
        Comment.belongsTo(models.User, {foreignKey: 'userId'})
    };
    */
    Pedido.associate = (models) => {
        Pedido.belongsTo(models.Usuario, {
            foreignKey: 'usuariosid',
        });

        Pedido.belongsTo(models.Formapagto, {
            foreignKey: 'formaagtosid',
        });

        Pedido.belongsTo(models.Produto, {
            foreignKey: 'produtosid',
        });
    };
    return Pedido;
};