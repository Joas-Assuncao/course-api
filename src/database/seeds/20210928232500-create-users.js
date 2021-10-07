const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('People', [
            {
                name: 'Claudio',
                email: 'claudin123@gmail.com',
                password_hash: await bcrypt.hash('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            },

        ], {});
    },

    down: async () => {},
};
