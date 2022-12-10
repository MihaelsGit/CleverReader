import Modal from 'react-bootstrap/Modal';
import { knowledgeGraphTitle, close } from '../constants/strings';
import TooltipIconButton from "./TooltipIconButton";
import "../styles/App.css";

function KnowledgeGraphModal({ knowledgeGraph, knowledgeGraphModalShow, knowledgeGraphModalHide }) {

  return (
    <Modal
      size="lg"
      centered
      show={knowledgeGraphModalShow}
    >
      <Modal.Header>
        <TooltipIconButton
          id="closeButton"
          tooltipText={close}
          iconPath={require("../styles/close_icon.svg").default}
          onButtonClick={knowledgeGraphModalHide}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="modalTitle">{knowledgeGraphTitle}</div>
      </Modal.Body>
    </Modal>
  );
}

export default KnowledgeGraphModal;
