# Use the official Python image as the base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file to the container
# Copy the necessary files
COPY requirements.txt /app/
COPY app.py /app/
COPY templates/ /app/templates/
COPY static/ /app/static/

RUN pip install gunicorn
RUN pip install flask
RUN pip install textblob

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . /app/

# Expose port 5000 to the host
EXPOSE 5000

# Start the Python app using Gunicorn (you can replace "app" with your main Python file name)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
