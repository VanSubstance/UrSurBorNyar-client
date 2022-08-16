import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Footer } from "../commons/Footer";
import { Header } from "../commons/Header";
import ModalContent from "../components/ModalContent";
import Pages from "../pages";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        {/* <Header /> */}
        <ModalContent />
        <Routes>
          <Route path='/' element={
            <Pages.Index />} />
          <Route path='*' element={<Pages.NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
