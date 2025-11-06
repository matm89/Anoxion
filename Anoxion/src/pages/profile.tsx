import { useNavigate } from "react-router";
import Dock from "../components/navbar/navbar";
import {VscArchive, VscHome} from 'react-icons/vsc';
import { desauthentificate } from "../services/users";

export function Profile () {

  const navigate = useNavigate();

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => navigate('/processes') },
  ];

  function logout () {

    desauthentificate();

  };

  return (
    <>
        <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
      <p>hello profile</p>
      <button onClick={logout}>Log Out</button>
    </>
  );
}