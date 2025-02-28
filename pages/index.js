import { useState } from "react";

export default function Home() {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [imageUrl, setImageUrl] = useState("");

    const handleResize = async () => {
        const response = await fetch("/api/resize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ width, height }),
        });

        const data = await response.json();
        if (data.url) {
            setImageUrl(data.url);
        } else {
            alert("Error: " + data.error);
        }
    };

    return (
        <div>
            <h1>Resize Image with Worker Threads</h1>
            <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                placeholder="Width"
            />
            <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="Height"
            />
            <button onClick={handleResize}>Resize Image</button>

            {imageUrl && (
                <div>
                    <h3>Resized Image:</h3>
                    <img src={imageUrl} alt="Resized" />
                </div>
            )}
        </div>
    );
}
