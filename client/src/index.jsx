import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import Section from './components/section.jsx';
import Home from './components/home.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <div id="dashboard">
        <div className="menu">
          <span className="nav-title">
            Trends
          </span>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/mens">
            Men
          </NavLink>
          <NavLink exact to="/womens">
            Women
          </NavLink>
        </div>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/mens" render={(props) => <Section {...props} gender={'Mens'}/> }/>
          <Route exact path="/womens" render={(props) => <Section {...props} gender={'Womens'}/> }/>
        </div>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));


    // axios.get('/mens/shoes', { params: { data: 'popular'}})
    // .then(response => {
    //   console.log(response);
    // })