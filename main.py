from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI()

# Set the host and port values
host = "0.0.0.0"
port = 80

# Define a route to handle the /api URL
@app.get("/api")
def api():
  # Return a JSON response with the message "Hello, world!"
  return {"message": "Hello, world!"}


# Serve static files from the "www" directory and set index.html as the default file
app.mount("/api", app)
app.mount("/", StaticFiles(directory="www", html=True), name="www")

# Run the FastAPI app
if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host=host, port=port, log_level="info")
