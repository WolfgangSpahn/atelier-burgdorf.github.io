import {createBoardD3, postIt} from './draw.js';


document.addEventListener('DOMContentLoaded', function() {
    if (typeof SVG === 'undefined') {
        alert('SVG.js library is missing. Please include the script tag for SVG.js.');
        return; // Stop further execution if SVG.js is not loaded
    }
    // create a svg drawing by placing above icons in a grid using svg.js
    const draw = SVG().size('100%', '100%').addTo('#svg-team').size(1200, 620);
    // create a text board in bold
    
    createBoardD3(draw, ['Hallo how are you today with all this work', 
                        'we are going to have a great time', 
                        'this is a test', 
                        'to see how the text is wrapped', 
                        'and how the post-its are placed', 
                        'in the board', 
                        'with the help of d3.js', 
                        'all this work'], 800, 500, 120, 18);

});