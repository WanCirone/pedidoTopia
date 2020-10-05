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
  console.log(product)
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

export function getCategories(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3000/categories/predictor/${id}`)
      .then((res) => res.json())
      .then((categories) =>
        dispatch({
          type: 'GET_CATEGORIES',
          payload: categories,
        })
      )
  }
}

export function uploadImages(imgs) {
  return function (dispatch) {
    return fetch('http://localhost:3000/images', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ images: imgs }),
    })
      .then((res) => res.json())
      .then((imgs) =>
        dispatch({
          type: 'GET_IMAGES_URL',
          payload: imgs,
        })
      )
  }
}

export function postProduct(id, product) {
  return function (dispatch) {
    return fetch(`http://localhost:3000/products/publicar/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
  }
}

export function getOrders() {
  return function (dispatch) {
    return fetch(`http://apipedidotopia.herokuapp.com/webhooks/orders/fulfilled`)
      .then((res) => res.json())
      .then((orders) =>
        dispatch({
          type: 'GET_ORDERS',
          payload: orders,
        })
      )
  }
}
