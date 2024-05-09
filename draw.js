///////////////////////////////////////////// SVG UTILITY FUNCTIONS ///////////////////////////////////////

export function checkSVG() {
    if (typeof SVG === 'undefined') {
        alert('SVG.js library is missing. Please include the script tag for SVG.js.');
        throw new Error('SVG.js library is not loaded');
    }
}

export function checkD3() {
    if (typeof d3 === 'undefined') {
        alert('D3.js library is missing. Please include the script tag for D3.js.');
        throw new Error('D3.js library is not loaded');
    }
}

export const domReady = (callBack) => {

    // Check if the document is already loaded
    if (document.readyState === "loading") {
      document.addEventListener('DOMContentLoaded', callBack);
    }
    else {
        // TODO: do we need some other checks here?
        callBack();
    }
  }

export function getSVG(id, argConfig) {
    const defaults = { width: 1050, height: 600 };
    const config = { ...defaults, ...argConfig };
    if(id[0] !== '#') {id = '#' + id;}
    return SVG().size('100%', '100%').addTo(id).size(config.width, config.height);
}

// fetch data from the server
// method = 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
export async function doFetch(url, method, data = null, /* leagcy */ callback = null ) {

    const fetchOptions = {
        method: method,
        headers: {}
    };

    // Only attach the body for methods that typically use a body payload
    if (data !== null && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        fetchOptions.headers['Content-Type'] = 'application/json';
        fetchOptions.body = JSON.stringify(data);
    }

    // Return the Promise to allow for both callback and promise-based handling
    try {
        const response = await fetch(url, fetchOptions);
        // if (!response.ok) {
        //     console.warn('Error:', response);
        //     return response;
        // }
        const response_1 = await response.json();
        if (callback) {
            callback(response_1);
        }
        return response_1;
    } catch (error) {
        console.warning('Error:', error);
    }
}

export function rectWithText(draw, x, y, width, height, textFn, argConfig) {
    // Default configuration rx="2px", ry="2px",  textStroke ="white", fill = "gray", stroke = "black", strokeWidth = 1
    const defaults = { rx: 5, ry: 5, fontSize: 14, textStroke: 'white', rectFill: 'black', rectStroke: 'black', rectStrokeWidth: 1, 
                       callback: () => {console.log(`rectWithText "${textFn()}" clicked`)},
                       args: [] 
                     };
    const config = { ...defaults, ...argConfig };
    // Create a group and transform it to the specified x and y coordinates
    let group = draw.group().translate(x, y);

    // Add a rectangle to the group
    group.rect(width, height)
         .radius(config.rx, config.ry)           // Set the rounded corners
         .fill(config.rectFill)               // Set the fill color
         .addClass('clickable')
         .stroke({ width: config.rectStrokeWidth, color: config.rectStroke });  // Set the stroke width and color

    // Add text to the group, centered in the middle of the rectangle
    let text = group.text(textFn())
         .font({ anchor: 'middle', fill: config.textStroke, size: config.fontSize })  // Center the text horizontally and set the text color
         .addClass('clickable')
         .center(width / 2, height / 2);            // Move the text to the center of the rectangle

    // If a callback function is provided, add it to the group
    if (config.callback) {
        group.click(() => config.callback(text,...config.args));
    }
}


// Function to measure text width without rendering it visibly
// Function to measure text width without rendering it visibly
function measureTextWidth(draw,text, fontFamily, fontSize) {
    // Create text element off-screen
    const textElement = draw.text(text).move(-1000, -1000).font({ family: fontFamily, size: fontSize });

    // Get the bounding box of the text, specifically the width
    const textWidth = textElement.bbox().width;

    // Remove the text element after measurement
    textElement.remove();

    return textWidth;
}

