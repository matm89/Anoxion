import { styled } from "styled-components";

export const ToastContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const ToastImage = styled.img`
  height: 50px;
  width: 50px;
`;

export const ToastTextContent = styled.div`
  text-align: center;
  margin-left: 10px;
`;

export const ToastTitle = styled.h4`
  color: red;
`;

export const ToastParagraph = styled.p`
  color: black;
`;
