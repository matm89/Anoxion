import { useNavigate } from "react-router";
import Dock from "../components/navbar/navbar";
import {VscAccount, VscHome} from 'react-icons/vsc';

export function Processes () {

  const navigate = useNavigate();

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
  ];

  return (
    <>
      <div
      id="dashContainer"
      className="min-h-screen w-full flex flex-col items-center justify-start p-6 bg-gradient-to-br from-brand-100 to-brand-300 transition-all"
    >

        <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        className="fixed w-[100px] bottom-0 left-0 right-0 flex justify-items-center justify-left gap-8 mb-4 p-2"
      />
      <h1 className="text-3xl font-semibold text-brand-700" >Process is a Work In Progress </h1>
    </div>
    </>
  );
}