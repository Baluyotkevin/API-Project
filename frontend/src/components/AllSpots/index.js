import React from "react";
import { thunkAllSpots } from '../../store/spot';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './AllSpots.css';

function DisplayAllSpots() {
    const dispatch = useDispatch();
    const allSpots = useSelector(state => {
        // console.log("THUS MY STATE",state.spots.allSpots)
        return state.spots.allSpots
    })
   
    useEffect(() => {
        dispatch(thunkAllSpots())
    }, [dispatch])

    if(!allSpots) return <div>I AM LOOOOOOADDDING PLEASE BE PATIENTTTT</div>
    
    return (
        <div className='allSpots-allSpots-container'>
        <div className='allSpots-container'>
        {Object.values(allSpots).map(oneSpot => {
            return (
                        <Link exact to={`/spots/${oneSpot.id}`}>
                <div key={oneSpot.id} className='oneSpot-container'>
                    <div className="preview-image" title={oneSpot.name}>
                        <img src={oneSpot.previewImage} />
                    </div>
                    <div className='spotDetails-container'>
                        <div className='info-container'>
                            <p>{oneSpot.city}, {oneSpot.state}</p>
                            <p>$ {oneSpot.price} night</p>
                        </div>
                        <div className='rating-container'>
                            <p className='allSpotRate'><i class="fa-solid fa-star"></i>{oneSpot.avgRating && oneSpot.avgRating !== 'New' ? oneSpot.avgRating.toFixed(2) : 'New'}</p>
                        </div>
                    </div>
                </div>
                    </Link>
            )
        })}
        </div>
        </div>
    )
}


export default DisplayAllSpots