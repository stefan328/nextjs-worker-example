const { parentPort, workerData } = require("worker_threads");
const sharp = require("sharp");

async function resizeImage(inputPath, outputPath, width, height) {
    try {
        await sharp(inputPath)
            .resize(width, height)
            .toFile(outputPath);
        parentPort.postMessage({ success: true, outputPath });
    } catch (error) {
        parentPort.postMessage({ success: false, error: error.message });
    }
}

const { inputPath, outputPath, width, height } = workerData;
resizeImage(inputPath, outputPath, width, height);
