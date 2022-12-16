import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";

function TooltipIconButton({ tooltipText, iconPath, onButtonClick, tooltipPlacement="bottom" }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={tooltipPlacement}
      delay={{ show: 100, hide: 100 }}
      overlay={renderTooltip}
    >
      <button type="submit" className="iconButton" onClick={onButtonClick}>
        <img src={iconPath} alt="iconButton" />
      </button>
    </OverlayTrigger>
  );
}

export default TooltipIconButton;
