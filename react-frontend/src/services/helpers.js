// strip text from HTML string
export function stripHTML(str) {
  var div = document.createElement("div");
  div.innerHTML = str;
  var text = div.textContent || div.innerText || "";
  return text;
}

// get second part of string after one dash
export function getSecondPart(str) {
  return str.split("-")[1];
}

// get second part of string after two dashes
export function getSecondPartTwo(str) {
  return str.split("--")[1];
}
