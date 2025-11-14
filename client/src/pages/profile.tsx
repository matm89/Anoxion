import { useNavigate } from "react-router";
import Dock from "../components/navbar/navbar";
import { VscHome} from 'react-icons/vsc';
import { desauthentificate } from "../services/users";

export function Profile () {

  const navigate = useNavigate();

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => navigate('/') },
  ];

  function logout () {

    desauthentificate(navigate);

  };

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
        className="fixed w-24 bottom-0 left-0 right-0 flex items-center justify-left gap-8 mb-4 p-2"
      />
      <h1 className="text-3xl font-semibold text-brand-700" >Profile Options</h1>
      <button onClick={logout} className="mt-4 w-60 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-md transition shadow-sm hover:shadow-md">Log Out</button>
    </div>
    </>
  );
}