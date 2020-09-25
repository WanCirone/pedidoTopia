import React , {useState}from 'react'
import styles from "./Publicar.module.css"
import { useHistory } from 'react-router-dom'
//Material-ui
import { withStyles, makeStyles, StylesProvider } from '@material-ui/core/styles'
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
//import { Box } from "@material-ui/core";

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
        href='/table'
        > Cancelar 
        </Button>
        </div>
      </div>
  </form>
  )
};

export default function Table_Products() {
  const [renderPublicar, setRenderPublicar] = useState(false);
  const history = useHistory()
  const products = [
    {
      id: 1,
      image: {
        src:
          'https://www.venex.com.ar/products_images/1599498841_notebooklenovothinkpade14corei510210u8gbssd256gb14.jpg',
      },
      title: 'NOTEBOOK LENOVO THINKPAD E14 CORE I5',
      stock: 20,
      price: 109000,
      sku: '111TY777UI89',
      description:
        'La ThinkPad E14 se ha sometido a pruebas de especificaciones militares para soportar los entornos de trabajo más extremos y adversos, por lo que no te dejará tirado. No solo puede funcionar en cualquier lugar, desde lugares de frío extenso hasta zonas con un calor sofocante, sino también puede soportar golpes, caídas e incluso derrames accidentales.',
    },
  ]
  const classes = useStyles()
  return (
    <div
      style={{
        width: '1050px',
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
            {products ? (
              products.map((product) => (
                // console.log(product)&&
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
                  <StyledTableCell align='center'>Sin subir</StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.stock}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{product.sku}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.description.slice(0, 40) + '...'}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button color = "primary" onClick = { () => setRenderPublicar(true)} >
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
