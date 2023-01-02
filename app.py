from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

app = FastAPI()

# Serve static files from the "static" directory
app.mount("/", StaticFiles(directory="static"), name="static")

# Define a route to handle the /api URL
@app.get("/api")
def api():
  # Return a JSON response with the message "Hello, world!"
  return JSONResponse({"message": "Hello, world!"})
