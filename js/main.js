
const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const addCartButtons = document.querySelectorAll(".add-cart");
const cartCount = document.getElementById("cart-count");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

let cartItems = 0;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const matches = selected === "todos" || card.dataset.category === selected;
      card.style.display = matches ? "flex" : "none";
    });
  });
});

addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = `${cartItems} ${cartItems === 1 ? "item" : "itens"}`;
    appendMessage("bot", `Perfeito! ${button.dataset.product} foi adicionado a sua sacola.`);
  });
});

chatbotToggle.addEventListener("click", () => {
  const isHidden = chatbotWindow.classList.toggle("hidden");
  chatbotToggle.setAttribute("aria-expanded", String(!isHidden));
});

chatbotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userText = chatbotInput.value.trim();

  if (!userText) {
    return;
  }

  appendMessage("user", userText);
  chatbotInput.value = "";

  window.setTimeout(() => {
    const response = getBotResponse(userText);
    appendMessage("bot", response);
  }, 500);
});

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(text) {
  const normalized = text.toLowerCase();

  if (normalized.includes("promoc") || normalized.includes("desconto")) {
    return "Hoje temos 15% off em skincare acima de R$ 150,00 e frete gratis em pedidos selecionados.";
  }

  if (normalized.includes("entrega") || normalized.includes("prazo")) {
    return "O prazo medio de entrega e de 3 a 7 dias uteis, variando conforme sua regiao.";
  }

  if (normalized.includes("pagamento") || normalized.includes("cartao") || normalized.includes("pix")) {
    return "Aceitamos cartao, PIX e boleto. No cartao, alguns itens podem ser parcelados sem juros.";
  }

  if (normalized.includes("produto") || normalized.includes("recomend")) {
    return "Se voce busca algo para rotina de cuidados, recomendo o Kit Rosa Ritual ou o Serum Lumina.";
  }

  if (normalized.includes("oi") || normalized.includes("ola") || normalized.includes("olá")) {
    return "Oi! Me conte o que voce procura e eu tento indicar o melhor produto para voce.";
  }

  return "Posso ajudar com promocoes, entrega, pagamento e sugestoes de produtos. Tente uma dessas opcoes.";
}