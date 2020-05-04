const configStorage = destPath => {
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, destPath);
      },
      filename: function(req, file, cb) {
        const {email = 'unkown_email'} = req.body;
        const uniqId = uuidv4();
        let current_datetime = new Date();
        let formatted_date = `${current_datetime.getFullYear()}-${current_datetime.getMonth() +
          1}-${current_datetime.getDate()}`;
        cb(null, `${formatted_date}_${email}_${uniqId}_${file.originalname}`);
      },
    });
  
    const uploader = multer({
      storage,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    });
  
    return uploader;
  };
  
module.exports = configStorage;