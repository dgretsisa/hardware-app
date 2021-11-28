import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PencilIcon, XIcon } from '@heroicons/react/solid';
import * as helper from '../../helper.function';
import TableHeader from '../../common/table.header';
import Table from '../../common/table';
import Pagination from '../../common/pagination';
import ProductAdd from './product.add';
import ProductUpdate from './product.update';
import ProductDelete from './product.delete';

import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../../redux/action/product.action';
import { clearLogs, hideAlert } from '../../../redux/action/notification.action';

const ProductIndex = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(state => state.productReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [sortBy, setSortBy] = useState('createdAt');
    const [orderBy, setOrderBy] = useState('-1');
    const [formInputs, setFormInputs] = useState({});
    const [toggleAddForm, setToggleAddForm] = useState(false);
    const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedRow, setSelectedRow] = useState({});
    
    const tableheader = {
        title: 'Products',
        button: '+ Add New Product',
        placeholder: 'Search Product',
        pageLimit: pageLimit,
        sortBy: sortBy,
        orderBy: orderBy,
        sortByOptions: [
            { label: 'Date', field: 'createdAt' },
            { label: 'Description', field: 'description' },
            { label: 'Code #', field: 'productCode' },
            { label: 'Category', field: 'category' }
        ],
        setPageLimit: (e) => setPageLimit(e.target.value),
        setSortBy: (e) => setSortBy(e.target.value),
        setOrderBy: (e) => setOrderBy(e.target.value),
        setToggleAddForm: () => { 
            setToggleAddForm(true); 
            setToggleUpdateForm(false);
        },
        handleSearch: (e) => debounceHandleSearch(e),
    }

    const columns = [
        { name: 'Code #', render: (row) => tdTemplate(row.productCode)},
        { name: 'Description', render: (row) => tdTemplate(row.description)},
        { name: 'Category', render: (row) => tdTemplate(row.category)},
        { name: 'Quantity', render: (row) => tdTemplate(row.quantity)},
        { name: 'Unit', render: (row) => tdTemplate(row.unit)},
        { name: 'Price', render: (row) => tdTemplate(helper.formatNumber(row.price))},
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
        dispatch(fetchProducts({ currentPage, pageLimit, sortBy, orderBy }))
        .then(total => setTotalRecords(total)).catch(error => handleHideAlert());
    }, [currentPage, pageLimit, sortBy, orderBy, dispatch])

    const handleSearch = (e) => {
        e.preventDefault();

        dispatch(fetchProducts({ currentPage, pageLimit, sortBy, orderBy, searchKeyword: e.target.value }))
        .then(total => setTotalRecords(total)).catch(error => handleHideAlert());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(toggleAddForm) {
            dispatch(addProduct(formInputs)).then(() => {
                setFormInputs({});
                setToggleAddForm(false);
            }).catch(() => {});
        }

        if(toggleUpdateForm) {
            dispatch(updateProduct(selectedRow._id,formInputs)).then(() => {
                setFormInputs({});
                setToggleUpdateForm(false);
                setSelectedRow({});
            }).catch(() => {});
        }

        if(toggleDelete) {
            dispatch(deleteProduct(selectedRow._id)).then(() => {
                setToggleDelete(false);
                setSelectedRow({});
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
            description: row.description,
            productCode: row.productCode,
            category: row.category,
            unit: row.unit,
            price: row.price,
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
                hasShow={true}
                hasSort={true}
                hasSearch={true}
                hasButton={true}
            />
            {toggleAddForm && 
                <ProductAdd 
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }
            {toggleUpdateForm && 
                <ProductUpdate 
                    formInputs={formInputs}
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }
            {toggleDelete && 
                <ProductDelete 
                    selectedRow={selectedRow}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }
            <Table 
                columns={columns}
                rows={products}
            />
            {products.length > 0 &&
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

export default ProductIndex
