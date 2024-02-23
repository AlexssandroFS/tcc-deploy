module.exports = (sequelize, DataTypes) => {
    const Fornecedore = sequelize.define('Fornecedore', {
        razaosocial: DataTypes.STRING(255),
        nomefantasia: DataTypes.STRING(255),
        cnpj: DataTypes.STRING(25),
        ramoatuacao: DataTypes.STRING(255),

        //recebendo os foreignKey tabela externa
        enderecosid: DataTypes.INTEGER,
        contatosid: DataTypes.INTEGER
    }, {
        timestamps: false,
        tableName: 'fornecedores',
    }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos
    Fornecedore.associate = (models) => {
        Fornecedore.hasOne(models.ProdutoEntrada, {
            foreignKey: 'fornecedoresid'
        });
        Fornecedore.belongsTo(models.Endereco, {
            foreignKey: 'enderecosid',
        });
        Fornecedore.belongsTo(models.Contato, {
            foreignKey: 'contatosid',
        });

    };

    return Fornecedore;
};