

//4.5
//linear vector spaces
//v=u+2w-3r; u,v,r - vectors, 2,3 - scalars

//4.6
//point - location in space; P, Q - points
//v = P - Q(point - point substraction yields a vector); P = v + Q;

//affine spaces - Point + a vector space
//1*P = P; 0*P = 0 (zero vector)

//lines. P(alpha) = P0 + alpha*d; d - vector, P(alpha), P0 - points
//ax+by+c=0 (implicit), y=mx+h (ax+b, explicit)
//parametric form: x(alpha) = alpha*x0 + (1-alpha)*x1; y(alpha) = alpha*y0 + (1 - alpha)*y1
//i.e. all points for all alpha is line

//if alpha >= 0 then P(alpha) - ray from point P0 in the direction d
//if we use 2 points (Q and R) to define v: R(alpha) = Q + alpha*(R-Q) = Q + alpha*v = alpha*R + (1 - alpha)*Q -line segment between R and Q

//convexity
//affine sum of the points P1..PN: point * scalar - no sence, but:
//P = alpha1 * P1 + alpha2 * P2 + ... + alphaN * PN - makes sence iff alpha1 + alpha2 + ... + alphaN = 1
//if alphaI >= 0 then we have convext hull of P1..PN

//curves - parametric form P(alpha) - one parameter entites where function is nonlinear
//surface - two-parameter function P(alpha, beta); if function is linear - planes and polygons

//plane can define by a point and two vectors or by three points; u,v - vectors; P,Q,R,P(alpha, beta) - points
//P(alpha, beta) = R + alpha*u + beta*v; P(alpha, beta) = R + alpha*(Q-R) + beta*(P-Q)

//let's define in parametric form
//triangle - we have 3 points: P,Q,R; 0 <= alpha,beta <= 1;
//S(alpha) - point between P and Q - or convex sum of P and Q;
//T(alpha, beta) - point between S(alpha) and R - or convex sum of S(alpha) and R. So, T(alpha, beta) - inside a triangle

//in 3d every plane (for instance, triangle) has a normal vector n.
//P(alpha,beta) = P + alpha*u + beta*v; n = u * v (dot product) => (P(alpha,beta) - P) * n = 0

//4.7
//Linear independence: we cannot represent one vector in terms of anotherl.
//if "alpha1*v1 + ... + alphaN*vn = 0" - this expression is true if and only if alpha1 = ... = alphaN = 0 
//then v1,...,vn - linearly independent 

//Dimension of the space - maximum number of linearly independent vectors in a vector space. This value is fixed.
//Basis for the space - any set of n-linearly independent vectors in an n-dimensional space
//Given the basis v1,...,vn, any vector v can be written as v = alpha1*v1 + ... + alphaN*vn, where {alphaI} - unique
//list of scalars {alpha1,...,alphaN} - representation of v with respect to the given basis
//column (or row) vector a = [alpha1 ... alphaN]^T

//in Cartesian system, vectors are 3 or 4-tuples; they can be written as row or column vector (matrices)
//example of unit basis: e1 = [1 0 0]; e2 = [0 1 0]; e3 = [0 0 1]; this like x,y,z direction
//e1,e2,e3 - don't have to be orthogonal in general
//v = [1 2 3]^T = e1 + 2*e2 + 3*e3 = [1 2 3]*[e1 e2 e3]^T  (transpose of matrix) //dot product

//representations can be: world coordinate system, camera coordinate system; 

//for each pair of bases, we can find matrix M, that allows us to work with the representations
//if a - any representation in the e1,e2,e3 basis, then representation in the e1`,e2`,e3` basis is
//a` = M*a //dot product

//Coordinate system (3 basis vectors) - not enough to represent points in affine space

//if we add 1 fixed point (origin) to the basis vectors - then we form a "frame"
//Frame determined by (P0, v1, v2, v3)
//Every vector can be written as v = alpha1*v1 + ... + alphaN*vn; v = [alpha1 alpha2 alpha3] - representation of vector
//Every point can be written as P = P0 + beta1*v1 + ... + betaN*vn; P = [beta1 beta2 beta3] - coordinate of point
//what difference between point [beta1 beta2 beta3] and vector [alpha1 alpha2 alpha3]? Answer is - we need 4th coordinate

