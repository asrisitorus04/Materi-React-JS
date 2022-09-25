import { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: []
    };
    this.handleRemove=this.handleRemove.bind(this);
  }

  reloadData(){
    axios.get('http://localhost:3004/posts').then(
      res => {
        this.setState({
          dataApi:res.data
        })
      }
    );
  }

  handleRemove(e){
    console.log(e.target.value)
    fetch(`http://localhost:3004/posts/${e.target.value}`,{method:"DELETE"}).then(res=>this.reloadData())
  }
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then(response => response.json())
    //   .then(res => {
    //     this.setState({
    //       dataApi: res
    //     })
    //   });

    this.reloadData();


  }

  render() {
    return (
      <div>
        <p>Hello API</p>
        {this.state.dataApi.map((dat, index) => {
          return (<div key={index}>
            <p>{dat.body}</p>
            <button value={dat.id} onClick={this.handleRemove}>Delete</button>
          </div>)
        })}
      </div>
    )
  };
}

export default App;
