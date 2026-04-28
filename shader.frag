#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {

    const float FREQUENCY = 200.0;
    const float SPEED = 20.;

    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st.x *= FREQUENCY;
    
    // top part of the barcode
    float topSt = st.x + u_time * SPEED;
    vec2 ipos = vec2(floor(topSt)); 
    float topMask = step(0.5, st.y);
    float pct = random(ipos);
    float topBarcode = step(0.5, pct) * topMask;

    // bottom part of the barcode
    float botSt = st.x - u_time * SPEED; // move in the opposite direction
    ipos = vec2(floor(botSt)); // integer position for the bottom part
    float botMask = step(0.5, 1.0 - st.y);
    pct = random(ipos + vec2(100.0)); // different random value for the bottom part
    float botBarcode = step(0.5,pct) * botMask;

    float finalBarcode = topBarcode + botBarcode;

    gl_FragColor = vec4(vec3(finalBarcode),1.0);
}