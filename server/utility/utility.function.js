const capitalizeWord = (words) => {
    const splittedWords = words.toLowerCase().split(" ");

    for(let i = 0; i < splittedWords.length; i++) {
        splittedWords[i] = splittedWords[i][0].toUpperCase() +splittedWords[i].substr(1); 
    }

    return splittedWords.join(" ");
}

const broadcast = (req, eventName, eventData) => {
    const socket = req.app.get('socket');
    socket.emit(eventName, eventData);
}

const numberValidator = (value, fieldname) => {
    try {
        const quantity = eval(value);
        if(quantity <= 0) {
            return Promise.reject(`${fieldname} must be greater than 0!`)
        }

        return true;
    } catch (error) {
        return Promise.reject(`${fieldname} must be a number!`);
    }
}

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = {
    capitalizeWord,
    broadcast,
    numberValidator,
    escapeRegex
}