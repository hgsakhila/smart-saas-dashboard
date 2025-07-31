from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import requests
import json

app = FastAPI()

@app.get("/")
def root():
    return {"status": "✅ FastAPI AI Assistant is running"}

# ✅ Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📦 Input schema
class Question(BaseModel):
    question: str

# 🧠 AI endpoint
@app.post("/ask")
def ask_question(q: Question):
    # 🔄 Step 1: Fetch employee data from Spring Boot
    try:
        employee_res = requests.get("http://host.docker.internal:8080/api/employees")
        employees = employee_res.json()
    except Exception as e:
        return { "reply": f"⚠️ Error fetching employee data: {str(e)}" }

    # 📋 Step 2: Format employee data
    employee_text = "\n".join([
        f"- {emp['name']} ({emp['department']}, {emp['role']}, Joined: {emp['createdAt']})"
        for emp in employees
    ])

    # 🧱 Step 3: Build prompt
    prompt = f"""
You are an AI assistant for a company dashboard.

Here is the employee data:
{employee_text}

User question: {q.question}

Give a helpful answer based on the data.
"""

    # 🚀 Step 4: Stream response from Mistral via Ollama
    def generate():
        try:
            ollama_response = requests.post(
                "http://host.docker.internal:11434/api/generate",
                json={"model": "mistral", "prompt": prompt, "stream": True},
                stream=True
            )
            for chunk in ollama_response.iter_lines():
                if chunk:
                    data = json.loads(chunk.decode("utf-8"))
                    if "response" in data:
                        yield data["response"]
        except Exception as e:
            yield f"⚠️ Error from AI model: {str(e)}"

    return StreamingResponse(generate(), media_type="text/plain")
