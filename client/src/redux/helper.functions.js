const fetchParams = (resource) => {
    const params = {};
    const { currentPage, pageLimit, sortBy, orderBy, searchKeyword } = resource;

    const limit = pageLimit;
    const skip = Math.ceil((currentPage - 1) * pageLimit);

    params.limit = limit;
    params.skip = skip;

    if(sortBy && orderBy) {
        params.sortBy = sortBy;
        params.orderBy = orderBy;
    }
    
    if(searchKeyword) {
        params.searchKeyword = searchKeyword;
    }
    
    return params;
}

export {
    fetchParams
}