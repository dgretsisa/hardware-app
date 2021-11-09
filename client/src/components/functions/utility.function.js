import moment from 'moment';

const search = (data, fieldName, searchText) => {
    const result = data.filter(item => item[fieldName].toLowerCase().includes(searchText.toLowerCase()))
    return result;
}

/** moment(createdAt).isBetWeen(startDate, endDate, 'days', '[]')  
 *  Third parameter - optional values : null, 'minutes', 'hours', 'days', 'months', 'years'
 *  Fourth parameter - optional values: (), (], [), []
*/

const sortByDateRange = (data, fieldName, startDate, endDate) => {
    const start = moment(startDate, 'YYYY-MM-DD');
    const end = moment(endDate, 'YYYY-MM-DD');

    const result = data.filter(item => moment(item[fieldName]).isBetween(start, end, 'days', '[]'));
    return result;
}

const sortByAscending = (data, fieldName) => {
    return [...data].sort((a,b) => a[fieldName].localeCompare(b[fieldName]));
}

const sortByDescending = (data, fieldName) => {
    return [...data].sort((a,b) => b[fieldName].localeCompare(a[fieldName]));
}

const formatDate = (date) => {
    return moment(date).format("MMM. DD, YYYY");
}

const paginate = (array, pageLimit, currentPage) => {
    return array.slice((currentPage - 1) * pageLimit, currentPage * pageLimit);
}

export {
    search,
    sortByDateRange,
    sortByAscending,
    sortByDescending,
    formatDate,
    paginate
}