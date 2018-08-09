import React, { Component } from "react";

import { BrowserRouter } from "react-router-dom";
import { Route, Switch as RouterSwitch } from "react-router";

import "antd/dist/antd.css";
import "./App.css";

import ListModel from "./ListModel";
import CreateDocument from "./CreateDocument";
import ListComponent from "./ListComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

    this.listModel = new ListModel();
  }

  render() {
    const ListWrapped = ({ match }) => {
      console.log(match.params.id);
      return <ListComponent listId={match.params.id} listModel={this.listModel} />;
    };

    const CreateDocumentWrapper = props => {
      return <CreateDocument listModel={this.listModel} {...props} />;
    };

    return (
      <BrowserRouter>
        <RouterSwitch>
          <Route path="/:id" component={ListWrapped} />
          <Route path="/" component={CreateDocumentWrapper} />
        </RouterSwitch>
      </BrowserRouter>
    );
  }
}

export default App;
