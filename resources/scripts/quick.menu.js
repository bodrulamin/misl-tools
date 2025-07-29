
const skickyDiv = document.createElement('div');
skickyDiv.style.display = 'flex';
skickyDiv.style.flexDirection = 'column';
skickyDiv.id = 'quickMenu';
skickyDiv.style.position = 'fixed';
skickyDiv.style.right = '10px';
skickyDiv.style.top = '50%';
skickyDiv.style.transform = 'translateY(-50%)';
skickyDiv.style.padding = '10px';
skickyDiv.style.backgroundColor = '#f1f1f1';
skickyDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
skickyDiv.style.borderRadius = '10px';
skickyDiv.style.zIndex = '1000';
skickyDiv.style.opacity = '0.5';
skickyDiv.style.gap = '10px';



const buttonStyle = `
  padding: 8px 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;  
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;  
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;  
`;


var openBugIndex = 0;
const firstNote = document.createElement('button');
firstNote.innerHTML = '↑';
firstNote.style.cssText = buttonStyle;
let clickCount = 0;
firstNote.onclick = function (event) {
    clickCount++;
    setTimeout(function () {
        if (clickCount === 1) {
            openBugIndex = 0;
            let element = document.querySelectorAll('.bugnote')[0]
            if (element) {
                element.scrollIntoView({behavior: "smooth", block: "start"});
            }
        } else if (clickCount === 2) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
        clickCount = 0;
    }, 300);
};
skickyDiv.appendChild(firstNote);


const lastNote = document.createElement('button');
lastNote.innerHTML = '↓';
lastNote.style.cssText = buttonStyle;
lastNote.onclick = function () {
    let element = document.querySelectorAll('.bugnote')[document.querySelectorAll('.bugnote').length - 2]
    if (element) {
        element.scrollIntoView({behavior: "smooth", block: "start"});
    }
};
skickyDiv.appendChild(lastNote);

document.body.appendChild(skickyDiv);


skickyDiv.onmouseover = function () {
    skickyDiv.style.opacity = '1';
    firstNote.style.opacity = '1';
    lastNote.style.opacity = '1';
};

skickyDiv.onmouseout = function () {
    skickyDiv.style.opacity = '0.5';
    firstNote.style.opacity = '0.5';
    lastNote.style.opacity = '0.5';
};

const bugnoteElements = document.querySelectorAll('.bugnote-public');

bugnoteElements.forEach(element => {
    const firstLink = element.querySelector('a');
    if (firstLink) {

        const popupButton = document.createElement('button');
        popupButton.textContent = 'Paste Note Id';
        popupButton.className = 'popup-button';
        popupButton.style.display = 'none';
        document.body.appendChild(popupButton);


        firstLink.addEventListener('mouseover', () => {
            const linkRect = firstLink.getBoundingClientRect();
            popupButton.style.position = 'absolute';
            popupButton.style.left = `${linkRect.left}px`;
            popupButton.style.top = `${linkRect.bottom + window.scrollY}px`;
            popupButton.style.display = 'block';
        });


        firstLink.addEventListener('mouseout', (event) => {

            setTimeout(() => {
                if (!popupButton.matches(':hover') && !firstLink.matches(':hover')) {
                    popupButton.style.display = 'none';
                }
            }, 100);
        });


        popupButton.addEventListener('mouseover', () => {
            popupButton.style.display = 'block';
        });


        popupButton.addEventListener('mouseout', (event) => {
            setTimeout(() => {
                if (!popupButton.matches(':hover') && !firstLink.matches(':hover')) {
                    popupButton.style.display = 'none';
                }
            }, 100);
        });


        popupButton.addEventListener('click', () => {
            let noteId = '';
            const regex = /#c(\d+)$/;
            const match = firstLink.href.match(regex);
            if (match && match[1]) {
                noteId = '~' + match[1];
            }

            noteTextArea.value = noteTextArea.value += ' ' + noteId + ' '
        });
    }
});

const bnotes = document.querySelectorAll('.bugnote-note-public');

var openBnotes = Array.from(bnotes).filter(element => element.innerHTML.trim() === 'open');

var bcDiv = document.createElement('button');
bcDiv.title = 'Open Bugs Count';
bcDiv.onclick = () => {
    if (openBnotes.length) {
        var scrollElement = openBnotes[openBugIndex].parentElement;

        for (let index = 0; index < 4; index++) {
            scrollElement = scrollElement.previousElementSibling;
        }



        const tdElements = scrollElement.querySelectorAll('td');


        function highlightTdElements() {
            const td = tdElements[tdElements.length - 1];
            td.style.transition = 'background-color 0.5s ease';
            td.style.backgroundColor = '#fcbdbd';
            setTimeout(() => {
                td.style.backgroundColor = '';
            }, 500);
            setTimeout(() => {
                td.style.backgroundColor = '#fcbdbd';
            }, 1000);

            setTimeout(() => {
                td.style.backgroundColor = '';
            }, 1500);
        }


        highlightTdElements();

        const elementHeight = scrollElement.offsetHeight;
        const viewportHeight = window.innerHeight;


        const blockOption = elementHeight > viewportHeight ? "start" : "center";


        scrollElement.scrollIntoView({
            behavior: "smooth",
            block: blockOption
        });
        if (openBugIndex + 1 < openBnotes.length) {
            openBugIndex++;
        } else {
            openBugIndex = 0;
        }
    }


};
bcDiv.innerHTML = openBnotes.length;

skickyDiv.appendChild(bcDiv);

const quickMenuStatus = localStorage.getItem('quickMenu');
console.log(quickMenuStatus);

if (quickMenuStatus === 'show' || quickMenuStatus === undefined || quickMenuStatus === null) {
    skickyDiv.style.display = 'flex'
} else {
    skickyDiv.style.display = 'none'

}
