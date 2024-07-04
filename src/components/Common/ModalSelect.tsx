// src/components/Common/ModalSelect.tsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select, { MultiValue, SingleValue } from 'react-select';

interface OptionProps {
  value: number;
  label: string;
}

interface ModalSelectProps {
  show: boolean;
  onHide: () => void;
  options: OptionProps[];
  onSave: (selectedOptions: MultiValue<OptionProps>) => void;
  isMulti?: boolean;
  selectedValues?: OptionProps[];
}

const ModalSelect: React.FC<ModalSelectProps> = ({
  show,
  onHide,
  options,
  onSave,
  isMulti = true,
  selectedValues = []
}) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionProps>>(selectedValues);

  const handleSave = () => {
    onSave(selectedOptions);
    onHide();
  };

  useEffect(() => {
    setSelectedOptions(selectedValues);
  }, [selectedValues]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Select
              isMulti={isMulti}
              options={options}
              value={selectedOptions}
              onChange={(selected) => setSelectedOptions(selected as MultiValue<OptionProps>)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSelect;
