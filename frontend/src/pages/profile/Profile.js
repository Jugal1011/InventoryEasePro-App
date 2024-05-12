import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/authService';
import { SET_NAME, SET_USER } from '../../redux/features/authSlice';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import { SpinnerImg } from '../../components/loader/Loader';

const Profile = () => {
  useRedirectLoggedOutUser("/app/login-user");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    setIsLoading(true)
    async function getUserData(){
        const data = await getUser();
        setProfile(data);
        setIsLoading(false);
        dispatch(SET_USER(data));
        dispatch(SET_NAME(data.name));
    }

    getUserData();
  }, [dispatch])

  return (
    <div className="profile --my2">
    {isLoading && <SpinnerImg />}
    <>
      {!isLoading && profile === null ? (
        <p>Something went wrong, please reload the page...</p>
      ) : (
        <Card cardClass={"card --flex-dir-column"}>
          <span className="profile-photo">
            <img src={profile?.photo} alt="profilepic" />
          </span>
          <span className="profile-data">
            <p>
              <b>Name : </b> {profile?.name}
            </p>
            <p>
              <b>Email : </b> {profile?.email}
            </p>
            <p>
              <b>Phone : </b> {profile?.phone}
            </p>
            <p>
              <b>Bio : </b> {profile?.bio}
            </p>
            <div>
              <Link to="/app/account/edit-profile">
                <button className="--btn --btn-primary">Edit Profile</button>
              </Link>
            </div>
          </span>
        </Card>
      )}
    </>
  </div>
  )
}

export default Profile