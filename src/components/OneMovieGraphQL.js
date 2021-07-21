import React, {Component, Fragment} from "react";

export default class OneMovieGraphQL extends Component {
  state = { movie: {}, isLoaded: false, error: null };

  componentDidMount() {
    const payload = `
            {
                movie(id: ${this.props.match.params.id}) {
                    id
                    title
                    runtime
                    year
                    description
                    release_date
                    rating
                    mpaa_rating
                    poster
                }
            }`;
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body: payload,
      headers: myHeader,
    };

    fetch(`${process.env.REACT_APP_API_URL}/v1/graphql`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movie: data.data.movie,
          isLoaded: true,
        });
      });
  }

  render() {
    const { movie, isLoaded, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading....</p>;
    } else {
      return (
        <Fragment>
          <h2>
            Movie: {movie.title} {movie.year}
          </h2>

          {movie.poster !== "" && (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                alt="poster"
              />
            </div>
          )}

          <div className="float-start">
            <small>Rating: {movie.mpaa_rating}</small>
          </div>
          {/* <div className="float-end">
            {movie.genres.map((m, index) => (
              <span className="badge bg-secondary me-1" key={index}>
                {m}
              </span>
            ))}
          </div> */}
          <div className="clearfix" />
          <hr />
          <table className="table table-compact table-striped">
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <strong>Title:</strong>
                </td>
                <td>{movie.title}</td>
              </tr>
              <tr>
                <td>
                  <strong>Runtime:</strong>
                </td>
                <td>{movie.runtime} minutes</td>
              </tr>
              <tr>
                <td>
                  <strong>Description:</strong>
                </td>
                <td>{movie.description} minutes</td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      );
    }
  }
}