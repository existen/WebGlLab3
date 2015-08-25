
module App
{
    export var gl: WebGLRenderingContext

    export var sliderRotation: HTMLInputElement[] = []
    export var sliderPosition: HTMLInputElement[] = []
    export var sliderScale: HTMLInputElement[] = []
    export var boxFigure: HTMLSelectElement
    export var maxNumVertices = 100000;
    export var indexVertices = 0
    export var indexElements = 0
    export var iBuffer: WebGLBuffer
    export var cBuffer: WebGLBuffer
    export var vBuffer: WebGLBuffer

    export var existingFigures: FigureProperties[] = []
    export var uniformColor: WebGLUniformLocation
}

window.onload = () => {

    var canvas = <HTMLCanvasElement>document.getElementById("gl-canvas");
    App.gl = setupWebGL(canvas);
    if (!App.gl)
    {
        alert("WebGL isn't available");
    }

    //
    App.sliderRotation[0] = <HTMLInputElement>document.getElementById("sliderRotationX")
    App.sliderRotation[1] = <HTMLInputElement>document.getElementById("sliderRotationY")
    App.sliderRotation[2] = <HTMLInputElement>document.getElementById("sliderRotationZ")
    
    App.sliderPosition[0] = <HTMLInputElement>document.getElementById("sliderPositionX")
    App.sliderPosition[1] = <HTMLInputElement>document.getElementById("sliderPositionY")
    App.sliderPosition[2] = <HTMLInputElement>document.getElementById("sliderPositionZ")
    
    App.sliderScale[0] = <HTMLInputElement>document.getElementById("sliderScaleX")
    App.sliderScale[1] = <HTMLInputElement>document.getElementById("sliderScaleY")
    App.sliderScale[2] = <HTMLInputElement>document.getElementById("sliderScaleZ")

    var sliders = [App.sliderRotation[0], App.sliderRotation[1], App.sliderRotation[2],
        App.sliderPosition[0], App.sliderPosition[1], App.sliderPosition[2],
        App.sliderScale[0], App.sliderScale[1], App.sliderScale[2]]

    sliders.forEach(slider => slider.onchange = UpdateLastFigureViaSliders)

    //


    var butCreate = <HTMLButtonElement>document.getElementById("butCreate")
    var butClear = <HTMLButtonElement>document.getElementById("butClear")
    App.boxFigure = <HTMLSelectElement>document.getElementById("boxFigure")

    butCreate.onclick = CreateFigureOnCanvas
    butClear.onclick = function()
    {
        App.indexVertices = 0
        App.indexElements = 0
        App.existingFigures = []
    }
    //


    //

    App.gl.viewport(0, 0, canvas.width, canvas.height);
    App.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    App.gl.enable(App.gl.DEPTH_TEST);

    InitGL()
}


function InitGL()
{
    var program = initShaders(App.gl, "vertex-shader", "fragment-shader");
    App.gl.useProgram(program);


    // array element buffer
    App.iBuffer = App.gl.createBuffer();
    App.gl.bindBuffer(App.gl.ELEMENT_ARRAY_BUFFER, App.iBuffer);
    App.gl.bufferData(App.gl.ELEMENT_ARRAY_BUFFER, App.maxNumVertices, App.gl.STATIC_DRAW);
    checkError()

    //color array atrribute buffer
    App.cBuffer = App.gl.createBuffer();
    App.gl.bindBuffer(App.gl.ARRAY_BUFFER, App.cBuffer);
    App.gl.bufferData(App.gl.ARRAY_BUFFER, App.maxNumVertices, App.gl.STATIC_DRAW);
    checkError()

    var vColor = App.gl.getAttribLocation(program, "vColor");
    App.gl.vertexAttribPointer(vColor, 4, App.gl.FLOAT, false, 0, 0);
    App.gl.enableVertexAttribArray(vColor);
    checkError()

    //vertex array attribute buffer
    App.vBuffer = App.gl.createBuffer();
    App.gl.bindBuffer(App.gl.ARRAY_BUFFER, App.vBuffer);
    App.gl.bufferData(App.gl.ARRAY_BUFFER, App.maxNumVertices, App.gl.STATIC_DRAW);
    checkError()

    var vPosition = App.gl.getAttribLocation(program, "vPosition");
    App.gl.vertexAttribPointer(vPosition, 4, App.gl.FLOAT, false, 0, 0);
    App.gl.enableVertexAttribArray(vPosition);
    checkError()

    App.uniformColor = App.gl.getUniformLocation(program, "uColor");

    render()
}



