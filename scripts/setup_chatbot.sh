#!/bin/bash

echo "🤖 Setting up LLM Documentation Chatbot..."
echo "=========================================="

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Install required Python packages for the API
echo "📦 Installing Python dependencies..."
pip3 install flask openai python-dotenv

# Create API directory if it doesn't exist
mkdir -p api

# Set up environment variables
echo "🔧 Setting up environment variables..."
if [ ! -f ".env" ]; then
    cat > .env << EOF
# LLM API Configuration
OPENAI_API_KEY=your_openai_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True

# Alternative LLM providers (uncomment to use)
# ANTHROPIC_API_KEY=your_anthropic_key_here
# COHERE_API_KEY=your_cohere_key_here
# HUGGINGFACE_API_KEY=your_hf_key_here
EOF
    echo "✅ Created .env file - please add your API keys"
else
    echo "✅ .env file already exists"
fi

# Create a simple test script
cat > test_chatbot.py << 'EOF'
#!/usr/bin/env python3
"""
Test script for the LLM chatbot functionality
"""

import requests
import json

def test_chatbot_api():
    """Test the chatbot API endpoint"""
    url = "http://localhost:5000/api/chat"
    
    test_message = {
        "messages": [
            {"role": "user", "content": "How do I install GRA Core Platform?"}
        ],
        "model": "gpt-3.5-turbo",
        "max_tokens": 200,
        "temperature": 0.1
    }
    
    try:
        response = requests.post(url, json=test_message, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Chatbot API test successful!")
            print(f"Response: {data['choices'][0]['message']['content']}")
            return True
        else:
            print(f"❌ API test failed with status {response.status_code}")
            print(f"Error: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to API. Make sure the server is running.")
        return False
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing LLM Chatbot API...")
    test_chatbot_api()
EOF

chmod +x test_chatbot.py

# Create startup script
cat > start_chatbot_api.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting LLM Chatbot API Server..."

# Load environment variables
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if API key is set
if [ -z "$OPENAI_API_KEY" ] || [ "$OPENAI_API_KEY" = "your_openai_api_key_here" ]; then
    echo "⚠️  Warning: OPENAI_API_KEY not set in .env file"
    echo "   The chatbot will use fallback responses only."
fi

# Start the Flask API server
echo "🌐 Starting server on http://
