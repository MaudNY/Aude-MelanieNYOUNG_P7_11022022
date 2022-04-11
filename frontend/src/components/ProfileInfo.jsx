import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authApi from '../api/auth';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ProfileInfo() {

    // SHOW PROFILE
    const { id } = useParams();
    const [ profile, setProfile ] = useState([]);
    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ profileOptions, setProfileOptions ] = useState(false);
    const [ deleteProfile, setDeleteProfile ] = useState(false);

    useEffect(() => {
        
        authApi.get(`/profile/${ id }`)
            .then((res) => {
                console.log("UTILISATEUR :", res.data);
                
                return setProfile(res.data);
            })
            .catch(error => {
                
                console.log(error);
            })
    }, [id]);

    // RESET PROFILE OPTIONS
    const resetProfileOptions = (e) => {

        if (!e.target.classList.contains("fa-cog")) {
            setProfileOptions(false);
        }
    };

    // UPDATE PROFILE
    
    // Get input values
    const inputValues = { 
        firstName: profile.firstName,
        lastName: profile.lastName,
        job: profile.job,
        department: profile.department,
        bio: profile.bio
    };
    const [formValues, setFormValues] = useState(inputValues);

    // Get JSON object from input values
    const setRequestBody = (e) => {
        const {name, value} = e.target;
        setFormValues({ ...formValues, [name]: value });

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

        authApi.put(`/updateprofilepic/${ id }`, formData)
            .then(response => {
                localStorage.setItem("profileImageUrl", response.data.profileImageUrl);
                
                return window.location.reload(false);
            })
            .catch(error => {
                
                console.log(error);
            })
    };

    // DELETE PROFILE - ACCOUNT
    const [ email, setEmail ] = useState({ email: "" });

    const getDataFromEmailInput = (e) => {
        e.preventDefault()
        const $classError = document.querySelector(".error-deletion-profile");
        const $emailErrorMessage = document.querySelector("#email-error");

        if ($classError) {
            $classError.classList.remove("error-deletion-profile");
            $emailErrorMessage.innerHTML = "";
        }

        return setEmail(e.target.value);
    }

    const deleteAccount = (e) => {
        e.preventDefault(); 
        const requiredEmail = email;
        const $emailError = document.querySelector("#email-error");
        const $formBlockEmail = $emailError.parentElement;
        console.log(requiredEmail);

        authApi.delete(`/deleteaccount/${ id }`, requiredEmail)
            .then((res) => {
                console.log(res);

                return localStorage.clear()
            })
            .then(() => {

                return window.location.reload(false);
            })
            .catch((error) => {
                const errorData = error.response.data;

                if (errorData.message === "L'addresse email est incorrecte.") {
                    $formBlockEmail.classList.add("error-deletion-profile");
                    $emailError.innerHTML = errorData.message;
                }
            
                return console.log(errorData);
            })
    }
    
    return (
        <section id="profile" onClick={ resetProfileOptions }>
            { isUpdated === true
            ?
            <>
            <div className="profile-background">
                <button type="button" id="save-profile-btn" onClick={ saveUpdates }>Enregistrer modifications</button>
            </div>
            <div className="profile-info">
                { profile.profileImageUrl === null || profile.profileImageUrl === "" || profile.profileImageUrl === "null"
                ?
                <div className="profile-pic-block">
                    <img src="../assets/default-profile-pic.jpg" alt={ profile.firstName + " " + profile.lastName } />
                </div>
                :
                <div className="profile-pic-block">
                    <img src={ profile.profileImageUrl } alt={ profile.firstName + " " + profile.lastName } />
                </div>
                }
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
                    <i className="fas fa-cog"></i>
                </div>
                { profileOptions === true && (
                    <div id="profile-settings">
                        <button type="button" id="update-profile-btn" onClick={ (e) => setIsUpdated(true) }>
                            <div className="update-btn-content">Modifier le profil</div>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" id="delete-profile-btn" onClick={ (e) => setDeleteProfile(true) }>
                            <div className="delete-btn-content">Supprimer le profil</div>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                ) }
                { deleteProfile === true && (
                    <div id="delete-profile-alert" className="deletion-alert">
                        <div className="cancel-profile-btn" onClick={ (e) => setDeleteProfile(false) }><CancelIcon /></div>
                        <div className="deletion-profile-text">
                            Souhaitez-vous vraiment supprimer votre profil ?<br /><br />
                            Conformément aux directives RGPD, votre profil ainsi que toutes les données personnelles associées, incluant vos publications et vos commentaires, seront définitivement supprimées de la base de données du Groupe GROUPOMANIA.<br /><br />
                            Pour confirmer votre choix, veuillez renseigner votre adresse e-mail :<br /><br />
                        </div>
                        <form method="post" id="deletion-profile-form">
                            <label htmlFor="email">Mon adresse email Groupomania* :</label>
                            <input type="text" name="email" id="email" className="form-inputs" onChange={ getDataFromEmailInput } autoComplete="off" required/>
                            <i className="fas fa-exclamation-circle"></i>
                            <p id="email-error" className="error-message"></p>
                        </form>
                        <div>
                            <button type="button" className="deletion-profile-button" onClick={ deleteAccount }>Oui, SUPPRIMER mon compte définitivement</button>
                        </div>
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
                    :
                    <>
                    { profile.profileImageUrl === null || profile.profileImageUrl === "" || profile.profileImageUrl === "null"
                    ? <img src="../assets/default-profile-pic.jpg" alt={ profile.firstName + " " + profile.lastName } />
                    : <img src={ profile.profileImageUrl } alt={ profile.firstName + " " + profile.lastName } />
                    }
                    </>
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
