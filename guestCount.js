const scriptURL = "https://script.google.com/macros/s/AKfycbxb9Yf03LWygxi36PGbuIbJwg6JT8XY26rOuI5m7VjHW3VxViAaBuYBqzhrymIzyPjtwg/exec";

async function loadGuestCount() {
    const res = await fetch(scriptURL);
    const data = await res.json();

    document.getElementById("guest-count").innerHTML = `
        <p><small><strong>Currently attending:</strong> ${data.guests} guests</small></p> 
    `;
}

loadGuestCount();