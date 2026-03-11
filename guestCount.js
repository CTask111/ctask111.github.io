const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRT7oCNrV40qim7pR7Y0NplRy8mK4SUbRkUma0LAO4XZLJBoWsuSzT-j3nCUYqT-LIv0Q8UiNO0PLc/pub?gid=0&single=true&output=csv";

async function loadGuestCount() {
    const res = await fetch(sheetURL);
    const text = await res.text();

    const rows = text.split("\n").slice(1);

    let total = 0;

    rows.forEach(row => {
        const cols = row.split(",");
        total += Number(cols[3]);
    });

    document.getElementById("guest-count").innerHTML = `
        <p><small><strong>Currently attending:</strong> ${total} guests</small></p> 
    `;
}

loadGuestCount();