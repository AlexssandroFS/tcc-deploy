module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco', {
        endereco: DataTypes.STRING(255),
        nro: DataTypes.STRING(10),
        complemento: DataTypes.STRING(150),
        bairro: DataTypes.STRING(255),
        cidade: DataTypes.STRING(255),
        cep: DataTypes.STRING(25),

        //recebendo os foreignKey tabela externa
        estadosid: DataTypes.INTEGER

    }, {
        timestamps: false,
        tableName: 'enderecos',
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

    Endereco.associate = (models) => {
        Endereco.hasOne(models.Usuario, {
            foreignKey: 'enderecosid'
        });
        Endereco.belongsTo(models.Estado, {
            foreignKey: 'estadosid',
        });
        Endereco.hasOne(models.Fornecedore, {
            foreignKey: 'enderecosid',
        });
    };

    return Endereco;
};