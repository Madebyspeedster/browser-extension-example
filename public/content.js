const title = "WebxInUA";

const widget = document.createElement("p");

widget.style.cssText = `
    position: fixed;
    z-index: 10;
    bottom: 10px;
    right: 10px;
    width: 200px;
    background: #303030;
    color: #fff;
    padding: 5px;
    font-weight: bold;
    border: 5px solid #ff8531;
    border-radius: 5px;
    text-align: center;
    text-transform: uppercase;
`;
widget.textContent = title;

window.onload = () => {
  window.document.body.appendChild(widget);
};
