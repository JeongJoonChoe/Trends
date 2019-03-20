import axios from 'axios';
import React from 'react';
import ProductList from './productList.jsx';
import Filters from './filters.jsx';
import ProductView from './product-view/productView.jsx';


export default class Section extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gender: this.props.gender,
      product: 'shoes',
      filter: 'best-selling',
      data: []
    }
    this.onProductClick = this.onProductClick.bind(this);
    this.onfilterClick = this.onfilterClick.bind(this);
    this.getProductData = this.getProductData.bind(this);
  }

  componentDidMount() {
    this.getProductData();
  }

  getProductData() {
    axios.get(`/${this.state.gender}/${this.state.product}`, {params: {data: `${this.state.filter}`}})
    .then((data) => {
      this.setState({
        data: data.data
      })
    })
  }

  onProductClick(product) {
    this.setState({
      product
    }, this.getProductData)
  }

  onfilterClick(filter) {
    this.setState({
      filter
    }, this.getProductData)
  }

  render() {
    return (
      <div className="main-content">
        <div className="row">
          <h1 className="col-10">{this.props.gender} / {this.state.product}</h1>
          <Filters className="col-2" onfilterClick={this.onfilterClick}/>
        </div>
        <div className="products row">
          <ProductList className="col-2" onProductClick={this.onProductClick}/>
          <ProductView className="col-8" data={this.state.data}/>
        </div>
      </div>
    )
  }
}