//4.8
//if AB = I, then B = A^-1; A,B - square matrix, I - identity matrix
//length vector - squeare of magnitude of a vector - |u|^2 = u*u (dot product) = sum ui^2
//distance between vector = |u - v|^2
//if u*v = 0 then hese vectors are orthogonal

//4.9 Homogeneous Coordinates - big trick in Computer Graphics
//Point are represented as P = [x y z w] if w != 0; vectors - if w == 0 - v = [x y z 0]
//return to 3d - P` = [x/w, y/w, z/w] - prespective division; we keep w = 1 except we do perspective viewing

//2 representation respect to 2 different basis:
//basis1: v = [v1 v2 v3]; basis2: u = [u1 u2 u3]
//where u = M*v. M - 4x4 matrix = [... 0; ... 0; ... 1; 0 0 0 1]
//in the first frame: a = [alpha1 alpha2 alpha3 0]; in the second frame: b = [beta1 beta2 beta3 0]
//a = M^T * b; M - affine tranormation in homogeneous coordinates
//T = M^T; a = T*b; T has 12 unknown coeddicients; low row - [0 0 0 1]; 12 degrees of freedom - you have 12 parameters that vary

//every linear transformation is equivalent to change in frames

//world frame and camera frame
//changes in frames defined by 4x4 matrices; model view matrix (MVM) - from world frame to camera frame;
//in OpenGL basic frame - world frame (object frame in some literature); intially T = I, i.e. MVM - identity

//5.2
//transformation - mapping from one point/vector to another one. Q = T(P), v = T(u)
//affine transformation - subset of all transformations, that line preserving: we can only transform endpoints of line
//rotation, translation(rigid body transformations), scaling, shear

//rasterizer expect clip coordinates (from transformations)

//5.4
//Inverses. Translation: T^-1(dx,dy,dz) = T(-dx,-dy,-dz)
//rotation: R^-1(yi) = R(-yi)
//scaling: S^-1(sx,sy,sz) = S(1/sx,1/sy,1/sz)
//shear: H^-1(yi) = H(-yi)

//P` = ABCP = A(B(CP)))
//R(yi) = Rz(yiz)Ry(yiy)Rx(yix) - general rotation about the origin. yix, yiy, yiz - Euler angles
//M = T(Pf)R(yi)T(-Pf) - rotation about fixed point other then origin. move-rotate-move_back. Pf - distance from origin to center of figure

//instancing - start with object at origin with standart size, angle. Apply transformations in order - scale, orient, locate

//5.5
//model coordinates (unit) -> view -> camera. object frame -> camera frame. 
//model matrix + viewing matrix = model view matrix
//project transformation - 4x4 matrix. non-affine transformation and clipping. camera coordinates -> clip coordinates
//q = P * MV * p. P - projection matrix, MV - model-view matrix

//Current Transformation Matrix C = P * MV. CTM can be applied to vertices to GPU or CPU. p` = Cp
//C <- CM --can postmultiply C by an arbitrary matrix
//mv.js

//rotation about a fixed point: C <- I. C <- CT. C <- CR. C <- CT^-1. Here result is C = TRT^-1 - but this is backwards!
//because if p` = Cp then p` = TRT^-1 * p - and first T^-1 * p - this is wrong! because of postmultiplication

//solution: we need to reverse the order. we need C = T^-1*R*T. C <- I; C <- CT^-1; C <- CR; C <- CT
//the last operation specified is the first executed in the program. like stack

//var m = mat4(); //create identity matrix
//var r = rotate(theta, vx, vy, vz); //rotation matrix by angle theta in degrees and (vx, vy, vz) - axis of rotation
//m = mult(m, r);   //also rotateX, rotateY, rotateZ functions
//translation and scaling: var s = scale(sx, sy, sz); var t = translate(dx, dy, dz); m = mult(s, t);

