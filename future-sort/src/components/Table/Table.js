import React from 'react'
import { DefButton } from '../Buttons/DefButton'
import { FormAddNewCell } from '../FormAddNewCell'
import './index.scss'

const Table = ({ onSortHandle, isLoading, data, handleAddNewCell }) => {



    const [moreInfo, setMoreInfo] = React.useState(null)
    const [showAddForm, setShowAddForm] = React.useState(false)
    const [newCellData, setNewCellData] = React.useState({
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    })

    const isEnabled = newCellData.id.length > 0
        && newCellData.firstName.length > 0
        && newCellData.lastName.length
        && newCellData.email.length
        && newCellData.phone.length;


    React.useEffect(() => {
        console.log('moreInfo', moreInfo);
        console.log('data', data);
        console.log('newCellData', newCellData, Object.keys(newCellData).length);

    }, [moreInfo, data, newCellData])



    const handleMoreInfoByTableData = id => {
        let result = data.filter(item => item.id == id)
        data && setMoreInfo(result)
    }



    const onChangeHandler = (event) => {
        setNewCellData({
            ...newCellData,
            [event.target.name]: event.target.value
        })
    }



    return (
        <div>
            <FormAddNewCell
                disabled={!isEnabled}
                handleAddNewCell={handleAddNewCell}
                newCellData={newCellData}
                onChangeHandler={onChangeHandler}
                setShowAddForm={setShowAddForm}
                showAddForm={showAddForm}
            />

            <table className="bigcom__table" width="100%" cellPadding="5">

                <thead>

                    <tr onClick={() => onSortHandle()} className="table__title">
                        <th> id </th>
                        <th> firstName </th>
                        <th> lastName </th>
                        <th> email </th>
                        <th> phone </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data && !isLoading ? data.map(item => (

                            <React.Fragment key={item.id + item.firstName + item.lastName}>
                                <tr
                                    onClick={() => handleMoreInfoByTableData(item.id)}
                                    className="table__data"
                                >
                                    <td>{item.id}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            </React.Fragment>
                        ))
                            : <p>loading...</p>
                    }
                </tbody>

            </table>
            <div className="more_info">

                {moreInfo && moreInfo.map((item) => (
                    <React.Fragment key={item.id + item.firstName + item.lastName}>
                        <p className="more_info__userName">Выбран пользователь <b>{item.firstName + ' ' + item.lastName}</b></p>
                        <p>Описание:</p>
                        {item.description && <textarea defaultValue={item.description} />}
                        {
                            item.address &&
                            item.address.streetAddress && <p>Адрес проживания: <b>{item.address.streetAddress}</b> </p> &&
                            item.address.city && <p>Город: <b>{item.address.city}</b> </p> &&
                            item.address.state && <p>Провинция/штат: <b>{item.address.state}</b> </p> &&
                            item.address.zip && <p>Индекс: <b>{item.address.zip}</b> </p>
                            
                        }

                    </React.Fragment>
                ))
                }

            </div>
        </div>
    )
}

export { Table }
