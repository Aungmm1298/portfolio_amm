window.addEventListener("DOMContentLoaded", (event) => {
  const colors = ["#ff7e5f", "#feb47b", "#86a8e7", "#91eae4"];
  let currentColorIndex = 0;
  const bodyElement = document.body;

  setInterval(() => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    bodyElement.style.background = `linear-gradient(270deg, ${
      colors[currentColorIndex]
    }, ${colors[(currentColorIndex + 1) % colors.length]})`;
  }, 5000);
});
