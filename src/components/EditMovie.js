import React, {Component, Fragment} from "react";

import "./EditMovie.css"


export default class EditMovie extends Component {
    state = {movie: {}, isLoaded: false, error: null}

    componentDidMount() {
        this.setState({
            movie: {
                title: "The Godfather",
                mpaa_rating: "R",
            }
        })
    }

    render() {
        let {movie} = this.state
        return (
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <hr/>
                <form method="post">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input id="title" name="title" type="text" className="form-control"
                               value={movie.title}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="release_date" className="form-label">Release Date</label>
                        <input id="release_date" name="release_date" type="text" className="form-control"
                               value={movie.release_date}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="runtime" className="form-label">Runtime</label>
                        <input id="runtime" name="runtime" type="text" className="form-control"
                               value={movie.runtime}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mpaa_rating" className="form-label">MPAA Rating</label>
                        <select className="form-select" value={movie.mpaa_rating}>
                            <option className="form-select">Choose...</option>
                            <option className="form-select" value="G">G</option>
                            <option className="form-select" value="PG">PG</option>
                            <option className="form-select" value="PG13">PG13</option>
                            <option className="form-select" value="R">R</option>
                            <option className="form-select" value="NC17">NC17</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input id="rating" name="rating" type="text" className="form-control"
                               value={movie.rating}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" name="description" className="form-control"
                                  rows="3"
                                  value={movie.description}/>
                    </div>

                    <hr/>
                    <button className="btn btn-primary">Save</button>
                </form>
            </Fragment>
        );
    }
}
