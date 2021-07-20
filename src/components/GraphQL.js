import React, { Component, Fragment } from "react";

export default class GraphQL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoaded: false,
      error: null,
      alert: {
        type: "d-none",
        message: "",
      },
    };
  }

  componentDidMount() {
    const payload = `
            {
                list {
                    id
                    title
                    runtime
                    year
                    description
                }
            }`;

    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: payload,
      headers: myHeader,
    };

    fetch("http://localhost:4000/v1/graphql/list", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let theList = Object.values(data.data.list);
        return theList;
      })
      .then((theList) => {
        console.log(theList);
        this.setState({
          movies: theList,
          isLoaded: true,
        });
      });
  }

  render() {
    let movies = this.state.movies;
    return (
      <Fragment>
        <h2>Search with GraphQL</h2>
        <hr />
        <div className="list-group">
          {movies.map((movie) => (
            <a
              key={movie.id}
              className="list-group-item list-group-item-action"
              href="#!"
            >
              <strong>{movie.title}</strong> <br />
              <small className="text-muted">
                ({movie.year}) - {movie.runtime} minutes
              </small>
              <br />
              {movie.description.slice(0, 100)}...
            </a>
          ))}
        </div>
      </Fragment>
    );
  }
}
