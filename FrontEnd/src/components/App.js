import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0
        }
        this.renderClick = this.renderClick.bind(this)
    }
    renderClick(){
        let {count} = this.state;
        count++;
        this.setState({
            count
        });
    }

  render() {
        console.log('render')
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 onClick={this.renderClick}>{this.state.count}</h2>
        </div>
        <p className="App-intro">
          To get started, edit and save to reload.
        </p>
          <Childapp/>
      </div>
    );
  }
}

class Childapp extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div>
                <ul className="list-ul">
                    <li name="l1">列表1</li>
                    <li name="l2">列表2</li>
                    <li name="l3">列表3</li>
                </ul>
            </div>
        )
    }
}

export default App;
