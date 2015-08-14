var gl : WebGLRenderingContext

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