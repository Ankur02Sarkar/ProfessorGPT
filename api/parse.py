from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
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

@app.post("/pdf")
async def get_pdf_contents(file: UploadFile = File(...)):
    pdf_reader = PyPDF2.PdfFileReader(BytesIO(await file.read()))
    contents = ""
    for page in pdf_reader.pages:
        contents += page.extract_text()
    print(contents)
    return {"contents": contents}
