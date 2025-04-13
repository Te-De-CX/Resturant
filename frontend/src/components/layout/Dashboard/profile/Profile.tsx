
import { ProfileProp } from "@/lib/types/dashboard/profile";
import React from "react";

const Profile: React.FC<ProfileProp> = ({ name, address }) => {

    const profile = (
        <>
           <h2>{name}</h2>
           <h2>{address}</h2>
           <h2>{name}</h2>
        </>
    )

    return profile;
}

export default Profile;