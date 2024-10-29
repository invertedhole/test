async function sendMessage(event) {
    event.preventDefault();
    const messageInput = document.getElementById('message');
    const responseElement = document.getElementById('response');

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: messageInput.value })
        });

        const data = await response.json();
        responseElement.innerText = data.reply;
    } catch (error) {
        responseElement.innerText = "Произошла ошибка. Попробуйте еще раз.";
        console.error(error);
    }
}
