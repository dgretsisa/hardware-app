import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PencilIcon, XIcon } from '@heroicons/react/solid';
import * as helper from '../../helper.function';
import TableHeader from '../../common/table.header';
import Table from '../../common/table';
import Pagination from '../../common/pagination';
import StockincartAdd from './stockincart.add';
import StockincartSearch from './stockincart.search';
import StockincartUpdate from './stockincart.update';
import StockincartDelete from './stockincart.delete';

import { fetchStockincarts, searchProducts, addStockincart, updateStockincart, deleteStockincart } from '../../../redux/action/stockincart.action';
import { clearLogs, hideAlert } from '../../../redux/action/notification.action';

const StockincartIndex = () => {
    const dispatch = useDispatch();

    const { stockincarts, resultProducts } = useSelector(state => state.stockincartReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(1000000);
    const [formInputs, setFormInputs] = useState({});
    const [toggleAddForm, setToggleAddForm] = useState(false);
    const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedRow, setSelectedRow] = useState({});
    const [isSearching, setIsSearching] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    
    const tableheader = {
        title: 'Stockin Entry',
        button: '+ Add All to Stocks',
        placeholder: 'Search Product',
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
        { name: '', render: (row) => tdActions(row)}
    ]

    const tdTemplate = (value) => {
        return (<div className="flex items-center">
           <div className="py-1.5 text-sm text-gray-900 whitespace-no-wrap">
                { value }
            </div>
        </div>)
    }

    const tdActions = (row) => {
        return ( <div className="flex gap-3 divide-x">
            <div className="pl-3">
                <PencilIcon onClick={() => (!toggleUpdateForm && !toggleDelete) && handleUpdateRow(row)} className="w-5 h-5 text-gray-600 cursor-pointer" />
            </div>
            <div className="pl-3">
                <XIcon onClick={() => (!toggleDelete && !toggleUpdateForm) && handleDeleteRow(row)} className="w-5 h-5 text-red-400 cursor-pointer" />
            </div>
        </div>);
    }

    /** Initialize Product */
    useEffect(() => {
        dispatch(fetchStockincarts())
        .then(total => setTotalRecords(total)).catch(error => {});
    }, [dispatch])

    const handleSearch = (e) => {
        e.preventDefault();

        if(e.target.value === '') setIsSearching(false);
        else setIsSearching(true);

        dispatch(searchProducts({ currentPage: 1, pageLimit: 10, sortBy: 'description', orderBy: 1, searchKeyword: e.target.value }));
    }

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);

        setIsSearching(false);
        setToggleAddForm(true);
        setFormInputs({
            product: product._id,
            unit: product.unit
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(toggleAddForm) {
            dispatch(addStockincart(formInputs)).then(() => {
                setFormInputs({});
                setToggleAddForm(false);
            }).catch(() => {});
        }

        if(toggleUpdateForm) {
            dispatch(updateStockincart(selectedRow._id, formInputs)).then(() => {
                setFormInputs({});
                setToggleUpdateForm(false);
            }).catch(() => {});
        }

        if(toggleDelete) {
            dispatch(deleteStockincart(selectedRow._id)).then(() => {
                setToggleDelete(false);
            }).catch(() => {});
        }

        handleHideAlert();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setToggleAddForm(false);
        setToggleUpdateForm(false);
        setToggleDelete(false);
        setSelectedRow({});

        dispatch(clearLogs());
    }

    const handleUpdateRow = (row) => {
        setToggleUpdateForm(true);
        setToggleAddForm(false);

        setSelectedRow(row);
        setFormInputs({
            product: row.product._id,
            stockinNumber: row.stockinNumber,
            quantity: row.quantity,
            unit: row.unit,
            unitCost: row.unitCost,
            totalCost: row.totalCost
        });
    }

    const handleDeleteRow = (row) => {
        setToggleDelete(true);
        setToggleUpdateForm(false);
        setToggleAddForm(false);

        setSelectedRow(row);
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

    /** Handle Inputs Select */
    const handleInput = (e) => {
        e.preventDefault();

        setFormInputs(formInputs => ({...formInputs, [e.target.name]: e.target.value}));
    }

    /** Debounce */
    const debounceHandleSearch = helper.debounce(handleSearch, 800);

    return ( 
        <div className="w-full px-10">
            <TableHeader 
                tableheader={tableheader}
                hasShow={false}
                hasSort={false}
                hasSearch={true}
                hasButton={stockincarts.length > 0 ? true : false}
            />
            {toggleAddForm && 
                <StockincartAdd 
                    selectedProduct={selectedProduct}
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }
            {toggleUpdateForm && 
                <StockincartUpdate 
                    selectedRow={selectedRow}
                    formInputs={formInputs}
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }
            {toggleDelete && 
                <StockincartDelete 
                    selectedRow={selectedRow}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }
            {isSearching && 
                <StockincartSearch 
                    resultProducts={resultProducts}
                    handleSelectProduct={handleSelectProduct}
                />
            }
            <Table 
                columns={columns}
                rows={stockincarts}
            />
            {stockincarts.length > 0 &&
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

export default StockincartIndex
