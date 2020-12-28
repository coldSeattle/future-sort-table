import React, { Component } from "react";
import { getBigData } from "../../helpers/helpers";
import { FilterForm } from "../FIlteration";
import PaginationTable from "../Pagination/Pagination";
import { Table } from "../Table/Table";
import "./index.scss";

class BigDCOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      value: "",
      ascending: false,
      filteredData: null,
      totalDataLength: "",
      currentPage: 1,
      perPage: 50,
      isLoading: false,
      newCell: {},
    };

    this._isMounted = false;
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onFilterHandler = this.onFilterHandler.bind(this);
    this.onSortHandle = this.onSortHandle.bind(this);
    this.AddNewCell = this.AddNewCell.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;

    const response_1 = await new Promise((res, rej) => {
      const response = getBigData();
      res(response);
    });
    try {
      if (this._isMounted) {
        this.setState(
          () => ({
            data: response_1.data,
            filteredData: response_1.data,
            isLoading: true,
            totalDataLength: response_1.data.length,
          }),
          () => {
            this.formatData();
            this.setState({ isLoading: false });
          }
        );
      }
    } catch (error) {
      alert("someting went wrong, please refresh page! ERROR: ", error);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClick(number) {
    this.setState(
      () => ({
        loading: true,
        currentPage: Number(number),
      }),
      () => {
        this.formatData();
        this.setState({ loading: false });
      }
    );
  }

  formatData() {
    const indexOfLastPost = this.state.currentPage * this.state.perPage;
    const indexOfFirstPage = indexOfLastPost - this.state.perPage;

    const currentPosts = this.state.data.slice(
      indexOfFirstPage,
      indexOfLastPost
    );

    this.setState({ filteredData: currentPosts });
  }

  onSortHandle() {
    const indexOfLastPost = this.state.currentPage * this.state.perPage;
    const indexOfFirstPage = indexOfLastPost - this.state.perPage;

    if (!this.state.ascending) {
      this.formatData();
      return this.setState((state, props) => ({
        filteredData: state.data
          .slice(indexOfFirstPage, indexOfLastPost)
          .sort((a, b) => a.id - b.id),
        ascending: true,
      }));
    }
    if (this.state.ascending) {
      this.formatData();
      return this.setState((state, props) => ({
        filteredData: state.data
          .slice(indexOfFirstPage, indexOfLastPost)
          .sort((a, b) => b.id - a.id),
        ascending: false,
      }));
    }
  }

  onFilterHandler() {
    this.setState({ loading: true });

    const val = this.state.value && this.state.value.toLowerCase();
    if (!this.state.value) return;
    const filtered = this.state.data.filter((item) => {
      if (!this.state.value || !item) {
        return true;
      }
      if (
        String(item.id).includes(val) ||
        item.firstName.toLowerCase().includes(val) ||
        item.lastName.toLowerCase().includes(val) ||
        item.email.toLowerCase().includes(val) ||
        item.phone.toLowerCase().includes(val)
      )
        return true;

      return false;
    });
    this.setState(
      (state, props) => ({
        filteredData: filtered,
      }),
      () => {
        this.setState({ loading: true });
        // this.formatData()
      }
    );
  }

  AddNewCell(newItem) {
    const res = this.state.data && this.state.data.slice();

    if (res[0].id == newItem.id) return;

    res.unshift(newItem); // unshift returns length of data array

    this.setState(
      (state, props) => ({
        data: res,
      }),
      () => {
        this.formatData();
      }
    );
  }

  onChangeHandler(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="bigdcom">
        <FilterForm
          onChangeHandler={this.onChangeHandler.bind(this)}
          onFilterHandler={this.onFilterHandler}
          value={this.state.value}
        />

        {this.state.totalDataLength && (
          <PaginationTable
            per_page={this.state.perPage}
            current_page={Number(this.state.currentPage)}
            total_data={this.state.totalDataLength}
            handleClick={this.handleClick}
          />
        )}
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

export default BigDCOM;
