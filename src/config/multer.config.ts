import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as os from 'os';

export const multerConfig = {
    storage: diskStorage({
        destination: os.homedir+ '/img/game',
        filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        callback(null, filename);
    },
    }),
    
};