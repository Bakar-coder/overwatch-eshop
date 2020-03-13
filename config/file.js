const fs = require('fs');
exports.deleteFile = filePath => fs.unlink(filePath, (ex) =>  {
  if (ex) throw(ex)
});
