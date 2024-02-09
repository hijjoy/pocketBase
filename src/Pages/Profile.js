import React from "react";
import { pb } from "../lib/pocketbase";

const Profile = () => {
  return <div>{pb.authStore.model.username}</div>;
};

export default Profile;
