import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PencilIcon, XIcon } from '@heroicons/react/solid';
import * as helper from '../../helper.function';
import TableHeader from '../../common/table.header';
import Table from '../../common/table';
import PosSearch from './pos.search';
import PosAdd from './pos.add';
import PosUpdate from './pos.update';
import PosDelete from './pos.delete';

import { fetchPurchases, searchProducts, addPurchase, updatePurchase, deletePurchase } from '../../../redux/action/pos.action';
import { clearLogs, hideAlert } from '../../../redux/action/notification.action';

const PosIndex = () => {
    const dispatch = useDispatch();

    const { purchases, resultProducts } = useSelector(state => state.posReducer);

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
        title: 'Point of Sale',
        placeholder: 'Search Product',
        customButtonMethod: () => handleEntries(),
        handleSearch: (e) => debounceHandleSearch(e),
    }

    const columns = [
        { name: 'Product', render: (row) => tdTemplate(row.product.description) },
        { name: 'Price', render: (row) => tdTemplate(helper.formatNumber(row.price)) },
        { name: 'Quantity', render: (row) => tdTemplate(row.quantity) },
        { name: 'Unit', render: (row) => tdTemplate(row.unit) },
        { name: 'Discount', render: (row) => tdTemplate(helper.formatNumber((row.discount ? row.discount : 0))) },
        { name: 'Total', render: (row) => tdTemplate(helper.formatNumber(row.total)) },
        { name: '', render: (row) => tdActions(row) }
    ]

    const tdTemplate = (value) => {
        return (<div className="flex items-center">
            <div className="py-1.5 text-sm text-gray-900 whitespace-no-wrap">
                {value}
            </div>
        </div>)
    }

    const tdActions = (row) => {
        return (<div className="flex gap-3 divide-x">
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
        dispatch(fetchPurchases())
            .then(() => { }).catch(error => handleHideAlert());
    }, [dispatch])

    const handleSearch = (e) => {
        e.preventDefault();

        setToggleAddForm(false);
        setToggleUpdateForm(false);
        setToggleDelete(false);
        setToggleAddAllEntries(false);

        if (e.target.value === '') setIsSearching(false);
        else setIsSearching(true);

        dispatch(searchProducts({ currentPage: 1, pageLimit: 10, sortBy: 'description', orderBy: 1, searchKeyword: e.target.value }));
    }

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);

        setIsSearching(false);
        setToggleAddForm(true);
        setFormInputs({
            product: product,
            price: product.price,
            unit: product.unit,
            discount: 0
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (toggleAddForm) {
            dispatch(addPurchase(formInputs)).then(() => {
                setFormInputs({});
                setToggleAddForm(false);
            }).catch(() => { });
        }

        if (toggleUpdateForm) {
            dispatch(updatePurchase(selectedRow._id, formInputs)).then(() => {
                setFormInputs({});
                setToggleUpdateForm(false);
            }).catch(() => {});
        }

        if (toggleDelete) {
            dispatch(deletePurchase(selectedRow._id)).then(() => {
                setToggleDelete(false);
            }).catch(() => {});
        }

        /**if(toggleAddAllEntries) {
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
        } **/

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
            price: row.price,
            quantity: row.quantity,
            unit: row.unit,
            discount: row.discount ? row.discount: 0,
            total: row.total
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

        setFormInputs(formInputs => ({ ...formInputs, [e.target.name]: e.target.value }));

        if (e.target.name === 'quantity') setFormInputs(formInputs => ({ ...formInputs, total: ((parseFloat(formInputs.price) * parseFloat(e.target.value)) - parseFloat(formInputs.discount !== '' ? formInputs.discount : 0)) }))
        if (e.target.name === 'discount') setFormInputs(formInputs => ({ ...formInputs, total: ((parseFloat(formInputs.price) * parseFloat(formInputs.quantity)) - parseFloat(e.target.value !== '' ? e.target.value : 0)),
            discount: e.target.value !== '' ? e.target.value : 0
        }))
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
                hasButton={false}
                customButton={false}
            />

            {isSearching &&
                <PosSearch
                    resultProducts={resultProducts}
                    handleSelectProduct={handleSelectProduct}
                />
            }

            {toggleAddForm &&
                <PosAdd
                    selectedProduct={selectedProduct}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    handleInput={handleInput}
                    formInputs={formInputs}
                />
            }

            {toggleUpdateForm &&
                <PosUpdate
                    selectedRow={selectedRow}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    handleInput={handleInput}
                    formInputs={formInputs}
                />
            }

            {toggleDelete &&
                <PosDelete 
                    selectedRow={selectedRow}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }

            <Table
                columns={columns}
                rows={purchases}
            />
        </div>
    )
}

export default PosIndex
