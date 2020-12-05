// @ts-nocheck
import React, { useState } from 'react'
import '../App.scss'
import Error from './windows/error.png'

const Windows = (props: any) => {
  const [showError, setShowError] = useState(false)

  const showErrorMessage = () => {
    setShowError(true)

    dragElement(document.getElementById("error"));

    function dragElement(el: any) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (el) {
        el.onmousedown = dragMouseDown;
      } else {
        el.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }

  return (
    <div id="windows">
      <button id="error" style={{ top: 100, left: 200 }} onClick={() => props.exit()} >
        {showError && <img src={Error} alt="Error!" />}
      </button>
      <div className="taskbar">
        <button className="start" onClick={() => showErrorMessage()} />
      </div>
    </div>
  )
}

export default Windows;
