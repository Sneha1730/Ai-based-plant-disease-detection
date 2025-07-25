document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
});

function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const message = input.value.trim();

    if (message === "") return;

    chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

    fetch("/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        const botReply = `<div><strong>Bot:</strong> ${data.response}</div>`;
        chatBox.innerHTML += botReply;
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    input.value = "";
}
