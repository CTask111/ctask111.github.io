const notes = document.getElementById("notes");
const charCount = document.getElementById("chars");

notes.addEventListener("input", () => {
    const numChars = notes.value.length;
    charCount.textContent = notes.maxLength - numChars;

    if (numChars > notes.maxLength * .9)
        charCount.style.color = "red";
    else
        charCount.style.color = "black";
});