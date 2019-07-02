import React, {Component} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component{ 
  state = {
    showTab : false
  };
  onShowTab =()=>{
    this.setState((state)=>{
      return {
        showTab : !state.showTab
      }
    });
  };
  render(){
    const {title,actors,year,format,onDelete} = this.props;
    const tab = this.state.showTab ? 
           <div className = "tab_content">
              <span className = 'tab_item'>Stars: {actors}</span>
              <div>
                <span className = 'tab_item'>Year: {year}</span>
                <span className = 'tab_item'>Format: {format}</span>
              </div>
           </div>
           : null;
    const arrow= this.state.showTab ? ' fas fa-angle-down up'  : ' fas fa-angle-down';
    const content =
                   <div className = "todo_list_wrapper">
                      <span className = "title_list_item">{title}</span>
                      <div className="btns_list_item">
                        <i className={arrow}  aria-hidden="true"  onClick={this.onShowTab}> </i>
                        <i className="fa fa-trash trash" aria-hidden="true" onClick = {onDelete}></i>
                      </div>
                   </div> ;
    return (
      <React.Fragment>
        {content} 
        {tab}
      </React.Fragment>
    );
  }
}

  
