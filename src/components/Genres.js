import {Link} from "react-router-dom";
import React, {Component, Fragment} from "react";

export default class Genres extends Component {
    // let {path, url} = useRouteMatch();

    state = {genres: [], isLoaded: false, error: null}

    componentDidMount() {
        fetch('http://localhost:4000/v1/genres')
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
                        genres: json.genres,
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
        const {genres, isLoaded, error} = this.state

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading....</p>
        } else {
            console.log(genres)

            return (
                <Fragment>
                    <div>
                        <h2>Genres</h2>
                        <ul>
                            {genres.map((m, index) => (
                                <li key={index}>
                                    <Link to={`/genres/${m.id}`}>{m.genre_name}</Link>
                                </li>
                            ))}</ul>
                    </div>
                </Fragment>
            )
        }
    }

}
