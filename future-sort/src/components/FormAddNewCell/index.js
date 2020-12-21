import React from 'react'

const FormAddNewCell = ({setShowAddForm,showAddForm, newCellData, onChangeHandler, handleAddNewCell, disabled}) => {

    return (
        <div className="form_add_new_cell">
            <button
                className="btn btn--show-form"
                onClick={() => setShowAddForm(true)}
            >add new Cell</button>
            {showAddForm &&
                <>
                    <table>
                        <thead>

                            <tr className="table__title">
                                <th> id </th>
                                <th> firstName </th>
                                <th> lastName </th>
                                <th> email </th>
                                <th> phone </th>
                            </tr>
                        </thead>

                    </table>
                    <div>
                        <input className="input" name="id" value={newCellData.id} onChange={event => onChangeHandler(event)} />
                        <input className="input" name="firstName" value={newCellData.firstName} onChange={event => onChangeHandler(event)} />
                        <input className="input" name="lastName" value={newCellData.lastName} onChange={event => onChangeHandler(event)} />
                        <input className="input" name="email" value={newCellData.email} onChange={event => onChangeHandler(event)} />
                        <input className="input" name="phone" value={newCellData.phone} onChange={event => onChangeHandler(event)} />
                    </div>
                    <button
                        disabled={disabled}
                        onClick={() => handleAddNewCell(newCellData)}
                    >Save</button>
                </>
            }

        </div>
    )
}

export { FormAddNewCell }