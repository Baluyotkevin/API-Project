import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpots';
import SingleSpot from './components/SingleSpot';
import CreateSpotForm from './components/CreateSpotForm';
import EditSpotForm from './components/EditSpotForm';
import DisplayCurrUserSpots from './components/ManageSpot';
import DisplayCurrUserReviews from "./components/ManageReview";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
      <Route exact path={'/'} component={AllSpots} />
      <Route exact path={'/spots/new'} component={CreateSpotForm} />
      <Route exact path={'/spots/current'} component={DisplayCurrUserSpots} />
      <Route exact path={'/spots/:spotId'} component={SingleSpot} />
      <Route exact path={'/spots/:spotId/edit'} component={EditSpotForm} />
      <Route exact path={'/reviews/current'} component={DisplayCurrUserReviews}/>
        </Switch>}
    </>
  );
}

export default App;