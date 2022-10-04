const socket = io.connect();



const render = (normalizedData) => {
    console.log(normalizedData.entities.messages);
    const messages = normalizedData.entities.messages;
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    Object.keys(messages).forEach((message) => {
        //acceder a los mensajes y al objeto author de cada mensaje
        const { author, text, timestamp } = messages[message];
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${author.name} ${author.surname}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${author.alias}</h6>
                <img src="${author.avatar}" alt="avatar de ${author.name} ${author.surname}" class="avatar card-img-top rounded-circle" style="width: 100px;" >
                <strong>${author.name}</strong> dice:
                <p>${text}</p>
                <p>${timestamp}</p>
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
    console.log(mensaje);
    socket.emit('new-message', mensaje);
    limpiarInput();
    return false;
}
const limpiarInput = () => {
    document.getElementById("texto").value = ' ';
}



socket.on('messages', (data) => { render(data) })