function DrawFigure(figure: FigureProperties)
{
    var figureVertices = figure.GetModifiedVerticesPositions()

    var indices = flatten2_array(figure.triangles)
    
    //recalculate indices
    for (var i = 0; i < indices.length; ++i)
    {
        indices[i] = indices[i] + App.indexVertices
    }
    //

    App.gl.bindBuffer(App.gl.ARRAY_BUFFER, App.vBuffer);
    App.gl.bufferSubData(App.gl.ARRAY_BUFFER, 16 * App.indexVertices, flatten2(figureVertices));    
    checkError()

    App.gl.bindBuffer(App.gl.ARRAY_BUFFER, App.cBuffer);
    App.gl.bufferSubData(App.gl.ARRAY_BUFFER, 16 * App.indexVertices, flatten2(figure.verticesColors));
    checkError()

    App.gl.bindBuffer(App.gl.ELEMENT_ARRAY_BUFFER, App.iBuffer);
    App.gl.bufferSubData(App.gl.ELEMENT_ARRAY_BUFFER, 2 * App.indexElements, new Uint16Array(indices));
    checkError()
    
    figure.elementsIndex = App.indexElements
    figure.elementsLength = indices.length

    App.indexVertices += figureVertices.length
    App.indexElements += indices.length
}

function checkError()
{
    var err = App.gl.getError()
    if (err != 0)
    {
        if (err == App.gl.INVALID_OPERATION)
            alert("INVALID_OPERATION")
        else if (err == App.gl.INVALID_ENUM)
            alert("INVALID_ENUM")
        else if (err == App.gl.INVALID_FRAMEBUFFER_OPERATION)
            alert("INVALID_FRAMEBUFFER_OPERATION")
        else if (err == App.gl.INVALID_VALUE)
            alert("INVALID_VALUE")
        else
            alert("XXX")

        var fff = 5
    }
}

function render()
{
    //rotate square 3 choices: in CPU, in GPU send angle, in GPU send MVM
    App.gl.clear(App.gl.COLOR_BUFFER_BIT | App.gl.DEPTH_BUFFER_BIT)

    //draw in one draw call!
    //gl.drawElements(gl.TRIANGLES, indexElements, gl.UNSIGNED_SHORT, 0) //gl.LINE_LOOP

    //clear
    App.indexVertices = 0
    App.indexElements = 0

    App.existingFigures.forEach(figure =>
    {
        //create vertices




        DrawFigure(figure)

        //
        //App.gl.uniform4fv(App.uniformColor, figure.verticesColors[0]);
        checkError()

        //last parameter - byte offset
        //second parameter - count of elements
        App.gl.drawElements(App.gl.TRIANGLES, figure.elementsLength, App.gl.UNSIGNED_SHORT, figure.elementsIndex * 2)
        checkError()
    })

    //requestAnimationFrame(render);
}

class FigureProperties
{
    //defaults
    scale: number[] = vec3(2, 2, 2)
    rotation: number[] = vec3(30, 30, 30)
    position: number[] = vec3(0, 0, 0)

    //for render
    verticesPositions: number[][]
    verticesColors: number[][]
    triangles: number[][]

    elementsIndex: number
    elementsLength: number

