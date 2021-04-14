import React, {useState} from "react";
import {useStore} from "effector-react";
import { $user } from "../../store/models/UserModels";
import Auth from "../Auth";


const User = () => {
  const user = useStore($user)

  if (!user) {
    return <Auth />
  }

  return (
    <div>
      User
    </div>
  )
}

export default User
