import React, { useState } from "react";

const CodeAnalyzer = () => {
    const [userInput, setUserInput] = useState(""); 
    const [result, setResult] = useState(""); 
    const [error, setError] = useState(""); 

    const handleAnalyze = async () => {
        setError("");  // Clear previous errors
        setResult(""); // Clear previous results

        try {
            const response = await fetch("http://127.0.0.1:5000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: userInput }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data.message); // Display response from Flask
        } catch (error) {
            setError("Failed to connect to server. Make sure the backend is running.");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>React + Flask Code Analyzer</h1>
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows="6"
                cols="50"
            ></textarea>
            <br />
            <button onClick={handleAnalyze}>Analyze</button>
            
            {result && <p style={{ color: "green" }}>{result}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default CodeAnalyzer;
