module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
            nomecategoria: DataTypes.STRING(255),
            descricao: DataTypes.STRING(255),

        }, {
            timestamps: false,
            tableName: 'categorias',
            //tableName: 'produtos',
        }, {
            freezeTableName: true
        });
    Categoria.associate = (models) => {
        Categoria.hasOne(models.Produto, {
            foreignKey: 'categoriasid',
        });
        Categoria.hasOne(models.Cardapio, {
            foreignKey: 'categoriasid',
        });
    };
    return Categoria;
};    //belongsTo = 1 pertence a 1
    //belongsToMany = pertence a muitos
    //hasOne = tem 1
    //hasMany = tem muitos