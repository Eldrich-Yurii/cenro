import path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const downloadPdf = async (req, res) => {
    const filename = path.join(__dirname, "../uploads", req.params.pdfPath);
    res.download(filename, "Application-form.pdf", (err) => {
        if(err) {
            res.status(500).json({ message: "Error downloding file"})
        }
    })
}