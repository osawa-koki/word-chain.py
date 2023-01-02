from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

app = FastAPI()

# Serve static files from the "static" directory
app.mount("/", StaticFiles(directory="static"), name="static")

# Set the host and port values
host = "0.0.0.0"
port = 80

# Define a route to handle the /api URL
@app.get("/api")
def api():
  # Return a JSON response with the message "Hello, world!"
  return JSONResponse({"message": "Hello, world!"})

# Run the FastAPI app
if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host=host, port=port, log_level="info")
