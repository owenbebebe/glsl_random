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
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st.x *= 100.0; // Scale the coordinate system by 10
    vec2 ipos = vec2(floor(st.x), 0.);  // get the integer coords
    
    // Assign a random value based on the integer coord
    float pct = random(ipos);
    
    float barcode = step(0.5, pct);

    gl_FragColor = vec4(vec3(barcode),1.0);
}