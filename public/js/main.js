const socket = io.connect();



const render = (data) => {
    const messages = document.getElementById('messages');
    if (messages) {
        messages.innerHTML = '';
    }
    const html = data.messages.map((elem) => {
        return (
            `<div>
            <strong class="text-primary">${elem.author}</strong>:
            <span class="text-danger">[${elem.date}]<span>
            <em class="text-success">${elem.text}</em>
            </div>`)
    }).join('');
    document.getElementById("messages").innerHTML = html;

}



const addMessage = (e) => {
    let fecha = new Date().toLocaleDateString();
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        date: fecha,
    };
    socket.emit('new-message', mensaje);
    limpiarInput();
    return false;
}
const limpiarInput = () => {
    document.getElementById("texto").value = ' ';
}



socket.on('messages', (data) => { render(data) })