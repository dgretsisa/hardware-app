import { Types } from "../types/pagination.types";

const initializePagination = (currentPage, pageLimit, totalRecords) => {
    return {
        type: Types.INITIALIZE_PAGINATION,
        payload: { currentPage, pageLimit, totalRecords }
    }
}

export {
    initializePagination
}