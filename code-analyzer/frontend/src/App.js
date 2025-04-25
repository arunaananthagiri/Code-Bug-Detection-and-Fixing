import React, { useState } from "react";

function App() {
    const [code, setCode] = useState(""); // Store user input
    const [result, setResult] = useState(null); // Store API response
    const [error, setError] = useState(null); // Store fetch errors

    const handleAnalyze = async () => {
        setError(null);
        try {
            const response = await fetch("http://127.0.0.1:5000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: code }) // Send text, not code
            });

            if (!response.ok) throw new Error("Server Error");

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError("⚠️ Failed to connect to Flask backend. Make sure it's running.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-4">Code Analyzer</h1>
            
            <textarea
                className="w-full max-w-2xl p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500"
                rows="6"
                placeholder="Paste your Python code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
            ></textarea>

            <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                onClick={handleAnalyze}
            >
                Analyze Code
            </button>

            {error && <p className="mt-3 text-red-400">{error}</p>}

            {result && (
                <div className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">📝 Analysis Results</h2>

                    <p className={result.syntax.syntax ? "text-green-400" : "text-red-400"}>
                        <b>Syntax Check:</b> {result.syntax.syntax ? "✅ No Syntax Errors" : "❌ Syntax Issue"}
                    </p>

                    <p className="mt-2 text-yellow-400"><b>PyFlakes:</b> {result.pyflakes.pyflakes}</p>

                    <p className="mt-4"><b>Formatted Code:</b></p>
                    <pre className="bg-black p-3 rounded-lg mt-2 text-gray-300 overflow-x-auto">
                        {result.formatted_code.formatted_code}
                    </pre>

                    <p className="mt-4 text-purple-400"><b>Pylint Issues:</b></p>
                    <pre className="bg-black p-3 rounded-lg mt-2 text-gray-300 overflow-x-auto">
                        {result.pylint.pylint || "✅ No Pylint issues found!"}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default App;
