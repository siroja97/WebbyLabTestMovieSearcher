import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    term: '',
    searchByActors : false
  };
  onTermChange = (e) => {
    const {onSearchChange = () => {}} = this.props;
    this.setState({
    term: e.target.value
  });
  onSearchChange(e.target.value,this.state.searchByActors);
  };
  onChangeSwitch= ()=>{
     this.setState((state)=>{
        return{
        searchByActors:!state.searchByActors
        }
      })

  };
  render() {
    return (
            <div className="search_form" >
                <span className="switch_label">Search by Movie</span>
                <label className="switch">
                  <input type="checkbox"
                  checked ={this.state.searchByActors}
                  onChange={this.onChangeSwitch}/>
                  <span className="slider round"></span>
                </label>
                <span className="switch_label">Search by Actors</span>
                <input type ='text'
                className = 'search-input'
                placeholder = 'Search movies...'
                value = {this.state.term}
                onChange ={this.onTermChange}/>
            </div>
    );
  };
}
