import { useState } from "react";

function ImageGenerator() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        setLoading(true);
        const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
            method: "POST",
            headers: {
                "Authorization": "Bearer YOUR_API_KEY",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
        setLoading(false);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>AI Image Generator</h1>
            <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter your prompt..." 
                style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
            />
            <br />
            <button onClick={generateImage} style={{ padding: "10px 20px", fontSize: "16px" }}>Generate</button>
            {loading && <p>Generating image...</p>}
            {image && <div><img src={image} alt="Generated" style={{ marginTop: "20px", maxWidth: "100%" }} /></div>}
        </div>
    );
}

export default ImageGenerator;
