import React, { useState, useEffect } from 'react'
import styles from './Publicar.module.css'
import { useHistory } from 'react-router-dom'
//Material-ui

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded'
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { connect } from 'react-redux'
import { getCategories } from '../../actions'

function PostProduct({ categories, getCategories, match }) {
  const id = match.params.id

  useEffect(() => {
    getCategories(id)
  }, [])

  return (
    <form className={styles.form}>
      <div className={styles.content}>
        <i className={styles.icon}>
          <AttachMoneyRoundedIcon />{' '}
        </i>
        <div className={styles.inputcontenedor}>
          <input type='number' placeholder='Price' />
        </div>
        <i className={styles.icon}>
          <AccountBalanceRoundedIcon />{' '}
        </i>
        <div className={styles.inputcontenedor}>
          <input type='number' placeholder='Stock' />
        </div>
        {/* <FormGroup aria-label="position" row marginTop = "20px"> */}
        <InputLabel>Category</InputLabel>
        <Select native>
          {categories.length > 0 &&
            categories.map((cat) => <option value={cat.id}>{cat.name}</option>)}
        </Select>

        <div className={styles.Checkbox}>
          <label>
            Mercado Libre
            <input type='radio' name='provider' value='Mercado Libre' />
          </label>
          <label>
            Shopify
            <input type='radio' name='provider' value='Mercado Libre' />
          </label>
        </div>
        {/* </FormGroup> */}
        <div className={styles.button}>
          <Button variant='contained' color='primary'>
            Publicar
          </Button>
          <Button variant='contained' color='secondary' href='/'>
            {' '}
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.listCategories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (id) => dispatch(getCategories(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProduct)
