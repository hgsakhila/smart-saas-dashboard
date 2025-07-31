import os
from fastapi import FastAPI
from pydantic import BaseModel
import requests
import traceback
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add this CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Ollama URL from environment variable
OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://ollama:11434")
SPRINGBOOT_BACKEND_URL = "http://backend:8080/api/employees"

class QuestionRequest(BaseModel):
    question: str

@app.post("/ask")
def ask_question(request: QuestionRequest):
    question = request.question

    try:
        # Step 1: Get employee data
        emp_response = requests.get(SPRINGBOOT_BACKEND_URL)
        emp_response.raise_for_status()
        employees = emp_response.json()

        if not employees:
            return {"error": "No employees found from backend."}

        # Step 2: Format prompt
        employee_info = "\n".join(
            f"{emp['name']} - {emp['department']} - {emp['role']}" for emp in employees
        )

        prompt = f"""
You are an assistant for a SaaS dashboard. Here is the employee data:

{employee_info}

Question: {question}

Answer in one sentence.
"""

        # Step 3: Call Ollama
        ollama_response = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json={"model": "llama3", "prompt": prompt, "stream": False},
        )
        ollama_response.raise_for_status()

        result = ollama_response.json()
        return {"answer": result.get("response", "⚠️ No answer from model.")}

    except Exception as e:
        return {
            "error": "⚠️ Error occurred in AI assistant.",
            "details": str(e),
            "trace": traceback.format_exc()
        }
