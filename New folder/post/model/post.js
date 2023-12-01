module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('posts', {
        userId: {
            type: Sequelize.INTEGER,
            referances: {
                model: 'users',
                key: 'id'
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,   
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        commentcount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    }, {
        tablename: 'posts'
    });
    return Post;
};

