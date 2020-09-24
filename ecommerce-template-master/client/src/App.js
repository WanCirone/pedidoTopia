import React from 'react'
import './App.css'
import styles from './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from "./Footer/Footer.js"
import Add_Product from './AddProduct/Add_Product.js'
import Navbar from './Navbar/Navbar.js'
import Table_Products from './Table_Products/Table_Products.jsx'
import Checkout from "./Checkout/Checkout.jsx"
function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Route path='/'>
          <Navbar />
        </Route>
        <Switch>
        <Route path='/' exact>
            <Footer />
          </Route>
          <Route path='/table' exact>
            <Table_Products />
          </Route>
          <Route path='/product' exact>
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
