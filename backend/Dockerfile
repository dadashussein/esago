FROM python:3.9

# Install virtualenv
RUN pip install virtualenv

# Set working directory
WORKDIR /code

# Copy requirements.txt
COPY ./requirements.txt /code/requirements.txt

# Create and activate virtual environment
RUN python -m venv test && \
    . test/bin/activate && \
    pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy source code
COPY ./src /code
RUN mkdir -p /code/wwwroot
# Expose port
EXPOSE 8000

# Set environment variables
ENV PYTHONPATH=/src
# Command to run the application
CMD [ "test/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" ]
