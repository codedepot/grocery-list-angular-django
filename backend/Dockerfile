# Use Python image as the base
FROM python:3

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .

# RUN apk update && apk --no-cache add python3-dev libpq-dev && mkdir /install
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install djangorestframework

# Copy project files into the container
COPY . .

EXPOSE 8000
