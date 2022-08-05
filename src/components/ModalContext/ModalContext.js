import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [alt, setAlt] = useState('');

  const disableModal = () => {
    setShowModal(false)
  };

  const onClickAtImage = async (largeImageURL, altInfo) => {
    await setLargeImage(largeImageURL);
    await setAlt(altInfo);
    setShowModal(true);
  };

  return (
    <ModalContext.Provider value={{ showModal, disableModal, largeImage, onClickAtImage, alt }}>
      {children}
    </ModalContext.Provider>
  );
};
