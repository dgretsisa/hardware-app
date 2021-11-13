import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PencilIcon, XIcon } from '@heroicons/react/solid';
import * as utility from '../../functions/utility.function';
import Table from '../../common/table';
import ProductAdd from './product.add';
import ProductUpdate from './product.update';
import Pagination from '../../common/pagination';

import { addProduct, updateProduct } from '../../../redux/action/product.action';
import { clearLogs, hideAlert } from '../../../redux/action/notification.action';

const ProductIndex = () => {
    const dispatch = useDispatch();
    
    const { products } = useSelector(state => state.productReducer);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortFieldname, setSortFieldname] = useState('description');
    const [sortOrder, setSortOrder] = useState('ascending');
    const [searchBy, setSearchBy] = useState('description');
    const [toggleAddForm, setToggleAddForm] = useState(false);
    const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
    const [formInputs, setFormInputs] = useState({});
    const [selectedUpdateRowId, setSelectedUpdateRowId] = useState(null);

    const table = {
        title: 'Products',
        createButtonLabel: '+ Create Product',
        searchPlaceholder: 'Search product',
        columns: [
            { name: 'Description', render: (row) => tdTemplate(row.description)},
            { name: 'Code #', render: (row) => tdTemplate(row.productCode)},
            { name: 'Category', render: (row) => tdTemplate(row.category)},
            { name: 'Quantity', render: (row) => tdTemplate(`${row.quantity}  ${row.unit}`)},
            { name: 'Price', render: (row) => tdTemplate(row.price)},
            { name: 'Created', render: (row) => tdTemplate(utility.formatDate(row.createdAt))},
            { name: '', render: (row) => tdActions(row)}
        ],
        sortFields: [
            { name: 'Description', field: 'description'},
            { name: 'Code #', field: 'productCode'},
            { name: 'Category', field: 'category'},
            { name: 'Quantity', field: 'quantity'},
            { name: 'Price', field: 'price'},
            { name: 'Created', field: 'createdAt'},
        ],
        sortOrders: [
            { name: 'Ascending', order: 'ascending'},
            { name: 'Descending', order: 'descending'}
        ],
        searchOptions: [
            { name: 'Description', field: 'description'},
            { name: 'Code #', field: 'productCode'},
            { name: 'Category', field: 'category'}
        ],
        addForm: () => (<ProductAdd 
            handleSubmit={handleSubmit} 
            handleCancel={handleCancel} 
            setToggleAddForm={setToggleAddForm}
            setToggleUpdateForm={setToggleUpdateForm}
            handleInput={handleInput}
        />),
        updateForm: () => (<ProductUpdate
            handleSubmit={handleSubmit} 
            handleCancel={handleCancel} 
            setToggleUpdateForm={setToggleUpdateForm}
            handleInput={handleInput}
            formInputs={formInputs}
        />)
    }
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
                <PencilIcon onClick={() => !toggleUpdateForm ? handleRowUpdate(row): {}} className="w-5 h-5 text-gray-600 cursor-pointer" />
            </div>
            <div className="pl-3">
                <XIcon onClick={() => {}} className="w-5 h-5 text-red-400 cursor-pointer" />
            </div>
        </div>);
    }

    useEffect(() => {
        if(isSorted) {
            setFilteredProducts(utility.paginate(sortedProducts, currentPage, pageLimit));
            setTotalRecords(sortedProducts.length)
        }
        else {
            setFilteredProducts(utility.paginate(products, currentPage, pageLimit));
            setTotalRecords(products.length)
        }
    }, [products, currentPage, pageLimit, isSorted, sortedProducts])

    const handleSelectPage = (page) => {
        setCurrentPage(page);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleSort = () => {
        setIsSorted(true);
        if(sortOrder === 'ascending') setSortedProducts(utility.sortByAscending(products, sortFieldname))
        if(sortOrder === 'descending') setSortedProducts(utility.sortByDescending(products, sortFieldname))
    }

    const handleShow = (e) => {
        setCurrentPage(1);

        if(e.target.value === "-1") setPageLimit(totalRecords);
        else setPageLimit(e.target.value);
    }

    const handleSearch = (e) => {
        
        if(isSorted) {
            const result = utility.search(sortedProducts, searchBy, e.target.value);
            setFilteredProducts(utility.paginate(result, currentPage, pageLimit));
            setTotalRecords(result.length)
        }
        else {
            const result = utility.search(products, searchBy, e.target.value);
            setFilteredProducts(utility.paginate(result, currentPage, pageLimit));
            setTotalRecords(result.length)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSorted(false);

        
        if(toggleAddForm) {
            dispatch(addProduct(formInputs)).then(() => {
                setToggleAddForm(false);
                setFormInputs({});
            }).catch(error => {})
        }

        if(toggleUpdateForm) {
            dispatch(updateProduct(selectedUpdateRowId, formInputs)).then(() => {
                setToggleUpdateForm(false);
                setSelectedUpdateRowId(null);
                setFormInputs({});
            }).catch(error => {})
        }

        handleHideAlert();
    }

    const handleCancel = (e) => {
       e.preventDefault();
        setToggleAddForm(false);
        setToggleUpdateForm(false);
        setSelectedUpdateRowId(null);
        setFormInputs({});
        dispatch(clearLogs());
    }

    const handleRowUpdate = (row) => {
        setToggleAddForm(false);
        setToggleUpdateForm(true);
        setSelectedUpdateRowId(row._id);
        setFormInputs({
            description: row.description,
            productCode: row.productCode,
            category: row.category,
            quantity: row.quantity,
            unit: row.unit,
            price: row.price
        });
    }

    const handleHideAlert = () => {
        /** This close the alert after 5 seconds */
        setTimeout(() => {
            dispatch(hideAlert())
        }, 5000)
    }

    /** Input, Select */
    const handleSelect = (e) => {
        e.preventDefault();

        if(e.target.name === 'sortFieldname') setSortFieldname(e.target.value)
        if(e.target.name === 'sortOrder') setSortOrder(e.target.value)
        if(e.target.name === 'searchBy') setSearchBy(e.target.value)
    }

    const handleInput = (e) => {
        e.preventDefault();
        
        setFormInputs(formInputs => ({...formInputs, [e.target.name]: e.target.value}))
    }

    return ( 
        <div className="w-full px-10">
            <Table 
                table={table} 
                rows={filteredProducts}
                pageLimit={pageLimit}
                sortFieldname={sortFieldname}
                sortOrder={sortOrder}
                searchBy={searchBy}
                handleSelect={handleSelect}
                handleSort={handleSort}
                handleSearch={handleSearch}
                handleShow={handleShow}
                setToggleAddForm={setToggleAddForm}
                toggleAddForm={toggleAddForm}
                setToggleUpdateForm={setToggleUpdateForm}
                toggleUpdateForm={toggleUpdateForm}
            />
            <Pagination 
                currentPage={currentPage}
                pageLimit={pageLimit} 
                totalRecords={totalRecords}
                handleSelectPage={handleSelectPage}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        </div>
    )
}

export default ProductIndex
