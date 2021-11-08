import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { HomeIcon } from '@heroicons/react/solid';

const LayoutBreadcrumbs = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const pathnames = pathname.split('/').filter(x => x);
    
    return (
        <div className="w-full px-10 py-7">
            <ul className="flex divide-x gap-3 text-gray-500 uppercase text-xs">
                {(pathnames.length === 1) && (pathnames[0] === 'dashboard')  ? null:
                    <li key="a" className="flex items-center gap-1">
                        <HomeIcon className="w-5 h-4"/>
                        <span onClick={() => navigate('dashboard')} className="cursor-pointer hover:text-yellow-600">Dashboard</span>
                    </li>
                }
                {pathnames.map((pathname, index) => {
                    if(pathname !== 'dashboard') {
                        if(index !== pathnames.length-1) {
                            return <li onClick={() => navigate(`${pathname}`)} key={index} className="pl-3 cursor-pointer hover:text-yellow-600">{pathname}</li>
                        }
                        else {
                            return <li key={index} className="pl-3">{pathname}</li>
                        }
                    }
                })}
            </ul>
        </div>
    )
}

export default LayoutBreadcrumbs
