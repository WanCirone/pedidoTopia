import React from "react";
import s from "./Footer.module.css";

function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.authors}>
        <h4>Autores:</h4>
        <ul>
          <li>Wanda Cirone</li>
          <li>Joaquin Quiroga</li>
          <li>Franco Silva</li>
          <li>German Moreno</li>
          <li>Marcelo Britos</li>
          <li>Facundo Sadava</li>
          <li>Bruno Dionel Vicente</li>
        </ul>
      </div>
      
    </div>
  );
}

export default Footer;