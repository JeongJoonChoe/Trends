import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.getShoes = this.getShoes.bind(this);
  }

  componentDidMount() {
    this.getShoes();
  }

  getShoes() {
    axios.get('/mens/shoes', { params: { data: 'popular'}})
    .then(response => {
      console.log(response);
    })
  }

  render(){
    return (
      <div> Hello
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));