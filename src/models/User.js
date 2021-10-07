import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 50],
                        msg: 'Campo nome não pode ficar vazio',
                    },
                },
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'E-mail já existe',
                },
                validate: {
                    isEmail: {
                        msg: 'E-mail inválido',
                    },
                },
            },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],
                        msg: 'A senha precisa ter entre 6 e 50 caracteres',
                    },
                },
            },
        }, {
            sequelize,
        });

        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    passwordIsValid(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}
