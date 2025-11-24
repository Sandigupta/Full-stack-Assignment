'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Generations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            prompt: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            code: {
                type: Sequelize.TEXT('long'),
                allowNull: false
            },
            languageId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Languages',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Generations');
    }
};
