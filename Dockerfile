# Step 1: Build the Next.js app
FROM node:18 as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY client/package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the code
COPY client .

# Build the Next.js app
RUN npm run build

# Step 2: Start the FastAPI server
FROM python:3.11-alpine as production-stage

# Set the working directory
WORKDIR /app

# Copy the required files from the build stage
COPY --from=build-stage /app/www /app/www
COPY main.py .
COPY requirements.txt .

# Install the Python dependencies
RUN pip install -r requirements.txt

# Set the default command to start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
