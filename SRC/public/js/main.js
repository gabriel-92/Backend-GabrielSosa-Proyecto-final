const socket = io.connect();


const render = (normalizedData) => {
    const messages = normalizedData.entities.messages;
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    Object.keys(messages).forEach((message) => {
        const { author, text, timestamp } = messages[message];
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `
                <div >
                    <div class="d-flex justify-content-between">
                            <p class="small mb-1">${author.name} ${author.surname}</p>
                            <p class="small mb-1 text-muted">${timestamp}</p>
                        </div>
                        <div class="d-flex flex-row justify-content-start">
                            <img src="${author.avatar}"
                                alt="avatar de ${author.name} ${author.surname}" style="width: 45px; height: 100%;">
                            <div>
                                <p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;">${text}</p>
                            </div>
                        </div>
                </div>
        `;
        messagesContainer.appendChild(messageElement);
    });
}

const addMessage = (e) => {
    let fecha = new Date().toLocaleDateString();
    const mensaje = {
        email: document.getElementById('email').value,
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        age: document.getElementById('age').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
        text: document.getElementById('text').value,
        date: fecha,
    };
    socket.emit('new-message', mensaje);
    limpiarInput();
    return false;
}
const limpiarInput = () => {
    document.getElementById("text").value = ' ';
}

socket.on('messages', (data) => { render(data) })