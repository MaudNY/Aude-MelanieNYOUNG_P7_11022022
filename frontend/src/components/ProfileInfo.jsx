import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authApi from '../api/auth';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ProfileInfo() {

    // SHOW PROFILE
    const { id } = useParams();
    const [ profile, setProfile ] = useState([]);
    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ profileOptions, setProfileOptions ] = useState(false);

    useEffect(() => {
        
        authApi.get(`/profile/${ id }`)
            .then((res) => {
                console.log("UTILISATEUR :", res.data);
                localStorage.setItem("firstName", res.data.firstName);
                localStorage.setItem("lastName", res.data.lastName);


                return setProfile(res.data);
            })
            .catch(error => {
                
                console.log(error);
            })
    }, [id]);

    // UPDATE PROFILE
    
    // Get input values
    const inputValues = { 
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        job: "",
        department: "",
        bio: ""
    };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from input values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });

        console.log("FORM VALUES :", { ...formValues });

        return {...formValues};
    };

    // --- SAVE CHANGES --- //
    const saveUpdates = (e) => {
        e.preventDefault();

        const profileDetails = { ...formValues };
        console.log("NEW FORM ? :", profileDetails);

        authApi.put(`/updateprofile/${ id }`, profileDetails)
            .then(() => {

                return window.location.reload(false);
            })
            .catch(error => {
                
                console.log(error);
            })
    };

    // UPDATE PROFILE PICTURE
    const [ image, setImage ] = useState();
    const [ preview, setPreview ] = useState(null);

    // Get profile picture file details
    const previewFile = (e) => {
        const {name, value} = e.target;
        console.log("TARGET ?", { name, value });
        const file = e.target.files[0];
        

        if (file) {
            setImage(file && file.type.substr(0, 5) === "image");
        } else {
            setImage(null);
        }
    };

    // Cancel profile pic update
    const cancelPicUpdate = (e) => {
        setImage(null);
        setPreview(null);
    }

    // Display file preview
    useEffect(() => {

        if (image) {
            const file = document.querySelector("#updated-profile-pic").files[0];
            console.log("Fichier en PREVIEW = ", file);

            const reader = new FileReader(file);
            reader.onloadend = () => {
                setPreview(reader.result)
            };
            reader.readAsDataURL(file);
        
        } else {
            setPreview(null);
        }

    }, [image]);

    // Update and save profile picture

    const updateProfilePic = (e) => {
        e.preventDefault();
        const newProfilePic = document.querySelector("#updated-profile-pic").files[0];
        let formData = new FormData();
        formData.append("image", newProfilePic);
        console.log("HEEEEEY :", formData);

        authApi.put(`/updateprofilepic/${ id }`, formData)
            .then(response => {
                localStorage.setItem("profileImageUrl", response.data.profileImageUrl);
                
                return window.location.reload(false);
            })
            .catch(error => {
                
                console.log(error);
            })
    };
    
    return (
        <section id="profile">
            { isUpdated === true
            ?
            <>
            <div className="profile-background">
                <button type="button" id="save-profile-btn" onClick={ saveUpdates }>Enregistrer modifications</button>
            </div>
            <div className="profile-info">
                <div className="profile-pic-block">
                    <img src={ profile.profileImageUrl } alt="" />
                </div>
                <form id="update-profile-form" method="post">
                    <div className="profile-form-block">
                        <label htmlFor="firstName">Mon prénom*</label>
                        <input type="text" defaultValue={ profile.firstName } id="firstName" name="firstName" onChange={ setRequestBody }></input>
                    </div>

                    <div className="profile-form-block">
                        <label htmlFor="lastName">Mon nom de famille*</label>
                        <input type="text" defaultValue={ profile.lastName } id="lastName" name="lastName" onChange={ setRequestBody }></input>
                    </div>

                    <div className="profile-form-block">
                        <label htmlFor="job">Mon poste</label>
                        <input type="text" defaultValue={ profile.job } id="job" name="job" onChange={ setRequestBody }></input>
                    </div>

                    <div className="profile-form-block">
                        <label htmlFor="department">Mon département</label>
                        <input type="text" defaultValue={ profile.department } id="department" name="department" onChange={ setRequestBody }></input>
                    </div>

                    <div className="profile-form-block form-block-bio">
                        <label htmlFor="bio">À propos de moi</label>
                        <textarea type="text" defaultValue={ profile.bio } id="bio" name="bio" placeholder="Dites-nous quelque chose à propos de vous..." onChange={ setRequestBody }></textarea>
                    </div>
                </form>
            </div>
            </>

            // --> IF setIsUpdated === FALSE <-- //
            :
            <>
            { profile.id === parseFloat(localStorage.getItem("userId"))
            ?
            <div className="profile-background">
                <div id="settings-icon" className="settings-icon" onClick={ (e) => setProfileOptions(true) }>
                    <SettingsIcon />
                </div>
                { profileOptions === true && (
                    <div className="settings-profile">
                        <button type="button" id="update-profile-btn" onClick={ (e) => setIsUpdated(true) }>Modifier le profil</button>
                        <div className="options-splitter"></div>
                        <button type="button" id="delete-profile-btn">Supprimer le profil</button>
                    </div>
                ) }
            </div>
            :
            <div className="profile-background"></div>
            }
            <div className="profile-info">
                <div className="profile-pic-block">
                    { preview !== null
                    ? <img src={ preview } alt={ profile.firstName + " " + profile.lastName } />
                    : <img src={ profile.profileImageUrl } alt={ profile.firstName + " " + profile.lastName } />
                    }
                    { profile.id === parseFloat(localStorage.getItem("userId"))
                    ?
                    <form id="update-profile-pic" className="profile-pic-icon" method="post" encType="multipart/form-data">
                        <label htmlFor="updated-profile-pic"><AddAPhotoIcon /></label>
                        <input type="file" name="updated-profile-pic" id="updated-profile-pic" accept="image/*" onChange={ previewFile } />
                    </form>
                    : <></>
                    }
                    { preview !== null
                    ? <div className="cancel-preview-btn" onClick={ cancelPicUpdate }><CancelIcon /></div>
                    : <></>
                    }
                </div>
                { preview !== null
                ? <button type="button" className="save-new-pic-btn" onClick={ updateProfilePic }>Enregistrer cette photo ?</button>
                : <></>
                }
                <div className="profile-name">{ profile.firstName + " " + profile.lastName }</div>
                { profile.job !== null
                ? <div className="profile-job">{ profile.job }</div>
                : <></>
                }
                { profile.department !== null && profile.department !== ""
                ? <div className="profile-department">- { profile.department } -</div>
                : <></>
                }
            </div>
            <div className="profile-bio">
                    <div className="bio-title">À propos de moi</div>
                    { profile.bio !== null && profile.bio !== ""
                    ? <div className="bio-content">{ profile.bio }</div>
                    :
                    <div className="bio-content bio-content-replacement">
                        { profile.id === parseFloat(localStorage.getItem("userId"))
                        ? <>Dites quelque chose à propos de vous...</>
                        : <>Ce membre ne s'est pas encore présenté ! <span>&#128517;</span></>
                        }
                    </div>
                    }
            </div>
            </>
            }
        </section>
      )
}
