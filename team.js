// Description: This file contains the list of team members.
const icons = [ { name: "Ameise", path: "animal-ant-domestic-svgrepo-com.svg"},
                { name: "Fisch", path: "animal-aquarium-domestic-svgrepo-com.svg"},
                { name: "Thunfisch", path: "animal-aquarium-domestic2-svgrepo-com.svg"},
                { name: "Kücken", path: "animal-babyduck-domestic-svgrepo-com.svg"},
                { name: "Fledermaus", path: "animal-bat-domestic-3-svgrepo-com.svg"},
                { name: "Vogel", path: "animal-bird-domestic-2-svgrepo-com.svg"},
                { name: "Papagei", path: "animal-bird-domestic-4-svgrepo-com.svg"},
                { name: "Eisvogel", path: "animal-bird-domestic-svgrepo-com.svg"},
                { name: "Schmetterling", path: "animal-bug-butterfly-svgrepo-com.svg"},
                { name: "Libelle", path: "animal-bug-domestic-2-svgrepo-com.svg"},
                { name: "Fliege", path: "animal-bug-domestic-4-svgrepo-com.svg"},
                { name: "Biene", path: "animal-bug-domestic-6-svgrepo-com.svg"},
                { name: "Käfer", path: "animal-bug-domestic-svgrepo-com.svg"},
                { name: "Bulle", path: "animal-bull-domestic-svgrepo-com.svg"},
                { name: "Katze", path: "animal-cat-domestic-2-svgrepo-com.svg"},
                { name: "Kater", path: "animal-cat-domestic-svgrepo-com.svg"},
                { name: "Kuh", path: "animal-cow-domestic-svgrepo-com.svg"},
                { name: "Krabbe", path: "animal-crab-domestic-svgrepo-com.svg"},
                { name: "Krokodil", path: "animal-crocodile-domestic-svgrepo-com.svg"},
                { name: "Hund", path: "animal-dog-domestic-3-svgrepo-com.svg"},
                { name: "Bernhardiner", path: "animal-dog-domestic-svgrepo-com.svg"},
                { name: "Taube", path: "animal-domestic-dove-svgrepo-com.svg"},
                { name: "Gibbon", path: "animal-domestic-face-2-svgrepo-com.svg"},
                { name: "Bär", path: "animal-domestic-face-3-svgrepo-com.svg"},
                { name: "Schimpanse", path: "animal-domestic-face-4-svgrepo-com.svg"},
                { name: "Frosch", path: "animal-domestic-frog-svgrepo-com.svg"},
                { name: "Giraffe", path: "animal-domestic-giraffe-svgrepo-com.svg"},
                { name: "Igel", path: "animal-domestic-hedgehog-svgrepo-com.svg"},
                { name: "Koala", path: "animal-domestic-koala-svgrepo-com.svg"},
                { name: "Löwe", path: "animal-domestic-lion-svgrepo-com.svg"},
                { name: "Maus", path: "animal-domestic-mouse-svgrepo-com.svg"},
                { name: "Octopus", path: "animal-domestic-octopus-2-svgrepo-com.svg"},
                { name: "Qualle", path: "animal-domestic-octopus-3-svgrepo-com.svg"},
                { name: "Tintenfisch", path: "animal-domestic-octopus-svgrepo-com.svg"},
                { name: "Gorilla", path: "animal-domestic-orangoutang-svgrepo-com.svg"},
                { name: "Orangutan", path: "animal-domestic-orangoutang2-svgrepo-com.svg"},
                { name: "Eule", path: "animal-domestic-owl-svgrepo-com.svg"},
                { name: "Panda", path: "animal-domestic-panda-svgrepo-com.svg"},
                { name: "Nasshorn", path: "animal-domestic-pet-12-svgrepo-com.svg"},
                { name: "Orca", path: "animal-domestic-pet-13-svgrepo-com.svg"},
                { name: "Schildkröte", path: "animal-domestic-pet-15-svgrepo-com.svg"},
                { name: "Hai", path: "animal-domestic-pet-17-svgrepo-com.svg"},
                { name: "Wal", path: "animal-domestic-pet-2-svgrepo-com.svg"},
                { name: "Esel", path: "animal-domestic-pet-3-svgrepo-com.svg"},
                { name: "Schlange", path: "animal-domestic-pet-5-svgrepo-com.svg"},
                { name: "Biber", path: "animal-domestic-pet-6-svgrepo-com.svg"},
                { name: "Schnecke", path: "animal-domestic-pet-7-svgrepo-com.svg"},
                { name: "Schwein", path: "animal-domestic-pet-svgrepo-com.svg"}
]

function isValidUUID(uuid) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
}

