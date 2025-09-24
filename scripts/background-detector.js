document.addEventListener("DOMContentLoaded", () => {
  // Check if a paragraph with class "background" exists
  const bgParagraph = document.querySelector("p.background");
  if (!bgParagraph) return;

  // Look for an <a> with the text "Background"
  const backgroundLink = Array.from(document.querySelectorAll("a"))
    .find(a => a.textContent.trim() === "Background");

  if (backgroundLink && backgroundLink.href) {
    document.body.style.backgroundImage = `url("${backgroundLink.href}")`;
  }
});