//example: rotation about z axis by 30 degrees with a fixed point of (1.0,2.0,3.0)
//var m = mult(translate(1.0, 2.0, 3.0), rotate(30, 0, 0, 1)); m = mult(m, translate(-1.0, -2.0, -3.0));
//here last matrix specified is the first applied

//WebGL wants column major data. we use row major order. flatten function convert from row major to column major
//gl.uniformMatrix4f - automatic transpose need to be false

//matrix stacks - for traversing hierarchical data structures
//var stack = []; stack.push(...); dd = stack.pop()

//5.6. Cube
//1. Specify vertices in clip coordinates. box: (-1, -1, -1) to (1, 1, 1)
//2. Use default camera; don't worry about projection matrix; in MVM is only needed for rotation

//quartenions. smooth rotation. virtual trackball

//6.7
//line loop around 3 points
//gl.polygonOffset
//Delauney triangulation
//

//
//



var gl: WebGLRenderingContext
var canvas: HTMLCanvasElement
var numElements = 12*3
var theta = [0.0, 0.0, 0.0]
var thetaLoc: WebGLUniformLocation
var colorLoc: WebGLUniformLocation

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;

var vertexColorsAll = [
    [0.0, 0.0, 0.0, 1.0],  // black
    [1.0, 0.0, 0.0, 1.0],  // red
    [1.0, 1.0, 0.0, 1.0],  // yellow
    [0.0, 1.0, 0.0, 1.0],  // green
    [0.0, 0.0, 1.0, 1.0],  // blue
    [1.0, 0.0, 1.0, 1.0],  // magenta
    [0.0, 1.0, 1.0, 1.0],  // cyan
    [1.0, 1.0, 1.0, 1.0]   // white
];

window.onload = () => {

    canvas = <HTMLCanvasElement>document.getElementById("gl-canvas");
    gl = setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //colorCube();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var figure = CreateCube()
    var indices = flatten2_array(figure.triangles)
    numElements = indices.length


    // array element buffer
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    //color array atrribute buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten2(GetColorsArray(figure.vertices.length)), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    //vertex array attribute buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten2(figure.vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");
    colorLoc = gl.getUniformLocation(program, "uColor");

    //event listeners for buttons

    document.getElementById("xButton").onclick = function () {
        axis = xAxis;
    };
    document.getElementById("yButton").onclick = function () {
        axis = yAxis;
    };
    document.getElementById("zButton").onclick = function () {
        axis = zAxis;
    };

    renderCube();
}


function exampleA()
{
    var t = translate(0.0, 0.0, -10)
    var ry = rotateY(90)
    var m = mult(t, ry)

    var eye = vec3(1.0, 1.0, 1.0)
    var at = vec3(0.0, 0.0, 0.0)
    var up = vec3(0.0, 1.0, 0.0)
    var mv = lookAt(eye, at, up)

    //
    //gl_Position = projectionMatrix * modelViewMatrix * vPosition
    //ortho1.html
}


function renderCube()
{
    //rotate square 3 choices: in CPU, in GPU send angle, in GPU send MVM
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    theta[axis] += 0.3;
    gl.uniform3fv(thetaLoc, theta);
    //gl.drawArrays(gl.TRIANGLES, 0, numVertices);
    
    gl.uniform3fv(colorLoc, [1, 1, 1]);
    //this is more efficient than use triangle strips or fans
    gl.drawElements(gl.TRIANGLES, numElements, gl.UNSIGNED_SHORT, 0)

    //so, for wireframe we need separate indices >_<
    gl.uniform3fv(colorLoc, [0, 0, 0]);
    //gl.drawElements(gl.LINE_LOOP, numElements, gl.UNSIGNED_BYTE, 0)

    requestAnimationFrame(renderCube);
}



