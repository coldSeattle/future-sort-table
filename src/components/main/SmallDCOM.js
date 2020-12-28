import React, { Component, useCallback, useEffect } from "react";
import axios from "axios";
import {
  getSmallData,
  handleFiltered,
  handleSort,
  handleSortIcon,
  SMALL_DATA_API,
} from "../../helpers/helpers";
import "./index.scss";
import { FilterForm } from "../FIlteration";
import { Table } from "../Table/Table";

class SmallDCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      value: "",
      ascending: false,
      filteredData: null,
      isLoading: false,
    };
    this._isMounted = false;
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onFilterHandler = this.onFilterHandler.bind(this);
    this.onSortHandle = this.onSortHandle.bind(this);
    this.AddNewCell = this.AddNewCell.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;

    const response = await getSmallData();
    if (this._isMounted) {
      this.setState((state, props) => ({
        data: response.data,
        filteredData: response.data,
        isLoading: true,
        totalDataLength: response.data.length,
        isLoading: false,
      }));
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSortHandle() {
    if (!this.state.ascending) {
      return this.setState((state, props) => ({
        filteredData: handleSort(state.filteredData).ascending,
        ascending: true,
      }));
    }
    if (this.state.ascending) {
      return this.setState((state, props) => ({
        filteredData: handleSort(state.filteredData).descending,
        ascending: false,
      }));
    }
  }

  onFilterHandler() {
    this.setState({ isLoading: true });

    const val = this.state.value && this.state.value.toLowerCase();

    const filtered = this.state.data.filter((item) =>
      handleFiltered(item, this.state.value)
    );
    this.setState((state, props) => ({
      filteredData: filtered,
      isLoading: false,
    }));
  }

  AddNewCell(newItem) {
    const res = this.state.data && this.state.data.slice();

    if (res[0].id == newItem.id) return;

    res.unshift(newItem);

    this.setState((state, props) => ({
      data: res,
      filteredData: res,
    }));
  }

  onChangeHandler(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="bigdcom">
        <FilterForm
          onChangeHandler={this.onChangeHandler}
          onFilterHandler={this.onFilterHandler}
          value={this.state.value}
        />

        <Table
          data={this.state.filteredData}
          isLoading={this.state.isLoading}
          onSortHandle={this.onSortHandle}
          handleAddNewCell={this.AddNewCell}
        />
      </div>
    );
  }
}
export default SmallDCom;
