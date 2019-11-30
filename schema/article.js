const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('article',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        //文章标题
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title'
        },
        //作者
        author:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'author'
        },
        //内容
        content:{
            type: DataTypes.STRING,
            allowNull: false,
            field:'content'
        },
        //文章分类
        category:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'category'
        },
        // 创建时间
        createdAt:{
            type: DataTypes.DATE
        },
        // 更新时间
        updatedAt:{
            type: DataTypes.DATE
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });
}