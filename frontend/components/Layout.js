import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

function Layout({ children }) {
    return (
        <div className="min-w-full min-h-screen overflow-hidden bg-blue-100">
            <TopBar />
            <SideBar />
            <main className="flex-1 flex overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

export default Layout;
