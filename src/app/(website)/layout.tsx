import React from 'react';
import LandingPageNavbar from './_components/navbar';

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    return (
        <div className='flex flex-col py-10 xl:px-10'>
            <LandingPageNavbar/>
            {children}
        </div>
    )
}

export default Layout;