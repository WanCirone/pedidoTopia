import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
//Material-ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
//import { Box } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 17,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function Table_Products() {
  const history = useHistory();
  const [products, setProducts] = useState();
  const [productsML, setProductsML] = useState();

  useEffect(() => {
    if (!products) {
      axios.get("http://localhost:3000/shopify/products").then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
    }
    if (!productsML) {
      axios.get("https://api.mercadolibre.com/users/640321140/items/search?access_token=APP_USR-2326379537505729-091523-3d68bd458b59e01de43ea162cfa1b3fd-640321140").then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
    }
  }, [setProductsML]);

  console.log(products);
  console.log(productsML);

  const classes = useStyles();
  return (
    <div style={{ width: "850px", marginRight: "auto", marginLeft: "auto" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Imagen&nbsp;</StyledTableCell>
              <StyledTableCell align="left">Producto&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Proveedor&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="right">Tipo&nbsp;</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
              <StyledTableCell align="right">Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products ? (
              products.map((product) => (
                // console.log(product)&&
                <StyledTableRow key={product.id}>
                  <StyledTableCell align="left">
                    <Button href={`/answer/${product.id}`}>
                      <i>
                        <DeleteOutlineIcon />
                      </i>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span>
                      <img
                        src={product.image && product.image.src}
                        height="100px"
                        width="100px"
                        alt=""
                      />
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.vendor}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.variants[0] &&
                      product.variants[0].inventory_quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.product_type}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.variants.length > 0 && product.variants[0].price}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button href={`/edit/${product.id}`}>
                      <i>
                        <EditIcon />
                      </i>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <p>No hay datos para mostrar</p>
            )}
          </TableBody>

          <TableBody>
            {productsML ? (
              productsML.map((product) => (
                // console.log(product)&&
                <StyledTableRow key={product.id}>
                  <StyledTableCell align="left">
                    <Button href={`/answer/${product.id}`}>
                      <i>
                        <DeleteOutlineIcon />
                      </i>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span>
                      <img
                        // src={product.image && product.image.src}
                        height="100px"
                        width="100px"
                        alt=""
                      />
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {/* {product.title} */}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {/* {product.vendor} */}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* {product.variants[0] &&
                      product.variants[0].inventory_quantity} */}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* {product.product_type} */}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* {product.variants.length > 0 && product.variants[0].price} */}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button href={`/edit/${product.id}`}>
                      <i>
                        <EditIcon />
                      </i>
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
      <div style={{ paddingLeft: "auto" }}>
        <tr>
          <td>
            <Button variant="contained" color="primary" href="/product">
              Crear Producto
            </Button>
          </td>
          <td>
            <div>
              <Button variant="contained" color="secondary" href="/">
                Cancelar
              </Button>
            </div>
          </td>
        </tr>
      </div>
    </div>
  );
}