export function postIt(draw, text, x, y, maxWidth=100, lineHeight=18, maxHeight=50) {
    const words = text.split(" ");

    let lineNumber = 0;
    let leftMargin = lineHeight/2;
    let topMargin = lineHeight/8;
    let size = lineHeight;
    let lineX = x + leftMargin;
    let lineY = y + topMargin;
    maxWidth = maxWidth - leftMargin;

    // holds the lines of text and x, y coordinates
    let lines = [];
    let line = '';
    let height = topMargin*3;
    words.forEach(function(word) {
        const testLine = line + word + ' ';
        // get the width of the text without rendering it
        const testWidth = measureTextWidth(draw, testLine, 'Arial', size);
        // console.log(testWidth, testLine, line, height, maxWidth);
        // If the line is too long, wrap the text
        if (testWidth > maxWidth) {
            lines.push({text: line});
            line = word + ' ';
            height += lineHeight*1.1;
        } else {
            line = testLine;
        }
        // draw.text(line).move(x+leftMargin, y + (lineNumber * lineHeight)).font({ family: 'Arial', size: size });
    });
    lines.push({text: line});
    height += lineHeight;
    // Create a group for the post-it note
    const group = draw.group();
    if (height < maxHeight) {
        height = maxHeight;
    }
    group.rect(120, height).attr({ fill: '#f9f79c', stroke: '#333', 'stroke-width': 2 }).move(x, y);
    // console.log({lines});
    lines.forEach(function(line) {
        const textElement = createSVGText(line.text, lineX, lineY, size, 'black');
        group.node.appendChild(textElement);
        lineY = lineY + lineHeight;
        // group.text(line.text).move(line.x, line.y).font({ family: 'Arial', size: size }).attr('dominant-baseline', 'text-before-edge');
    });
    // show hand cursor on hover
    group.addClass('clickable');
    // Make the group draggable
    group.draggable();
}


export function createBoardD3(draw, texts, boardWidth, boardHeight) {
    const nodes = texts.map(text => ({
        x: Math.random() * boardWidth*0.8,
        y: Math.random() * boardHeight*0.9,
        text: text
    }));

    draw.rect(boardWidth, boardHeight).fill('white').stroke({ color: '#333', width: 2 });

    const simulation = d3.forceSimulation(nodes)
        .force('x', d3.forceX(d => d.x).strength(0.5))
        .force('y', d3.forceY(d => d.y).strength(0.5))
        .force('collide', d3.forceCollide(60)) // Adjust collision radius based on post-it size
        .stop();

    for (let i = 0; i < 120; ++i) simulation.tick(); // Run simulation to space out elements

    nodes.forEach(node => {
        postIt(draw, node.text, node.x, node.y, 110, 18);
    });
}

export function createBoard(draw, texts, boardWidth, boardHeight, maxWidth, lineHeight) {

    texts.forEach(function(text) {
        // Choose a random position for the post-it
        const x = Math.random() * (boardWidth - 120); // Adjusted for wider post-its
        const y = Math.random() * (boardHeight - 70); // Adjusted for taller post-its

        // Create and place a post-it note
        postIt(draw, text, x+maxWidth/2, y+5*lineHeight, maxWidth, lineHeight); // maxWidth and lineHeight as required
    });
}


export function origin(draw, x, y, argConfig) {
    // radius = 5, fillColor = 'red'
    const defaults = {radius: 5, fillColor: 'red'};
    const config = { ...defaults, ...argConfig };
    // Add a circle to the SVG drawing at the specified position
    draw.circle(config.radius * 2)  // The diameter is twice the radius
        .fill(config.fillColor)     // Set the fill color
        .center(x, y);       // Position the center of the circle at (x, y)
}


