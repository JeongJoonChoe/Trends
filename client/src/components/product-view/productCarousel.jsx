import React from 'react';
import AliceCarousel from 'react-alice-carousel';

const Gallery = (props) => {
  const handleOnDragStart = e => e.preventDefault();
  let resp = {
    0: {
      items: 1
    },
    1024: {
      items: 5
    }
  }
  let products = props.products ? props.products.slice(10) : [];
  return (
    <div>
      <AliceCarousel
      mouseDragEnabled
      infinite="false"
      responsive={resp}
      buttonsDisabled="false"
      >
        {products.map((product, i) => {
          if (i < 15) {
            return (
              <div key={i} className="gallery-image">
                <img src={product.image} alt={product.title} onDragStart={handleOnDragStart} className="yours-custom-class"/>
                <span> {product.title} </span>
                <span> {product.price} </span>
              </div>
            )
          }
        })}
      </AliceCarousel>
    </div>
  )
}

export default Gallery;