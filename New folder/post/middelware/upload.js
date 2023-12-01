const fs = require('fs');
const path = require('path');

const uploadImage = (req, res, next) => {
  if (!req.files.length) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  req.files.map((file) => {
    const uniqueFileName = Date.now() + '-' + file.fieldname + path.extname(file.originalname);
    const targetPath = path.join(__dirname, '..', 'public', 'image', uniqueFileName);

    fs.writeFile(targetPath, file.buffer, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'File upload failed' });
      }
    });
    req.photoPath = uniqueFileName;
  });

  next();
};

module.exports = uploadImage;
