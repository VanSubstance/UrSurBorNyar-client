import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from '../commons/Footer';
import { Header } from '../commons/Header';
import Pages from "../pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={
          <Pages.Index />} />
        <Route path='maps'>
          <Route path='kakao' element={<Pages.Maps.Kakao />} />
        </Route>
        <Route path='*' element={<Pages.NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
