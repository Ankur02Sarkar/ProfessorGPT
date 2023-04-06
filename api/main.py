
# @app.get("/api")
# def get_response(query: str):
#     # Logic to generate response based on the query
#     response = {"message": f"Hello, you asked: {query}"}
#     return response

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import requests

from io import BytesIO
import PyPDF2
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def get_response(query: str):
    url = "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium"
    payload = {
        "enable_google_results": False,
        "enable_memory": False,
        "input_text": query
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "X-API-KEY": "104d11a0-02b9-47f6-896e-12d39e5f9026"
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        response_data = response.json()
        message = response_data["message"]
        # message = response.text
    else:
        message = f"Error: {response.status_code}"
    return {"message": message}


@app.post("/pdf")
async def get_pdf_contents(file: UploadFile = File(...)):
    pdf_reader = PyPDF2.PdfFileReader(BytesIO(await file.read()))
    contents = ""
    for page in pdf_reader.pages:
        contents += page.extract_text()
    print(contents)
    return {"contents": contents}

