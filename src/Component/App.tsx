import "./App.css";
import MainPage from "./MainPage";
import Sidbar from "./Sidbar";
import logoDynamic from "../assest/image/logo.jpeg";
import Categories from "../data/categories";
import React, { useState } from "react";
function App() {
  const [activeCategoryId, setCategoryId] = useState<number>(0);
  return (
    <div className="App ">
      <div className="container">
        <Sidbar
          appTitle="Ati To Do  List"
          logo={logoDynamic}
          categories={Categories}
          activeCategoryId={activeCategoryId}
          setCategoryId={setCategoryId}
        />

        <MainPage activeCategoryId={activeCategoryId} />
      </div>
    </div>
  );
}
export default App;
