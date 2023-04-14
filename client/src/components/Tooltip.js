import React, { useRef, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import Overlay from "react-bootstrap/Overlay";
function TooltipCom({ text }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <React.Fragment>
      <a variant="danger" ref={target} onClick={() => setShow(!show)}>
        <AiFillInfoCircle />
      </a>
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              backgroundColor: "black",
              color: "white",
              ...props.style,
              width: "100px",
              textAlign: "center",
              padding: "3px",
            }}
          >
            {text}
          </div>
        )}
      </Overlay>
    </React.Fragment>
  );
}

export default TooltipCom;
