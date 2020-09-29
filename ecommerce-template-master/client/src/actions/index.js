export function firstStepProduct(product) {
  return {
    type: 'FIRST_STEP_PRODUCT',
    payload: product,
  }
}
export function secondStepImages(images) {
  return {
    type: 'SECOND_STEP_IMAGES',
    payload: images,
  }
}

export function createProduct(product) {
  return function (dispatch) {
    return fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
  }
}

export function getProducts() {
  return function (dispatch) {
    return fetch('http://localhost:3000/products/db')
      .then((res) => res.json())
      .then((products) =>
        dispatch({
          type: 'GET_PRODUCTS',
          payload: products,
        })
      )
  }
}
