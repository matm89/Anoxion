import { toast } from "react-toastify";
import "./styles";
// import logo from "../../assets/logo.png";

export type ToastProps = {
  title: string;
}

export default function Toast ({title}:ToastProps) {

  console.log(title);

  toast(title, {
    icon: () => <img src="/icon.png" alt="logo" width={20} />,
  });

};
