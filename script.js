var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var palabras = ["HTML", "CSS", "PROGRAMACION", "AHORCADO", "CHALLENGE", "ALURA", "ORACLE", "JAVA", "SCRIPT", "VARIABLE", "ARRAY"]
var palabra;
var letras_incorrectas = [];
var letras_palabra = [];

function palabra_aleatoria() {
    return palabras[Math.floor(Math.random() * (palabras.length - 1))];
}

function dibujar_guiones(palabra) {
    var posicion = (1000 - ((palabra.length * 60) + ((palabra.length - 1) * 20))) / 2;

    for (var i = 0; i < palabra.length; i++) {
        pincel.fillStyle = "#FF9000";
        pincel.fillRect(posicion, 370, 60, 2);
        posicion += 80;
    }
}

function ganador() {
    document.removeEventListener("keydown", revisar_letra);

    pincel.textAlign = "center";
    pincel.font = "italic 500 3rem 'Love Ya Like A Sister'";
    pincel.fillStyle = "white";
    pincel.fillText("FELICIDADES", 760, 140);
    pincel.fillText("HAZ GANADO!", 750, 190);
}

function fin_del_juego() {
    document.removeEventListener("keydown", revisar_letra);

    pincel.textAlign = "center";
    pincel.font = "italic 500 3rem 'Love Ya Like A Sister'";
    pincel.fillStyle = "white";
    pincel.fillText("FIN DEL JUEGO", 790, 150);
}

function dibujar_letra_correcta(letra, i) {    
    var posicion_letra = (((1000 - ((palabra.length * 60) + ((palabra.length - 1) * 20))) / 2) + 30) + (i * 80);

    pincel.textAlign = "center";
    pincel.font = "italic 500 3rem 'Love Ya Like A Sister'";
    pincel.fillStyle = "white";
    pincel.fillText(letra, posicion_letra, 360);
    
    if (letras_palabra.includes(letra)) {
        var index = letras_palabra.indexOf(letra);
        letras_palabra.splice(index, 1);
    }

    if (letras_palabra.length == 0) {
        ganador();
    }
}

function dibujar_letra_incorrecta(letra) {

    if (letras_incorrectas.includes(letra) == false) {
        letras_incorrectas.push(letra);
    }

    var letra_incorrecta = "";
    for (var i in letras_incorrectas) {
        letra_incorrecta += letras_incorrectas[i];
    }

    document.getElementById("letras-incorrectas").innerHTML = letra_incorrecta;

    switch (letras_incorrectas.length) {
        case 1:
            pincel.fillStyle = "white"; // base1
            pincel.fillRect(400, 50, 7, 190);
            break;
        case 2:
            pincel.fillStyle = "white"; //base2
            pincel.fillRect(400, 50, 150, 7);

            pincel.strokeStyle = "white"; //base3
            pincel.lineWidth = 4;
            pincel.beginPath();
            pincel.moveTo(405, 95);
            pincel.lineTo(445, 55);
            pincel.stroke()
            pincel.closePath();
            break;
        case 3:
            pincel.strokeStyle = "white"; //cuerda
            pincel.lineWidth = 3;
            pincel.beginPath();
            pincel.moveTo(530, 60);
            pincel.lineTo(530, 90);
            pincel.stroke()
            pincel.closePath();
            break;
        case 4:
            pincel.strokeStyle = "white"; //cabeza
            pincel.beginPath();
            pincel.arc(530, 107, 15, 0, Math.PI * 2, true);
            pincel.fill()
            break;
        case 5:
            pincel.strokeStyle = "white"; //cuerpo
            pincel.lineWidth = 5;
            pincel.beginPath();
            pincel.moveTo(530, 120);
            pincel.lineTo(530, 180);
            pincel.stroke()
            pincel.closePath();
            break;
        case 6:
            pincel.strokeStyle = "white"; //brazo1
            pincel.lineWidth = 4;
            pincel.beginPath();
            pincel.moveTo(530, 123);
            pincel.lineTo(510, 155);
            pincel.stroke()
            pincel.closePath();
            break;
        case 7:
            pincel.strokeStyle = "white"; //brazo2
            pincel.lineWidth = 4;
            pincel.beginPath();
            pincel.moveTo(530, 123);
            pincel.lineTo(550, 155);
            pincel.stroke()
            pincel.closePath();
            break;
        case 8:
            pincel.strokeStyle = "white"; //pierna1
            pincel.lineWidth = 4;
            pincel.beginPath();
            pincel.moveTo(530, 180);
            pincel.lineTo(550, 215);
            pincel.stroke()
            pincel.closePath();
            break;
        case 9:
            pincel.strokeStyle = "white"; //pierna2
            pincel.lineWidth = 4;
            pincel.beginPath();
            pincel.moveTo(530, 180);
            pincel.lineTo(510, 215);
            pincel.stroke()
            pincel.closePath();
            
            fin_del_juego();
            break;
    }
}


function revisar_letra(e) {
    var letra = e.key.toUpperCase();

    if (letra.charCodeAt() >= 65 && letra.charCodeAt() <= 90 && letra.length == 1) {
        for (var i = 0; i < palabra.length; i++){
            if (letra == palabra[i]) {
                dibujar_letra_correcta(letra, i);
            }
            else if (palabra.includes(letra) == false) {
                dibujar_letra_incorrecta(letra);
            }
        }
    }
}

function juego() {
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("juego-ahorcado").style.display = "inline";

    pincel.fillStyle = "white"; //piso
    pincel.fillRect(300, 235, 400, 10);

    palabra = palabra_aleatoria();

    for (var i = 0; i < palabra.length; ++i) {
        letras_palabra.push(palabra[i]);
    }
    
    dibujar_guiones(palabra);

    document.addEventListener("keydown", revisar_letra);        
}

function nuevo_juego() {
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    palabra = "";
    letras_incorrectas = [];
    letras_palabra = [];
    document.getElementById("letras-incorrectas").innerHTML = "";
    juego();
}

function desistir() {
    nuevo_juego();
    document.getElementById("juego-ahorcado").style.display = "none";
    document.getElementById("pantalla-inicio").style.display = "flex";
}

function agregar_palabra() {
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("agregar-nueva-palabra").style.display = "inline";
    document.getElementById("nueva-palabra").value = "";
}

function guardar_empezar() {
    var nueva_palabra = document.getElementById("nueva-palabra").value.toUpperCase();
    console.log(nueva_palabra);
    if (palabras.includes(nueva_palabra) == false && nueva_palabra != "") {
        palabras.push(nueva_palabra);
    }
    console.log(palabras);
    document.getElementById("agregar-nueva-palabra").style.display = "none";
    document.getElementById("juego-ahorcado").style.display = "inline";
    nuevo_juego();
}

function cancelar() {
    document.getElementById("agregar-nueva-palabra").style.display = "none";
    document.getElementById("pantalla-inicio").style.display = "flex";
}