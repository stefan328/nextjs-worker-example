const fs = require("fs");
const path = require("path");

const API_URL = "http://localhost:3000/api/resize";
const GENERATED_FILES = [];

const resizeImage = async (width, height) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ width, height }),
    });

    const data = await response.json();

    if (data.url) {
        const filePath = path.resolve(`./public/${data.url.split("/").pop()}`);
        GENERATED_FILES.push(filePath);
        return filePath;
    }
    throw new Error(`Resize failed: ${data.error}`);
};

const cleanupGeneratedImages = () => {
    GENERATED_FILES.forEach((file) => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Deleted: ${file}`);
        }
    });
};

describe("Image Resizing API", () => {
    it("should generate 100 resized images", async () => {
        const resizePromises = [];

        for (let i = 1; i <= 100; i++) {
            const width = 100 + i;
            const height = 100 + i;
            resizePromises.push(resizeImage(width, height));
        }

        const results = await Promise.all(resizePromises);
        expect(results.length).toBe(100);
    });

    afterAll(() => {
        cleanupGeneratedImages();
    });
});
