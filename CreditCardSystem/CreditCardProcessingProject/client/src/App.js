import React , {Component} from 'react';
import './App.css';
import DataTable from'./Components/data-table';
import DataForm from './Components/data-form';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      showForm : false 
    };
    this.appendForm = this.appendForm.bind(this);
    this.removeForm = this.removeForm.bind(this);
    this.callAPI = this.callAPI.bind(this);
}

callAPI() {
    fetch("http://localhost:9000/userAPI/getUsers/")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: JSON.parse(res) }));
}


componentWillMount() {
    this.callAPI();
}

appendForm(){
  this.setState({
    showForm : true 
  })
}

removeForm(){
  this.setState({
    showForm : false 
  })
}

render(){
  return(
    <div className= "app-container">
      <button className = "add-cart-btn" onClick = {this.appendForm}>Add Card</button>
      {this.state.showForm ? <DataForm removeForm = {this.removeForm} callAPI = {this.callAPI}></DataForm> : ''}
      <DataTable records = {this.state.apiResponse}></DataTable>
    </div>
  )
}
}
export default App;
