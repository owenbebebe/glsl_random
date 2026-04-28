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
    st.x += SPEED * u_time;
    vec2 ipos = vec2(floor(st.x), 0.); 
    
    // Assign a random value based on the integer coord
    float pct = random(ipos);
    
    float barcode = step(0.5, pct);

    gl_FragColor = vec4(vec3(barcode),1.0);
}