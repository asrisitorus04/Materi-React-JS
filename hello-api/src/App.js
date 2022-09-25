import { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
      dataPost:{
        id: 0,
        title: '',
        body: ''
      }
    };
    this.handleRemove=this.handleRemove.bind(this);
    this.inputChange=this.inputChange.bind(this);
    // this.onSubmitForm=this.onSubmitForm.bind(this);
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

  inputChange(e){
    let newdataPost = {...this.state.dataPost};
    newdataPost['id'] = new Date().getTime();
    newdataPost[e.target.name] = e.target.value;

    this.setState({
      dataPost : newdataPost
    }, ()=> console.log(this.state.dataPost))
  }

  onSubmitForm= () => {
    axios.post(`http://localhost:3004/posts/`,this.state.dataPost)
    .then(() => {
      this.reloadData();
    });
  };


  
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
        <input type='text' name="body" placeholder="Masukkan Body" onChange={this.inputChange}/>
        <input type="text" name="title" placeholder="Masukkan Title" onChange={this.inputChange} />
        <button type="Submit" onClick={this.onSubmitForm}> Add Data</button>
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
