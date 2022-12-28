import Modal from 'react-bootstrap/Modal';
import { knowledgeGraphError, close } from '../constants/strings';
import TooltipIconButton from "./TooltipIconButton";
import "../styles/App.css";

function KnowledgeGraphModal({ onButtonClick, knowledgeGraphModalShow, knowledgeGraphModalHide }) {

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
        <div className="modalTitle">{knowledgeGraphError}</div>
        <div className="button">
          <button type="submit" className="btn btn-outline-primary center" onClick={onButtonClick}>
            TRY AGAIN
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default KnowledgeGraphModal;
