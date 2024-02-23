module.exports = (sequelize, DataTypes) => {
    const Tipousuario = sequelize.define('Tipousuario', {
            tipousuario: DataTypes.STRING(255),
            statusperfil: DataTypes.STRING(255),
        },

        {
            timestamps: false,
            tableName: 'tipousuarios',
        }, { freezeTableName: true });

    /*acrescentado para tentar usar o tipousuario no Model USUARIO */

    /*acrescentado para tentar usar o tipousuario no Model USUARIO */
    Tipousuario.associate = (models) => {
        Tipousuario.hasOne(models.Login, {
            foreignKey: 'tipousuarioid',
        });

    };

    return Tipousuario;
};

//belongsTo = 1 pertence a 1
//belongsToMany = pertence a muitos
//hasOne = tem 1
//hasMany = tem muitos