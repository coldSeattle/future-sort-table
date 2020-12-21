import React, { Component, useCallback, useEffect } from 'react'
import { getSmallData, handleFiltered, handleSort, handleSortIcon, SMALL_DATA_API } from '../../helpers/helpers'
import axios from 'axios'
import './index.scss'
import { FilterForm } from '../FIlteration'
import { Table } from '../Table/Table'

class SmallDCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            value: "",
            ascending: false,
            filteredData: null,
            isLoading: false
        }
        this._isMounted = false;
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onFilterHandler = this.onFilterHandler.bind(this)
        this.onSortHandle = this.onSortHandle.bind(this)
        this.AddNewCell = this.AddNewCell.bind(this)
    }
    
    componentDidMount() {
        this._isMounted = true;

        return new Promise((res, rej) => {
            let response = getSmallData()
            res(response)
        }).then((response) => {
            if (this._isMounted) {
                this.setState((state, props) => ({
                    data: response.data,
                    filteredData: response.data,
                    isLoading: true,
                    totalDataLength: response.data.length
                }), () => {
                    this.setState({ isLoading: false })
                })
            }

        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSortHandle() {
        if (!this.state.ascending) {

            return this.setState((state, props) => ({
                filteredData: state.filteredData.sort((a, b) => a.id - b.id),
                ascending: true,
            }))
        }
        if (this.state.ascending) {
            return this.setState((state, props) => ({
                filteredData: state.filteredData.sort((a, b) => b.id - a.id),
                ascending: false,
            }))
        }


    
    }

    onFilterHandler() {
        this.setState({ loading: true })

        let val = this.state.value && this.state.value.toLowerCase()
        // if (!this.state.value) return;
        let filtered = this.state.data.filter(item => {

            if (!this.state.value || !item) {

                return true;
            }
            if (
                String(item.id).includes(val)
                || item.firstName.toLowerCase().includes(val)
                || item.lastName.toLowerCase().includes(val)
                || item.email.toLowerCase().includes(val)
                || item.phone.toLowerCase().includes(val)
            ) return true;


            else { return false }
        })
        this.setState((state, props) => ({
            filteredData: filtered
        }), () => {
            this.setState({ loading: true })
        })
    }

    AddNewCell(newItem) {
        console.log("new....",newItem);
        let res = this.state.data && this.state.data.slice()
        console.log("res now---", res);
        res.unshift(newItem) // unshift returns length of data array
        console.log("result-------",res);
        
        this.setState((state, props) => ({
            data: res,
            filteredData: res
        }))
        // this.formatData()
    }

    onChangeHandler(e) {
        this.setState({ value: e.target.value })
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
        )
    }

}
export { SmallDCom }