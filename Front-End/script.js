// ── Configuration ──
const BACKEND_URL = "http://127.0.0.1:3000/chat";

// ── State ──
let isLoading = false;

// ── On Page Load ──
window.onload = function () {
  focusInput();
};

// ── Focus Input ──
function focusInput() {
  document.getElementById("userInput").focus();
}

// ── Handle Enter Key ──
function handleKey(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

// ── Auto Resize Textarea ──
function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
}

// ── Category Quick Button ──
function askCategory(question) {
  // Hide category buttons
  const categories = document.getElementById("categories");
  if (categories) categories.style.display = "none";

  // Set input and send
  document.getElementById("userInput").value = question;
  sendMessage();
}

// ── Send Message ──
async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text || isLoading) return;

  // Hide categories
  const categories = document.getElementById("categories");
  if (categories) categories.style.display = "none";

  // Clear input
  input.value = "";
  input.style.height = "auto";

  // Show user message
  addUserMessage(text);

  // Show typing indicator
  showTyping();

  // Disable send button
  isLoading = true;
  document.getElementById("sendBtn").disabled = true;

  try {
    // Call our backend
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();

    // Remove typing indicator
    removeTyping();

    if (data.reply) {
      addBotMessage(data.reply);
    } else {
      addBotMessage("⚠️ Kuch galat hua. Please dobara try karein.");
    }

  } catch (error) {
    removeTyping();
    addBotMessage("⚠️ Server se connect nahi ho pa raha. Kripya backend start karein.");
  }

  // Re-enable send button
  isLoading = false;
  document.getElementById("sendBtn").disabled = false;
  focusInput();
}

// ── Add User Message to Chat ──
function addUserMessage(text) {
  const chatArea = document.getElementById("chatArea");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "user-message");

  messageDiv.innerHTML = `
    <div class="user-bubble">${escapeHTML(text)}</div>
    <div class="user-avatar">👤</div>
  `;

  chatArea.appendChild(messageDiv);
  scrollToBottom();
}

// ── Add Bot Message to Chat ──
function addBotMessage(text) {
  const chatArea = document.getElementById("chatArea");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "bot-message");

  // Format the text (bold, line breaks)
  const formatted = formatText(text);

  messageDiv.innerHTML = `
    <div class="avatar">⚖️</div>
    <div class="bubble">${formatted}</div>
  `;

  chatArea.appendChild(messageDiv);
  scrollToBottom();
}

// ── Show Typing Indicator ──
function showTyping() {
  const chatArea = document.getElementById("chatArea");

  const typingDiv = document.createElement("div");
  typingDiv.classList.add("typing");
  typingDiv.id = "typingIndicator";

  typingDiv.innerHTML = `
    <div class="avatar">⚖️</div>
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  chatArea.appendChild(typingDiv);
  scrollToBottom();
}

// ── Remove Typing Indicator ──
function removeTyping() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

// ── Scroll Chat to Bottom ──
function scrollToBottom() {
  const chatArea = document.getElementById("chatArea");
  chatArea.scrollTop = chatArea.scrollHeight;
}

// ── Format Text (bold, line breaks) ──
function formatText(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

// ── Escape HTML (for user messages) ──
function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}