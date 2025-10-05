import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '../pages/Home';
import AddItem from '../pages/AddItem';
import EditItem from '../pages/EditItem';
import Navbar from '../components/Navbar';

const AppRouter = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items/add" element={<AddItem />} />
      <Route path="/items/edit/:itemType/:id" element={<EditItem />} />
    </Routes>
  </Router>
);

export default AppRouter;
