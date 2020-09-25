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
