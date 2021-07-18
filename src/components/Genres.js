import { Link } from "react-router-dom";
import React, { Component, Fragment } from "react";

export default class Genres extends Component {
  state = { genres: [], isLoaded: false, error: null };

  componentDidMount() {
    fetch("http://localhost:4000/v1/genres")
      // .then(response => response.json())
      .then((response) => {
        console.log("Status code is ", response.status);
        if (response.status !== "200") {
          let err = Error;
          err.message = "Invalid response code: " + response.status;
          this.setState({ error: err });
        }
        return response.json();
      })
      .then((json) => {
        this.setState(
          {
            genres: json.genres,
            isLoaded: true,
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      });
  }

  render() {
    const { genres, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading....</p>;
    } else {
      return (
        <Fragment>
          <div>
            <h2>Genres</h2>
            <div className="list-group">
              {genres.map((m, index) => (
                <Link
                  key={index}
                  to={{
                    pathname: `/genre/${m.id}`,
                    genre_name: m.genre_name,
                  }}
                  className="list-group-item list-group-item-action"
                >
                  {m.genre_name}
                </Link>
              ))}
            </div>
          </div>
        </Fragment>
      );
    }
  }
}
