function generateSnippet() {
  const snippetName = document.getElementById("snippetName").value;
  const prefix = document.getElementById("prefix").value;
  const description = document.getElementById("description").value;
  const htmlCode = document.getElementById("htmlCode").value;

  // Aplicar transformaciones al código HTML
  const separatedSnippet = htmlCode
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .split("\n");
  const separatedSnippetLength = separatedSnippet.length;

  // Agregar comillas y sangrado a cada línea de HTML
  const formattedHtmlLines = separatedSnippet.map((line, index) => {
      return index === separatedSnippetLength - 1 ? `"${line}"` : `"${line}",`;
  }).join('\n');

  const snippetCode = `"${snippetName}": {
"prefix": "${prefix}",
"body": [
  ${formattedHtmlLines}
],
"description": "${description}"
}`;

  document.getElementById("snippetResult").textContent = snippetCode;

  // Limpiar campos del formulario
  document.getElementById("snippetName").value = "";
  document.getElementById("prefix").value = "";
  document.getElementById("description").value = "";
  document.getElementById("htmlCode").value = "";
}


function copySnippet() {
    const snippetResult = document.getElementById("snippetResult");
    const range = document.createRange();
    range.selectNode(snippetResult);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Snippet copied to clipboard!");
}
