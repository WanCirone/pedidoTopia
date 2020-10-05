import React, { useEffect, useState } from 'react'
import styles from './Orders.module.css'
import styless from "./DetalleOrders.module.css"
import Slider from '../Slider/Slider.js'
//Material-ui

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { getOrders } from '../../actions'
import RefreshIcon from '@material-ui/icons/Refresh'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import TextField from "@material-ui/core/TextField";
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
const shortText = function (text) {
  var newText = text && text.substring(0, 50)
  newText = newText && newText.charAt(0).toUpperCase() + newText.slice(1)

  if ( text && text.length > 120) {
    return newText + '...'
  }
  return newText
}
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

function DetalleOrders(props, images) {
  return (
    <form className={styless.form}>
      <div className={styless.content}>
        <div className={styless.image}>
          {images && images.length > 0 && <Slider images={images} />}
          <img
            src={props.order.images}
            alt=''
            onChange={(e) => {
              props.uploadImg(e)
            }}
            accept='image/*'
            multiple
          />
        </div>
        <div className={styless.p}>
          <div className={styless.title}>
          <TextField
          id="outlined-read-only-input"
          label="Producto"
          defaultValue= {props.order.title}
          InputProps={{
            readOnly: true
          }}
          variant="outlined"
        />
          </div>
          <div className={styless.Stock}>
          <TextField
          id="outlined-read-only-input"
          label="Stock"
          defaultValue= {props.order.stock_inicial}
          InputProps={{
            readOnly: true
          }}
          variant="outlined"
        />
          </div>
          <div className={styless.sku}>
          <TextField
          id="outlined-read-only-input"
          label="Sku"
          defaultValue= {props.order.sku}
          InputProps={{
            readOnly: true
          }}
          variant="outlined"
        />
         </div>  
          <div className={styless.description}>
         <TextField
          id="outlined-read-only-input"
          label="Descripcion"
          defaultValue= {shortText(props.order.description)}
          InputProps={{
            readOnly: true
          }}
          variant="outlined"
        />
              {/* {shortText(props.product.description)} */}
              {/* <h3 className={styless.description}>{shortText(props.product.description)}</h3> */}
            </div>
          
          <div className={styless.precio}>
          <TextField
          id="outlined-read-only-input"
          label="Precio"
          defaultValue= {props.order.precio_inicial}
          InputProps={{
            readOnly: true
          }}
          variant="outlined"
        />
          </div>
        </div>
        <div className={styless.button}>
          <Button href='/orders' variant='outlined' color='secondary'>
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  )
}
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

function Orders({ orders, getOrders }) {
  useEffect(() => {
    getOrders()
  }, [])
  
  const [renderDetalle, setRenderDetalle] = useState(false)
    const [Detallepro, setDetallepro] = useState({})
  useEffect(() => {
    setListOrders(orders)
  }, [orders])
  const [listOrders, setListOrders] = useState([])
console.log(listOrders)
  const handleChange = (e) => {
    if (e.target.value === 'shopify') {
      const filter = orders.filter((ord) => {
        if (ord.shopify_Id) return ord
      })
      setListOrders(filter)
    } else if (e.target.value === 'mercadolibre') {
      const filter = orders.filter((ord) => {
        if (ord.meli_Id) return ord
      })
      setListOrders(filter)
    } else {
      setListOrders(orders)
    }
  }

  
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
                  <select required name='all' id='all' onChange={handleChange}>
                    <option value='todo'>Todo</option>
                    <option value='mercadolibre'>Mercado Libre</option>
                    <option value='shopify'>Shopify</option>
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
            {listOrders.length > 0 ? (
              listOrders.map((order) => (
                // console.log(product)&&
                <StyledTableRow key={order.id}>
                  <StyledTableCell align='rigth'></StyledTableCell>
                  <StyledTableCell align='left'>
                     <Button 
                    variant = "outlined"
                    startIcon={<PermContactCalendarIcon />}
                    color = "primary"
                    size = "small"
                    onClick = {() =>   {setRenderDetalle(true)
                      setDetallepro({
                        title: order.products[0] && order.products[0].title,
                        stock_inicial: order.products[0] && order.products[0].stock_inicial,
                        description: order.products[0] && order.products[0].description,
                        precio_inicial: order.products[0] && order.products[0].precio_inicial,
                        sku: order.products[0] && order.products[0].sku,
                        images: order.products[0] && order.products[0].images[0]
                      })
                    }}
                    >
                      Detalle
                    </Button> 
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {!order.meli_Id && !order.shopify_Id ? (
                      'SIN PUBLICAR'
                    ) : !order.meli_Id && order.shopify_Id ? (
                      <img
                        src='https://seeklogo.com/images/S/shopify-logo-D197C4F3BC-seeklogo.com.png'
                        height='30px'
                        width='120px'
                        alt=''
                      />
                    ) : order.meli_Id && !order.shopify_Id ? (
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
              <p>No hay ordenes para mostrar</p>
            )}
          </TableBody>
        </Table>
      {renderDetalle && <DetalleOrders order={Detallepro} />}
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
