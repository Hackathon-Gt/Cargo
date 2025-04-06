# Use Ubuntu 22.04 as the base image
FROM ubuntu:22.04

# Set the non-interactive frontend for apt-get
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy application code into the container
COPY . .

# Install Python dependencies
RUN if [ -f backend/requirements.txt ]; then \
        pip3 install --no-cache-dir -r backend/requirements.txt; \
    fi

# Install Node.js dependencies and build the frontend
RUN if [ -f frontend/package.json ]; then \
        cd frontend && \
        npm install && \
        npm run build; \
    fi

# Expose port 8000 for API access
EXPOSE 8000

# Start the backend server
CMD ["python3", "backend/main.py"]
