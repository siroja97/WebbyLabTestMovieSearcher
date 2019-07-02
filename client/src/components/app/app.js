import React, { Component } from 'react';
import SearchPanel from '../search-panel';
import AddItem  from '../add-item';
import SwapiService from "../../services/swapi-service";
import './app.css';
import TodoList from '../todo-list/todo-list';
import { BrowserRouter as Router, Route,Link,Switch } from 'react-router-dom';

export default class App extends Component {
    swapi = new SwapiService();
    state = {
        items : [],
        search : '',
        searchByActors:false
    };

    getItems = () => this.swapi.getMovies().then((resp) => resp && resp.movies &&
     this.setState({items: resp.movies.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))}))
   
    onDelete = (id) => this.swapi.removeMovie(id).then(resp => resp && resp.status === 'ok' && this.getItems());
    
    onItemAdded = (payload) => this.swapi.addMovie(payload).then(resp => resp && resp.status === 'ok' && this.getItems());

    onSearchChange = (search,searchByActors) => this.setState({search,searchByActors});

    itemSearch = (items, search) => {
        if (search && search.length === 0) return items;
        return this.state.searchByActors    ? items.filter((item) => item.actors.toLowerCase().includes(search.toLowerCase()))
                                            : items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    };
    componentDidMount() {
        this.getItems();
    }
    render(){
        const {items,search} = this.state;
        const visibleItems = this.itemSearch(items,search);
        return(
                <Router>
                  <Switch>
                    <Route exact path='/'
                        render={() =>
                          <div className='app_main'>
                            <h1 className="app_label">Movie Search Application</h1>
                            <div className='app_search_panel'>
                              <SearchPanel  onSearchChange = {this.onSearchChange} />
                              <button type="submit" className="btn_add"><Link to = "/addItem">Create new</Link></button>
                            </div>
                            <TodoList items = {visibleItems}  onDelete = {this.onDelete}/>
                          </div>
                        }
                    />
                    <Route exact path="/addItem"
                           render={()=><AddItem onItemAdded={this.onItemAdded}/>}/>
                    <Route render={()=> <h2>Page not found! Try again.</h2> }/>
                  </Switch>
                </Router>
        )
  };
}
