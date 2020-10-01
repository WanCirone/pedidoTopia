import React, { useState, useEffect } from 'react'
import styles from './Publicar.module.css'
import { useHistory } from 'react-router-dom'
import s from "./Borrar.module.css"
import styless from "./Detalle.module.css"
import defaultImg from "../../img/default.jpg"
import Slider from "../Slider/Slider.js"
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
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import Box from '@material-ui/core/Box';

import Alert from '@material-ui/lab/Alert';
//import { Box } from "@material-ui/core";
import { connect } from 'react-redux'
import { getProducts } from '../../actions'
import { Grid } from '@material-ui/core'

const shortText = function (text) {
  var newText = text.substring(0, 50);
  newText = newText.charAt(0).toUpperCase() + newText.slice(1);

  if (text.length > 120) {
    return newText + "...";
  }
  return newText;
};

function FormSelectImages({ setImages, images }) {
  const uploadImg = async (e) => {
    const files = e.target.files
    var newImages = []

    for (let i = 0; i < files.length; i++) {
      const base64 = await convertBase64(files[i])
      newImages.push(base64)
    }
    // console.log(newImages);
    setImages(newImages)
  }
}
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
   })
 }

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

function Detalle (props){
  
  return(
    <form className = {styless.form}>
      <div className = {styless.content}>
      <div className={styless.image}>
        {/* {images && images.length > 0 && <Slider images={images} />} */}
        <img
          src={ defaultImg}
          alt= ""
          onChange={(e) => {
            props.uploadImg(e)
          }}
          accept='image/*'
          multiple        
          />
      </div>
      <div className = {styless.p}>
       <p className = {styless.pe}>Producto:</p>
        <h2>{props.product.title}</h2>
        <p className = {styless.pe}> Stock:</p>
        <h3>{props.product.stock_inicial}</h3>
         <p className = {styless.pe}>Sku:</p>
        <h3>{props.product.sku}</h3>
        <p className = {styless.pe}>Descripcion:</p>
        <body>
        <div className = {styless.descriptionn}>{shortText(props.product.description)}
        {/* <h3 className={styless.description}>{shortText(props.product.description)}</h3> */}
        </div>
        </body>
         <p className = {styless.pe}>Precio:</p>
        <h3>{props.product.precio_inicial}</h3>
      </div>
       <div className = {styless.button}>
        <Button
        
        href = "/"
        variant = "contained"
        color = "secondary" 
        >
          Cancelar
        </Button>
        </div>
      </div>
    </form>
  );
}

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

function Table_Products({ products, getListProducts }) {
  const classes = useStyles()
  const history = useHistory()
  const [renderPublicar, setRenderPublicar] = useState(false);
  const [renderBorrar, setRenderBorrar] = useState(false);
  const [renderDetalle, setRenderDetalle] = useState(false);
  const [Detallepro, setDetallepro] = useState({});
  useEffect(() => {
    getListProducts()
  }, [])

  return (
    <div
      style={{
        width: '1400px',
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
              <StyledTableCell align='center'>Descripcion&nbsp;</StyledTableCell>
              <StyledTableCell align='right'>
                Precio
                <div>

                </div>
                </StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
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
                        src={product.image && product.image.src ? product.image: defaultImg }
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
                    <body
                    style = {{
                      backgroundColor: "whitesmoke",
                      border: "1px solid whitesmoke ",
                      borderRadius: "5px"
                    }}
                    >
                    <div    
                    style={{
                      wordWrap: "break-word",
                      height: "50px"
                    }}
                     >
                    {product.description.slice(0, 40)}
                    </div>
                    </body>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {product.precio_inicial}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button
                      color='primary'
                      onClick={() => history.push(`/post/${product.id}`)}
                      variant = "outlined"
                    >
                      Publicar
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell aling = "right">
                  <Button 
                    variant = "outlined"
                    startIcon={<PermContactCalendarIcon />}
                    color = "primary"
                    onClick = {() => {setRenderDetalle(true);
                    setDetallepro({title: product.title, stock_inicial: product.stock_inicial, description: product.description,precio_inicial: product.precio_inicial, sku: product.sku })
                    }}
                    >
                      Detalle
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
      {renderDetalle && <Detalle product = {Detallepro} />}

      {/* {renderPublicar && <Publicar />} */}
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