export function likertScale(draw, id) {
    const radius = 10;
    const spacing = 150;
    const labels = [
        "Stimme voll zu",
        "Stimme eher zu", 
        "Neutral", 
        "Stimme eher nicht zu", 
        "Stimme gar nicht zu"
    ];

    let x = 0;
    // Create rectangles and text labels for each point in the Likert scale
    for (let i = 0; i < 5; i++) {
        x = (i+1) * spacing;
        // Draw rectangle
        const c = draw.circle(radius * 2)
            .center(x, 30)
            .fill('white')
            .stroke({ width: 1, color: '#000' })
            // show hand on hover
            .addClass('clickable')
            .addClass('radio-box')
            // set id
            .attr({ id: `${id}-${i}` });

        // Add label below each rectangle
        // draw.text(labels[i])
        //     .move(x, 30) // This sets the x and y position
        //     .font({ anchor: 'middle', size: 14 }) // This sets the text-anchor to middle
        //     .attr('alignment-baseline', 'middle'); // This sets the alignment-baseline to middle
        const textElement = createSVGText(labels[i], x, 45, 14, 'black');
        draw.node.appendChild(textElement);
      
    }

    // Interaction with rectangles (optional)
    draw.find('.radio-box').click(function() {
        // console.log('Clicked on radio box');
        draw.find('.radio-box').fill('white'); // Reset all
        this.fill({ color: '#c0c0c0' });       // Highlight selected
        // post data to the server
        let value = this.attr('id').split('-')[1];
        doFetch('likert', 
                'POST', 
                {user:localStorage.getItem('nickname'), likert: id, value: value}, 
                (response) => {console.log(response);}
        );
        });
};

export function board(id,argConfig){
    // import {domReady,getSVG, board} from './draw.js';
    const defaults = { width: 1050, height: 600 };
    const config = { ...defaults, ...argConfig };
    domReady(() => {
        const draw = getSVG(id, config);
        draw.rect(config.width, config.height).fill('white').stroke({ width: 1, color: 'black' })
    })
}

export function resultsBoard(id,qid,argConfig){
    const defaults = { width: 1050, height: 550, fieldname: 'answers'};
    const config = { ...defaults, ...argConfig };
    // create an svg drawing by placing above icons in a grid using svg.js
    // check if id starts with #, otherwise add #
    if (id[0] !== '#') {id = '#' + id;}

    domReady(async () => {
        const draw = getSVG(id, config);

        // fetch data from the server
        try {
            // console.log(`answers/${qid}`);
            const data = await doFetch(`answer/${qid}`, 'GET')
            console.log(data);
            createBoardD3(draw, data[config.fieldname], config.width, config.height, 120, 18);
        } catch (error) {
            console.warn('Warning:', error);
        }
        // update the board via server-sent events
        eventSource.addEventListener(`A-${qid}`, function(event) {
            // console.log('Event received:', event, event.data);
            // render json data
            const data = JSON.parse(event.data);
            draw.clear();
            createBoardD3(draw, data.answers, config.width, config.height, 120, 18);
    
            // const data = JSON.parse(event.data);
        });  

    });
}

export async function likertPercentage(id){
    console.log(`get likert/${id}`);
    try {
        let response = await doFetch(`likert/${id}`,"GET");
        return response['likert'];
    }
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}
    


export function createSVGText(text, x, y, size = 18, color = 'black') {
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', x);
    textElement.setAttribute('y', y);
    textElement.setAttribute('fill', color);
    textElement.setAttribute('font-family', 'Arial');
    textElement.setAttribute('font-size', size);
    textElement.setAttribute('text-anchor', 'left');  // Centers text horizontally
    textElement.setAttribute('dominant-baseline', 'text-before-edge');  // Aligns text top to y coordinate
    textElement.textContent = text;
    return textElement;
}

function submitForm(inputId, formId) {
    var value = document.getElementById(inputId).value;
    // alert(localStorage.getItem('uuid') + ' entered: ' + value);
    doFetch("answer", "POST", {"answer": value, "qid":formId, "uuid":localStorage.getItem('uuid')}, null) ;
    }

export function submitOnReturn(inputFieldId, formId) {
    domReady(function () {
        const inputField = document.getElementById(inputFieldId);

        inputField.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); // Prevent the form from submitting in the default way

                // Assuming submitForm takes the input field's value and the form's id
                submitForm(inputFieldId, formId);
                inputField.value = ''; // Clear the input field
            }
        });
    });
}

export async function getIPSocket() {
    try {
        let response = await doFetch('ipsocket',"GET");
        return response;
    }
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}
// register the functions as global functions
window.doFetch = doFetch;
window.getIPSocket = getIPSocket;
