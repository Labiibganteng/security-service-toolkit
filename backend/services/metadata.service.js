const path = require("path");

function analyzeFileMetadata(file) {
  if (!file || typeof file !== "object") {
    const error = new Error("File is required");
    error.status = 400;
    throw error;
  }

  const originalName = file.originalname || file.name;

  if (!originalName) {
    const error = new Error("File name is required");
    error.status = 400;
    throw error;
  }

  const extension = path.extname(originalName).toLowerCase();

  return {
    name: originalName,
    extension: extension || null,
    mimeType: file.mimetype || file.type || null,
    size: Number(file.size || 0),
    sizeKB: Number((Number(file.size || 0) / 1024).toFixed(2)),
  };
}

module.exports = {
  analyzeFileMetadata,
};
