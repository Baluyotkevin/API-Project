import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spot';

const DeleteSpot = ({spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteSpot(spotId))
    }
  
    
    

    return (
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default DeleteSpot;