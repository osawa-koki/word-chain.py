from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import pulp

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
    words: list[str]

# Define a route to handle the /api URL
@app.post("/api/word-chain")
def find_longest_word_chain(request: WordChainRequest):
    # create the LP problem
    model = pulp.LpProblem("Longest Word Chain", pulp.LpMaximize)

    # create variables
    variables = {}
    for i, word in enumerate(request.words):
        variables[i] = pulp.LpVariable(f"x{i}", lowBound=0, upBound=1, cat='Binary')

    # add the objective function
    model += pulp.lpSum([variables[i] for i in range(len(request.words))])

    # add the constraint that each word must come after the previous one
    for i in range(1, len(request.words)):
        model += variables[i] <= variables[i - 1]

    # solve the LP
    model.solve()

    # build the word chain
    word_chain = []
    for i in range(len(request.words)):
        if variables[i].value() == 1.0:
            word_chain.append(request.words[i])

    return {"word_chain": word_chain}


# Serve static files from the "www" directory and set index.html as the default file
app.mount("/api", app)
app.mount("/", StaticFiles(directory="www", html=True), name="www")
app.mount("/about", StaticFiles(directory="www", html=True), name="www")
app.mount("/contact", StaticFiles(directory="www", html=True), name="www")
app.mount("/word-chain", StaticFiles(directory="www", html=True), name="www")

# Run the FastAPI app
if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host=host, port=port, log_level="info")
