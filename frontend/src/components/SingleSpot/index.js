import React from "react";
import { thunkSingleSpot } from '../../store/spot';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './SingleSpot.css'

function DisplaySingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams()
    const singleSpot = useSelector(state=> {

        console.log("single spottt", state.spots.singleSpot[spotId])
        return state.spots.singleSpot[spotId]
    })
        
    // console.log("state:", singleSpot)
    
    useEffect(() => {
        dispatch(thunkSingleSpot(spotId))
    }, [dispatch])
    
    if(!singleSpot) return <p>PLEASE WAIT I"M LOADING</p>

    return (
        <div className='singleSpot-body'>
            <div className='firstContainer'>
                <div className='firstContainer-info'>
                    <h1>{singleSpot.name}</h1>
                    <p>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</p>
                </div>
                    <li className='main-image'><img src={singleSpot.SpotImages[0].url}/></li>
                <div className='firstContainer-image'>
            <ul className='spot-image-list'>
                {singleSpot.SpotImages.slice(1).map(spotImage => {
                    return (
                        <li className='allOther-images' key={spotImage.id}><img src={spotImage.url} alt='house image'/></li>
                            )
                 })}
            </ul>
                </div>
            </div>
        <div className='div-p-container'>
            <div className='owner-descrip-container'>
                <h2>Hosted By {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</h2>
                <p>{singleSpot.description}</p>
            </div>
            <div className='price-container'>
                <div className='buttonPriceContainer'>
                    <div className='reviewPrice-container'>
                        <p className='price'>${singleSpot.price} per night</p>
                        <p className='star'><i class="fa-solid fa-star"></i>{singleSpot.avgStarRating}</p>
                        <p className='numReview'>{singleSpot.numReviews} reviews</p>
                    </div>
                        <div className='button-container'>
                            <button>Reserve</button>
                        </div>
                </div>
            </div>
        </div>
        <div className='star-container'>
            <h3><i class="fa-solid fa-star"></i>{singleSpot.avgStarRating}</h3>
            <h3>{singleSpot.numReviews} reviews</h3>
        </div>

        </div>
    )
}


export default DisplaySingleSpot;