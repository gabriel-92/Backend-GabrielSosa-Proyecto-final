function randomGenerator(qty) {
    let list = {}
    for (let num = 0; num <= qty; num++) {
        let num = parseInt(Math.random() * (1000 - 1) + 1)
        if (list.hasOwnProperty(num)) {
            list[num] += 1
        } else {
            list[num] = 1
        }
    }
    return JSON.stringify(list)
}

process.on('message', (msg => {
    const list = randomGenerator(parseInt(msg))
    process.send(list)
}))