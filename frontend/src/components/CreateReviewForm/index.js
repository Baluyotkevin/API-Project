import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateReview, thunkAllReviewsSpot } from '../../store/review';
import './CreateReviewForm.css';
import { useModal } from "../../context/Modal";
import { thunkSingleSpot } from '../../store/spot';

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
            stars: stars
        }
        console.log(spotId)
        
        const newReview = await dispatch(thunkCreateReview(revObj))
        
        if (newReview.errors) {
            setErrors(newReview.errors)
        } else {
            dispatch(thunkSingleSpot(spotId))
            dispatch(thunkAllReviewsSpot(spotId))
            closeModal()
        }   
    }    

    return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>How was your stay?</h1>
                {errors.message}
                <textarea 
                className='review-input'
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
            onMouseLeave={() => { if (!disabled) setStars(1)} }
            onClick={() => { if (!disabled) parseInt(1)} }
            // value={stars}
            >
                <i className="fa-regular fa-star"></i>
      </div>
                 <div
            className={stars >= 2 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(2)} }
            onMouseLeave={() => { if (!disabled) setStars(2)} }
            onClick={() => { if (!disabled) parseInt(2)} }
            // value={stars}
            >
        <i className="fa-regular fa-star"></i>
                </div>
                <div
            className={stars >= 3? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(3)} }
            onMouseLeave={() => { if (!disabled) setStars(3)} }
            onClick={() => { if (!disabled) parseInt(3)} }
            // value={stars}
            >
        <i className="fa-regular fa-star"></i>
      </div>
                <div
            className={stars >= 4 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(4)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(4)} }
            // value={stars}
            >
        <i className="fa-regular fa-star"></i>
      </div>
                <div
            className={stars >= 5 ? "filled" : "empty"}
            onMouseEnter={() => { if (!disabled) setStars(5)} }
            onMouseLeave={() => { if (!disabled) setStars(stars)} }
            onClick={() => { if (!disabled) parseInt(5)} }
            // value={stars}
            >
        <i className="fa-regular fa-star"></i>
      </div> 
      <h4 className='starText'>Stars</h4>
      </div>
      <div className='errors'>{errors.stars}</div>
                <div>
                <button className='submit-button' type="submit" disabled={stars < 0 || rev.length < 10}>Submit Your Review</button>
                </div>
                </form>
            </div>
    )
}

export default ReviewForm;