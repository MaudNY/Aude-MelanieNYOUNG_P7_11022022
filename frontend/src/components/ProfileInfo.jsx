import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authApi from '../api/auth';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function ProfileInfo() {

    // AFFICHER LE PROFIL
    const { id } = useParams();
    const [ profile, setProfile ] = useState([]);

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

    return (
        <section id="profile">
            <div className="profile-background"></div>
            <div className="profile-info">
                <div className="profile-pic-block">
                    <img src={ profile.profileImageUrl } alt="" />
                    <div className="profile-pic-icon">
                        <AddAPhotoIcon />
                    </div>
                </div>
                <div className="profile-name">{ profile.firstName + " " + profile.lastName }</div>
                { profile.job !== null
                ? <div className="profile-job">{ profile.job }</div>
                : <></>
                }
                { profile.department !== null
                ? <div className="profile-department">- { profile.department } -</div>
                : <></>
                }
            </div>
            <div className="profile-bio">
                    <div className="bio-title">À propos de moi</div>
                    { profile.bio !== null
                    ? <div className="bio-content">{ profile.bio }</div>
                    : <div className="bio-content bio-content-replacement">Dites-nous quelque chose à propos de vous...</div>
                    }
                </div>
        </section>
      )
}
