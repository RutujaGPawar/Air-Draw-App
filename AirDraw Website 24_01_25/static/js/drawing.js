// Array of colors and corresponding class names for color boxes
const colors = [
    'color-red', 'color-green', 'color-blue',
    'color-yellow', 'color-black', 'color-white',
    'color-cyan', 'color-pink', 'color-purple'
];

// Function to clear the canvas
function clearCanvas() {
    if (confirm('Are you sure you want to clear the canvas?')) {
        fetch('/clear_canvas', { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    alert('Failed to clear the canvas.');
                }
            });
    }
}

// Function to save the canvas
function saveCanvas() {
    fetch('/save_canvas', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Failed to save the canvas.');
            }
        })
        .then(filePath => {
            alert('Canvas saved as ' + filePath);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Could not save canvas.');
        });
}

// Function to highlight the selected color box
function highlightSelectedColor(index) {
    const colorBoxes = document.querySelectorAll('.color-box');
    colorBoxes.forEach((box, i) => {
        box.style.border = i === index ? '2px solid black' : 'none';
    });
}

let selectedColorIndex = 0;  // Default selected color (red)

// Function to select a color and update the backend
function selectColor(index) {
    selectedColorIndex = index;  // Update selected color index

    // Send the selected color to the Flask backend
    fetch('/set_color/' + index, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            highlightSelectedColor(index);  // Highlight selected color
            alert('Color selected: ' + colors[index]);
        } else {
            alert('Failed to change color.');
        }
    });
}

// Function to select a shape (example for future shape functionalities)
function selectShape(shape) {
    selectedShape = shape;
    alert('Shape selected: ' + shape);
}

// Function to initialize the page
window.onload = function () {
    highlightSelectedColor(0);
};