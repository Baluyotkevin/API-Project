import React from "react";
import { thunkAllSpots } from '../../store/spot';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './AllSpots.css';

function DisplayAllSpots() {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => {
        return state.spots.allSpots
    })
    console.log("object :", allSpots)
   
    useEffect(() => {
        dispatch(thunkAllSpots())
    }, [dispatch])
    
    return (
        <div className='allSpots-container'>
        {Object.values(allSpots).map(oneSpot => {
            // console.log(oneSpot)
            return (
                <div key={oneSpot.id} className='oneSpot-container'>
                    <div className="preview-image">
                        <img src={oneSpot.previewImage} />
                    </div>
                    <div className='spotDetails-container'>
                        <div>
                        <p>{oneSpot.city}, {oneSpot.state}</p>
                        <p>{oneSpot.price}</p>
                            </div>
                    <div className='rating-container'>
                        <p>{oneSpot.avgRating}</p>
                    </div>
                    </div>
                </div>
            )
        })}
        </div>
    )
}


export default DisplayAllSpots