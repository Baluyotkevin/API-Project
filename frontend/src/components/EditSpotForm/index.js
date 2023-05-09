import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { } from '../../store/spot';
import SpotForm from '../SpotForm';

const EditSpotForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch()
    const spot = useSelector(state => {
        console.log("THIS IS MY  STAAATE",state)
        return state
    })

    useEffect(() => {
        dispatch(thunkEditSpot(spotId))
    })

    if(!spot) return <>Spot not found</>

    return (
        Object.keys(spot).length > 1 && (
       <>
        <SpotForm
        spot={spot}
        formType={'Update your Spot'}
        />
       </>

        )
    )
}

export default EditSpotForm;