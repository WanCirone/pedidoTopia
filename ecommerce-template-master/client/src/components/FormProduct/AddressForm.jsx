import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Product Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id='firstName'
            name='firstName'
            label='Title'
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id='address1'
            name='address1'
            label='Description'
            fullWidth
            multiline
            rowsMax={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField id='address2' name='address2' label='SKU' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='city'
            name='city'
            label='Stock'
            type='number'
            fullWidth
            autoComplete='shipping address-level2'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='state'
            name='state'
            label='Price'
            type='number'
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
