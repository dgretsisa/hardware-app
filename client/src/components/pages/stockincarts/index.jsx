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
import StockincartEntries from './stockincart.entries';
import StockincartNote from './stockincart.note';

import { fetchStockincarts, searchProducts, addStockincart, updateStockincart, deleteStockincart } from '../../../redux/action/stockincart.action';
import { addStockin } from '../../../redux/action/stockin.action';
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
    const [toggleAddAllEntries, setToggleAddAllEntries] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedRow, setSelectedRow] = useState({});
    const [isSearching, setIsSearching] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    
    const tableheader = {
        title: 'Stock Entry',
        button: 'Transfer Stocks to Inventory',
        placeholder: 'Search Product',
        customButtonMethod: () => handleEntries(),
        handleSearch: (e) => debounceHandleSearch(e),
    }

    const columns = [
        { name: 'Stock #', render: (row) => tdTemplate(row.stockinNumber)},
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
        .then(total => setTotalRecords(total)).catch(error => handleHideAlert());
    }, [dispatch])

    const handleSearch = (e) => {
        e.preventDefault();

        setToggleAddForm(false);
        setToggleUpdateForm(false);
        setToggleDelete(false);
        setToggleAddAllEntries(false);
        
        if(e.target.value === '') setIsSearching(false);
        else setIsSearching(true);

        dispatch(searchProducts({ currentPage: 1, pageLimit: 10, sortBy: 'description', orderBy: 1, searchKeyword: e.target.value }));
    }

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);

        setIsSearching(false);
        setToggleAddForm(true);
        setFormInputs({
            product: product,
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

        if(toggleAddAllEntries) {
            const stocks = stockincarts.map(stock => {
                return {
                    stockinNumber: stock.stockinNumber,
                    product: stock.product,
                    quantity: stock.quantity,
                    unit: stock.unit,
                    unitCost: stock.unitCost,
                    totalCost: stock.totalCost,
                }
            })

            dispatch(addStockin(stocks)).then(() => {
                setToggleAddAllEntries(false);
            }).catch(() => {});
        }

        handleHideAlert();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setToggleAddForm(false);
        setToggleUpdateForm(false);
        setToggleDelete(false);
        setToggleAddAllEntries(false);
        setSelectedRow({});

        dispatch(clearLogs());
    }

    const handleUpdateRow = (row) => {
        setToggleUpdateForm(true);
        setToggleAddForm(false);
        setToggleDelete(false);
        setToggleAddAllEntries(false);
        setIsSearching(false);

        setSelectedRow(row);
        setFormInputs({
            product: row.product,
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
        setToggleAddAllEntries(false);
        setIsSearching(false);

        setSelectedRow(row);
    }

    const handleEntries = () => {
        setToggleAddAllEntries(true);
        setToggleUpdateForm(false);
        setToggleAddForm(false);
        setToggleDelete(false);
        setIsSearching(false);
    }

    const handleHideAlert = () => {
        /** This close the alert after 5 seconds */
        setTimeout(() => {
            dispatch(hideAlert())
        }, 5000)
    }

    /** Handle Inputs Select */
    const handleInput = (e) => {
        e.preventDefault();

        setFormInputs(formInputs => ({...formInputs, [e.target.name]: e.target.value}));

        if(e.target.name === 'quantity') setFormInputs(formInputs => ({...formInputs, totalCost: (parseFloat(formInputs.unitCost) * parseFloat(e.target.value)) }))
        if(e.target.name === 'unitCost') setFormInputs(formInputs => ({...formInputs, totalCost: (parseFloat(formInputs.quantity) * parseFloat(e.target.value)) }))
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
                customButton={true}
            />
            <StockincartNote />
            {toggleAddForm && 
                <StockincartAdd 
                    selectedProduct={selectedProduct}
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    formInputs={formInputs}
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
            {toggleAddAllEntries &&
                <StockincartEntries
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
            {!isSearching &&
                <Table 
                    columns={columns}
                    rows={stockincarts}
                />
            }
            {stockincarts.length > 0 &&
                <Pagination 
                    currentPage={currentPage}
                    pageLimit={pageLimit}
                    totalRecords={totalRecords}
                />
            }
        </div>
    )
}

export default StockincartIndex
