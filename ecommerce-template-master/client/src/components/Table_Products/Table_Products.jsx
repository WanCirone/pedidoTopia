import React, { useState, useEffect } from 'react'
import styles from './Publicar.module.css'
import { useHistory } from 'react-router-dom'
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
              <StyledTableCell align='right'>Precio</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell align='left'>
                    <Button href={`/answer/${product.id}`}>
                      <i>
                        <DeleteOutlineIcon />
                      </i>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <span>
                      <img
                        src={product.images.length > 0 && product.images[0]}
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
                    {!product.productId_Meli && !product.productId_Shopify ? (
                      'SIN PUBLICAR'
                    ) : !product.productId_Meli && product.productId_Shopify ? (
                      <img
                        src='https://seeklogo.com/images/S/shopify-logo-D197C4F3BC-seeklogo.com.png'
                        height='30px'
                        width='120px'
                        alt=''
                      />
                    ) : product.productId_Meli && !product.productId_Shopify ? (
                      <img
                        src='https://seeklogo.com/images/M/mercado-libre-logo-058319A524-seeklogo.com.png'
                        height='30px'
                        width='120px'
                        alt=''
                      />
                    ) : (
                      <div>
                        <img
                          src='https://seeklogo.com/images/S/shopify-logo-D197C4F3BC-seeklogo.com.png'
                          height='30px'
                          width='120px'
                          alt=''
                        />
                        <img
                          src='https://seeklogo.com/images/M/mercado-libre-logo-058319A524-seeklogo.com.png'
                          height='30px'
                          width='120px'
                          alt=''
                        />
                      </div>
                    )}
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
