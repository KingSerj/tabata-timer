import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  z-index: 2;
  border: 1px solid white;
  padding: 15px;
  background: white;
  display: flex;
  gap: 15px;
  flex-direction: column;
  border-radius: 15px;
`
export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.5);
  z-index: 1;
`

export const ModalText = styled.div`
  color: black;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`



