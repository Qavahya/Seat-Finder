const scriptURL = "https://script.google.com/macros/s/AKfycbyVcWH3UROK3-wkFkY0OsGkP441MLtnbayVEwLdtdnMTmg44eHJVyIft73IZwd_AwTklg/exec";

function showSeat(displayName, table) {
    const result = document.getElementById("result");

    result.innerHTML = `
        <p>Welcome, ${displayName}.</p>
        <h3>You are seated at</h3>
        <h4>${table}</h4>
    `;
}

function findSeat() {
    const name = document.getElementById("guestName").value.trim();
    const result = document.getElementById("result");

    if (!name) {
        result.innerHTML = "<p>Please enter your first name.</p>";
        return;
    }

    result.innerHTML = "<p>One moment while we find your table...</p>";

    fetch(`${scriptURL}?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            if (!data.found) {
                result.innerHTML = `
                    <p>We couldn't find that name.</p>
                    <p>Please check the spelling or ask a member of the wedding party for assistance.</p>
                `;
                return;
            }

            if (data.multiple) {
                result.innerHTML = `
                    <p>We found more than one ${name}.</p>
                    <h3>Please select your name</h3>
                    <div class="name-options"></div>
                `;

                const optionsContainer = document.querySelector(".name-options");

                data.matches.forEach(match => {
                    const button = document.createElement("button");
                    button.className = "name-option";
                    button.textContent = match.displayName;

                    button.addEventListener("click", function () {
                        showSeat(match.displayName, match.table);
                    });

                    optionsContainer.appendChild(button);
                });

                return;
            }

            showSeat(data.displayName, data.table);
        })
        .catch(error => {
            console.error("Seat finder error:", error);

            result.innerHTML = `
                <p>Something went wrong.</p>
                <p>Please try again.</p>
            `;
        });
}
