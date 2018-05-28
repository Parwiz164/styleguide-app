// function you can use:
export function getSecondPart(str) {
  return str.split("-")[1];
}

// strip text from HTML string
export function stripHTML(str) {
  var div = document.createElement("div");
  div.innerHTML = str;
  var text = div.textContent || div.innerText || "";
  return text;
}
