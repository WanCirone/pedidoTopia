const initialState = {
  product: {},
  listProducts: [],
  listCategories: [],
  imagesUrl: [],
  listOrders: [],
  filterOrders: [],
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'FIRST_STEP_PRODUCT':
      return {
        ...state,
        product: action.payload,
      }
    case 'SECOND_STEP_IMAGES':
      return {
        ...state,
        product: {
          ...state.product,
          images: action.payload,
        },
      }
    case 'GET_PRODUCTS':
      return {
        ...state,
        listProducts: action.payload,
      }
    case 'GET_CATEGORIES':
      return {
        ...state,
        listCategories: action.payload,
      }
    case 'GET_IMAGES_URL':
      return {
        ...state,
        imagesUrl: action.payload,
      }
    case 'GET_ORDERS':
      return {
        ...state,
        listOrders: action.payload,
      }

    default:
      return state
  }
}
