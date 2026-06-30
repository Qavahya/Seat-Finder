const scriptURL = "https://script.google.com/macros/s/AKfycbyVcWH3UROK3-wkFkY0OsGkP441MLtnbayVEwLdtdnMTmg44eHJVyIft73IZwd_AwTklg/exec";

function findSeat() {
    const name = document.getElementById("guestName").value.trim();
    const result = document.getElementById("result");

    if (!name) {
        result.innerHTML = "Please enter your name.";
        return;
    }

    result.innerHTML = "Searching...";

    fetch(`${scriptURL}?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            if (data.found) {
                result.innerHTML = `
                    <p>Welcome, ${name}.</p>
                    <h3>You are seated at</h3>
                    <h4>${data.table}</h4>
                `;
            } else {
                result.innerHTML = "We couldn't find that name. Please check the spelling or ask someone for help.";
            }
        })
        .catch(() => {
            result.innerHTML = "Something went wrong. Please try again.";
        });
}
