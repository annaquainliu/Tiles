
window.onload = () => {

let total_amnt_patterns = 18
let square_width = 60; //px
let board_columns = 5;
let board_rows = 6;

/**
 * @param {Integer} side1 : length
 * @param {Integer} side2 : length
 * @param {Integer} side3 : length
 * @param {String} color 
 * @returns {HTMLElement} 
 */
function triangle(side1, side2, side3, color) {
    let elem = document.createElement('div');
    elem.style.width = '0';
    elem.style.height = '0';
    elem.style.borderLeft = `${side1.toString()}px solid transparent`
    elem.style.borderRight = `${side2.toString()}px solid transparent`
    elem.style.borderBottom = `${side3.toString()}px solid ${color}`;
    return elem;
}

/**
 * @param {Integer} width 
 * @param {Integer} height 
 * @param {String} color 
 * @returns {HTMLElement}
 */
function rectangle(width, height, color) {
    let elem = document.createElement('div');
    elem.style.width = `${width.toString()}px`;
    elem.style.height = `${height.toString()}px`;
    elem.style.backgroundColor = color;
    return elem;
}

function ellipse(width, height, color) {
    let elem = document.createElement('div');
    elem.style.width = `${width.toString()}px`;
    elem.style.height = `${height.toString()}px`;
    elem.style.backgroundColor = color;
    elem.style.borderRadius = '50%';
    return elem;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function random_number(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Randomly return HTML node of generated patterns
 */
function create_pattern() {
    let random_index = Math.floor(Math.random() * 2)
    let pattern;
    if (random_index == 0) {
        pattern = triangle(random_number(square_width), 
                        random_number(square_width), 
                        random_number(square_width), 
                        getRandomColor())
    }
    else if (random_index == 1) {
        pattern = ellipse(random_number(square_width), 
                       random_number(square_width),
                        getRandomColor());
    }
    else {
        pattern = rectangle(random_number(square_width), 
                        random_number(square_width),
                        getRandomColor())
    }
    pattern.style.position = 'absolute';
    return pattern;
}

function init_board() {
    let board = document.getElementById("board");
    let board_record = [];
    // initialize
    for (let i = 0; i < board_rows * board_columns; i++) {
        board_record.push(0);
    }

    for (let row = 0; row < board_rows; row++) {
        let row_elem = document.createElement('div');
        row_elem.className = "row";
        for (let col = 0; col < board_columns; col++) {
            let square = document.createElement('div');
            square.className = 'square';
            square.id = (row * board_columns + col).toString();
            row_elem.appendChild(square);
        }
        board.appendChild(row_elem);
    }

    for (let i = 0; i < total_amnt_patterns; i++) {
        let pattern = create_pattern();
        
        for (let j = 0; j < 4; j++) {
            let random_index = Math.floor(Math.random() * board_record.length);
            document.getElementById(random_index + "").appendChild(pattern);
            board_record[random_index]++;
            pattern.style.zIndex = board_record[random_index];
            if (board_record[random_index] == 3) {
                board_record.splice(random_index, 1);
            }
        }
    }

}

init_board();

}