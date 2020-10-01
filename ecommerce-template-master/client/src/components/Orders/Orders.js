import React, { useState, useEffect } from 'react'
import styles from './Orders.module.css'
//Material-ui
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { getOrders } from '../../actions'
import RefreshIcon from '@material-ui/icons/Refresh'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 19,
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
    marginLeft: '20px',
    fontSize: '100px',
  },
}))

// function Filtrar(){
//   return(

//   <div>
//   <select
//      required
//      name="all"
//      id="all"
//      >
//      <option value="all">Todo</option>
//      <option value="out">Sin Publicar</option>
//      <option value="published">Publicado</option>
//      <option value="shopify">Shopify</option>
//      <option value="mercadolibre">Mercado Libre</option>
//      </select>
//   </div>
//   )
// }

function Orders({ orders, getOrders }) {
  useEffect(() => {
    getOrders()
  }, [])
  // const products = [
  //   {
  //     id: 1,
  //     image: {
  //       src:
  //         'https://www.venex.com.ar/products_images/1599498841_notebooklenovothinkpade14corei510210u8gbssd256gb14.jpg',
  //     },

  //     title: 'shopify',
  //     quantity: 20,
  //     state: "Proceso",
  //     sku: 2000,
  //      },

  //   {
  //     id: 2,
  //     image: {
  //       src:
  //         'https://d26lpennugtm8s.cloudfront.net/stores/911/585/products/jbl-flip-5-21-a3cd6bd39bb60bc05f15810292397285-640-0.jpg',
  //     },

  //     title: 'mercadolibre',
  //     quantity: 15,
  //     state: "Publicado",
  //     sku: 50000,

  //   },

  //   {
  //     id: 3,
  //     image: {
  //       src:
  //         'https://d26lpennugtm8s.cloudfront.net/stores/001/166/416/products/8245933-1-11-67cb081bd5fd9832d315886143864513-480-0.jpg',
  //     },

  //     title: '',
  //     quantity: 43,
  //     state: "Sin Publicar",
  //     price: 45000,

  //   },
  // ]
  const classes = useStyles()
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
        <TableHead>
          <Button onClick={() => getOrders()}>
            <RefreshIcon />
          </Button>
          <caption className={styles.caption}>Gestion de Ordenes</caption>
        </TableHead>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'> Filtrar&nbsp;</StyledTableCell>
              <StyledTableCell align='left'>
                <div className={styles.Orders}>
                  <select required name='all' id='all'>
                    <option value='all'>Todo</option>
                    <option value='out'>Mercado Libre</option>
                    <option value='published'>Shopify</option>
                  </select>
                </div>
              </StyledTableCell>
              <StyledTableCell align='center'>Proveedor&nbsp;</StyledTableCell>

              <StyledTableCell align='center'>Total</StyledTableCell>
              <StyledTableCell align='center'>Cantidad&nbsp;</StyledTableCell>

              <StyledTableCell align='center'>Estado</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                // console.log(product)&&
                <StyledTableRow key={order.id}>
                  <StyledTableCell align='rigth'></StyledTableCell>
                  <StyledTableCell align='left'>
                    {/* <Button 
                    variant = "outlined"
                    startIcon={<PermContactCalendarIcon />}
                    color = "primary"
                    size = "small"
                    >
                      Detalle
                    </Button> */}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {!order.meli_Id && !order.shopify_Id ? (
                      'SIN PUBLICAR'
                    ) : !order.meli_Id && order.shopify_Id ? (
                      <img
                        src='https://seeklogo.com/images/S/shopify-logo-1C711BCDE4-seeklogo.com.png'
                        height='30px'
                        width='120px'
                        alt=''
                      />
                    ) : order.meli_Id && !order.shopify_Id ? (
                      <img
                        src='https://seeklogo.com/images/M/mercado-livre-logo-D1DC52B13E-seeklogo.com.png'
                        height='30px'
                        width='120px'
                        alt=''
                      />
                    ) : (
                      <div>
                        <img
                          src='https://seeklogo.com/images/S/shopify-logo-1C711BCDE4-seeklogo.com.png'
                          height='30px'
                          width='120px'
                          alt=''
                        />
                        <img
                          src='https://seeklogo.com/images/M/mercado-livre-logo-D1DC52B13E-seeklogo.com.png'
                          height='30px'
                          width='120px'
                          alt=''
                        />
                      </div>
                    )}
                  </StyledTableCell>

                  <StyledTableCell align='center'>
                    {order.total}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {order.cantidad}
                  </StyledTableCell>

                  <StyledTableCell align='center'>
                    {order.status}
                  </StyledTableCell>
                  <StyledTableCell align='right'></StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <p>No hay datos para mostrar</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    orders: state.listOrders,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(getOrders()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
