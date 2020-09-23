import React from 'react';
import './App.css';
import styles from "./App.css";
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Button from "@material-ui/core/Button";
// import Footer from "./Footer/Footer.js";
import Add_Product from "./AddProduct/Add_Product.js"
import Navbar from './Navbar/Navbar.js';
import Table_Products from "./Table_Products/Table_Products.jsx"
function App() {
  return (
    <Router>
         <div className={styles.App}>
         <Switch>
         <Route path = "/product" exact>
           <Add_Product/>
         </Route>
          <Route path = "/table" exact>
           <Table_Products/>
         </Route> 
         <Route path = "/">
           <Navbar/>
         </Route>
         </Switch>
         </div>
    </Router>
  );
}

export default App;
