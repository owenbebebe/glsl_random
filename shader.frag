#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {

    // Constants
    const float FREQUENCY = 200.0;
    const float SPEED = 20.0;
    const float ROWS = 100.0; 

    // Normalize pixel coordinates (from 0 to 1)
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse.xy / u_resolution.xy;
    float rowId = floor(st.y * ROWS);

    float mouseRowId = floor(mouse.y * ROWS);

    // Random direction
    float dir = random(vec2(rowId, 0.0)) > 0.5 ? 1.0 : -1.0;

    // Alternating direction
    // mod(rowId, 2.0) returns 0.0 for even rows and 1.0 for odd rows.
    // By doing math on it, we can map those to -1.0 and 1.0 to reverse the speed.
    // float dir = sign(mod(rowId, 2.0) - 0.5);

    // apply mouse hover
    float isNotHovered = step(0.5, abs(rowId - mouseRowId));
    dir *= isNotHovered;

    st.x *= FREQUENCY;
    float shiftedX = st.x + (u_time * SPEED * dir);

    vec2 ipos = vec2(floor(shiftedX), rowId); 

    float pct = random(ipos);
    float finalBarcode = step(0.5, pct);

    gl_FragColor = vec4(vec3(finalBarcode), 1.0);
}