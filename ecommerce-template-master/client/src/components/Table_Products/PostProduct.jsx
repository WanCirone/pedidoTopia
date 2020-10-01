import React, { useState, useEffect } from 'react'
import styles from './Publicar.module.css'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

//Material-ui
import Button from '@material-ui/core/Button'
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded'
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CommentIcon from '@material-ui/icons/Comment';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { connect } from 'react-redux'
import { getCategories, postProduct } from '../../actions'
import ListIcon from '@material-ui/icons/List';

function PostProduct({ categories, getCategories, match, publish }) {
  const id = match.params.id
  const history = useHistory()
  const [values, setValues] = useState({
    precio: '',
    stock: '',
    category_id: '',
    source: '',
    category_name: '',
  })

  const handleValues = (e) => {
    console.log(e.target)
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

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
          <input
            type='number'
            placeholder='Price'
            name='precio'
            onChange={handleValues}
          />
        </div>
        <i className={styles.icon}>
          <AccountBalanceRoundedIcon />{' '}
        </i>
        <div className={styles.inputcontenedor}>
          <input
            type='number'
            placeholder='Stock'
            name='stock'
            onChange={handleValues}
          />
        </div>
        {/* <FormGroup aria-label="position" row marginTop = "20px"> */}
        {/* <InputLabel>Category</InputLabel> */}
        <i className = {styles.i}>
        <ListIcon/>
        </i>
        <select
          native
          name='category_id'
          value={values.category_id}
          onChange={handleValues}
          className = {styles.select}
        >
          <option>Category</option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option value={cat.category_id}>{cat.category_name}</option>
            ))}
        </select>

        <div className={styles.Checkbox}>
          <label>
            Mercado Libre
            <input
              type='radio'
              name='source'
              value='mercadolibre'
              onChange={handleValues}
            />
          </label>
          <label>
            Shopify
            <input
              type='radio'
              name='source'
              value='shopify'
              onChange={handleValues}
            />
          </label>
        </div>
        {/* </FormGroup> */}
        <div className={styles.button}>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              publish(id, values).then((res) => {
                if (res.status !== 200) {
                  swal({
                    title: 'Error',
                    text: 'Hubo un error al publicar el producto',
                    icon: 'error',
                  })
                } else {
                  swal({
                    text: 'Se publico correctamente!',
                    icon: 'success',
                  }).then(() => history.push('/'))
                }
              })
            }
          >
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
    publish: (id, product) => dispatch(postProduct(id, product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProduct)
