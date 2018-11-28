/*
var data = [[0,1,2,3,4,5],[2.1,7.7,13.6,27.2,40.9,61.1]];
var reg = regresion(data,2);
console.log(reg);
*/

function regresion(data, order) {
  var coefs;
  var Se = 0, St = 0;
  var errorStd, Rcuad;
  
  var n = data[0].length;
  
  var A = [];
  for (var i=0; i<=order; i++) {
    A.push([]);
    for (var j=0; j<=order+1; j++)
      A[i].push(0);
  }
  
  var X = Array.from(data).shift();
  var Y = Array.from(data).pop();
  
  for (var i=0; i<= order; i++) {
    for (var j=0; j<=i; j++) {
      var sum = 0;
      var k = i + j;
      for (var l=0; l<n; l++)
        sum += Math.pow(X[l], k);
      A[i][j] = sum;
      A[j][i] = sum;
    }
    sum = 0;
    for (var l=0; l<n; l++)
      sum += Y[l] * Math.pow(X[l], i);
    A[i][order+1] = sum;
  }
  console.log(A);
  coefs = gauss(A);
  
  for (var i=0; i<n; i++) {
    Se += Math.pow(Y[i]-polinomio(X[i],coefs),2);
    St += Math.pow(Y[i] - avg(Y), 2);
  }

  return [coefs, Math.sqrt(Se/(n-order-1)), 1-Se/St];
  
}

function polinomio(x, coefs) {
  var sum = coefs[0];
  for (var i=1; i<coefs.length; i++)
    sum += coefs[i] * Math.pow(x, i);
  return sum;
}

function avg(X) {
  var sum = 0; 
  for (var i=0; i<X.length; i++)
    sum += X[i]
  return sum/X.length;
}

function gauss(A) {
  var n = A.length;
  var B = [];

  for (var i = 0; i < n; i++) B.push(A[i].pop());

  var X = [];
  for (var i = 0; i < n; i++) X.push(0);

  for (var k = 0; k <= n - 2; k++)
    for (var i = k + 1; i < n; i++) {
      var factor = A[i][k] / A[k][k];
      for (var j = k + 1; j < n; j++) A[i][j] -= factor * A[k][j];
      B[i] -= factor * B[k];
    }

  X[n - 1] = B[n - 1] / A[n - 1][n - 1];

  for (var i = n - 2; i >= 0; i--) {
    var sum = B[i];
    for (var j = i + 1; j < n; j++) sum -= A[i][j] * X[j];
    X[i] = sum / A[i][i];
  }
  return X;
}
