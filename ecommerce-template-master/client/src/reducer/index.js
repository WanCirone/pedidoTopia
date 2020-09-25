const initialState = {
  product: {},
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

    default:
      return state
  }
}
