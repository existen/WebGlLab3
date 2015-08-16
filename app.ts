
var gl: WebGLRenderingContext

var sliderRotation: HTMLInputElement[] = []
var sliderPosition: HTMLInputElement[] = []
var sliderScale: HTMLInputElement[] = []
var boxFigure: HTMLSelectElement
var maxNumVertices = 100000;
var indexVertices = 0
var indexElements = 0
var iBuffer: WebGLBuffer
var cBuffer: WebGLBuffer
var vBuffer: WebGLBuffer


window.onload = () => {

    var canvas = <HTMLCanvasElement>document.getElementById("gl-canvas");
    gl = setupWebGL(canvas);
    if (!gl)
    {
        alert("WebGL isn't available");
    }

    //
    sliderRotation[0] = <HTMLInputElement>document.getElementById("sliderRotationX")
    sliderRotation[1] = <HTMLInputElement>document.getElementById("sliderRotationY")
    sliderRotation[2] = <HTMLInputElement>document.getElementById("sliderRotationZ")
    
    sliderPosition[0] = <HTMLInputElement>document.getElementById("sliderPositionX")
    sliderPosition[1] = <HTMLInputElement>document.getElementById("sliderPositionY")
    sliderPosition[2] = <HTMLInputElement>document.getElementById("sliderPositionZ")
    
    sliderScale[0] = <HTMLInputElement>document.getElementById("sliderScaleX")
    sliderScale[1] = <HTMLInputElement>document.getElementById("sliderScaleY")
    sliderScale[2] = <HTMLInputElement>document.getElementById("sliderScaleZ")

    var butCreate = <HTMLButtonElement>document.getElementById("butCreate")
    var butClear = <HTMLButtonElement>document.getElementById("butClear")
    boxFigure = <HTMLSelectElement>document.getElementById("boxFigure")

    butCreate.onclick = CreateFigureOnCanvas
    butClear.onclick = function()
    {
        indexVertices = 0
        indexElements = 0
    }
    //

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    InitGL()
}


function InitGL()
{
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    // array element buffer
    iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, maxNumVertices, gl.STATIC_DRAW);
    checkError()

    //color array atrribute buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, maxNumVertices, gl.STATIC_DRAW);
    checkError()

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    checkError()

    //vertex array attribute buffer
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, maxNumVertices, gl.STATIC_DRAW);
    checkError()

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    checkError()

    render()
}



function DrawFigure(figure)
{
    var indices = flatten2_array(figure.triangles)
    numElements = indices.length
    
    //recalculate indices
    for (var i = 0; i < indices.length; ++i)
    {
        indices[i] = indices[i] + indexVertices
    }
    //

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 16 * indexVertices, flatten2(figure.vertices));    
    checkError()

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 16 * indexVertices, flatten2(GetColorsArray(figure.vertices.length)));
    checkError()

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, 2 * indexElements, new Uint16Array(indices));
    checkError()
    
    indexVertices += figure.vertices.length
    indexElements += indices.length    

    render();
}

function checkError()
{
    var err = gl.getError()
    if (err != 0)
    {
        if (err == gl.INVALID_OPERATION)
            alert("INVALID_OPERATION")
        else if (err == gl.INVALID_ENUM)
            alert("INVALID_ENUM")
        else if (err == gl.INVALID_FRAMEBUFFER_OPERATION)
            alert("INVALID_FRAMEBUFFER_OPERATION")
        else if (err == gl.INVALID_VALUE)
            alert("INVALID_VALUE")
        else
            alert("XXX")

        var fff = 5
    }
}

function render()
{
    //rotate square 3 choices: in CPU, in GPU send angle, in GPU send MVM
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawElements(gl.TRIANGLES, indexElements, gl.UNSIGNED_SHORT, 0)

    //gl.drawElements(gl.LINE_LOOP, indexElements, gl.UNSIGNED_SHORT, 0)

    //requestAnimationFrame(render);
}

function CreateFigureOnCanvas()
{
    var sizeFactor = 0.2  //unit size

    var position = vec3(+sliderPosition[0].value, +sliderPosition[1].value, +sliderPosition[2].value)
    var rotation = vec3(+sliderRotation[0].value, +sliderRotation[1].value, +sliderRotation[2].value)
    var scale = vec3(+sliderScale[0].value, +sliderScale[1].value, +sliderScale[2].value)
    var figureIndex = +boxFigure.value

    //MVM
    var matScale = scaleMat(scale[0] * sizeFactor, scale[1] * sizeFactor, scale[2] * sizeFactor)
    var matRotationX = rotateX(rotation[0])
    var matRotationY = rotateY(rotation[1])
    var matRotationZ = rotateZ(rotation[2])
    var matPosition = translate(position[0] * sizeFactor, position[1] * sizeFactor, position[2] * sizeFactor)

    var mv = multArray(matPosition, matRotationZ, matRotationY, matRotationX, matScale)

    //create figure
    var createFigure = []
    createFigure[0] = CreateSphere
    createFigure[1] = CreateCylinder
    createFigure[2] = CreateCone
    createFigure[3] = CreateCube

    var figure = createFigure[figureIndex](1.0)

    var vertices = <number[][]>figure.vertices
    var triangles = <number[][]>figure.triangles

    //
    for (var i = 0; i < vertices.length; ++i)
    {
        vertices[i] = multVectorWithMatrix(mv, vertices[i])
    }

    //
    DrawFigure(figure)
}