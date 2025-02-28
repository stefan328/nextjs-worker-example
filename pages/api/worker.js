const { parentPort, workerData } = require("worker_threads");
const sharp = require("sharp");  // Using sharp for image processing

async function resizeImage(inputPath, outputPath, width, height) {
    try {
        // Use sharp to resize the image
        await sharp(inputPath)
            .resize(width, height)  // Resize the image
            .toFile(outputPath);    // Save to the specified output path

        // Send success message back to main thread
        parentPort.postMessage({ success: true, outputPath });
    } catch (error) {
        // Send error message back if something fails
        parentPort.postMessage({ success: false, error: error.message });
        process.exit(1);
    }
}

resizeImage(workerData.inputPath, workerData.outputPath, workerData.width, workerData.height);
