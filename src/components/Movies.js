import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

export default class Movies extends Component {
    state = {
        movies: [],
        isLoaded: false,
        error: null,
    }

    componentDidMount() {
        // if (this.props.match.params.id) {
        //     this.fetchAllByGenre();
        //     return;
        // }
        this.fetchAll();
    }

    fetchAll = () => {
        fetch('http://localhost:4000/v1/movies')
            // .then(response => response.json())
            .then(response => {
                console.log("Status code is ", response.status)
                if (response.status !== "200") {
                    let err = Error;
                    err.message = "Invalid response code: " + response.status;
                    this.setState({error: err})
                }
                return response.json()
            })
            .then(json => {
                this.setState({
                        movies: json.movies,
                        isLoaded: true
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    })
            })
    }

    fetchAllByGenre = () => {
        fetch('http://localhost:4000/v1/movies/' + this.props.match.params.id)
            // .then(response => response.json())
            .then(response => {
                console.log("Status code is ", response.status)
                if (response.status !== "200") {
                    let err = Error;
                    err.message = "Invalid response code: " + response.status;
                    this.setState({error: err})
                }
                return response.json()
            })
            .then(json => {
                this.setState({
                        movies: json.movies,
                        isLoaded: true
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    })
            })
    }

    render() {
        const {movies, isLoaded, error} = this.state
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading....</p>
        } else {
            return (
                <Fragment>
                    <h2>Choose a movie!</h2>
                    <div className="list-group">
                        {movies.map((c) => (
                            <Link key={c.id} to={`/movie/${c.id}`}
                                  className="list-group-item list-group-item-action">{c.title} </Link>
                        ))}
                    </div>
                </Fragment>
            )
        }
    }
}
