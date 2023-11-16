let placeholderCount = 1; // Variable para el contador de marcadores de posición

function generateSnippet() {
    const snippetName = document.getElementById("snippetName").value;
    const prefix = document.getElementById("prefix").value;
    const description = document.getElementById("description").value;
    const htmlCode = document.getElementById("htmlCode").value;

    // Aplicar transformaciones al código HTML
    const separatedSnippet = htmlCode.replace(/\\/g, "\\\\").replace(/"/g, '\\"').split("\n");
    const separatedSnippetLength = separatedSnippet.length;

    // Agregar comillas y sangrado a cada línea de HTML
    const formattedHtmlLines = separatedSnippet
        .map((line, index) => {
            return index === separatedSnippetLength - 1 ? `"${line}"` : `"${line}",`;
        })
        .join("\n");

    const snippetCode = `"${snippetName}": {
"prefix": "${prefix}",
"body": [
  ${formattedHtmlLines}
],
"description": "${description}"
}`;

    document.getElementById("snippetResult").textContent = snippetCode;
}

function clearInputs() {
    // Limpiar campos del formulario y reiniciar el contador de marcadores de posición
    document.getElementById("snippetName").value = "";
    document.getElementById("prefix").value = "";
    document.getElementById("description").value = "";
    document.getElementById("htmlCode").value = "";
    placeholderCount = 1;
}

function clearCode() {
    // Limpiar campo de código HTML y reiniciar el contador de marcadores de posición
    document.getElementById("htmlCode").value = "";
    placeholderCount = 1;
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

    // Reiniciar el contador de marcadores de posición después de copiar el snippet
    placeholderCount = 1;
}

document.getElementById("htmlCode").addEventListener("keydown", function (event) {
    // Verificar si se presiona Ctrl + Y
    if (event.ctrlKey && event.key === "y") {
        event.preventDefault(); // Evitar el comportamiento predeterminado (puede depender del navegador)

        // Agregar el marcador de posición al código HTML
        const htmlCodeInput = document.getElementById("htmlCode");
        const cursorPosition = htmlCodeInput.selectionStart;
        const currentHtmlCode = htmlCodeInput.value;
        const newHtmlCode = currentHtmlCode.substring(0, cursorPosition) + "${" + placeholderCount + ":example}" + currentHtmlCode.substring(cursorPosition);
        htmlCodeInput.value = newHtmlCode;

        // Incrementar el contador de marcadores de posición
        placeholderCount++;
    }
});
