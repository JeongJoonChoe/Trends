import React from 'react';
import Gallery from './productCarousel.jsx';

export default class ProductView extends React.Component {
  constructor(props) {
    super(props);
  }
  filterProducts() {

  }
  render() {
    let reebok = this.props.data.filter(product => { return product.brand === 'Reebok'});
    let adidas = this.props.data.filter(product => { return product.brand === 'adidas'});
    let nike = this.props.data.filter(product => { return product.brand === 'Nike'});
    let puma = this.props.data.filter(product => { return product.brand === 'puma'});
    let asics = this.props.data.filter(product => { return product.brand === 'asics'});

    if (this.props.data.length !== 0) {
      return (
        <div className="all-products">
          <h2>{asics.length !== 0 ? 'Asics' : ''}</h2>
          <Gallery products={asics}/>
          <h2>Reebok</h2>
          <Gallery products={reebok}/>
          <h2>{puma.length !== 0 ? 'Puma' : ''}</h2>
          <Gallery products={puma}/>
          <h2>Nike</h2>
          <Gallery products={nike}/>
          <h2>{adidas.length !== 0 ? 'Adidas' : ''}</h2>
          <Gallery products={adidas}/>
        </div>
      )
    } else {
      return (
        <div className="all-products">
        </div>
      )
    }
  }
}