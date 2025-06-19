"""
Sphinx extension for LLM-based chatbot integration
"""
import os
import json
import hashlib
from pathlib import Path
from typing import Dict, List, Any

from sphinx.application import Sphinx
from sphinx.util import logging
from docutils import nodes
from docutils.parsers.rst import Directive

logger = logging.getLogger(__name__)

class ChatbotDirective(Directive):
    """Directive to embed chatbot widget"""
    
    has_content = False
    required_arguments = 0
    optional_arguments = 0
    
    def run(self):
        chatbot_node = nodes.raw(
            '',
            '''
            <div id="gra-chatbot-widget" class="chatbot-widget">
                <div class="chatbot-toggle" id="chatbot-toggle">
                    <i class="fas fa-comments"></i>
                    <span>Ask Documentation</span>
                </div>
                <div class="chatbot-container" id="chatbot-container" style="display: none;">
                    <div class="chatbot-header">
                        <h4>GRA Documentation Assistant</h4>
                        <button class="chatbot-close" id="chatbot-close">×</button>
                    </div>
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="message bot-message">
                            <div class="message-content">
                                Hi! I'm here to help you with GRA Core Platform documentation. 
                                Ask me anything about the platform features, installation, or usage.
                            </div>
                        </div>
                    </div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbot-input" placeholder="Ask about the documentation...">
                        <button id="chatbot-send">Send</button>
                    </div>
                </div>
            </div>
            ''',
            format='html'
        )
        return [chatbot_node]

def create_documentation_index(app: Sphinx, env, docnames):
    """Create searchable index of documentation content"""
    config = app.config.chatbot_config
    if not config.get('enabled', False):
        return
    
    index_data = []
    
    for docname in docnames:
        try:
            doc = env.get_doctree(docname)
            content = doc.astext()
            
            # Split content into chunks
            chunks = split_text(content, config.get('chunk_size', 1000), config.get('chunk_overlap', 200))
            
            for i, chunk in enumerate(chunks):
                index_data.append({
                    'id': f"{docname}_{i}",
                    'docname': docname,
                    'chunk_id': i,
                    'content': chunk,
                    'url': f"{docname}.html",
                    'title': env.titles.get(docname, docname).astext() if docname in env.titles else docname
                })
        except Exception as e:
            logger.warning(f"Failed to index document {docname}: {e}")
    
    # Save index
    index_path = Path(app.outdir) / '_static' / 'chatbot_index.json'
    index_path.parent.mkdir(exist_ok=True)
    
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump(index_data, f, ensure_ascii=False, indent=2)
    
    logger.info(f"Created chatbot index with {len(index_data)} chunks")

def split_text(text: str, chunk_size: int, overlap: int) -> List[str]:
    """Split text into overlapping chunks"""
    if len(text) <= chunk_size:
        return [text]
    
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        if end >= len(text):
            chunks.append(text[start:])
            break
        
        # Try to break at sentence boundary
        chunk = text[start:end]
        last_period = chunk.rfind('.')
        last_newline = chunk.rfind('\n')
        
        break_point = max(last_period, last_newline)
        if break_point > start + chunk_size // 2:
            end = start + break_point + 1
        
        chunks.append(text[start:end])
        start = end - overlap
    
    return chunks

def setup(app: Sphinx) -> Dict[str, Any]:
    """Setup the extension"""
    app.add_config_value('chatbot_config', {}, 'html')
    app.add_directive('chatbot', ChatbotDirective)
    app.connect('env-updated', create_documentation_index)
    
    return {
        'version': '1.0',
        'parallel_read_safe': True,
        'parallel_write_safe': True,
    }
