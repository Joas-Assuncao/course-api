import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
    async index(request, response) {
        const students = await Student.findAll({
            attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
            order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
            include: {
                model: Photo,
                attributes: ['url', 'filename'],
            },
        });

        response.json(students);
    }

    async store(request, response) {
        try {
            const newStudent = await Student.create(request.body);

            return response.json(newStudent);
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                errors: error.errors.map(erro => erro.message),
            });
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;

            if (!id) {
                return response.status(400).json({
                    errors: ['ID não encontrado!'],
                });
            }

            const student = await Student.findByPk(id);

            if (!student) {
                return response.status(400).json({
                    errors: ['ID não encontrado!'],
                });
            }

            const updatedStudent = await student.update(request.body);

            return response.json(updatedStudent);
        } catch (error) {
            return response.status(400).json({
                errors: error.errors.map(erro => erro.message),
            });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;

            if (!id) {
                return response.status(400).json({
                    errors: ['ID não encontrado!'],
                });
            }

            const student = await Student.findByPk(id, {
                attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
                order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
                include: {
                    model: Photo,
                    attributes: ['url', 'filename'],
                },
            });

            if (!student) {
                return response.status(400).json({
                    errors: ['ID não encontrado!'],
                });
            }

            return response.json(student);
        } catch (error) {
            return response.status(400).json({
                errors: error.errors.map(erro => erro.message),
            });
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;

            if (!id) {
                return response.status(400).json({
                    errors: ['ID não encontrado!'],
                });
            }

            const student = await Student.findByPk(id);

            if (!student) {
                return response.status(400).json({
                    errors: ['ID não encontrado!'],
                });
            }

            await student.destroy();
            return response.json({
                deleted: true,
            });
        } catch (error) {
            return response.status(400).json({
                errors: error.errors.map(erro => erro.message),
            });
        }
    }
}

export default new StudentController();
