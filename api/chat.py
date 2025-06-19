"""
LLM Chat API endpoint for the documentation chatbot
This is a sample implementation - adapt to your preferred LLM provider
"""

from flask import Flask, request, jsonify
import openai
import os
from datetime import datetime
import json

app = Flask(__name__)

# Configure your LLM provider (OpenAI example)
openai.api_key = os.getenv('OPENAI_API_KEY')

# System prompt for the documentation assistant
SYSTEM_PROMPT = """You are a helpful AI assistant for the GRA Core Platform documentation.

Your role:
- Answer questions about GRA Core Platform features, installation, configuration, and usage
- Provide code examples and best practices
- Help users navigate the documentation
- Explain technical concepts clearly
- Direct users to relevant documentation sections

Guidelines:
- Only answer questions related to GRA Core Platform documentation
- If you don't know something, say so and suggest checking the documentation
- Provide concise but helpful answers
- Include relevant links to documentation sections when possible
- Be friendly and professional
- Format code examples properly
- Use markdown formatting for better readability

Current documentation sections available:
- Installation and Setup (/user-guide/installation.html)
- Platform Structure and Layout (/user-guide/structure-layout.html)
- Configuration Options (/user-guide/configuration.html)
- API Reference (/api/)
- Examples and Tutorials (/examples/)
- Contributing Guidelines (/contributing/)
"""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        
        # Extract parameters
        messages = data.get('messages', [])
        model = data.get('model', 'gpt-3.5-turbo')
        max_tokens = data.get('max_tokens', 500)
        temperature = data.get('temperature', 0.1)
        session_id = data.get('session_id')
        
        # Validate input
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400
        
        # Add system prompt if not present
        if not any(msg.get('role') == 'system' for msg in messages):
            messages.insert(0, {'role': 'system', 'content': SYSTEM_PROMPT})
        
        # Call OpenAI API (or your preferred LLM provider)
        response = openai.ChatCompletion.create(
            model=model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
            presence_penalty=0.1,
            frequency_penalty=0.1
        )
        
        # Extract response
        assistant_message = response.choices[0].message.content
        usage = response.usage
        
        # Log the interaction (optional)
        log_interaction(session_id, messages[-1]['content'], assistant_message, usage)
        
        return jsonify({
            'choices': [{
                'message': {
                    'role': 'assistant',
                    'content': assistant_message
                }
            }],
            'usage': {
                'prompt_tokens': usage.prompt_tokens,
                'completion_tokens': usage.completion_tokens,
                'total_tokens': usage.total_tokens
            },
            'model': model,
            'session_id': session_id
        })
        
    except openai.error.RateLimitError:
        return jsonify({
            'error': 'Rate limit exceeded. Please try again in a moment.',
            'type': 'rate_limit'
        }), 429
        
    except openai.error.InvalidRequestError as e:
        return jsonify({
            'error': f'Invalid request: {str(e)}',
            'type': 'invalid_request'
        }), 400
        
    except openai.error.AuthenticationError:
        return jsonify({
            'error': 'Authentication failed. Please check API configuration.',
            'type': 'auth_error'
        }), 401
        
    except Exception as e:
        print(f"Chat API error: {str(e)}")
        return jsonify({
            'error': 'An unexpected error occurred. Please try again.',
            'type': 'server_error'
        }), 500

def log_interaction(session_id, user_message, assistant_response, usage):
    """Log chat interactions for analytics and improvement"""
    log_entry = {
        'timestamp': datetime.utcnow().isoformat(),
        'session_id': session_id,
        'user_message': user_message,
        'assistant_response': assistant_response,
        'usage': {
            'prompt_tokens': usage.prompt_tokens,
            'completion_tokens': usage.completion_tokens,
            'total_tokens': usage.total_tokens
        }
    }
    
    # Save to log file or database
    log_file = 'chat_logs.jsonl'
    with open(log_file, 'a') as f:
        f.write(json.dumps(log_entry) + '\n')

@app.route('/api/chat/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
