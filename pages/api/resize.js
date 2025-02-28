import { Worker } from "worker_threads";
import path from "path";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { width, height } = req.body;
    if (!width || !height) {
        return res.status(400).json({ error: "Width and height are required" });
    }

    const inputPath = path.resolve("./public/sample.jpg");
    const outputPath = path.resolve("./public/resized.jpg");

    const worker = new Worker(path.resolve("./pages/api/worker.js"), {
        workerData: { inputPath, outputPath, width, height },
    });

    worker.on("message", (message) => {
        if (message.success) {
            res.status(200).json({
                message: "Image resized successfully",
                url: `/resized.jpg`,
            });
        } else {
            res.status(500).json({ error: message.error });
        }
    });

    worker.on("error", (error) => {
        res.status(500).json({ error: error.message });
    });

    worker.on("exit", (code) => {
        if (code !== 0) {
            console.error(`Worker exited with code ${code}`);
        }
    });
}
