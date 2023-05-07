import React from "react";
import thunkAllSpots from '../../store/spot';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';




function DisplayAllSpots() {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => Object.values(state.spots.allSpots))
    // console.log(allSpots)

    useEffect(() => {
        dispatch(thunkAllSpots())
    }, [dispatch])

    return (
        <>
        {allSpots.map(spots => {
            return (
                <>
                <p>{spots}</p>
                </>
            )
        })}
        </>
    )
}


export default DisplayAllSpots