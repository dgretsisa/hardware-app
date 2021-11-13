import moment from 'moment';

const search = (data, fieldName, searchText) => {
    const result = data.filter(item => (item[fieldName].toString()).toLowerCase().includes(searchText.toLowerCase()))
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
    return [...data].sort((a,b) => a[fieldName].toString().localeCompare(b[fieldName].toString(), 'en', {numeric: true}));
}

const sortByDescending = (data, fieldName) => {
    return [...data].sort((a,b) => b[fieldName].toString().localeCompare(a[fieldName].toString(), 'en', {numeric: true}));
}

const formatDate = (date) => {
    return moment(date).format("MMM. DD, YYYY");
}

const paginate = (array, currentPage, pageLimit) => {
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