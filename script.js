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

                    <h3>Your table is</h3>

                    <h4>TABLE ${data.table}</h4>
                `;

            } else {

                result.innerHTML = `
                    <p>We couldn't find that name.</p>
                    <p>Please check the spelling or ask a member of the wedding party for assistance.</p>
                `;

            }

        })
        .catch(() => {

            result.innerHTML = `
                <p>Something went wrong.</p>
                <p>Please try again.</p>
            `;

        });
}
