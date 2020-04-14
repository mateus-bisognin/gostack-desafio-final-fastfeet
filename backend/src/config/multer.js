import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // This block of code was added due to uploaded file
        // being not deletted after aborted request
        const destination = resolve(__dirname, '..', '..', 'tmp', 'uploads');
        const tmpFileName = res.toString('hex') + extname(file.originalname);
        const fullFilePathName = resolve(destination, tmpFileName);

        req.on('aborted', () => {
          fs.unlink(fullFilePathName, () => {});
        });

        return cb(null, tmpFileName);
      });
    },
  }),
};
