'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Languages', [
            { key: 'python', name: 'Python', createdAt: new Date(), updatedAt: new Date() },
            { key: 'javascript', name: 'JavaScript', createdAt: new Date(), updatedAt: new Date() },
            { key: 'java', name: 'Java', createdAt: new Date(), updatedAt: new Date() },
            { key: 'c', name: 'C', createdAt: new Date(), updatedAt: new Date() },
            { key: 'cpp', name: 'C++', createdAt: new Date(), updatedAt: new Date() },
            { key: 'typescript', name: 'TypeScript', createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Languages', null, {});
    }
};
