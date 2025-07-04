import multer from 'multer';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// export const upload = multer({ storage: storage,   }).single('file'); // 'file' is the field name in the form data
export const upload = multer({ storage: storage,   }); 