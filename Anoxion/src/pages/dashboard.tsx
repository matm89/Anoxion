import { useNavigate } from "react-router";
import Dock from "../components/navbar/navbar";
import {VscArchive, VscAccount} from 'react-icons/vsc';
import { useState } from "react";

export function Dashboard () {

  const navigate = useNavigate();

  useState (()=> {

  });

  const items = [
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => navigate('/processes') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => navigate('/profile') },
  ];

  return (
    <>
        <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
      <p>hello from Dashboard</p>
    </>
  );
}