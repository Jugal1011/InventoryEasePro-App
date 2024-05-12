import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services/authService";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { email } = user;

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/app/account/profile");
    }
  }, [email, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Handle Image Upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpeg")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "jugal1011");
        image.append("upload_preset", "m3c6cty0");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/jugal1011/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

      // Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };

      const data = await updateUser(formData);
      console.log(data);
      toast.success("User updated");
      navigate("/app/account/profile");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <p className="bio-block">Bio:</p>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      {/* <ChangePassword /> */}
    </div>
  );
};

export default EditProfile;
