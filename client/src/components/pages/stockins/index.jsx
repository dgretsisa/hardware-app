import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { PencilIcon, XIcon } from '@heroicons/react/solid';
import * as helper from '../../helper.function';
import TableHeader from '../../common/table.header';
import Table from '../../common/table';
import Pagination from '../../common/pagination';

import { fetchStockin } from '../../../redux/action/stockin.action';
import { clearLogs, hideAlert } from '../../../redux/action/notification.action';

const StockinIndex = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { stockins } = useSelector(state => state.stockinReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [sortBy, setSortBy] = useState('createdAt');
    const [orderBy, setOrderBy] = useState('-1');
    const [totalRecords, setTotalRecords] = useState(0);
    
    const tableheader = {
        title: 'Stockin',
        button: '+ Entry New Stock',
        placeholder: 'Search Stock',
        pageLimit: pageLimit,
        sortBy: sortBy,
        orderBy: orderBy,
        sortByOptions: [
            { label: 'Date', field: 'createdAt' },
            { label: 'Product', field: 'product.description' },
            { label: 'Stockin #', field: 'stockinNumber' }
        ],
        customButtonMethod: () => navigate('/stockin/entry'),
        setPageLimit: (e) => setPageLimit(e.target.value),
        setSortBy: (e) => setSortBy(e.target.value),
        setOrderBy: (e) => setOrderBy(e.target.value),
        handleSearch: (e) => debounceHandleSearch(e),
    }

    const columns = [
       { name: 'Stockin #', render: (row) => tdTemplate(row.stockinNumber)},
       { name: 'Product', render: (row) => tdTemplate(row.product.description)},
       { name: 'Quantity', render: (row) => tdTemplate(row.quantity)},
       { name: 'Unit', render: (row) => tdTemplate(row.unit)},
       { name: 'Unit Cost', render: (row) => tdTemplate(helper.formatNumber(row.unitCost))},
       { name: 'Total Cost', render: (row) => tdTemplate(helper.formatNumber(row.totalCost))},
       { name: 'Date Added', render: (row) => tdTemplate(helper.formatDate(row.createdAt))},
    ]

    const tdTemplate = (value) => {
        return (<div className="flex items-center">
           <div className="py-1.5 text-sm text-gray-900 whitespace-no-wrap">
                { value }
            </div>
        </div>)
    }

    /** Initialize Product */
    useEffect(() => {
        dispatch(fetchStockin({ currentPage, pageLimit, sortBy, orderBy }))
        .then(total => setTotalRecords(total)).catch(error => handleHideAlert());
    }, [currentPage, pageLimit, sortBy, orderBy, dispatch])

    const handleSearch = (e) => {
        e.preventDefault();

        dispatch(fetchStockin({ currentPage, pageLimit, sortBy, orderBy, searchKeyword: e.target.value }))
        .then(total => setTotalRecords(total)).catch(error => handleHideAlert());
    }

    const handleHideAlert = () => {
        /** This close the alert after 5 seconds */
        setTimeout(() => {
            dispatch(hideAlert())
        }, 5000)
    }

    const handleSelectPage = (page) => {
        setCurrentPage(page);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    /** Debounce */
    const debounceHandleSearch = helper.debounce(handleSearch, 800);

    return ( 
        <div className="w-full px-10">
            <TableHeader 
                tableheader={tableheader}
                hasShow={true}
                hasSort={true}
                hasSearch={true}
                hasButton={true}
                customButton={true}
            />
            <Table 
                columns={columns}
                rows={stockins}
            />
            {stockins.length > 0 &&
                <Pagination 
                    currentPage={currentPage}
                    pageLimit={pageLimit}
                    totalRecords={totalRecords}
                    handleSelectPage={handleSelectPage}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            }
        </div>
    )
}

export default StockinIndex
