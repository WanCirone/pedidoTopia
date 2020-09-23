import React from 'react'
import './App.css'
import styles from './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Add_Product from './AddProduct/Add_Product.js'
import Navbar from './Navbar/Navbar.js'
import Table_Products from './Table_Products/Table_Products.jsx'
import FormProduct from './components/FormProduct/FormProduct'
function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Route path='/'>
          <Navbar />
        </Route>
        <Switch>
          <Route path='/product' exact>
            <Add_Product />
          </Route>
          <Route path='/table' exact>
            <Table_Products />
          </Route>
          <Route path='/francoder' exact>
            <FormProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
