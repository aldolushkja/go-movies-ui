import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useParams, useRouteMatch} from 'react-router-dom';
import Movies from './components/Movies.js';
import Home from './components/Home.js';
import Admin from './components/Admin.js';
import Categories from "./components/Categories";

export default function App() {
    return (
        <Router>
            <div className="container">
                <div className="row">
                    <h1 className="mt-3">Go Watch a Movie!</h1>
                    <hr className="mb-3"/>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <nav>
                            <ul className="list-group">
                                <li className="list-group-item"><Link to="/">Home</Link></li>
                                <li className="list-group-item"><Link to="/movies">Movies</Link></li>
                                <li className="list-group-item"><Link to="/by-category">Categories</Link></li>
                                <li className="list-group-item"><Link to="/admin">Manage Catalogue</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-10">
                        <Switch>
                            <Route path="/movies/:id"><MovieDetails/></Route>
                            <Route path="/movies">
                                <Movies/>
                            </Route>
                            <Route exact path="/by-category">
                                <CategoryPage/>
                            </Route>
                            <Route exact path="/by-category/drama"
                                   render={(props) => <Categories {...props} title={`Drama`}/>}>
                            </Route>
                            <Route exact path="/by-category/comedy"
                                   render={(props) => <Categories {...props} title={`Comedy`}/>}>
                            </Route>
                            <Route path="/admin">
                                <Admin/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

function MovieDetails() {
    let {id} = useParams();
    return (
        <h1>Movie Details {id}</h1>
    )
}

function CategoryPage() {
    let {path, url} = useRouteMatch();
    return (
        <div>
            <h2>Categories</h2>
            <ul>
                <li><Link to={`${path}/drama`}>Drama</Link></li>
                <li><Link to={`${url}/comedy`}>Comedy</Link></li>
            </ul>
        </div>
    )
}
