const initialState = {
  product: {},
  listProducts: [],
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

    default:
      return state
  }
}
