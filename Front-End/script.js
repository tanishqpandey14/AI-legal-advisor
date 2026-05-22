// ── Configuration ──
const BACKEND_URL = "http://127.0.0.1:3000/chat";
const RESET_URL = "http://127.0.0.1:3000/reset";

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
  textarea.style.height = Math.min(textarea.scrollHeight, 130) + "px";
}

// ── Category Quick Button ──
function askCategory(question) {
  hideWelcome();
  document.getElementById("userInput").value = question;
  sendMessage();
}

// ── Hide Welcome & Categories ──
function hideWelcome() {
  const welcome = document.querySelector(".welcome-card");
  const label = document.querySelector(".section-label");
  const categories = document.getElementById("categories");
  if (welcome) welcome.style.display = "none";
  if (label) label.style.display = "none";
  if (categories) categories.style.display = "none";
}

// ── Send Message ──
async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text || isLoading) return;

  hideWelcome();

  input.value = "";
  input.style.height = "auto";

  addUserMessage(text);
  showTyping();

  isLoading = true;
  document.getElementById("sendBtn").disabled = true;

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    removeTyping();

    if (data.reply) {
      addBotMessage(data.reply);
    } else {
      addBotMessage("⚠️ Kuch galat hua. Please dobara try karein.");
    }
  } catch (error) {
    removeTyping();
    addBotMessage("Backend not Started");
  }

  isLoading = false;
  document.getElementById("sendBtn").disabled = false;
  focusInput();
}

// ── Reset Chat ──
async function resetChat() {
  try {
    await fetch(RESET_URL, { method: "POST" });
  } catch (e) {}

  const chatArea = document.getElementById("chatArea");
  chatArea.innerHTML = `
    <div class="welcome-card" id="welcomeCard">
      <div class="welcome-icon">⚖️</div>
      <h2 class="welcome-title">Your Personal Legal Advisor</h2>
      <p class="welcome-text">
        Get instant guidance on Indian laws, your legal rights, and the exact steps to take — completely free.
      </p>
      <p class="welcome-subtext">
        Describe your legal problem in English or Hindi. I will handle the rest.
      </p>
      <div class="welcome-tags">
        <span class="tag">IPC / BNS</span>
        <span class="tag">Consumer Rights</span>
        <span class="tag">RTI</span>
        <span class="tag">Labour Law</span>
        <span class="tag">Cyber Crime</span>
        <span class="tag">Family Law</span>
      </div>
    </div>
    <div class="section-label" id="sectionLabel">Select a topic or type your problem below</div>
    <div class="categories" id="categories">
      <div class="category-card" onclick="askCategory('My landlord is not returning my security deposit after I vacated the house. What are my legal options?')">
        <span class="cat-icon">🏠</span><span class="cat-label">Property Dispute</span>
      </div>
      <div class="category-card" onclick="askCategory('Police is refusing to register my FIR. What should I do legally?')">
        <span class="cat-icon">👮</span><span class="cat-label">Police / FIR</span>
      </div>
      <div class="category-card" onclick="askCategory('My employer has not paid my salary for 3 months and is threatening to fire me.')">
        <span class="cat-icon">💼</span><span class="cat-label">Job / Labour</span>
      </div>
      <div class="category-card" onclick="askCategory('I bought a defective product online and the company is refusing to give a refund.')">
        <span class="cat-icon">🛒</span><span class="cat-label">Consumer Rights</span>
      </div>
      <div class="category-card" onclick="askCategory('I am facing domestic violence at home. What are my legal rights and options?')">
        <span class="cat-icon">🏛️</span><span class="cat-label">Domestic Violence</span>
      </div>
      <div class="category-card" onclick="askCategory('Someone is blackmailing me using my private photos on WhatsApp. What legal action can I take?')">
        <span class="cat-icon">💻</span><span class="cat-label">Cyber Crime</span>
      </div>
      <div class="category-card" onclick="askCategory('How do I file an RTI to get information from a government office?')">
        <span class="cat-icon">📄</span><span class="cat-label">RTI / Govt</span>
      </div>
      <div class="category-card" onclick="focusInput()">
        <span class="cat-icon">⚖️</span><span class="cat-label">Other Issue</span>
      </div>
    </div>
  `;
  focusInput();
}

// ── Add User Message ──
function addUserMessage(text) {
  const chatArea = document.getElementById("chatArea");
  const div = document.createElement("div");
  div.classList.add("message", "user-message");
  div.innerHTML = `
    <div class="user-bubble">${escapeHTML(text)}</div>
    <div class="user-avatar">👤</div>
  `;
  chatArea.appendChild(div);
  scrollToBottom();
}

// ── Add Bot Message ──
function addBotMessage(text) {
  const chatArea = document.getElementById("chatArea");
  const div = document.createElement("div");
  div.classList.add("message", "bot-message");
  div.innerHTML = `
    <div class="avatar">⚖️</div>
    <div class="bubble">${formatText(text)}</div>
  `;
  chatArea.appendChild(div);
  scrollToBottom();
}

// ── Show Typing ──
function showTyping() {
  const chatArea = document.getElementById("chatArea");
  const div = document.createElement("div");
  div.classList.add("typing");
  div.id = "typingIndicator";
  div.innerHTML = `
    <div class="avatar">⚖️</div>
    <div class="typing-bubble">
      <span></span><span></span><span></span>
    </div>
  `;
  chatArea.appendChild(div);
  scrollToBottom();
}

// ── Remove Typing ──
function removeTyping() {
  const el = document.getElementById("typingIndicator");
  if (el) el.remove();
}

// ── Scroll to Bottom ──
function scrollToBottom() {
  const chatArea = document.getElementById("chatArea");
  chatArea.scrollTop = chatArea.scrollHeight;
}

// ── Format Text ──
function formatText(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

// ── Escape HTML ──
function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Theme Toggle ──
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("themeBtn");

  if (body.classList.contains("light")) {
    body.classList.remove("light");
    btn.textContent = "🌙 Dark";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light");
    btn.textContent = "☀️ Light";
    localStorage.setItem("theme", "light");
  }
}

// ── Load Saved Theme on Start ──
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
    document.getElementById("themeBtn").textContent = "☀️ Light";
  }
});
