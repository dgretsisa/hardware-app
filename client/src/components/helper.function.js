import moment from 'moment';

const formatDate = (date) => {
    return moment(date).format("MMM. DD, YYYY");
}

const formatNumber = (number) => {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const debounce = (func, wait) => {
    let timeout;
    
    return function(...args) {
        const context = this;
        
        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}

const debounce2 = (func, wait, immediate) => {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;
            
        var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
        
        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
	
        if (callNow) func.apply(context, args);
    };
}

export {
    formatDate,
    formatNumber,
    debounce,
    debounce2
}