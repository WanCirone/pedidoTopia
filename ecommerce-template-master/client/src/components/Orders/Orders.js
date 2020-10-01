import React, {useState} from "react";
import styles from "./Orders.module.css"
//Material-ui
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles} from '@material-ui/core/styles'





import Button from '@material-ui/core/Button'
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
    marginLeft: "20px",
    fontSize: "100px"
  },
}));


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

function createData(provider,price, quantity, state, date) {
  return { provider, price, quantity, state, date };
}




export default function Orders(){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const products = [
    {
      id: 1,
      image: {
        src:
          'https://www.venex.com.ar/products_images/1599498841_notebooklenovothinkpade14corei510210u8gbssd256gb14.jpg',
      },
      proveedor: {
        src: 
        "https://seeklogo.com/images/M/mercado-libre-logo-058319A524-seeklogo.com.png",
       },
      title: '1',
      quantity: 20,
      state: "Proceso",
      sku: 2000,
      date:
      "15/1/20"    },

    {
      id: 2,
      image: {
        src:
          'https://d26lpennugtm8s.cloudfront.net/stores/911/585/products/jbl-flip-5-21-a3cd6bd39bb60bc05f15810292397285-640-0.jpg',
      },
      proveedor: {
        src: 
        "https://seeklogo.com/images/S/shopify-logo-D197C4F3BC-seeklogo.com.png",
       },
      title: '2',
      quantity: 15,
      state: "Publicado",
      sku: 50000,
      date:
      "01/5/20",
    },

    {
      id: 3,
      image: {
        src:
          'https://d26lpennugtm8s.cloudfront.net/stores/001/166/416/products/8245933-1-11-67cb081bd5fd9832d315886143864513-480-0.jpg',
      },
      proveedor: {
       src: 
       "https://seeklogo.com/images/M/mercado-libre-logo-058319A524-seeklogo.com.png",
      },
      title: '3',
      quantity: 43,
      state: "Sin Publicar",
      price: 45000,
      date:
        "20/2/20"
        
    },
  ]
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
        <caption className = {styles.caption}>Gestion de Ordenes</caption> 
          </TableHead>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'> Filtrar&nbsp;</StyledTableCell>
              <StyledTableCell align='center'>
              <div className = {styles.Orders}>
              <select
              required
              name="all"
              id="all"
              >
              <option value="all">Todo</option>
              <option value="out">Sin Publicar</option>
              <option value="published">Proceso</option>
              <option value="shopify">Publicado</option>
              <option value="mercadolibre"></option>
              </select>
              </div>
              </StyledTableCell>
              <StyledTableCell align='left'>Usuario&nbsp;</StyledTableCell>
              <StyledTableCell align='center'>Proveedor&nbsp;</StyledTableCell>
              <StyledTableCell align='center'>Precio</StyledTableCell>
              <StyledTableCell align='right'>Cantidad&nbsp;</StyledTableCell>
              <StyledTableCell align='center'>Fecha&nbsp;</StyledTableCell>
              <StyledTableCell align='center'>
               Estado
              </StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products ? (
              products.map((product) => (
                // console.log(product)&&
                <StyledTableRow key={product.id}>
                  <StyledTableCell align='rigth'>
                  
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <Button 
                    variant = "outlined"
                    startIcon={<PermContactCalendarIcon />}
                    color = "primary"
                    size = "small"
                    >
                      Detalle
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {product.title}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                  <span className = {styles.span}>
                      <img
                        src={product.proveedor && product.proveedor.src}
                        height='30px'
                        width='120px'
                        alt=''
                        />
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{product.quantity}</StyledTableCell>
                  <StyledTableCell align='right' width={1/4}>
                    {product.date.slice(0, 40)}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {product.state}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                 
                  </StyledTableCell>
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