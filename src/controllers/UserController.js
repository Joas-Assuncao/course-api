import User from '../models/User';

class UserController {
    async store(request, response) {
        try {
            const newUser = await User.create(request.body);
            const { id, name, email } = newUser;

            return response.json({ id, name, email });
        } catch (error) {
            return response.status(400).json({
                errors: error.errors.map((erro) => erro.message),
            });
        }
    }

    // Index
    async index(request, response) {
        try {
            const users = await User.findAll({ attributes: ['id', 'email', 'name'] });
            console.log('USER Id', request.userId);
            console.log('USEREmail', request.userEmail);
            return response.json(users);
        } catch (error) {
            return response.json(null);
        }
    }

    // Show
    async show(request, response) {
        try {
            const user = await User.findByPk(request.params.id);
            const { id, name, email } = user;

            return response.json({ id, name, email });
        } catch (error) {
            console.log(error);
            return response.json(null);
        }
    }

    // Update
    async update(request, response) {
        try {
            const user = await User.findByPk(request.userId);

            if (!user) {
                return response.status(400).json({
                    errors: ['Usuário não existe.'],
                });
            }

            const newData = await user.update(request.body);
            const { id, name, email } = newData;

            return response.json({ id, name, email });
        } catch (error) {
            return response.status(400).json({
                errors: error.errors.map((erro) => erro.message),
            });
        }
    }

    // Delete
    async delete(request, response) {
        try {
            const user = await User.findByPk(request.userId);

            if (!user) {
                return response.status(400).json({
                    errors: ['Usuário não existe.'],
                });
            }

            await user.destroy(request.body);

            return response.json({
                msg: 'Usuário deletado com sucesso!',
            });
        } catch (error) {
            return response.status(400).json({
                errors: error.errors.map((erro) => erro.message),
            });
        }
    }
}

export default new UserController();
