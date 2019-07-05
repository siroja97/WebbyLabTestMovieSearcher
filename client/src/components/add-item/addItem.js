import React, {Component} from 'react'
import './addItem.css'
import { Link } from 'react-router-dom';
import { FormErrors } from '../form-errors/FormErrors';

export default class AddItem extends Component{
    state = {
        title: '',
        actors:'',
        year:'',
        format:'dvd',
        formErrors: {title: '', actors:'',year:'',format:''},
        titleValid: false,
        actorsValid:false,
        yearValid:false,
        formValid:false,
        successMessage:false,
        failureMessage:false
    };
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() =>  this.validateField(name, value) );
        this.setState({failureMessage:false,successMessage:false})
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let actorsValid = this.state.actorsValid;
        let yearValid = this.state.yearValid;
        switch(fieldName) {
         case 'title':
            titleValid = value.length > 0;
            fieldValidationErrors.title = titleValid? '' : ' is must have field';
            break;
          case 'actors':
            actorsValid = value.length >= 6;
            fieldValidationErrors.actors= actorsValid ? '': ' is too short';
            break;
          case 'year': 
            yearValid = Number(value) > 1900 && Number(value)<2020;
            fieldValidationErrors.year =yearValid ? '': 'write real value (1901-2019)!';
            break;
         default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
            titleValid:titleValid,
            actorsValid:actorsValid,
            yearValid:yearValid,
                      }, this.validateForm);
    };
    validateForm() {
        this.setState({formValid:this.state.titleValid && 
            this.state.actorsValid && this.state.yearValid
        });
    };
    errorClass(error) {
        return(error.length  === 0 ? '' : 'has-error');
    };
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.formValid) { this.setState({failureMessage:true}) 
            return;}

        this.setState({successMessage:true})
        const { title,actors,year,format } = this.state;
        this.setState({
            title:'',
            actors:'',
            year:''
        })
        const cb = this.props.onItemAdded || (() => {});
        cb({title,actors,year,format});
       
    };
    render() {
        const fail = this.state.failureMessage ? <div className="error_message">You must fill in all fields!</div> : null;
        const success = this.state.successMessage ? <div className="success_message">Congratulations! Movie created!</div> : null ;
     return(
        <div className='add_form_wrapper'>
            <div className = 'add_form_header' >
                <Link to ="/"><i className="fas fa-chevron-circle-left"></i> </Link>
                <span className='add_form_label'>Movie Maker</span>
            </div>
            <form onSubmit = {this.onSubmit}  className = "add_form">
                        <div className ={ `add_form_item  ${this.errorClass(this.state.formErrors.title)}`}>
                            <span>name:</span>
                            <input type ='text'
                                name ='title'
                                placeholder = ' name of Movie'
                                onChange={this.handleUserInput}
                                value={this.state.title} >
                            </input>
                        </div>
                        <div className ={ `add_form_item  ${this.errorClass(this.state.formErrors.actors)}`}>
                            <span>actors:</span>
                            <input  type ='text'
                                    name='actors'
                                    placeholder = 'names of actors'
                                    onChange={this.handleUserInput}
                                    value={this.state.actors}>
                            </input>
                        </div>
                            <div className = {`add_form_item  ${this.errorClass(this.state.formErrors.year)}`}>
                            <span>year:</span>
                                <input type ='text'
                                    name='year'
                                    placeholder = 'year of this movie'
                                    onChange={this.handleUserInput}
                                    value={this.state.year}>
                                </input>
                            </div>
                            <div className = {`add_form_item  ${this.errorClass(this.state.formErrors.format)}`}>
                            <span>format:</span>
                            <select name='format' value={this.state.format} onChange={this.handleUserInput}> 
                                <option value='DVD'>DVD</option>
                                <option value='VHC'>VHC</option>
                                <option value='BLU-RAY'>BLU-RAY</option>
                            </select>
                        </div>
                        <p className="warning_message">*all fields is required</p>
                        <FormErrors formErrors={this.state.formErrors} />
                        {success}
                        {fail}
                        <button type='submit' className="btn_add btn_movie">Add Movie</button>
                </form>
        </div>
     )
   }
}
