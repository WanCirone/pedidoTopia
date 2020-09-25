import React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Slider from '../Slider/Slider.js'
import { secondStepImages } from '../../actions/index.js'

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
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Select Images
      </Typography>

      <div>
        <div marginRight='auto' marginLeft='auto'>
          {images && images.length > 0 && <Slider images={images} />}
        </div>
        <input
          type='file'
          // name="imagen"
          onChange={(e) => {
            uploadImg(e)
          }}
          accept='image/*'
          multiple
        />
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  images: state.product.images,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setImages: (images) => dispatch(secondStepImages(images)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSelectImages)