    CreateMVM() : number[]
    {
        var sizeFactor = 0.2  //unit size

        //MVM
        var matScale = scaleMat(this.scale[0] * sizeFactor, this.scale[1] * sizeFactor, this.scale[2] * sizeFactor)
        var matRotationX = rotateX(this.rotation[0])
        var matRotationY = rotateY(this.rotation[1])
        var matRotationZ = rotateZ(this.rotation[2])
        var matPosition = translate(this.position[0] * sizeFactor, this.position[1] * sizeFactor, this.position[2] * sizeFactor)

        var mv = multArray(matPosition, matRotationZ, matRotationY, matRotationX, matScale)
        return mv
    }

    GetModifiedVerticesPositions() : number[][]
    {
        var mv = this.CreateMVM()
        var modifiedVerticesPositions = this.verticesPositions.slice() //copy
        for (var i = 0; i < modifiedVerticesPositions.length; ++i)
        {
            modifiedVerticesPositions[i] = multVectorWithMatrix(mv, modifiedVerticesPositions[i])
        }
        return modifiedVerticesPositions
    }
}

function UpdateLastFigureViaSliders()
{
    if (App.existingFigures.length == 0)
        return

    var lastFigure = App.existingFigures[App.existingFigures.length - 1]

    lastFigure.position = vec3(+App.sliderPosition[0].value, +App.sliderPosition[1].value, +App.sliderPosition[2].value)
    lastFigure.rotation = vec3(+App.sliderRotation[0].value, +App.sliderRotation[1].value, +App.sliderRotation[2].value)
    lastFigure.scale = vec3(+App.sliderScale[0].value, +App.sliderScale[1].value, +App.sliderScale[2].value)

    render()
}

function CreateFigureOnCanvas()
{
    //set slider to defaults
    var figureProps = new FigureProperties()
    App.existingFigures.push(figureProps)    

    App.sliderPosition[0].value = App.sliderPosition[1].value = App.sliderPosition[2].value = String(figureProps.position[0])
    App.sliderRotation[0].value = App.sliderRotation[1].value = App.sliderRotation[2].value = String(figureProps.rotation[0])
    App.sliderScale[0].value = App.sliderScale[1].value = App.sliderScale[2].value = String(figureProps.scale[0])

    //var sizeFactor = 0.2  //unit size

    //var position = vec3(+sliderPosition[0].value, +sliderPosition[1].value, +sliderPosition[2].value)
    //var rotation = vec3(+sliderRotation[0].value, +sliderRotation[1].value, +sliderRotation[2].value)
    //var scale = vec3(+sliderScale[0].value, +sliderScale[1].value, +sliderScale[2].value)


    ////MVM
    //var matScale = scaleMat(scale[0] * sizeFactor, scale[1] * sizeFactor, scale[2] * sizeFactor)
    //var matRotationX = rotateX(rotation[0])
    //var matRotationY = rotateY(rotation[1])
    //var matRotationZ = rotateZ(rotation[2])
    //var matPosition = translate(position[0] * sizeFactor, position[1] * sizeFactor, position[2] * sizeFactor)

    //var mv = multArray(matPosition, matRotationZ, matRotationY, matRotationX, matScale)

    //create figure
    var figureIndex = +App.boxFigure.value
    var createFigure = []
    createFigure[0] = CreateSphere
    createFigure[1] = CreateCylinder
    createFigure[2] = CreateCone
    createFigure[3] = CreateCube

    var figure = createFigure[figureIndex](1.0)

    var vertices = <number[][]>figure.vertices
    var triangles = <number[][]>figure.triangles

    figureProps.verticesPositions = vertices
    figureProps.triangles = triangles
    figureProps.verticesColors = GetColorsArray(figureProps.verticesPositions.length)

    //
    //for (var i = 0; i < vertices.length; ++i)
    //{
    //    vertices[i] = multVectorWithMatrix(mv, vertices[i])
    //}

    ////
    //DrawFigure(figure)

    render()
}

