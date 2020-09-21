import React from 'react';
import './App.css';
import styles from "./App.css";
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import Footer from "./Footer/Footer.js";
import Add_Product from "./AddProduct/Add_Product.js"
function App() {
  return (
    <Router>
         <div className={styles.App}>
           <h1>
             PedidoTopia
           </h1>
           <div style={{ marginLeft: "978px" }}>
           <Button>
             Listado de Productos
           </Button>
         </div>
         <hr />
         <Switch>
         <Route path = "/product" exact>
           <Add_Product/>
         </Route>
         {/* <Route path = "/table" exact>
           <TableProduct/>
         </Route> */}
         <Route path = "/" exact>
           <Footer/>
         </Route>
         </Switch>
         </div>
    </Router>
  );
}

export default App;
