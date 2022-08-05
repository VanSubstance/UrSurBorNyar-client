import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Footer } from "../commons/Footer";
import { Header } from "../commons/Header";
import Pages from "../pages";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Pages.Index />} />
          <Route path="maps">
            <Route path="kakao" element={<Pages.Maps.Kakao />} />
            <Route path="naver" element={<Pages.Maps.Naver />} />
          </Route>
          <Route path="*" element={<Pages.NotFound />} />
        </Routes>
        <Footer />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
