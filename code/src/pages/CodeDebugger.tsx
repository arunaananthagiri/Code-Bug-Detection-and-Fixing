import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const CodeDebugger = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{
    hasError: boolean;
    message: string;
    fixedCode?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // 👉 Call FastAPI backend
  const analyzeWithBackend = async (code: string) => {
    const response = await fetch('http://localhost:8000/fix-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from backend');
    }

    const data = await response.json();
    return data.fixed_code;
  };

  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setLoading(true);
    try {
      const fixedCode = await analyzeWithBackend(code);
      setResult({
        hasError: false,
        message: 'Code analyzed and fixed successfully!',
        fixedCode,
      });
    } catch (error) {
      setResult({
        hasError: true,
        message: 'Failed to analyze code. Please try again.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Code Debugger</h2>
        <div className="mb-4">
          <Editor
            height="400px"
            defaultLanguage="python"
            theme="vs-light"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading || !code.trim()}
          className={`flex items-center justify-center px-4 py-2 rounded-md text-white font-medium ${
            loading || !code.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze Code'
          )}
        </button>
      </div>

      {result && (
        <div className={`bg-white rounded-lg shadow p-6 ${
          result.hasError ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'
        }`}>
          <div className="flex items-start space-x-3">
            {result.hasError ? (
              <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
            )}
            <div>
              <h3 className="text-lg font-medium">
                {result.hasError ? 'Issues Found' : 'Analysis Complete'}
              </h3>
              <p className="mt-1 text-gray-600">{result.message}</p>
              {result.fixedCode && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Suggested Fix:</h4>
                  <Editor
                    height="200px"
                    defaultLanguage="python"
                    value={result.fixedCode}
                    theme="vs-light"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeDebugger;
