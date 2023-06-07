
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import requests

from io import BytesIO
import PyPDF2
import os
import openai
openai.api_key = "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"

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
    print("query: ",query)
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": query}
        ]
    )
    response = completion.choices[0].message['content']
    print(response)
    return {"message": response}


@app.post("/pdf")
async def get_pdf_contents(file: UploadFile = File(...)):
    pdf_reader = PyPDF2.PdfFileReader(BytesIO(await file.read()))
    contents = ""
    for page in pdf_reader.pages:
        contents += page.extract_text()
    print(contents)
    return {"contents": contents}
