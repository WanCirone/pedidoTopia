import React, {useState} from "react";
import s from "./AddProduct.module.css"
import Slider from "../Slider/Slider.js"
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";
import DescriptionIcon from "@material-ui/icons/Description";
import LabelIcon from "@material-ui/icons/Label";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(0.7),
    },
  }));


export default function Add_Product(){
    const [images, setImages] = useState([])


    const uploadImg = async (e) => {
        const files = e.target.files;
        var newImages = [];
    
        for (let i = 0; i < files.length; i++) {
          const base64 = await convertBase64(files[i]);
          newImages.push(base64);
        }
        // console.log(newImages);
        setImages(newImages);
      };
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };



      const classes = useStyles();
    return(
        <form
      className={s.form}
    //   onSubmit={onSubmitHandle}
    //   encType="multipart/form-data"
    >
      <div className={s.contenedor}>
        {/* <div className = {styles.imagecontenedor}> */}
        <div className={s.image}>
          <div className={s.slider} marginRight="auto" marginLeft="auto">
            {images.length > 0 && <Slider images={images} />}
          </div>
          <input
            type="file"
            // name="imagen"
            onChange={(e) => {
               uploadImg(e);
             }}
            accept="image/*"
            multiple
          />
        </div>
        <div className={s.input}>
          <div className={s.inputcontenedor}>
            <i className={s.icon}>{<LabelIcon />}</i>
            <input
            //   name="Product"
            //   value={input.Product}
              type="text"
              placeholder="Producto"
            //   onChange={handleInputChange}
            />
          </div>
          <div className={s.inputcontenedor}>
            <i className={s.icon}>{<DescriptionIcon />}</i>
            <input
              // className={styles.input}
            //   name="Proveedor"
            //   value={input.Proveedor}
              type="text"
              placeholder="Prooveedor"
            //   onChange={handleInputChange}
            />
          </div>
          <div className={s.inputcontenedor}>
            <i className={s.icon}>{<AttachMoneyIcon />}</i>
            <input
              // className={styles.input}
            //   name="Price"
            //   value={input.Price}
              type="number"
              placeholder="Precio"
            //   onChange={handleInputChange}
            />
          </div>
          <div className={s.inputcontenedor}>
            <i className={s.icon}>{<ShoppingBasketOutlinedIcon />}</i>
            <input
              // className={styles.input}
            //   name="Stock"
            //   value={input.Stock}
              type="number"
              placeholder="Stock"
            //   onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={s.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<InputIcon />}
          >
            Agregar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<CancelPresentationRoundedIcon />}
            href="/table"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
    )

}