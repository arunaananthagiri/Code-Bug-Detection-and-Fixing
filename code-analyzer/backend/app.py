from flask import Flask, request, jsonify
import ast
import subprocess
import autopep8
from pyflakes.api import check
from pyflakes.reporter import Reporter
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Function to check syntax errors using AST
def check_syntax(code):
    try:
        ast.parse(code)
        return {"syntax": "✅ No syntax errors found."}
    except SyntaxError as e:
        return {"syntax": f"❌ Syntax Error at line {e.lineno}: {e.msg}"}

# Function to check code quality using PyFlakes
def check_code_quality(code):
    report = io.StringIO()
    check(code, Reporter(report, report))
    output = report.getvalue().strip()
    return {"pyflakes": output if output else "✅ No issues found."}

# Function to auto-format code using autopep8
def format_code(code):
    return {"formatted_code": autopep8.fix_code(code)}

# Function to analyze code with PyLint
def lint_code(code):
    with open("temp.py", "w") as f:
        f.write(code)

    result = subprocess.run(
        ["pylint", "temp.py", "--disable=all", "--enable=F"],
        capture_output=True,
        text=True
    )
    return {"pylint": result.stdout.strip()}

# Flask route to analyze the code
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    code = data.get("text", "")

    syntax_result = check_syntax(code)
    pyflakes_result = check_code_quality(code)
    formatted_result = format_code(code)
    pylint_result = lint_code(code)

    return jsonify({
        "syntax": syntax_result,
        "pyflakes": pyflakes_result,
        "formatted_code": formatted_result,
        "pylint": pylint_result
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
