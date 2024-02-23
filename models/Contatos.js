module.exports = (sequelize, DataTypes) => {
    const Contato = sequelize.define('Contato', {
            email: DataTypes.STRING(255),
            telefone: DataTypes.STRING(255),
        },

        {
            timestamps: false,
            tableName: 'contatos',
        }, {});

    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos


    Contato.associate = (models) => {
        Contato.hasOne(models.Usuario, {
            foreignKey: 'contatosid'
        });
        Contato.hasOne(models.Fornecedore, {
            foreignKey: 'contatosid',
        })
    };

    return Contato;
};