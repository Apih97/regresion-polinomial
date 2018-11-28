var order=2, n=9;

loadSample([[0,1,2,3,4,5],[2.1,7.7,13.6,27.2,40.9,61.1]]);

function crearTabla(rows, cols) {
  var esp = document.querySelector(".datainput");
  if (esp.firstChild) esp.removeChild(esp.firstChild);

  var tabla = document.createElement("table");

  for (var i = 0; i <= rows; i++) {
    var fila = document.createElement("tr");
    for (var j = 0; j <= 2; j++) {
      var celda = document.createElement("td");
      if (i==0) {
        if (j>0)
          celda.innerHTML = (j==2 ? "Y":"X" );
      }
      else
        celda.innerHTML = (j==0 ? "<sub>" + i + "</sub>": "<input>");
      fila.append(celda);
    }
    tabla.append(fila);
  }

  esp.append(tabla);
}

document.querySelector("#order").addEventListener("input", function(e) {
  order = +e.target.value;
  crearTabla(n,order+1);
});

document.querySelector("#n").addEventListener("input", function(e) {
  n = +e.target.value;
  crearTabla(n,order+1);
});


function loadSample(sample) {
  var cols = sample.length;
  var rows = sample[0].length;
  crearTabla(rows,cols);
  
  var elementos = document.querySelectorAll("table input");
  
  for (var i=0; i<cols; i++)
    for (var j=0; j<rows; j++)
      elementos[i+cols*j].value = sample[i][j];
}

document.querySelector("button").addEventListener("click", function() {
  var data = [];
  
  var elementos = document.querySelectorAll("table input");

  for (var i = 0; i < elementos.length; i++) {
    var v = +elementos[i].value;
    if (i <= 1) {
      data.push([]);
      data[i].push(v);
    }
    else
      data[i%(2)].push(v);
  }

  var reg = regresion(data,order);
  
  var results = document.querySelector("#results");
  var txt = "<h1>Resultados</h1>Ecuación: " + equation(reg[0]) + "<br>";
  txt += "Error estándar: " + reg[1].toFixed(3) + "<br>";
  txt += "R cuadrado: " + reg[2].toFixed(3);
  results.innerHTML = txt;
});

function equation(coefs) {
  return coefs.reduce(function(str,coef,i) {
    str += (coef > 0 ? "+ ":"- ") + Math.abs(coef.toFixed(5)) + " ";
    if (i>0) str += "X<sup>" + i + "</sup> ";
    return str;
  },"")
}

  var reg = regresion(data);
  
  var results = document.querySelector("#results");
  var txt = "<h1>Resultados</h1>Ecuación: " + equation(reg[0]) + "<br>";
  txt += "Error estándar: " + reg[1].toFixed(3) + "<br>";   //tofixed deja (n) decimales en este caso 3
  txt += "R cuadrado: " + reg[2].toFixed(3);
  results.innerHTML = txt;
});

function equation(coefs) {
  return coefs.reduce(function(str,coef,i) {
    str += (coef > 0 ? "+ ":"- ") + Math.abs(coef.toFixed(3)) + " ";
    if (i>0) str += "X<sub>" + i + "</sub> ";
    return str;
  },"")
}
