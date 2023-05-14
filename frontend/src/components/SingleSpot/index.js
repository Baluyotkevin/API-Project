import React from "react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { thunkAllSpots, thunkSingleSpot } from '../../store/spot';
import { thunkAllReviewsSpot, thunkCurrUserReviews, thunkDeleteReview } from '../../store/review';
import EditReview from "../EditReview";
import DeleteReview from "../DeleteReview";
import OpenModalButton from "../OpenModalButton";
import ReviewForm from "../CreateReviewForm";
import './SingleSpot.css'

function DisplaySingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams()
    const currUser = useSelector(state => {
        return state.session.user
    })
    const singleSpot = useSelector(state=> {
        return state.spots.singleSpot[spotId]
    })
    const allReviews = useSelector(state => {
        return state.reviews.spot
    })
    // const currUserReview = useSelector(state => {
    //     console.log("this my state", state)
    //     return state.reviews.user
    // })
    const checkReviews = [];
    Object.values(allReviews).forEach(rev=> checkReviews.push(rev.userId))
    console.log("WHAT IS THISSSSS", singleSpot)

    useEffect(() => {
        dispatch(thunkSingleSpot(spotId))
        dispatch(thunkAllReviewsSpot(spotId))
        
        // dispatch(thunkCurrUserReviews())
        // dispatch(thunkAllSpots())
    }, [dispatch, spotId])

    if(!singleSpot || !allReviews) return <p>PLEASE WAIT I"M LOADING</p>

    
    return (
        <div className='singleSpot-body'>
            <div className='firstContainer'>
                <div className='firstContainer-info'>
                    <h1>{singleSpot.name}</h1>
                    <p>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</p>
                </div>
                    <div className='allImages-container'>
                    <div className='main-image'>
                        <img src={singleSpot?.SpotImages?.[0].url}/>
                    </div>

            <ul className='spot-image-list'>
                {Array.isArray(singleSpot.SpotImages) && singleSpot.SpotImages.slice(1).map(spotImage => {
                    return (
                        <li className='allOther-images' key={spotImage.id}><img src={spotImage.url} alt='house image'/></li>
                            )
                 })}
            </ul>
                </div>

                    </div>
        <div className='div-p-container'>
            <div className='owner-descrip-container'>
                <h2>Hosted By {singleSpot?.Owner?.firstName} {singleSpot.Owner?.lastName}</h2>
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
                            <button onClick={() => alert('Feature coming soon...')}>Reserve</button>
                        </div>
                </div>
            </div>
        </div>
        <div className='star-container'>
            <h3><i className="fa-solid fa-star"></i>{singleSpot.avgStarRating}</h3>
            <p className='dot'>.</p>
            <h3>{singleSpot.numReviews} reviews</h3>
        </div>
                <div className='postReview-button'>
                    {currUser ? ((checkReviews.includes(currUser.id) || currUser.id === singleSpot.ownerId) ? 
                    null
                     :
                    <OpenModalButton
                     buttonText='Post Your Review'
                    modalComponent={<ReviewForm 
                       disabled={false}
                        spotId={singleSpot.id}
                                    />}
                  />) : <p>Need to be logged in to post a review!</p> }
                </div>
        <div className='reviews-container'>

            {Object.values(allReviews).reverse().map(review => {
                // {dispatch(thunkAllReviewsSpot(review.spotId))}
                return (
                    <div>
                        <h5>{review?.User?.firstName}</h5>
                        <h5>{review?.createdAt?.slice(0, 10)}</h5>
                        <p>{review?.review}</p>
                        {/* {review.userId === currUser.id ? } */}
                        <div className='spot-delete-button'>
                        {!currUser ? null : (currUser.id === review.userId ?
                            <OpenModalButton
                            buttonText='Update'
                            modalComponent={<EditReview disabled={false} review={review}/>}
                            /> : null)
                            
                        }
                        {!currUser ? null : (currUser.id === review.userId ?
                            <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteReview reviewId={review}/>} />
                            : null
                            )
                        }
                            </div>
                    </div>
                )
            })}
        </div>

        </div>
    )
        
}


export default DisplaySingleSpot;