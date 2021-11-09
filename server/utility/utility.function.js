const capitalizeWord = (words) => {
    const splittedWords = words.toLowerCase().split(" ");

    for(let i = 0; i < splittedWords.length; i++) {
        splittedWords[i] = splittedWords[i][0].toUpperCase() +splittedWords[i].substr(1); 
    }

    return splittedWords.join(" ");
}

module.exports = {
    capitalizeWord
}