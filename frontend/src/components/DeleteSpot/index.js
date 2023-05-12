import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spot';
import { useModal } from "../../context/Modal";

const DeleteSpot = ({spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    
    
    const handleDelete = (e) => {
        e.preventDefault()
        history.push('/spots/current')
        dispatch(thunkDeleteSpot(spotId))
        .then(closeModal)
    }
  
    

    return (
        <>
        <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from listings?</p>
                <button onClick={handleDelete}>Yes (Delete Spot)</button>
                <button onClick={closeModal}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpot;