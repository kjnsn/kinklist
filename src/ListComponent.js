import React, { Component } from "react";
import { List, Switch } from "antd";
import { List as ImmutableList } from "immutable";

class ListComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: ImmutableList()
      };
  }

  componentDidMount() {
    this.props.listModel.getList(this.props.listId).then((listData) => {
        console.log(listData)
        this.setState({
            data: ImmutableList(listData)
        });
    })
  }

  onItemChanged(index) {
    return () => {
      const option = this.state.data.get(index);
      const newData = this.state.data.set(
        index,
        Object.assign({}, option, { enabled: !option.enabled })
      );
      this.setState({
        data: newData, 
      });

      // Update the datastore.
      this.props.listModel.updateList(this.props.listId, newData.toJSON());
    };
  }

  renderItem(item, index) {
    return (
      <List.Item>
        <span className="option-label">{item.title}</span>
        <Switch
          checked={item.enabled}
          onChange={this.onItemChanged(index).bind(this)}
        />
      </List.Item>
    );
  }
  render() {
    return (
      <List
        bordered
        dataSource={this.state.data}
        renderItem={this.renderItem.bind(this)}
      />
    );
  }
}

export default ListComponent;
