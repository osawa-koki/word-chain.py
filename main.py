from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import pulp
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set the host and port values
host = "0.0.0.0"
port = 80

class WordChainRequest(BaseModel):
    words: List[str]

# Define a route to handle the /api URL
@app.post("/api/word-chain")
def find_longest_word_chain(words: WordChainRequest) -> List[str]:
    words = words.words
    n = len(words)
    longest_chain = []
    for i in range(n):
        chain = [words[i]]
        for j in range(i+1, n):
            if chain[-1][-1] == words[j][0]:
                chain.append(words[j])
        if len(chain) > len(longest_chain):
            longest_chain = chain
    return longest_chain



# Serve static files from the "www" directory and set index.html as the default file
app.mount("/api", app)
app.mount("/", StaticFiles(directory="www", html=True), name="www")

# Run the FastAPI app
if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host=host, port=port, log_level="info")
