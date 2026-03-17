// ============================================
// WhisperMark Customer Help Chatbot
// A self-contained chatbot widget.
// Just add <script src="chatbot.js"></script>
// to any HTML page to activate it.
// ============================================

(function () {
  // -------------------------------------------
  // 1. KNOWLEDGE BASE (Questions & Answers)
  // -------------------------------------------
  const qaDatabase = [
    {
      keywords: ["hello", "hi", "hey", "hii", "helo"],
      answer: "Hey there! 👋 Welcome to WhisperMark. How can I help you today?"
    },
    {
      keywords: ["bookmark", "bookmarks", "what do you sell", "products", "what is whispermark"],
      answer: "WhisperMark sells beautiful, handcrafted premium bookmarks! 📚 You can browse our collection on the <a href='index.html'>Shop page</a>."
    },
    {
      keywords: ["price", "cost", "how much", "expensive", "cheap", "rate", "kitna", "kya price", "charges", "pricing"],
      answer: "Our bookmarks range from ₹49 to ₹299 depending on the design. Check the <a href='index.html'>Shop page</a> for current prices!"
    },
    {
      keywords: ["shipping", "delivery", "deliver", "ship", "courier"],
      answer: "We deliver across India! 🚚 Standard delivery takes 5-7 business days. Free shipping on orders above ₹499."
    },
    {
      keywords: ["return", "refund", "exchange", "replace", "damaged"],
      answer: "We accept returns within 7 days of delivery if the product is unused. For damaged items, please contact us with a photo and we'll send a replacement right away! 📩"
    },
    {
      keywords: ["payment", "pay", "upi", "card", "cod", "cash on delivery"],
      answer: "We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD). 💳"
    },
    {
      keywords: ["order", "track", "tracking", "status", "where is my order"],
      answer: "You can track your order using the tracking link sent to your email after shipping. If you haven't received it, please <a href='contact.html'>contact us</a>."
    },
    {
      keywords: ["contact", "email", "phone", "reach", "support", "help"],
      answer: "You can reach us through our <a href='contact.html'>Contact page</a> or email us at <b>support@whispermark.com</b>. We usually reply within 24 hours! 📧"
    },
    {
      keywords: ["cart", "add to cart", "how to buy", "buy", "purchase"],
      answer: "Simply click 'Add to Cart' on any bookmark you like, then go to your <a href='cart.html'>Cart</a> to proceed to checkout! 🛒"
    },
    {
      keywords: ["custom", "customize", "personalise", "personalize", "custom bookmark"],
      answer: "Yes! We offer custom bookmarks with your name or a quote printed on them. Please <a href='contact.html'>contact us</a> with your design idea and we'll get back to you. ✨"
    },
    {
      keywords: ["discount", "coupon", "offer", "sale", "deal"],
      answer: "We run seasonal sales and special offers! Follow us on Instagram @whispermark to stay updated on the latest deals. 🎉"
    },
    {
      keywords: ["material", "quality", "made of", "paper", "metal", "wood"],
      answer: "Our bookmarks are crafted from premium materials including thick card stock, wood, and metal finishes. Each one is designed to last! 🪵"
    },
    {
      keywords: ["gift", "gifting", "birthday", "present"],
      answer: "Bookmarks make the perfect gift for book lovers! 🎁 We offer gift wrapping on request. Just mention it in the order notes."
    },
    {
      keywords: ["bulk", "wholesale", "corporate", "large order"],
      answer: "We offer bulk/corporate orders at special rates! Please <a href='contact.html'>contact us</a> with your requirements and we'll share a custom quote. 🏢"
    },
    {
      keywords: ["thank", "thanks", "thankyou", "thank you", "thx"],
      answer: "You're welcome! 😊 Happy to help. Is there anything else you'd like to know?"
    },
    {
      keywords: ["bye", "goodbye", "see you", "close"],
      answer: "Goodbye! 👋 Thanks for visiting WhisperMark. Have a great day!"
    }
  ];

  // Quick-reply suggestion buttons shown at start
  const quickReplies = [
    "What do you sell?",
    "Shipping info",
    "How to buy?",
    "Return policy",
    "Contact support"
  ];

  // -------------------------------------------
  // 2. INJECT CSS STYLES
  // -------------------------------------------
  const style = document.createElement("style");
  style.textContent = `
    /* ---- Chat Toggle Button ---- */
    #wm-chat-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF5A1F, #FF8C42);
      border: none;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(255, 90, 31, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
      padding: 0;
    }
    #wm-chat-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 25px rgba(255, 90, 31, 0.55);
    }
    #wm-chat-toggle img {
      width: 54px;
      height: 54px;
      object-fit: cover;
      border-radius: 50%;
      transition: transform 0.3s ease;
    }
    #wm-chat-toggle.open img {
      transform: scale(1.1);
    }

    /* ---- Chat Window ---- */
    #wm-chatbox {
      position: fixed;
      bottom: 100px;
      right: 25px;
      width: 370px;
      max-height: 520px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      z-index: 10000;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
      font-family: 'Poppins', sans-serif;
    }
    #wm-chatbox.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* ---- Chat Header ---- */
    #wm-chat-header {
      background: linear-gradient(135deg, #111, #222);
      color: #fff;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    #wm-chat-header .avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
      padding: 2px;
    }
    #wm-chat-header .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    #wm-chat-header .info h4 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }
    #wm-chat-header .info span {
      font-size: 11px;
      color: #8f8;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    #wm-chat-header .info span::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #8f8;
      border-radius: 50%;
      display: inline-block;
    }

    /* ---- Chat Messages Area ---- */
    #wm-chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: #f9f9f9;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    #wm-chat-messages::-webkit-scrollbar {
      width: 5px;
    }
    #wm-chat-messages::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 10px;
    }

    /* ---- Message Bubbles ---- */
    .wm-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.5;
      animation: wmFadeIn 0.3s ease;
    }
    .wm-msg a {
      color: #FF5A1F;
      font-weight: 600;
      text-decoration: underline;
    }
    .wm-msg.bot {
      background: #fff;
      align-self: flex-start;
      border: 1px solid #eee;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .wm-msg.user {
      background: linear-gradient(135deg, #FF5A1F, #FF8C42);
      color: #fff;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }

    /* ---- Typing Indicator ---- */
    .wm-typing {
      display: flex;
      gap: 4px;
      padding: 10px 16px;
      align-self: flex-start;
    }
    .wm-typing span {
      width: 8px;
      height: 8px;
      background: #ccc;
      border-radius: 50%;
      animation: wmBounce 1.2s infinite;
    }
    .wm-typing span:nth-child(2) { animation-delay: 0.2s; }
    .wm-typing span:nth-child(3) { animation-delay: 0.4s; }

    /* ---- Quick Reply Buttons ---- */
    .wm-quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0;
      animation: wmFadeIn 0.3s ease;
    }
    .wm-quick-btn {
      background: #fff;
      border: 1.5px solid #FF5A1F;
      color: #FF5A1F;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      transition: all 0.2s ease;
    }
    .wm-quick-btn:hover {
      background: #FF5A1F;
      color: #fff;
    }

    /* ---- Chat Input Area ---- */
    #wm-chat-input-area {
      display: flex;
      border-top: 1px solid #eee;
      background: #fff;
    }
    #wm-chat-input {
      flex: 1;
      border: none;
      padding: 14px 16px;
      font-size: 14px;
      font-family: 'Poppins', sans-serif;
      outline: none;
    }
    #wm-chat-input::placeholder {
      color: #aaa;
    }
    #wm-chat-send {
      background: none;
      border: none;
      padding: 0 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    #wm-chat-send svg {
      width: 22px;
      height: 22px;
      fill: #FF5A1F;
      transition: transform 0.2s ease;
    }
    #wm-chat-send:hover svg {
      transform: scale(1.15);
    }

    /* ---- Animations ---- */
    @keyframes wmFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes wmBounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }

    /* ---- Mobile Responsive ---- */
    @media (max-width: 500px) {
      #wm-chatbox {
        width: calc(100vw - 20px);
        right: 10px;
        bottom: 90px;
        max-height: 70vh;
      }
      #wm-chat-toggle {
        bottom: 18px;
        right: 18px;
        width: 54px;
        height: 54px;
      }
    }
  `;
  document.head.appendChild(style);

  // -------------------------------------------
  // 3. INJECT HTML
  // -------------------------------------------
  const chatHTML = `
    <!-- Floating Toggle Button -->
    <button id="wm-chat-toggle" aria-label="Open chat">
      <img src="images/chatbot-mascot.png" alt="WhisperMark Assistant">
    </button>

    <!-- Chat Window -->
    <div id="wm-chatbox">
      <div id="wm-chat-header">
        <div class="avatar"><img src="images/chatbot-mascot.png" alt="Mascot"></div>
        <div class="info">
          <h4>WhisperMark Help</h4>
          <span>Online now</span>
        </div>
      </div>
      <div id="wm-chat-messages"></div>
      <div id="wm-chat-input-area">
        <input id="wm-chat-input" type="text" placeholder="Type your question..." autocomplete="off">
        <button id="wm-chat-send" aria-label="Send message">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = chatHTML;
  document.body.appendChild(wrapper);

  // -------------------------------------------
  // 4. CHATBOT LOGIC
  // -------------------------------------------
  const toggleBtn = document.getElementById("wm-chat-toggle");
  const chatbox = document.getElementById("wm-chatbox");
  const messagesDiv = document.getElementById("wm-chat-messages");
  const inputField = document.getElementById("wm-chat-input");
  const sendBtn = document.getElementById("wm-chat-send");

  let isOpen = false;
  let hasGreeted = false;

  // Toggle open/close
  toggleBtn.addEventListener("click", function () {
    isOpen = !isOpen;
    chatbox.classList.toggle("visible", isOpen);
    toggleBtn.classList.toggle("open", isOpen);

    if (isOpen && !hasGreeted) {
      hasGreeted = true;
      addBotMessage("Hi! 👋 I'm the WhisperMark assistant. Ask me anything about our bookmarks, orders, shipping, and more!");
      showQuickReplies();
    }

    if (isOpen) {
      setTimeout(() => inputField.focus(), 300);
    }
  });

  // Send on button click
  sendBtn.addEventListener("click", handleSend);

  // Send on Enter key
  inputField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") handleSend();
  });

  function handleSend() {
    const text = inputField.value.trim();
    if (!text) return;

    addUserMessage(text);
    inputField.value = "";

    // Show typing indicator, then respond
    showTyping();
    setTimeout(() => {
      removeTyping();
      const reply = getAnswer(text);
      addBotMessage(reply);
    }, 800 + Math.random() * 400); // Random delay for realism
  }

  // -------------------------------------------
  // 5. MESSAGE RENDERING
  // -------------------------------------------
  function addBotMessage(html) {
    const div = document.createElement("div");
    div.className = "wm-msg bot";
    div.innerHTML = html;
    messagesDiv.appendChild(div);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "wm-msg user";
    div.textContent = text;
    messagesDiv.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "wm-typing";
    div.id = "wm-typing-indicator";
    div.innerHTML = "<span></span><span></span><span></span>";
    messagesDiv.appendChild(div);
    scrollToBottom();
  }

  function removeTyping() {
    const el = document.getElementById("wm-typing-indicator");
    if (el) el.remove();
  }

  function showQuickReplies() {
    const container = document.createElement("div");
    container.className = "wm-quick-replies";

    quickReplies.forEach(text => {
      const btn = document.createElement("button");
      btn.className = "wm-quick-btn";
      btn.textContent = text;
      btn.addEventListener("click", function () {
        // Remove the quick-reply buttons after clicking one
        container.remove();
        addUserMessage(text);
        showTyping();
        setTimeout(() => {
          removeTyping();
          addBotMessage(getAnswer(text));
        }, 800);
      });
      container.appendChild(btn);
    });

    messagesDiv.appendChild(container);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // -------------------------------------------
  // 6. KEYWORD MATCHING ENGINE
  // -------------------------------------------
  function getAnswer(userInput) {
    const input = userInput.toLowerCase();

    let bestMatch = null;
    let bestScore = 0;

    for (const qa of qaDatabase) {
      let score = 0;
      for (const keyword of qa.keywords) {
        if (input.includes(keyword)) {
          // Give more weight to longer (more specific) keyword matches
          score += keyword.length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = qa;
      }
    }

    if (bestMatch) {
      return bestMatch.answer;
    }

    // Default fallback
    return "I'm not sure about that one. 🤔 You can try asking about <b>shipping</b>, <b>returns</b>, <b>prices</b>, or <b>payments</b>. Or reach us directly on our <a href='contact.html'>Contact page</a>!";
  }
})();
