import axios from 'axios';

interface AnalysisResult {
  hasError: boolean;
  message: string;
  fixedCode?: string;
}

export const analyzeCode = async (code: string): Promise<AnalysisResult> => {
  try {
    // This is where you would integrate with your backend API
    // For now, we'll simulate the analysis
    const response = await simulateAnalysis(code);
    return response;
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
};

// Temporary simulation function - replace with actual API call
const simulateAnalysis = async (code: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simple error detection
  if (!code.trim()) {
    return {
      hasError: true,
      message: 'Code cannot be empty',
    };
  }

  // Check for common Python syntax errors
  if (code.includes('print[') || code.includes('if(')) {
    return {
      hasError: true,
      message: 'Syntax error detected',
      fixedCode: code.replace('print[', 'print(').replace('if(', 'if '),
    };
  }

  // Check for indentation errors
  if (code.includes('if') && !code.includes('    ')) {
    return {
      hasError: true,
      message: 'Indentation error detected',
      fixedCode: code.replace(/if/g, 'if:\n    '),
    };
  }

  return {
    hasError: false,
    message: 'No issues found in the code.',
  };
};