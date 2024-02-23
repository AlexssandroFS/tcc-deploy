module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nome: DataTypes.STRING(255),
        cpf: DataTypes.STRING(255),
        datanasc: DataTypes.DATE,

        //recebendo os foreignKey tabela externa
        enderecosid: DataTypes.INTEGER,
        contatosid: DataTypes.INTEGER,
        loginid: DataTypes.INTEGER,
    }, {
        timestamps: false,
        tableName: 'usuarios',
    }, { freezeTableName: true });
    
    //aqui apenas para o LOGIN
    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Endereco, {
            foreignKey: 'enderecosid',
        });
        Usuario.belongsTo(models.Contato, {
            foreignKey: 'contatosid',
        });
        Usuario.belongsTo(models.Login, {
            foreignKey: 'loginid',
        });
    };
    return Usuario;
};

//belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos