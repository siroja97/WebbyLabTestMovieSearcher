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
        searchByActors:false,
        sort:false

    };

    getItems = () => this.swapi.getMovies().then((resp) => resp && resp.movies && this.setState({items: resp.movies}));
    
    onDelete = (id) => {
      this.swapi.removeMovie(id)
       .then(resp => resp && resp.status === 'ok' && 
         this.setState((state)=>{
            return {
              ...state,
              items: state.items.slice().filter(item => {
                return item._id !== id
           })
        };
      }))
      .catch(err=>console.log(err)
    )}
    
    onItemAdded = (payload) => this.swapi.addMovie(payload).then(resp => resp && resp.status === 'ok' && this.getItems());

    onSearchChange = (search,searchByActors) => this.setState({search,searchByActors});

    itemSearch = (items, search) => {
        if (search && search.length === 0) return items;
        return this.state.searchByActors    ? items.filter((item) => item.actors.toLowerCase().includes(search.toLowerCase()))
                                            : items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    };

    
    collator = new Intl.Collator(undefined,{
      caseFirst:'upper'
    });
 
    getSortedItems = () => {
      const numberTitles = this.state.items.slice().filter(item => !isNaN(parseInt(item.title, 10)));
      const stringTitles = this.state.items.slice().filter(item => isNaN(parseInt(item.title, 10)));
      const newArr =  this.state.sort ? stringTitles.sort((a,b) => this.collator.compare(a.title,b.title))
                                      : stringTitles.sort((a,b) => this.collator.compare(a.title,b.title)).reverse()
      newArr.push(...numberTitles);
      return newArr;
    }

    onSort = () => { 
        this.setState((state)=> {return {sort: !state.sort}})
        this.setState(() => {return {items: this.getSortedItems()}});   
    }
    
    componentDidMount() {
        this.getItems();
    }
  
    chunkArray = (myArray, chunk_size) => {
      const tempArray = [];

      for (let index = 0; index < myArray.length; index += chunk_size) {
          const myChunk = myArray.slice(index, index + chunk_size);
          tempArray.push(myChunk);
      }

      return tempArray;
    }
    onFileUpload = (e) => {
      const files = e.target.files;
      const reader = new FileReader();
      reader.readAsBinaryString(files[0]);
      
      reader.onload = (e) => {
          const moviesForUpload = [];

          const entries = e.target.result.split('\n')
                                          .map(str => str.split(': '))
                                          .filter((ent, ind) => ent.length !== 1 && ent[ind] !== "");

          const chunks = this.chunkArray(entries, 4);

          chunks.forEach(chunk => moviesForUpload.push(Object.fromEntries(chunk)));

          this.swapi.uploadFile(moviesForUpload).then(resp => resp && resp.status === 'ok' && this.getItems());
      }
    }
   
  render(){
        const {items,search} = this.state;
        const visibleItems = this.itemSearch(items,search);
        const inverseBtn = this.state.sort ? ' fas fa-sort-amount-down inverse' : 'fas fa-sort-amount-down';
        return(
                <Router>
                  <Switch>   
                    <Route exact path='/'
                        render={() =>
                          <div className='app_main'>
                            <h1 className="app_label">Movie Search Application</h1>
                            <div className='app_search_panel'>
                              <SearchPanel  onSearchChange = {this.onSearchChange} />
                             <button onClick={this.onSort} className='sort_btn'><i className={inverseBtn}></i></button>
                             <button type="submit" className="btn_add"><Link to = "/addItem">Create new</Link></button>
                             <input className='load_btn' type="file" onChange={(e) => this.onFileUpload(e)}/> 
                            </div>
                            <TodoList items = {visibleItems}  onTryDelete = {this.onTryDelete} onDelete={this.onDelete}/>
                            
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
