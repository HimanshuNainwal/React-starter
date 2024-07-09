// import React, { useState } from "react";

// import { Routes, Route } from "react-router-dom";
// import Hompage from "./Pages/Hompage";
// import CategoryPage from "./Pages/CategoryPage";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Product from "./Pages/Product";

// function App() {

//   return (
//     <>
//       {/* <Header /> */}

//       <div className="min-h-screen mt-6">

//       <Routes>
//         <Route path="/" element={<Hompage />} />
//         {/* <Route path="/category/new-arrivals.html" element={<CategoryPage />} /> */}
//         <Route path="/category/:category" element={<CategoryPage />} />

//         <Route path="/product" element={<Product/>} />

//         {/* all */}
//         <Route path="*" element={<p>Page Not Found</p>}  />
//       </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;

import { useReducer, useState } from "react";

const initialState = {
  name: "",
  age: "3",
  number: "",
};

// function reducer(state, action) {

// if (action.type === 'age') {
//   return {
//     ...state,
//     age: action.payload
//   };
// }
// else if(action.type == 'name'){
//   return {
//     ...state,
//     name: action.payload
//   };
// }
// else if(action.type == 'number'){
//   return {
//     ...state,
//     number: action.payload
//   };
// }
// throw Error('Unknown action.');
// }

import Counter from "./components/Counter";
export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);

  // const [info,setInfo] = useState(initialState)
  // setInfo(state=> {
  // state})

  return (
    <>
      <Counter />
      {/* <button className='bg-black text-white' onClick={() => {
        dispatch({ type: 'age',payload:22 })
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
      <button className='bg-black text-white' onClick={() => {
        dispatch({ type: 'name',payload:"Himanshu" })
      }}>
        Name change
      </button>
      <p>Hello! You are {state.name}.</p> */}
    </>
  );
}