function CreateCube()
{
    var vertices = [
        vec4(-0.5, -0.5, 0.5, 1.0),
        vec4(-0.5, 0.5, 0.5, 1.0),
        vec4(0.5, 0.5, 0.5, 1.0),
        vec4(0.5, -0.5, 0.5, 1.0),
        vec4(-0.5, -0.5, -0.5, 1.0),
        vec4(-0.5, 0.5, -0.5, 1.0),
        vec4(0.5, 0.5, -0.5, 1.0),
        vec4(0.5, -0.5, -0.5, 1.0)
    ];

    var indices = [
        [1, 0, 3],
        [3, 2, 1],
        [2, 3, 7],
        [7, 6, 2],
        [3, 0, 4],
        [4, 7, 3],
        [6, 5, 1],
        [1, 2, 6],
        [4, 5, 6],
        [6, 7, 4],
        [5, 4, 0],
        [0, 1, 5]
    ];

    var result =
    {
        triangles: indices,
        vertices: vertices,
    }

    return result 
}


function CreateCylinder()
{
    var r = 0.7
    var h = 0.7
    var segmentCount = 20

    var verticesCircle1 = []
    var verticesCircle2 = []

    var deltaTheta = 360 / segmentCount  //zx plane
    for (var theta = 0; theta < 360; theta += deltaTheta)
    {
        var theta_ = radians(theta)
        var x = r * Math.cos(theta_)
        var z = r * Math.sin(theta_)
        verticesCircle1.push(vec4(x, h, z, 1))
        verticesCircle2.push(vec4(x, -h, z, 1))
    }

    var vertexCenter1: any = vec4(0, h, 0, 1)
    var vertexCenter2: any = vec4(0, -h, 0, 1)

    //add all vertices
    var vertices = <number[][]>verticesCircle1.slice()
    vertices.push(...verticesCircle2, vertexCenter1, vertexCenter2)

    //indexes
    var currentIndex = -1
    vertices.forEach(vertex => {
        (<any>vertex).index = ++currentIndex
    })

    //generate triangles
    var triangles: number[][] = []

    var addQuad = function (v1: number, v2: number, v3: number, v4: number)
    {
        triangles.push(vec3(v1, v2, v3))
        triangles.push(vec3(v2, v4, v3))
    }

    for (var i = 0; i < verticesCircle1.length - 1; ++i)
    {
        triangles.push(vec3(verticesCircle1[i].index, verticesCircle1[i + 1].index, vertexCenter1.index))
        triangles.push(vec3(verticesCircle2[i].index, verticesCircle2[i + 1].index, vertexCenter2.index))
        //
        addQuad(verticesCircle1[i].index, verticesCircle1[i + 1].index, verticesCircle2[i].index, verticesCircle2[i + 1].index)
    }
    triangles.push(vec3(verticesCircle1[verticesCircle1.length - 1].index, verticesCircle1[0].index, vertexCenter1.index))
    triangles.push(vec3(verticesCircle2[verticesCircle2.length - 1].index, verticesCircle2[0].index, vertexCenter2.index))
    //
    addQuad(verticesCircle1[verticesCircle1.length - 1].index, verticesCircle1[0].index,
        verticesCircle2[verticesCircle2.length - 1].index, verticesCircle2[0].index)


    var result = {
        triangles: triangles,
        vertices: vertices,
    }

    return result 
}


function CreateCone()
{
    var r = 0.9
    var h = 0.9
    var segmentCount = 20

    var verticesCircle: any[] = []

    var deltaTheta = 360 / segmentCount  //zx plane
    for (var theta = 0; theta < 360; theta += deltaTheta)
    {
        var theta_ = radians(theta)
        var y = 0
        var x = r * Math.cos(theta_)
        var z = r * Math.sin(theta_)
        verticesCircle.push(vec4(x, y, z, 1))
    }

    var vertexTop : any = vec4(0, h, 0, 1)
    var vertexCircleCenter : any = vec4(0, 0, 0, 1)

    //add all vertices
    var vertices = <number[][]>verticesCircle.slice()
    vertices.push(vertexTop, vertexCircleCenter)

    //indexes
    var currentIndex = -1
    vertices.forEach(vertex => {
        (<any>vertex).index = ++currentIndex
    })

    //generate triangles
    var triangles: number[][] = []
    for (var i = 0; i < verticesCircle.length - 1; ++i)
    {
        triangles.push(vec3(verticesCircle[i].index, verticesCircle[i + 1].index, vertexTop.index))
        triangles.push(vec3(verticesCircle[i].index, verticesCircle[i + 1].index, vertexCircleCenter.index))
    }
    triangles.push(vec3(verticesCircle[verticesCircle.length - 1].index, verticesCircle[0].index, vertexTop.index))
    triangles.push(vec3(verticesCircle[verticesCircle.length - 1].index, verticesCircle[0].index, vertexCircleCenter.index))

    var result = {
        triangles: triangles,
        vertices: vertices,
    }

    return result  
}


