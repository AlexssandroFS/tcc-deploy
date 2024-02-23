module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define('Login', {
            usuariologin: DataTypes.STRING(255),
            senha: DataTypes.STRING(255),
            statuslogin: DataTypes.STRING(255),

            //recebendo os foreignKey tabela externa
            // usuarioid: DataTypes.INTEGER,
            tipousuarioid: DataTypes.INTEGER,
        },

        {
            timestamps: false,
            tableName: 'login',
        }, {
            freezeTableName: true

        });

    Login.associate = (models) => {
        Login.belongsTo(models.Tipousuario, {
            foreignKey: 'tipousuarioid',
        });
        Login.hasOne(models.Usuario, {
            foreignKey: 'loginid',
        });
    };
    return Login;
};

//belongsTo = 1 pertence a 1
//belongsToMany = pertence a muitos
//hasOne = tem 1
//hasMany = tem muitos