import React, { useState, useEffect } from 'react'
import styles from './Publicar.module.css'
import { useHistory } from 'react-router-dom'
import s from "./Borrar.module.css"
//Material-ui
import {
  withStyles,
  makeStyles,
  StylesProvider,
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';

import Alert from '@material-ui/lab/Alert';
//import { Box } from "@material-ui/core";
import { connect } from 'react-redux'
import { getProducts } from '../../actions'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 17,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
})
const useStyless = makeStyles((theme) => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(8),
    marginLeft: "20px",
    fontSize: "100px"
  },
}));
function Borrar (){
  const classes = useStyless();
  return (
    <form className = {s.formulario}>
       <div className = {s.contenedor}>
    
      <div className={classes.root}>
      <Alert variant="outlined" severity="error" marginTop = "100px" height = "100px" marginLeft = "50px">
        ¿Seguro que deseas Borrar?      
      </Alert>
      </div>
        <div className = {s.buttons}>
         <Button
         variant = "contained"
         color = "primary"
         
         >
          Borrar
         </Button>
         <Button
         variant = "contained"
         color = "secondary"
         href = "/"
         
         >
          Cancelar
         </Button>
         </div>
     </div>
    </form>
  );
}
function Publicar(){
  return(
  <form className = {styles.form}>
      <div className={styles.content}>
        <i className = {styles.icon}><AttachMoneyRoundedIcon/> </i>
        <div className={styles.inputcontenedor}>
        <input
        type = "number"
        placeholder = "Price"
        />
        </div>
        <i className = {styles.icon}><AccountBalanceRoundedIcon/> </i>
        <div className={styles.inputcontenedor}>
        <input
        type = "number"
        placeholder = "Stock"
        />
        </div>
        {/* <FormGroup aria-label="position" row marginTop = "20px"> */}
        <div className = {styles.Checkbox}>
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Mercado Libre"
          labelPlacement="end"
        />
           <FormControlLabel
          value="end"
          control={<Checkbox color="secondary" />}
          label="Shopify"
          labelPlacement="end"
          fontFamily = 'Raleway'
        />
        </div>
        {/* </FormGroup> */}
        <div className = {styles.button}>
        <Button 
        variant='contained' 
        color='primary'
        > 
        Publicar 
        </Button>
        <Button 
        variant='contained' 
        color='secondary' 
        href='/'
        > Cancelar 
        </Button>
        </div>
      </div>
  </form>
  )
};
function Table_Products({ products, getListProducts }) {
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    getListProducts()
  }, [])

  return (
    <div
      style={{
        width: '1150px',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '80px',
      }}
    >
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>&nbsp;</StyledTableCell>
              <StyledTableCell align='center'>Imagen&nbsp;</StyledTableCell>
              <StyledTableCell align='left'>Producto&nbsp;</StyledTableCell>
              <StyledTableCell align='center'>Proveedor&nbsp;</StyledTableCell>
              <StyledTableCell align='right'>Stock</StyledTableCell>
              <StyledTableCell align='center'>Sku&nbsp;</StyledTableCell>
              <StyledTableCell align='right'>Descripcion&nbsp;</StyledTableCell>
              <StyledTableCell align='right'>
                Precio
                <div>

                </div>
                </StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell align='left'>
                    <Button onClick = { () => setRenderBorrar(true)} >
                      <i>
                        <DeleteOutlineIcon />
                      </i>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <span>
                      <img
                        src={product.image && product.image.src}
                        height='100px'
                        width='100px'
                        alt=''
                        />
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {product.title}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <span className={styles.span}>
                      {product.providers.length === 0 ? (
                        'SIN PUBLICAR'
                      ) : (
                        <img
                          src={product.proveedor && product.proveedor.src}
                          height='30px'
                          width='120px'
                          alt=''
                        />
                      )}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.stock_inicial}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{product.sku}</StyledTableCell>
                  <StyledTableCell align='right' width={1 / 4}>
                    {product.description.slice(0, 40)}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.precio_inicial}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button
                      color='primary'
                      onClick={() => history.push(`/post/${product.id}`)}
                    >
                      Publicar
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <p>No hay datos para mostrar</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {renderBorrar && <Borrar />}
      {renderPublicar && <Publicar />}
      <div style={{ paddingLeft: 'auto' }}>
        <tr>
          <td>
            <Button variant='contained' color='primary' href='/product'>
              Crear Producto
            </Button>
          </td>
          <td>
            <div>
              <Button variant='contained' color='secondary' href='/'>
                Cancelar
              </Button>
            </div>
          </td>
        </tr>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.listProducts,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getListProducts: () => dispatch(getProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table_Products)