document.addEventListener('DOMContentLoaded', async function() {
    // create a svg drawing by placing above icons in a grid using svg.js
    const draw = SVG().size('100%', '100%').addTo('#svg-team').size(1200, 620);
    let x = 0;
    let y = 0;
    let width = 95;
    let height = 95;
    let iconCount = 0;
    // log session storage
    if (! isValidUUID(localStorage.getItem('uuid'))) localStorage.setItem('uuid',uuid.v4());
    console.log('localStorage:', localStorage);
    // check whether the nickname is already set, otherwise remove it
    let uuid_nr = localStorage.getItem('uuid');
    let name = null;
    let response = await doFetch(`nickname/${uuid_nr}`,"GET");
    let ip_socket = await getIPSocket();
    console.log('ip_socket:', ip_socket);

    if ("warning" in response) name = null;
    else name = response.nickname;
    localStorage.removeItem('nickname');
    if (name) {
        localStorage.setItem('nickname', name);
        console.log('Nickname set in localStorage');
    } else {
        console.log('No name received, nickname not set.');
    }
    console.log('localStorage:', localStorage);
    // create a text board in bold
    let board = draw.text(`Hallo\n${localStorage.getItem('nickname') || ''}`)
                .move(900, 300)
                .font({ size: 48, weight: 'bold' })
                .fill('black')
    draw.rect(770, 585).fill('white').stroke({ width: 1, color: 'black' });
    // draw.text('Ping: 0').move(850, 10).font({ size: 16 }).fill('black').id('pingCounter');
    draw.text(localStorage.getItem('uuid')).move(850, 30).font({ size: 16 })
    draw.text(`${ip_socket.ip}:${ip_socket.socketNr}`).move(850, 50).font({ size: 16 })
    // draw.text(localStorage.getItem('nickname')).move(850, 50).font({ size: 16 })
    let icon = icons[iconCount];
    while (icon) {
        let group = draw.group().translate(x, y).addClass('icon-group');
        group.image(`images/icons/${icon.path}`, width, height)
            .size(width, height).opacity(0.3)
            .id(`icon-${icon.name}`);
        group.text(icon.name)
            .font({ size: 12 })
            // background color for the text
            .fill('white')
            .stroke('gray')
            .center(width/2, height );
        // show hand cursor on hover
        
        // on click, show an alert with the name of the icon
        // Capture the current icon and set up a click event to post the name

        // only when currentNickname is null, we can click on the icons
        if (localStorage.getItem('nickname') == null) {
            group.addClass('clickable').click(((currentIcon, currentGroup) => {
                //console.log(`icon ${currentIcon.name} clicked`);
                let icon = draw.findOne(`#icon-${currentIcon.name}`);
                // check if the icon is clickable
                //console.log(icon.hasClass('clickable'));
                return () => {
                    const postData = {
                        name: currentIcon.name,
                        uuid: localStorage.getItem('uuid')
                    };
                    fetch('nickname', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        showToast(`Logged in!`);
                        // change board text
                        board.text(`Hallo\n${postData.name}!`);
                        localStorage.setItem('nickname', postData.name);
                        localStorage.setItem('uuid', postData.uuid);
                        // fetch names from server and update icons
                        fetchNamesAndUpdateIcons();
                        // disable click for all group-icons
                        draw.find('.icon-group').forEach(currentGroup => {
                            currentGroup.off('click');
                        })
                        draw.find('.clickable').forEach(currentIcon => {   
                            currentIcon.removeClass('clickable');
                        })
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        showToast(`Error: ${error.message}`, true);
                    });
                };
            })(icon,group));
        }
        x += width;
        if (x >= 750) {
            x = 0;
            y += height;
        }
        iconCount++;
        icon = icons[iconCount];
    };
    // fetch names from server and update icons
    fetchNamesAndUpdateIcons();

});

// ------------------------------ handle events ----------------------------

const eventSource = new EventSource('events');
let pingCount = 0;

eventSource.addEventListener('PING', function(event) {
    console.log('Ping received:', event);
    pingCount++;
    document.getElementById('pingCounter').textContent = `Ping count: ${pingCount}`;
});

eventSource.addEventListener('NICKNAME', function(event) {
    console.log('Nickname received:', event);
    const data = JSON.parse(event.data);
    console.log('New nickname:', data.nicknames);
    data.nicknames.forEach(name => updateIconOpacity(name))
});

eventSource.onopen = function() {
    console.log('Connection opened.');
};

eventSource.onerror = function(event) {
    console.log('EventSource encountered an error:', event);
};
// ------------------------------ functions -----------------------------

// Function to update the opacity of the icon
function updateIconOpacity(name) {
    const icon = document.getElementById(`icon-${name}`);
    if (icon) {
        icon.style.opacity = 1;
        // remove the clickable class
        icon.classList.remove('clickable');
        // get parent group and remove the click event
        // const group = icon.parentElement;
        // group.off('click');
    } else {
        console.error('Icon not found for:', name);
    }
}

// Function to show a toast message
function showToast(message, isError = false) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-message toast-show';
    toast.textContent = message;
    if (isError) {
        toast.style.backgroundColor = 'red';
    }
    container.appendChild(toast);
    setTimeout(() => {
        toast.className = toast.className.replace('toast-show', '');
        setTimeout(() => container.removeChild(toast), 500);
    }, 3000);
}

// Function to fetch names and update icons

// use doFetch to fetch the names from the server


// async function checkOnServer(uuid_nr) {
//     try {
//         let response = await doFetch(`nickname/${uuid_nr}`,"GET");
//         return response.nickname;
//     }
//     catch (error) {
//         console.error('Error:', error);
//         return "unknown";
//     }

    // try {
    //     const response = await fetch(`nickname/${uuid_nr}`);
    //     const data = await response.json();
    //     if (data.nickname == null) {
    //         console.log('No nickname found for uuid:', uuid_nr);
    //         return null;
    //     } else {
    //         let name = data.nickname;
    //         console.log('Fetched name:', name);
    //         return name;
    //     }
    // } catch (error) {
    //     console.log('Error fetching name for uuid:', error);
    //     return null;
    //     // localStorage.removeItem('uuid');
    //     // localStorage.removeItem('nickname');
    // }
// }
function fetchNamesAndUpdateIcons() {
    fetch('nicknames')
        .then(response => response.json())
        .then(response => {
            // 
            console.log('Fetched names:', response.nicknames);
            icons.forEach(icon => {
                if (response.nicknames.includes(icon.name)) {
                    // If the name is in the list, set the opacity to 1
                    updateIconOpacity(icon.name)
                } 
            });
        })
        .catch(error => {
            console.error('Error fetching names:', error);
        });
}

