import Modal from "react-bootstrap/Modal";
import { close, knowledgeGraphWaiting } from "../constants/strings";
import TooltipIconButton from "./TooltipIconButton";
import "../styles/App.css";
import KnowledgeGraph from "./KnowledgeGraph";

function KnowledgeGraphModal({
  knowledgeGraphModalShow,
  knowledgeGraphModalHide,
  references,
}) {
  return (
    <Modal size="lg" centered show={knowledgeGraphModalShow}>
      <Modal.Header>
        <TooltipIconButton
          id="closeButton"
          tooltipText={close}
          iconPath={require("../styles/close_icon.svg").default}
          onButtonClick={knowledgeGraphModalHide}
        />
      </Modal.Header>
      {references !== null ? (
        <Modal.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <KnowledgeGraph references={references} />
          </div>
        </Modal.Body>
      ) : (
        <Modal.Body>
          <div style={{ textAlign: "center" }}>
            <p>{knowledgeGraphWaiting}</p>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
}

export default KnowledgeGraphModal;
