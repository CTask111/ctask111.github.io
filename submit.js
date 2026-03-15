document.getElementById("return-btn").addEventListener("click", () => {
    sessionStorage.removeItem("rsvpSubmitted");
    window.location.href = "index.html";
});

function fillFields(data) {
    document.getElementById("thank").innerHTML = `
        <h2>Thank You!</h2>
        <p>Your RSVP has been successfully submitted.</p>
    `;
    document.getElementById("submitted-info").innerHTML = `
        <p><strong>Name:</strong> ${data.fName} ${data.lName}</p>
        <p><strong>Email:</strong> ${data.email || "N/A"}</p>
        <p><strong>Number of Guests:</strong> ${data.guests}</p>
        <p><strong>Notes:</strong> ${data.notes || "none"}</p>
    `;
}

(async () => {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxb9Yf03LWygxi36PGbuIbJwg6JT8XY26rOuI5m7VjHW3VxViAaBuYBqzhrymIzyPjtwg/exec";
    const params = new URLSearchParams(window.location.search);

    const data = {
        fName: params.get("firstName"),
        lName: params.get("lastName"),
        email: params.get("email"),
        guests: params.get("guests"),
        notes: params.get("notes").trim(),
        company: params.get("company")
    };

    if (sessionStorage.getItem("rsvpSubmitted")) {
        console.log("Submission already processed.");
        fillFields(data);
        return;
    }

    if (data.fName && data.lName && data.guests) {
        fillFields(data);

        if (data.notes == "//skip-post") {
            console.log("POST skipped.");
            return;
        }

        await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        sessionStorage.setItem("rsvpSubmitted", "true");
    } else {
        document.getElementById("thank").innerHTML = `
            <p>Sorry, your submission failed. Please try again.</p>
        `;
        document.getElementById("submitted-info").innerHTML = `
            <p>No submission data found...</p>
        `;
    }
})();