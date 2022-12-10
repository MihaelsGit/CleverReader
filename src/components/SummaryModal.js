import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import { summaryTitle, copyToClipboard, copied, close } from '../constants/strings';
import TooltipIconButton from "./TooltipIconButton";
import "../styles/App.css";

function SummaryModal({ summaryText, summaryModalShow, summaryModalHide }) {
  const [isCopied, setIsCopied] = useState(false);
  const [tooltipText, setTooltipText] = useState(copyToClipboard)

  const copyTextToClipboard = async (text) => {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
  };

  const onCopyClick = () => {
    copyTextToClipboard(summaryText)
      .then(() => {
        setIsCopied(true);
        setTooltipText(copied);
        setTimeout(() => {
          setIsCopied(false);
          setTooltipText(copyToClipboard);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal
      size="lg"
      centered
      show={summaryModalShow}
    >
      <Modal.Header>
        <TooltipIconButton
          id="closeButton"
          tooltipText={close}
          iconPath={require("../styles/close_icon.svg").default}
          onButtonClick={summaryModalHide}
        />
        <TooltipIconButton
          id="copyButton"
          tooltipText={tooltipText}
          iconPath={require("../styles/copy_icon.svg").default}
          onButtonClick={onCopyClick}
          tooltipPlacement="auto"
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
