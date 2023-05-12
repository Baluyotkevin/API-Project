import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateReview } from '../../store/review';
import { thunkSingleSpot } from '../../store/spot';
import './CreateReviewForm.css';
import { useModal } from "../../context/Modal";

const ReviewForm = ({disabled, spotId}) => {
    const dispatch = useDispatch();
    const [rev, setRev] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        const revObj = {
            spotId: spotId,
            review: rev,
            stars
        }
        console.log(spotId)
        
        const newReview = await dispatch(thunkCreateReview(revObj))
        if (newReview.errors) {
            setErrors(newReview.errors)
        } else {
            closeModal()
            dispatch(thunkSingleSpot(spotId))
        }
    }    

    return (
            <div>
                <form onSubmit={handleSubmit}>
                <h1>How was your stay?</h1>
                <textarea 
                placeholder='Leave your review here...'
                type='text'
                value={rev}
                onChange={(e) => setRev(e.target.value)}
                cols='30'
                rows='5'
                />
                <div className='errors'>{errors.review}</div>
            <div className='star-input'>
                <div
            className={stars >= 1 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(1)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(1)} }
            value={1}
            >
        <i className="fa-regular fa-star"></i>
      </div>
                 <div
            className={stars >= 2 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(2)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(2)} }
            value={2}
            >
        <i className="fa-regular fa-star"></i>
                </div>
                <div
            className={stars >= 3? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(3)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(3)} }
            value={3}
            >
        <i className="fa-regular fa-star"></i>
      </div>
                <div
            className={stars >= 4 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(4)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(4)} }
            value={4}
            >
        <i className="fa-regular fa-star"></i>
      </div>
                <div
            className={stars >= 5 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(5)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(5)} }
            value={5}
            >
        <i className="fa-regular fa-star"></i>
      </div> 
      </div>
      <div className='errors'>{errors.stars}</div>
                <div>
                <button type="submit">Submit Your Review</button>
                </div>
                </form>
            </div>
    )
}

export default ReviewForm;