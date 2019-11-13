import React , {Component} from 'react';

class DataForm extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            errorMsg : "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.postData = this.postData.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.formValidation()){
            let dataObj = {
                firstName : this.firstName.value,
                lastName : this.lastName.value,
                creditCardNumber : this.cardNumber.value,
                balance : "$0",
                cardLimit : "$50000",
                cvv : this.cvv.value,
                id : Math.floor(Math.random() * 20),
                expiryDate : this.expiryDate.value
            }
            this.postData(dataObj)
        }
    }

    postData(dataObj){
        fetch('http://localhost:9000/userAPI/addUser/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj)
        })
        .then(this.props.callAPI)
        .then(this.resetForm)
    }

    resetForm(){
        this.firstName.value = "";
        this.lastName.value = "";
        this.cardNumber.value = "";
        this.expiryDate.value = "";
        this.cvv.value = "";
        this.setState({
            errorMsg : ""
        })
    }

    formValidation(){
        let isValid = true;
        //validation for empty fields
        if(this.firstName.value.trim() === "" || this.lastName.value.trim() === "" || 
            this.cardNumber.value.trim() === "" || this.expiryDate.value.trim() === "" || this.cvv.value.trim() === ""){
            this.setState({
                errorMsg : "Please fill all the required fields."
            })
            return false;
        }
        //validation for credit card number
        if(this.cardNumber.value.trim()){
            let cardNumber = this.cardNumber.value.trim();
            isValid = this.valid_credit_card(cardNumber);
            if(!isValid){
                this.setState({
                    errorMsg : "Please enter valid credit card number."
                })
                return isValid
            }
        }
        //validation for expiry date
        if(this.expiryDate.value.trim()){
            let date = this.expiryDate.value.trim();
            var reExp = new RegExp('(0[1-9]|10|11|12)/20[0-9]{2}$');
            isValid = reExp.test(date);
            if(!isValid){
                this.setState({
                    errorMsg : "Please enter valid expiry date.Supported date format mm/yyyy."
                })
                return isValid
            }
            
        }
        //validation for cvv
        if(this.cvv.value.trim()){
            let cvv = this.cvv.value.trim();
            if(cvv.length < 3){
                this.setState({
                    errorMsg : "Please enter valid CVV."
                })
                isValid = false;
                return isValid
            }
        }
        
        return isValid;
    }

    valid_credit_card(value) {
        // Accept only digits, dashes or spaces
          if (/[^0-9-\s]+/.test(value)) return false;
      
          // The Luhn Algorithm. It's so pretty.
          let nCheck = 0, bEven = false;
          value = value.replace(/\D/g, "");
      
          for (var n = value.length - 1; n >= 0; n--) {
              var cDigit = value.charAt(n),
                    nDigit = parseInt(cDigit, 10);
      
              if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
      
              nCheck += nDigit;
              bEven = !bEven;
          }
      
          return (nCheck % 10) == 0;
      }

    render(){
        return(
            <React.Fragment>
            <form className = "user-form" onSubmit={this.handleSubmit}>
            <div className = "user-details-label">User Details</div>
             <div className = "user-form-row">
                <p>First Name :</p>
                    <input
                    type='text'
                    ref = {(input)=>this.firstName = input}
                    required
                />
            </div>   
            <div className = "user-form-row">
                <p>Last Name :</p>
                <input
                    type='text'
                    ref = {(input)=>this.lastName = input}
                    required
                />
            </div>
            <div className = "user-form-row">
                <p>Credit Card number :</p>
                <input
                    type='text'
                    ref = {(input)=>this.cardNumber = input}
                    required
                />
            </div>
            <div className = "user-form-row">
                <p>CVV :</p>
                <input
                    type='text'
                    ref = {(input)=>this.cvv = input}
                    maxlength="3"
                    required
                />
            </div>
            <div className = "user-form-row">
                <p>Expiry Date :</p>
                <input
                    type='text'
                    ref = {(input)=>this.expiryDate = input}
                    placeholder = "mm/yyyy"
                    required
                />
            </div>
            <input className = "submit-form-btn" type="submit" value="Submit" />
            <button className = "close-form-btn" onClick={this.props.removeForm}>Close</button>
            <p className = "error-msg">{this.state.errorMsg}</p>
            </form>
             
            </React.Fragment>
        )
    }
}

export default DataForm;