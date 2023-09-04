import React from "react";
import Button from "react-bootstrap/Button";
interface FormArSIPPE {
  onClose: () => void;
}
export default function FormSIPPE({ onClose }: FormArSIPPE) {
  const handleCargarSIPPE = () => {
    onClose();
  };
  return (
    <>
      <div className="FormDescription">SIPPE</div>
      <Button
        variant="success"
        className="SaveChange"
        onClick={() => {
          handleCargarSIPPE();
        }}
      >
        Guardar Cambios
      </Button>
    </>
  );
}
