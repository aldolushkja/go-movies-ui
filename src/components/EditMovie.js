import React, {Component, Fragment} from "react";

import Input from "./form-components/Input";
import "./EditMovie.css"
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";
import Alert from "./ui-components/Alert";


export default class EditMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                rating: "",
                description: "",
            },

            mpaaOptions: [
                {id: "G", value: "G"},
                {id: "PG", value: "PG"},
                {id: "PG13", value: "PG13"},
                {id: "R", value: "R"},
                {id: "NC17", value: "NC17"},
            ],
            isLoaded: false,
            error: null,
            errors: [],
            alert: {
                type: "d-none",
                message: "",
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        // client side validation
        let errors = [];

        if (this.state.movie.title === "") {
            errors.push("title");
        }

        this.setState({errors: errors})

        if (errors.length > 0) {
            return false;
        }

        const data = new FormData(evt.target)
        const payload = Object.fromEntries(data.entries())
        console.log(payload)

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(payload)
        }

        fetch("http://localhost:4000/v1/admin/editmovie", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.setState({
                        alert: {
                            type: "alert-danger",
                            message: data.error.message
                        }
                    })
                } else {
                    this.setState({
                        alert: {
                            type: "alert-success",
                            message: "Changes saved!"
                        }
                    })
                }
            })
    }

    handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState((prevState) => ({
            movie: {
                ...prevState.movie,
                [name]: value
            }
        }))
    }

    hasError = (key) => {
        return this.state.errors.indexOf(key) !== -1;
    }

    componentDidMount() {
        const id = this.props.match.params.id
        if (id > 0) {
            fetch("http://localhost:4000/v1/movie/" + id)
                .then(response => {
                    if (response.status !== "200") {
                        let err = Error;
                        err.Message = "Invalid response code: " + response.status
                        this.setState({error: err})
                    }
                    return response.json()
                })
                .then(json => {
                        console.log(json)
                        const movie = json.movie
                        const releaseDate = new Date(movie.release_date);
                        this.setState({
                            movie: {
                                id: id,
                                title: movie.title,
                                release_date: releaseDate.toISOString().split("T")[0],
                                runtime: movie.runtime,
                                mpaa_rating: movie.mpaa_rating,
                                rating: movie.rating,
                                description: movie.description
                            }, isLoaded: true, error: null
                        })
                    }, (error) => {
                        this.setState({isLoaded: true, error: error})
                    }
                )
        } else {
            this.setState({isLoaded: true})
        }
    }

    render() {
        let {movie, isLoaded, error} = this.state
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading....</p>
        } else {
            return (
                <Fragment>
                    <h2>{movie.id === 0 ? "Add" : "Edit"} Movie</h2>
                    <Alert
                        alertType={this.state.alert.type}
                        alertMessage={this.state.alert.message}/>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden" name="id" id="id" value={movie.id} onChange={this.handleChange}/>
                        <Input
                            id={"title"}
                            title={"Title"}
                            className={this.hasError("title") ? "is-invalid" : ""}
                            name={"title"}
                            value={movie.title}
                            handleChange={this.handleChange}
                            errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                            errorMsg={"Please enter a title"}
                        />
                        <Input id={"release_date"} title={"Release Date"} name={"release_date"}
                               value={movie.release_date}
                               type={"date"}
                               handleChange={this.handleChange}/>
                        <Input id={"runtime"} title={"Runtime"} name={"runtime"} value={movie.runtime}
                               type={"text"}
                               handleChange={this.handleChange}/>

                        <Select title={"MPAA Rating"} name={"mpaa_rating"} value={movie.mpaa_rating}
                                handleChange={this.handleChange}
                                placeholder={"Choose..."}
                                id={"mpaa_rating"} mpaaOptions={this.state.mpaaOptions}/>

                        <Input id={"rating"} title={"Rating"} name={"rating"} value={movie.rating}
                               type={"text"}
                               handleChange={this.handleChange}/>

                        <TextArea id={"description"} title={"Description"} name={"description"}
                                  value={movie.description}
                                  rows={"3"} handleChange={this.handleChange}/>
                        <hr/>
                        <button className="btn btn-primary">{movie.id === 0 ? "Save" : "Edit"}</button>
                    </form>

                    {/*<div className="mt-3">*/}
                    {/*    <pre>{JSON.stringify(this.state, null, 3)}</pre>*/}
                    {/*</div>*/}
                </Fragment>
            );
        }
    }
}
