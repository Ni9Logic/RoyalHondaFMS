import fs from 'fs';
import pdf from 'pdf-parse';

const getPdfData = async () => {
    const pdfPath = './parts.pdf';
    const dataBuffer = fs.readFileSync(pdfPath);

    // Parse the PDF
    const data = await pdf(dataBuffer);
    const { text } = data;

    return text;
}

export default getPdfData;