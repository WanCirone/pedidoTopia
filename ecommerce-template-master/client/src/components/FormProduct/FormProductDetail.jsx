import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

export default function FormProductDetail({ handleInputChange, values }) {
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Product Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name='title'
            label='Title'
            value={values.title}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name='description'
            label='Description'
            value={values.description}
            fullWidth
            multiline
            rowsMax={4}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='category'
            label='Suggested category'
            value={values.category}
            fullWidth
            multiline
            rowsMax={4}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='sku'
            label='SKU'
            value={values.sku}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name='stock'
            label='Stock'
            type='number'
            value={values.stock}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name='price'
            label='Price'
            type='number'
            value={values.price}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
