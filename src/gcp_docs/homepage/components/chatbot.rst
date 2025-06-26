.. raw:: html

   <!-- Chatbot Widget -->
   <div id="chatbot-widget" class="fixed bottom-6 right-6 z-50">
     <div id="chatbot-trigger" class="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300" onclick="toggleChatbot()">
       <span class="text-white text-xl">🤖</span>
     </div>
     
     <div id="chatbot-panel" class="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 hidden">
       <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
         <div class="flex items-center space-x-3">
           <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
             <span class="text-white text-sm">🤖</span>
           </div>
           <div>
             <h3 class="text-white font-semibold">GRA Assistant</h3>
             <p class="text-white/80 text-xs">Online</p>
           </div>
         </div>
         <button onclick="toggleChatbot()" class="text-white hover:text-white/80 transition-colors">
           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
             <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
           </svg>
         </button>
       </div>
       
       <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto h-64">
         <div class="flex items-start space-x-3 mb-4">
           <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
             <span class="text-blue-600 text-sm">🤖</span>
           </div>
           <div class="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
             <p class="text-sm text-gray-800">Hello! I'm the GRA Assistant. How can I help you with the documentation today?</p>
           </div>
         </div>
       </div>
       
       <div class="p-4 border-t border-gray-200">
         <div class="flex space-x-2">
           <input type="text" id="chatbot-input" placeholder="Ask me anything..." class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
           <button onclick="sendMessage()" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
             <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
               <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
             </svg>
           </button>
         </div>
       </div>
     </div>
   </div>

   <script src="../themes/js/chatbot.js"></script>
