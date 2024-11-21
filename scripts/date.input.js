const selects = document.querySelectorAll("select");

const customFieldDayElements = Array.from(selects).filter(select => {
    const name = select.getAttribute("name");
    return name && /^custom_field_\d+_day$/.test(name);
});

if (customFieldDayElements.length > 0) {
    customFieldDayElements.forEach((element) => {
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.style.opacity = "0";
        dateInput.style.pointerEvents = "none";

        dateInput.addEventListener('input', () => {
            const day = new Date(dateInput.value).getDate();
            const month = new Date(dateInput.value).getMonth() + 1;
            const year = new Date(dateInput.value).getFullYear();
            element.value = day;
            const dayElementName = element.getAttribute("name");
            const yearElementName = dayElementName.replace('day', 'year');
            const yearElements = document.getElementsByName(yearElementName);
            yearElements.forEach(y => y.value = year);
            const monthElementName = dayElementName.replace('day', 'month');
            const monthElements = document.getElementsByName(monthElementName);
            monthElements.forEach(m => m.value = month);

        });

        const button = document.createElement('button');
        button.type = 'button';
        const icon = document.createElement('img');
        icon.src = 'chrome-extension://fgjpkhjkjlhgjcpjekchflnhijlpogfo/scripts/calendar.png';
        icon.alt = 'Button Icon';
        button.appendChild(icon);
        button.setAttribute("style", `
            padding: 0.48em;
            border: 1px solid #d4d4d4;
            margin-left: 3px;
            text-decoration: none;
            text-shadow: none;
            font: 12px/normal sans-serif;
            color: #333;
            outline: none;
            background-color: #ececec;
            background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#f4f4f4), to(#ececec));
            background-image: -moz-linear-gradient(#f4f4f4, #ececec);
            background-image: -ms-linear-gradient(#f4f4f4, #ececec);
            background-image: -o-linear-gradient(#f4f4f4, #ececec);
            background-image: linear-gradient(#f4f4f4, #ececec);
            -moz-background-clip: padding;  /* for Firefox 3.6 */
            background-clip: padding-box;
            border-radius: 0.2em;
            zoom: 1;  /* IE hacks */
            *display: inline;
        `);

        button.onclick = () => {
           dateInput.showPicker();
        }
        element.parentNode.insertBefore(dateInput, element.nextSibling);
        element.parentNode.insertBefore(button, element.nextSibling);

    });
} else {
    console.log("No matching elements found.");
}
