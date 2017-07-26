let key;
let rot1;
let rot2;
let rot3;
let refl;
let pos1;
let pos2;
let pos3;

let chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

/* allow press only letters+number+space+del*/

$(window).on("keydown", function(e) {
    key = e.keyCode ? e.keyCode : e.which;
    if (key == 8) {
        backSpace()
        return
    } else if ((key < 65 || key > 90) && key != 16 && key != 32 && key != 8) {
        return false;
    }
    key = String.fromCharCode(key);
    console.log(key);
    $("#" + key).click()
        //enigma();  
});

/*click by cursor on keyboard*/
$(".char").on("click", function() {
    key = $(this).text()
    enigma()
});

$("#backSpace").on("click", function() {
    backSpace()
});

//toggle Settings
$("#settings").on("click", function() {
    $('#settingsPanel').removeClass("hideSettings");
});



//toggle plugBoard
$("#togglePlugBoard").on("click", function() {
    $('#plugBoard').removeClass("hideSettings");
});
$("#connect-dots-ready").on("click", function() {
     $('#plugBoard').addClass("hideSettings");
});


let img1
let img2

$("#switcher").on("click", function() {
    //empty the text
    clearText()

    img1 = $("#firstimg").attr("src");
    img2 = $("#secondimg").attr("src");
    $("#firstimg").attr("src", img2);
    $("#secondimg").attr("src", img1);
    $("#switcher").toggleClass("flip");
});

let clearText = () => {
    while($("#texte").text() != "")
        backSpace()
}

$("#1up").on("click", function() {
    rotors[0].rotate(1)
    updateRotors()
});
$("#1down").on("click", function() {
    rotors[0].unshift()
    updateRotors()
});

$("#2up").on("click", function() {
    rotors[1].rotate(1)
    updateRotors()
});
$("#2down").on("click", function() {
    rotors[1].unshift()
    updateRotors()
});


$("#3up").on("click", function() {
    rotors[2].rotate(1)
    updateRotors()
});
$("#3down").on("click", function() {
    rotors[2].unshift()
    updateRotors()
});



