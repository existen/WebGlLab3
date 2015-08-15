
var gl: WebGLRenderingContext

window.onload = () => {

    var canvas = <HTMLCanvasElement>document.getElementById("gl-canvas");
    gl = setupWebGL(canvas);
    if (!gl)
    {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    // array element buffer
    //var iBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    ////color array atrribute buffer
    //var cBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, flatten2(vertexColors), gl.STATIC_DRAW);

    //var vColor = gl.getAttribLocation(program, "vColor");
    //gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(vColor);

    ////vertex array attribute buffer
    //var vBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, flatten2(vertices), gl.STATIC_DRAW);

    //var vPosition = gl.getAttribLocation(program, "vPosition");
    //gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(vPosition);

     render();
}

function render()
{
    //rotate square 3 choices: in CPU, in GPU send angle, in GPU send MVM
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    
    //this is more efficient than use triangle strips or fans
    //gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0)

    requestAnimationFrame(render);
}