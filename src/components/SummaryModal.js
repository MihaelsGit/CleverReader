import Modal from 'react-bootstrap/Modal';
import { summaryTitle } from '../constants/strings';
import TooltipIconButton from "./TooltipIconButton";
import "../styles/App.css";

function SummaryModal({ summaryText, summaryModalShow, summaryModalHide }) {
  return (
    <Modal
      size="lg"
      centered
      show={summaryModalShow}
    >
      <Modal.Header>
        <TooltipIconButton
          id="closeButton"
          tooltipText={"Close"}
          iconPath={require("../styles/close_icon.svg").default}
          onButtonClick={summaryModalHide}
        />
        <TooltipIconButton
          id="copyButton"
          tooltipText={"Copy to clipboard"}
          iconPath={require("../styles/copy_icon.svg").default}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="modalTitle">{summaryTitle}</div>
        <p>
          {summaryText}
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default SummaryModal;
