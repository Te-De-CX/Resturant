'use client'

import Profile from "@/components/layout/Dashboard/profile/Profile";
import { useCurrentUser } from "@/lib/api/auth";

const ProfilePage = () => {
    const { data: user } = useCurrentUser();
    const profilePage = (
        <>
           <Profile name =  {user.username} address="123" />
        </>
    )

    return profilePage;
}

export default ProfilePage;