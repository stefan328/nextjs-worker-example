

# **Next.js Worker Thread Image Resizer**

This project demonstrates how to use **worker threads** in **Next.js** to offload CPU-intensive tasks, such as image resizing. It includes a **REST API** to process images asynchronously and a frontend interface for testing.

✅ Uses **Worker Threads** for CPU-heavy image processing  
✅ Uses **Sharp** for high-performance image manipulation  
✅ **Resizes images asynchronously** without blocking requests  
✅ **Automated Tests** to generate 100 images and clean up  

---

## **🚀 Features**
- Resize **`sample.jpg`** (in `/public`) dynamically with worker threads.
- Uses **Sharp** for efficient image processing.
- Saves resized images with **random filenames**.
- Provides a **Next.js frontend** for testing.
- Includes a **Jest test suite** to generate & clean up 100 images.

---

## **📌 Prerequisites**
Ensure you have:
- **Node.js** `>=18.0`
- **npm** or **yarn**

---

## **📥 Installation**
1. Clone this repository:


2. Install dependencies:
   ```sh
   npm install
   ```

---

## **🚀 Running the Project**
Start the Next.js development server:
```sh
npm run dev
```
Your app will be available at **`http://localhost:3000`**.

---

## **🖼️ Using the Image Resizer**
### **Frontend UI**
1. Open **http://localhost:3000**
2. Enter a **width** and **height**.
3. Click **"Resize Image"**.
4. A resized version of `sample.jpg` will be displayed.

### **API Endpoint (`/api/resize`)**
You can resize images by sending a **POST request**:
```sh
curl -X POST http://localhost:3000/api/resize \
     -H "Content-Type: application/json" \
     -d '{"width": 300, "height": 200}'
```
Response:
```json
{
  "message": "Image resized successfully",
  "url": "/resized-abc123.jpg"
}
```
The resized image will be stored in `/public`.

---

## **🧪 Running Tests**
The project includes Jest tests that:
1. **Generate 100 resized images**.
2. **Verify** they were created successfully.
3. **Clean up all generated images**.

### **Run Tests**
```sh
npm run dev  # Ensure the server is running
npx jest __tests__/resize.test.js
```

### **Test Suite**
- **`resize.test.js`** sends 100 resize requests.
- It **verifies that images were created**.
- **Deletes** all resized images after tests complete.

---

## **🗑️ Cleanup**
If you need to manually clean up generated images, run:
```sh
rm -rf public/resized-*.jpg
```

---

## **🔧 Troubleshooting**
### **Sharp Installation Issues**
If `sharp` fails to install, try:
```sh
npm install sharp --unsafe-perm
```

### **Jest Throws "Cannot use import statement outside a module"**
Use `require()` instead of `import` in test files.

### **Test Errors About `node-fetch`**
For **Node.js <18**, install:
```sh
npm install node-fetch --save-dev
```
For **Node.js 18+**, remove `node-fetch` and use the built-in `fetch()`.

---

## **💡 Future Improvements**
- Add support for **file uploads**.
- Support more **image formats**.

---

