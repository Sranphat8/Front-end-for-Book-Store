import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import Navbar from './components/Navbar'; 
import './index.css'; 

// Component สำหรับ Loading (เรียกใช้เมื่อจำเป็น)
export const Loading = ({ text = "Loading..." }) => (
    <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-2">{text}</p>
    </div>
);

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-base-300">
                
                <Navbar />

                <main className="py-8 container mx-auto px-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add" element={<AddItem />} />
                        <Route path="/edit/:itemType/:id" element={<EditItem />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