$("#cpbtn").on("click", function() {
    copyToClipboard('#texteChiffrer')
    'use strict';
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {
        message: 'Text copied to Clipboard'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

});

$("#pstbtn").on("click", function() {
    'use strict';
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {
        message: 'Use CTRL+V to paste text'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

});

$("#pstbtn").on("click", function() {
});


let updateRotors = () => {
    pos1 = rotors[0].rotation
    pos2 = rotors[1].rotation
    pos3 = rotors[2].rotation
    $('#pos1').text(chars[pos1]);
    $('#pos2').text(chars[pos2]);
    $('#pos3').text(chars[pos3]);
}



/* event change if we change settings */
$("select").on("change", function() {
    rot1 = $('#rotor1').val();
    rot2 = $('#rotor2').val();
    rot3 = $('#rotor3').val();
    refl = $('#reflector').val();
    selectRotors(rot1, rot2, rot3);
    selectReflector(refl);
});

$("#texte").on("change", function() {
    console.log($('#texte').val())
    encrypt($('#texte').val())
});


class Rotor {
    constructor(data, next) {
        this.data = data
        this.rotation = 0
            //this.rotateNext = false
        this.next = next
    }

    rotate(degree) {
        this.rotation += degree
        if (this.rotation >= 26) {
            this.rotation = this.rotation % 26
            if (this.next)
                this.next.rotate(1)
        }
    }

    unshift() {
        this.rotation -= 1
        if (this.rotation < 0) {
            this.rotation = 26 + this.rotation
            if (this.next)
                this.next.unshift()
        }
    }

    getValue(position) {
        return this.data[(position + this.rotation) % 26]
    }

    getPosition(value) {
        //return this.data.indexOf((value + this.rotation) % 26)
        var tmp = this.data.indexOf(value) - this.rotation
        if (tmp < 0)
            tmp = 26 + tmp;
        return tmp
    }

}

class Reflector {
    constructor(data) {
        this.data = data
    }

    getValue(position) {
        return this.data[position]
    }
}

let rotorsData = [
    [3, 5, 2, 24, 17, 12, 22, 8, 15, 0, 20, 13, 11, 18, 9, 1, 14, 4, 6, 25, 19, 23, 16, 21, 10, 7],
    [10, 12, 18, 23, 13, 6, 20, 24, 4, 8, 2, 14, 21, 16, 11, 7, 0, 5, 9, 3, 19, 22, 25, 15, 17, 1],
    [7, 25, 3, 2, 5, 6, 16, 13, 23, 21, 17, 10, 24, 4, 8, 11, 20, 1, 19, 9, 0, 14, 22, 15, 12, 18],
    [21, 1, 14, 23, 5, 7, 17, 18, 25, 12, 8, 3, 0, 13, 4, 22, 2, 24, 6, 9, 16, 19, 10, 11, 20, 15],
    [0, 8, 7, 25, 22, 14, 16, 12, 9, 4, 21, 6, 13, 24, 3, 20, 10, 19, 17, 15, 2, 5, 11, 23, 18, 1]
]


let rotors = []
let r1 = r2 = r3 = null
let selectRotors = function(a, b, c) {
    rotors = []
    r3 = new Rotor(rotorsData[c - 1], null)
    r2 = new Rotor(rotorsData[b - 1], r3)
    r1 = new Rotor(rotorsData[a - 1], r2)
    rotors.push(r1, r2, r3)
}

let reflectorsData = [
    [14, 15, 19, 17, 23, 25, 18, 16, 13, 21, 22, 24, 20, 8, 0, 1, 7, 3, 6, 2, 12, 9, 10, 4, 11, 5],
    [14, 24, 23, 17, 21, 13, 18, 22, 20, 25, 16, 15, 19, 5, 0, 11, 10, 3, 6, 12, 8, 4, 7, 2, 1, 9]
]
let reflector = null
let selectReflector = function(id) {
    reflector = new Reflector(reflectorsData[id - 1]);
}









let path = []
let plugged
let encryptChar = function(char, log) {
    plugged = plugBoard[char]
    path[0] = rotors[0].getValue(chars.indexOf(plugged))
    path[1] = rotors[1].getValue(path[0])
    path[2] = rotors[2].getValue(path[1])
    path[3] = reflector.getValue(path[2])
    path[4] = rotors[2].getPosition(path[3])
    path[5] = rotors[1].getPosition(path[4])
    path[6] = rotors[0].getPosition(path[5])
    path[7] = plugBoard[chars[path[6]]]
    rotors[0].rotate(1);
    if (log == 1)
        console.log(char + " : " + chars.indexOf(char) + "," + path + " : " + chars[path[7]]);
    else
        return path[7];
}

let encrypt = (message) => {
    message = message.toUpperCase()
    let chara = message.split(' ').join('').split('')
    let result = ""
    for (var i = 0; i < chara.length; i++) {
        result += encryptChar(chara[i])
        //$('#texteChiffrer').text(result)
    }
    console.log("Encryption of \"" + message + "\" is: \"" + result + "\"")
    return result
}

let enigma = () => {
    key = key.toUpperCase()
    $('#texte').append(key)
    let charCryp = encryptChar(key);
    $('#texteChiffrer').append(charCryp)
    $("#" + key).siblings().removeClass('clicked');
    $("#" + key).addClass('clicked');
    $("button").siblings().removeClass('lightup');
    $("#" + charCryp).addClass('lightup');
    updateRotors()
};

/* set default settings*/
$(document).ready(function() {
    $('#rotor1').val("1");
    $('#rotor2').val("2");
    $('#rotor3').val("3");
    $('#reflector').val("1");
    rot1 = $('#rotor1').val();
    rot2 = $('#rotor2').val();
    rot3 = $('#rotor3').val();
    refl = $('#reflector').val();
    selectRotors(rot1, rot2, rot3);
    selectReflector(refl);
    updateRotors()
    clearText()
});


let backchar
let backSpace = () => {
    var txt = $('#texte').text().split('')
    if (txt != "")
        rotors[0].unshift();
    txt.pop()
    $('#texte').text(txt.join(''))
    txt = $('#texteChiffrer').text().split('')
    txt.pop()
    $('#texteChiffrer').text(txt.join(''))
    updateRotors()
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

//bind paste
$("body").bind("paste", (e) => {
    // access the clipboard using the api
    var pastedData = e.originalEvent.clipboardData.getData('text')
    //delete the v that apears while clicking CTRL+V
    backSpace()
    //encrypt and append th message
    var encrypted = encrypt(pastedData)
    $('#texteChiffrer').append(encrypted)
    $('#texte').append(pastedData)
    updateRotors()
})

//reset rotors
let resetSettings = ()=>{
    $('.connect-dots-wrong').removeClass('connect-dots-wrong');
    $('.connect-dots-right').removeClass('connect-dots-correct');
    $('#rotor1').val("1");
    $('#rotor2').val("2");
    $('#rotor3').val("3");
    $('#reflector').val("1");
    updateRotors();
    resetPlugBoard();
    clearText()
};



//plugBoard Stuff
let plugBoard = {}
let resetPlugBoard = () => {
    chars.map((char)=>{plugBoard[char] = char; return char;})
}

resetPlugBoard();

let hideSettings = ()=>{
     $('#settingsPanel').addClass("hideSettings");
}
