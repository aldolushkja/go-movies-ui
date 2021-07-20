import React, { Component, Fragment } from "react";
import Input from "./form-components/Input";
import { Link } from "react-router-dom";

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
      searchTerm: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    this.setState((prevState) => ({
      [name]: value,
    }));

    this.performSearch();
  };

  performSearch = () => {
    const payload = `
            {
                search(titleContains: "${this.state.searchTerm}") {
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

    fetch("http://localhost:4000/v1/graphql", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let theList = Object.values(data.data.search);
        return theList;
      })
      .then((theList) => {
        console.log(theList);
        if (theList.length > 0) {
          this.setState({
            movies: theList,
          });
        } else {
          this.setState({
            movies: [],
          });
        }
      });
  };

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

    fetch("http://localhost:4000/v1/graphql", requestOptions)
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
        <Input
          type="text"
          title="Search"
          name="searchTerm"
          value={this.state.searchTerm}
          handleChange={this.handleChange}
        />
        <div className="list-group">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              className="list-group-item list-group-item-action"
              to={`/moviegraphql/${movie.id}`}
            >
              <strong>{movie.title}</strong> <br />
              <small className="text-muted">
                ({movie.year}) - {movie.runtime} minutes
              </small>
              <br />
              {movie.description.slice(0, 100)}...
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
}
