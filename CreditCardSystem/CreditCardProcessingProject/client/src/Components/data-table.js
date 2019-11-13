import React , {Component} from 'react';
import './componentCSS.css'
class DataTable extends Component{
    constructor(props) {
        super(props);
        this.state = { };
    }

    renderTableData(){
        let records = this.props.records;
        let tRow = [];
        for (let [key, value] of Object.entries(this.props.records)) {
            tRow.push(<tr key={value.id}>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
                <td>{value.creditCardNumber}</td>
                <td>{value.balance}</td>
                <td>{value.cardLimit}</td>
                <td>{value.expiryDate}</td>
                <td>{value.cvv}</td>
             </tr>);
            
        }
        return(
            tRow
        )
    }

    renderTableHeader(){
        return(
           <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Credit Card #</th>
                <th>Balance</th>
                <th>Limit</th>
                <th>Expiry Date</th>
                <th>CVV</th>
           </tr>
                
        );
    }   
    
    render(){
        if(this.props.records.length === 0) {
            return(<span> No Records Found !!</span>)
        }
        
         return(
             <table>
                 <thead>
                 {this.renderTableHeader()}
                 </thead>
                 <tbody>
                 {this.renderTableData()}
                 </tbody>
             </table>
         )
    }
}

export default DataTable