
import ReactAudioPlayer from "react-audio-player";
import CWLogo from "../../assets/codeworks.png";
import { FC } from "react";
import * as Styled from "./styles";

interface ToastProps {
  title: string;
  body?: string;
  image?: string;
  audioSrc?: string;
}

const defaultAudioSrc = "https://firebasestorage.googleapis.com/v0/b/brigadaun.appspot.com/o/audios%2Fslow-spring-board.mp3?alt=media&token=4145eb67-2bca-4c27-9d2e-3b532a140f14";

export const Toast: FC<ToastProps> = (props) => {
  const { title, body, image, audioSrc} = props;

  return (
    <Styled.ToastContainer>
      <ReactAudioPlayer
        src={audioSrc ?? defaultAudioSrc}
        autoPlay
        controls
        style={{ display: "none" }}
      />
      <Styled.ToastImage src={image ?? CWLogo} alt="Logo" />
      <Styled.ToastTextContent style={{ textAlign: "center", marginLeft: "10px" }}>
        <Styled.ToastTitle >{title}</Styled.ToastTitle>
        <Styled.ToastParagraph>{body}</Styled.ToastParagraph>
      </Styled.ToastTextContent>
    </Styled.ToastContainer>
  );
};
