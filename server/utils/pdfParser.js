const { PdfReader } = require("pdfreader");

const extractTextFromPDF = async (buffer) => {
  return new Promise((resolve, reject) => {
    const items = [];
    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) reject(err);
      else if (!item) resolve(items.join(" "));
      else if (item.text) items.push(item.text);
    });
  });
};

module.exports = { extractTextFromPDF };