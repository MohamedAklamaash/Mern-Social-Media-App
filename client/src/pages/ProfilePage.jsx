import React from 'react'
import UserProfileCover from '../components/UserProfileCover'
import UserDetailsSection from '../components/UserDetailsSection'
import Feeds from '../components/Feeds'

const ProfilePage = () => {
  return (
    <div>
        <UserProfileCover/>
        <Feeds/>
    </div>
  )
}

export default ProfilePage