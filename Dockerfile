FROM ubuntu:jammy

# === INSTALL Node.js ===
RUN apt-get update && \
    # Install Node 20
    apt-get install -y curl wget gpg && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    # Feature-parity with node.js base images.
    apt-get install -y --no-install-recommends git openssh-client && \
    npm install -g yarn && \
    # clean apt cache
    rm -rf /var/lib/apt/lists/* && \
    # Create the pwuser
    adduser pwuser
 
# Set the work directory for the application
WORKDIR /app
 
# Set env variable for browser executables directory path
ENV PLAYWRIGHT_BROWSERS_PATH /ms-playwright

# COPY the needed files to the app folder in Docker image
COPY . .

RUN npm i
RUN npx playwright install --with-deps webkit
RUN node render-with-cache-response.js
RUN node render-with-base64.js
