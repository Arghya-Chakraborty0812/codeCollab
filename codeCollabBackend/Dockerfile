FROM maven:3.9.2-eclipse-temurin-17

# 🔥 Switch to root to install + change permissions
USER root

RUN apt-get update && apt-get install -y \
    g++ \
    python3 \
    nodejs \
    npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create user
RUN useradd -m coder

# 🔥 Give permissions
RUN chown -R coder:coder /app

# Switch back to non-root (SECURITY ✅)
USER coder

ENV HOME=/home/coder

CMD ["bash"]