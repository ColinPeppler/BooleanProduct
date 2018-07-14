// booleanproduct.js will calculate the boolean product of two matricies


// parses a string into a matrix
function stringParse(matrixString){
    let matrix = matrixString.split(',');   // partitions matrixString into an array with ',' as the indicator of a new block
    matrix.pop();                           // removes end of the matrix because there would be 2 rows for 1 0 1 0, instead of 1

    for(i = 0; i < matrix.length; i++){
        let array = matrix[i].split(' ');   // partitions matrix[i] into an array with ' ' as the indicator of a new block
        matrix[i] = array;                  // matrix[i] becomes array, now matrix is a multidimensional array
    }

    return matrix;
}

// parses a matrix into a string that resembles a better looking matrix
function nicerMatrix(matrix){
   let finalString = "";
   for(let i = 0; i < matrix.length; i++){
       finalString += "<br>";                       // adds a new line in between each row
       for(let j = 0; j < matrix[0].length; j++){
           finalString += matrix[i][j] + "  ";       // adds a space in between each element
       }
   }

   return finalString;
}

function booleanProduct(matrix1, matrix2){
    if (matrix1[0].length != matrix2.length) {    // check to see if matrix multiplication is possible
        return matrix1[0].length + " " + matrix2.length;    //The number of columns of matrix1 doesn't equal number of rows of matrix2; matrix1 = m x n but matrix2 != n x p
    }

    let finalMatrix = [];
    for(let i = 0; i < matrix1.length; i++) {
        finalMatrix[i] = [];                 // making finalMatrix a 2-D array
        for (let j = 0; j < matrix1[0].length; j++) {
            let isOne = false;         // indicates if finalMatrix[i][j] should be a 1 or 0
            for (let k = 0; k < matrix2.length; k++) {
                let num1 = matrix1[i][k];   // matrix1[i][k] has the same row as finalMatrix[i][j]
                let num2 = matrix2[k][j];   // matrix2[k][j] has the same column as finalMatrix[i][j]

                console.log(num1 + " " + num2);

                if (num1.includes('1') && num2.includes('1')) {     //ended up using .includes() instead of === because a whitespace was added if 1 is the first element in a row
                    isOne = true;     // finalMatrix[i][j] = 1 -> if matrix1[i][k] = 1 (ith row) and matrix2[k][j] = 1 (jth column)
                }
            }
            finalMatrix[i][j] = (isOne) ? '1' : '0';
        }
    }
    let finalString = nicerMatrix(finalMatrix);
    return finalString;
}

function calculate(){
    let matrixString1 = document.getElementById("matrix1").value;   // the text inputted into <textarea id="matrix1">
    let matrixString2 = document.getElementById("matrix2").value;   // the text inputted into <textarea id="matrix2">
    let finalMatrixObject = document.getElementById("finalMatrix");     // the text object of <p id="text">
    let matrix1Object = document.getElementById("matrix1equation");
    let matrix2Object = document.getElementById("matrix2equation");

    let matrix1 = stringParse(matrixString1);
    let matrix2 = stringParse(matrixString2);
    let boolPro = booleanProduct(matrix1, matrix2);

    matrix1Object.innerHTML = nicerMatrix(matrix1) + " &#x2299; ";
    matrix2Object.innerHTML = nicerMatrix(matrix2) + " = ";
    finalMatrixObject.innerHTML = boolPro;
}