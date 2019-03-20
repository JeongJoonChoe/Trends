import React from 'react';


const ProductList = (props) => {
  return (
    <div className="product-list">
      <button onClick={()=> {props.onProductClick('shoes')}}>Shoes</button>
      <button onClick={()=> {props.onProductClick('shirts')}}>Shirts & Tops</button>
    </div>
  )
}

export default ProductList;