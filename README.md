# Next.js Worker Thread Example: Image Resizing

This project demonstrates how to use **worker threads** in **Next.js** to offload CPU-intensive tasks, such as image processing (resizing an image), to separate threads without blocking the main event loop.

## Features
- Resizes images asynchronously using worker threads.
- Uses the `sharp` library for image manipulation.
- Provides an API endpoint (`/api/resize`) to resize images by sending POST requests with width and height parameters.
- A simple frontend interface to trigger image resizing.

---

## Prerequisites
Before running the project, make sure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**

---

## Setup Instructions

### 1. Install Dependencies

First, clone or extract the project and navigate into the project directory:

```sh
git clone <repository-url>
cd nextjs-worker-example
```

Install the necessary dependencies using npm or yarn:

```sh
npm install
```

or, if you prefer yarn:

```sh
yarn install
```

---

### 2. Running the Project

Once dependencies are installed, start the Next.js development server:

```sh
npm run dev
```

This will start the server at `http://localhost:3000`.

---

### 3. Testing the Image Resizing

- Open your browser and navigate to `http://localhost:3000`.
- You'll see a simple interface with input fields for **width** and **height**.
- Upload a **sample.jpg** image to the `/public` directory if you want to use your own image.
- Enter the desired width and height values, then click **Resize Image**.

The image will be resized asynchronously by the worker thread, and you will see the resized image displayed on the page.

---

## Project Structure

```
nextjs-worker-example/
│── pages/
│   ├── api/
│   │   ├── resize.js  (API route that uses worker threads for resizing images)
│   │   ├── worker.js  (Worker thread for performing the image resizing)
│── public/
│   ├── sample.jpg  (Placeholder image for testing)
│── package.json
│── next.config.js  (Next.js configuration)
│── pages/
│   ├── index.js    (Frontend to trigger the image resizing)
```

---

## Libraries Used

- **Next.js** – Framework for building React-based web applications.
- **sharp** – High-performance image processing library.
- **worker_threads** – Node.js module to manage worker threads.

---

## Notes

- Make sure to have a **sample.jpg** image in the `/public` directory to test the resizing functionality. You can replace this with any image of your choice.
- The worker thread handles CPU-intensive tasks (image resizing) separately from the main thread to avoid blocking API responses.

---

## To Do/Improvements

- **Error Handling:** Add more detailed error handling and fallback mechanisms.
- **Custom Image Upload:** Implement functionality to upload custom images for resizing.
- **Scaling:** Explore using a worker thread pool for handling multiple image resizing requests simultaneously.

---

Let me know if you need more details or help!