# Use the official MkDocs Material image
FROM python:3

# Set the working directory inside the container
WORKDIR /docs

RUN pip install mkdocs-material

# Copy your local documentation files into the container's /docs directory
COPY . .

# Set the default command to serve the documentation using MkDocs
CMD ["mkdocs", "serve"]
