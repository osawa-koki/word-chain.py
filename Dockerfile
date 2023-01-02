# Step 1: Build the Next.js app
FROM node:18.11.0-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY client/package.json client/yarn-lock.json ./

# Install the dependencies
RUN yarn

# Copy the rest of the code
COPY client .

# Build the Next.js app
RUN yarn build

# Step 2: Start the FastAPI server
FROM python:3.11.0-alpine as production-stage

# Set the working directory
WORKDIR /app

# Copy the required files from the build stage
COPY --from=build-stage /app/dist /app/www
COPY main.py .
COPY requirements.txt .

# Install the Python dependencies
RUN pip install -r requirements.txt

# Set the default command to start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
