import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('file');

class PhotoController {
    store(request, response) {
        return upload(request, response, async (error) => {
            if (error) {
                return response.status(400).json({
                    errors: [error.code],
                });
            }

            try {
                const { originalname, filename } = request.file;
                const { student_id } = request.body;
                const photo = await Photo.create({ originalname, filename, student_id });

                return response.json(photo);
            } catch (erro) {
                return response.status(401).json({
                    errors: ['Aluno não existe.'],
                });
            }
        });
    }
}

export default new PhotoController();
