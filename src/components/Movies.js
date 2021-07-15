import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

export default class Movies extends Component {
    state = {
        movies: [],
        isLoaded: false
    }

    componentDidMount() {
        fetch('http://localhost:4000/v1/movies').then(response => response.json()).then(json => {
            this.setState({
                movies: json.movies,
                isLoaded: true
            })
        })
    }

    render() {
        const {movies, isLoaded} = this.state
        if (!isLoaded) {
            return <p>Loading....</p>
        } else {
            return (
                <Fragment>
                    <h2>Choose a movie!</h2>
                    <ul>
                        {movies.map((c) => (
                            <li key={c.id}>
                                <Link to={`/movies/${c.id}`}>{c.title}</Link>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            )
        }
    }
}
