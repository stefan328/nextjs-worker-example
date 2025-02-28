import { Worker } from "worker_threads";
import path from "path";
import crypto from "crypto";
import { IncomingForm } from "formidable";  // Formidable to parse form data

export const config = {
    api: {
        bodyParser: false, // Disable Next.js default JSON parser
    },
};

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = new IncomingForm({ multiples: false });

    form.parse(req, (err, fields) => {
        if (err) {
            console.error("Error parsing form:", err);
            return res.status(500).json({ error: "Form parse error" });
        }

        const { width, height } = fields;

        if (!width || !height) {
            return res.status(400).json({ error: "Width and height are required" });
        }

        // Use the static file located in the "public" folder
        const inputPath = path.resolve("./public/sample.jpg");

        // Generate a random filename for the resized image
        const randomFileName = `resized-${crypto.randomBytes(6).toString("hex")}.jpg`;
        const outputPath = path.resolve(`./public/${randomFileName}`);

        try {
            const worker = new Worker(path.resolve("./pages/api/worker.js"), {
                workerData: {
                    inputPath,
                    outputPath,
                    width: Number(width),
                    height: Number(height),
                },
            });

            worker.on("message", (message) => {
                if (message.success) {
                    res.status(200).json({ message: "Image resized successfully", url: `/${randomFileName}` });
                } else {
                    res.status(500).json({ error: message.error });
                }
                worker.terminate();
            });

            worker.on("error", (error) => {
                console.error("Worker error:", error);
                res.status(500).json({ error: error.message });
            });

            worker.on("exit", (code) => {
                if (code !== 0) {
                    console.error(`Worker exited with code ${code}`);
                }
            });
        } catch (error) {
            console.error("Unexpected error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
