var gl : WebGLRenderingContext

window.onload = () => {

    var canvas = <HTMLCanvasElement>document.getElementById("gl-canvas");
    gl = setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height)
    //gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    //var vBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumVertices, gl.STATIC_DRAW);

    //var vPosition = gl.getAttribLocation(program, "vPosition");
    //gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(vPosition);

    //var cBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, 16 * maxNumVertices, gl.STATIC_DRAW);

    //var vColor = gl.getAttribLocation(program, "vColor");
    //gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(vColor);

     render()
};


function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    //window.requestAnimationFrame(render);
}