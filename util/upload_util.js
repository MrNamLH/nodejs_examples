const path = require('path');
const multer = require('multer');

require('dotenv').config();

// Upload image
const allow_type = process.env.ALLOW_TYPES.split(',').map(type => type.trim());
const upload_config = {
  fields: process.env.MAX_FIELD || 17,
  files: process.env.MAX_FILE || 17,
  fileSize: (process.env.MAX_SIZE || 100) * 1048576,
  parts: process.env.MAX_PART || 17
};

const storage_multer = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${path.resolve(__dirname, '../public/upload')}`);
  },
  filename(req, { originalname, mimetype }, cb) {
    const name_segments = originalname.split('.');
    const name = name_segments[0] || `${Date.now()}`;

    const minetype_segments = mimetype.split('//');
    const ext = minetype_segments[1] || 'jpeg';

    cb(null, `${Date.now()}-${name}.${ext}`);
  }
});

const file_filter = (req, { mimetype }, cb) => {
  cb(null, Boolean(allow_type.indexOf(mimetype) > -1));
};

const uploader = multer({
  storage: storage_multer,
  fileFilter: file_filter,
  limits: upload_config
});

module.exports = { uploader };
