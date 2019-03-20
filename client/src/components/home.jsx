import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(path) {
    // let path = 'newPath';
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="home">
        <h1>Trends</h1>
        <Button onClick={() => { this.routeChange('mens')}}>Mens</Button>
        <Button onClick={() => { this.routeChange('womens')}}>Womens</Button>
      </div>
    )
  }
}

export default withRouter(Home);