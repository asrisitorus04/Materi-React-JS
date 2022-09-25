import { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: []
    }
  }
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.setState({
    //       dataApi: res
    //     })
    //   });

    axios.get('https://jsonplaceholder.typicode.com/posts').then(
      res => {
        this.setState({
          dataApi:res.data
        })
      }
    );

  }

  render() {
    return (
      <div>
        <p>Hello API</p>
        {this.state.dataApi.map((dat, index) => {
          return (<div key={index}>
            <p>{dat.body}</p>
          </div>)
        })}
      </div>
    )
  };
}

export default App;
