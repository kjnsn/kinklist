import React, { Component } from "react";

class CreateDocument extends Component {
    componentDidMount() {
        console.log(this.props)

        this.props.listModel.createList().then(listID => {
            this.props.history.push("/" + listID);
        });
    }

    render() {
        return <span>Loading...</span>;
    }
}

export default CreateDocument;