import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
    static async init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 50],
                        msg: 'Nome precisa ter entre 3 e 50 caracteres.',
                    },
                },
            },
            lastname: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 70],
                        msg: 'Sobrenome precisa ter entre 3 e 70 caracteres.',
                    },
                },
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'E-mail já existe!',
                },
                validate: {
                    isEmail: {
                        msg: 'E-mail inválido!',
                    },
                },
            },
            age: {
                type: Sequelize.INTEGER,
                defaultValue: '',
                isInt: {
                    len: {
                        msg: 'Idade precisa ser um número inteiro.',
                    },
                },
            },
            weight: {
                type: Sequelize.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Peso precisa ser um número, inteiro ou nãa.',
                    },
                },
            },
            height: {
                type: Sequelize.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Altura precisa ser um número, inteiro ou nãa.',
                    },
                },
            },
        }, {
            sequelize,
        });
        return this;
    }

    static associate(models) {
        this.hasMany(models.Photo, { foreignKey: 'student_id' });
    }
}