function GetColorsArray(length : number) : number[][]
{
    var colors : number[][] = []
    for (var i = 0; i < length; ++i) {
        var r = Math.floor(Math.random() * 5); //0 to 5
        //colors.push(vec4(1, 0, 0, 1))
        colors.push(vertexColorsAll[r])
    }
    return colors
}


function CreateSphere()
{
    var r = 0.9
    var segmentCount = 20
    var center = vec2(0, 0)

    ///
    var rings : number[][][] = []

    var deltaPhi = 180 / segmentCount //xy plane - outer ring
    var deltaTheta = 360 / segmentCount  //yz plane
    for (var phi = -90 + deltaPhi; phi <= 90 - deltaPhi; phi += deltaPhi)
    {
        var lastRing : number[][] = []
        rings.push(lastRing)

        for (var theta = 0; theta < 360; theta += deltaTheta)
        {
            var phi_ = radians(phi)
            var theta_ = radians(theta)

            var x = r * Math.sin(phi_)
            var y = r * Math.cos(phi_) * Math.cos(theta_)
            var z = r * Math.cos(phi_) * Math.sin(theta_)
            lastRing.push(vec4(x, y, z, 1))
        }
    }

    var poleLeft = <any>vec4(-r, 0, 0, 1);
    var poleRight = <any>vec4(r, 0, 0, 1)

    //collect vertices
    var vertices : number[][] = []
    vertices.push(poleLeft)
    rings.forEach(ring =>
    {
        ring.forEach(vertex =>
        {
            vertices.push(vertex)
        })
    })
    vertices.push(poleRight)

    //indexes
    var currentIndex = -1
    vertices.forEach(vertex =>
    {
        (<any>vertex).index = ++currentIndex
    })

    //---------generate triangles---------
    var triangles : number[][] = []
    //connect poles 
    for (var i = 0; i < rings[0].length - 1; ++i)
    {
        var ringZero: any[] = rings[0]
        var ringLast: any[] = rings[rings.length - 1]
        triangles.push(vec3(poleLeft.index, ringZero[i].index, ringZero[i + 1].index))
        triangles.push(vec3(poleRight.index, ringLast[i].index, ringLast[i + 1].index))
    }

    triangles.push(vec3(poleLeft.index, ringZero[ringZero.length - 1].index, ringZero[0].index))
    triangles.push(vec3(poleRight.index, ringLast[ringLast.length - 1].index, ringLast[0].index))

    var addQuad = function (v1: number, v2: number, v3: number, v4: number)
    {
        triangles.push(vec3(v1, v2, v3))
        triangles.push(vec3(v2, v4, v3))
    }
    
    //connect rings
    for (var i = 0; i < rings.length - 1; ++i)
    {
        var ring1 : any = rings[i]
        var ring2 : any = rings[i + 1]

        for (var j = 0; j < ring1.length - 1; ++j)
        {
            addQuad(ring1[j].index, ring1[j + 1].index, ring2[j].index, ring2[j + 1].index)
        }

        addQuad(ring1[ring1.length - 1].index, ring1[0].index, ring2[ring1.length - 1].index, ring2[0].index)
    }

    var result = {
        triangles : triangles,
        vertices: vertices,
    }

    return result    
}


