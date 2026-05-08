#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float random (in float x) {
    return fract(sin(x)*1e4);
}

void main() {

    // Constants
    const float FREQUENCY = 200.0;
    const float MIN_SPEED = 10.0;
    const float MAX_SPEED = 30.0;
    const float ROWS = 100.0; 

    // Normalize pixel coordinates (from 0 to 1)
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse.xy / u_resolution.xy;
    float rowId = floor(st.y * ROWS);

    float mouseRowId = floor(mouse.y * ROWS);

    // Random direction
    float dir = random(vec2(rowId, 0.0)) > 0.5 ? 1.0 : -1.0;

    // apply mouse hover
    float isNotHovered = step(0.5, abs(rowId - mouseRowId)); 
    dir = isNotHovered == 1.0 ? dir : dir * -1.0;

    // apply random speed
    float randomSpeed = random(vec2(rowId, 456.));
    float rowSpeed = mix(MIN_SPEED, MAX_SPEED, randomSpeed);

    // apply random frequency
    float randomFrequency = random(vec2(rowId, 789.));
    float rowFrequency = mix(FREQUENCY * 0.5, FREQUENCY * 1.5, randomFrequency);
    
    st.x *= rowFrequency;

    // --- GLITCH EFFECT LOGIC ---
    
    // 1. Generate a random glitch offset amount specific to this row.
    // mix(0.01, 0.15, ...) means some rows glitch a tiny bit, others glitch heavily.
    float glitchAmount = mix(0.01, 0.15, random(vec2(rowId, 111.1)));

    // 2. Calculate THREE different shifted X positions. 
    // Red looks slightly into the future, Blue looks slightly into the past.
    float shiftedR = st.x + ((u_time + glitchAmount) * rowSpeed * dir);
    float shiftedG = st.x + (u_time * rowSpeed * dir);
    float shiftedB = st.x + ((u_time - glitchAmount) * rowSpeed * dir);

    // 3. Get the integer positions for each color channel
    vec2 iposR = vec2(floor(shiftedR), rowId); 
    vec2 iposG = vec2(floor(shiftedG), rowId); 
    vec2 iposB = vec2(floor(shiftedB), rowId); 

    // 4. Generate the black/white pattern independently for Red, Green, and Blue
    float r = step(0.5, random(iposR));
    float g = step(0.5, random(iposG));
    float b = step(0.5, random(iposB));

    // 5. Combine them into a single color
    vec3 finalColor = vec3(r, g, b);

    // (Optional) If you want the Ikeda look of dark lines on a bright background, 
    // uncomment the line below to invert the colors!
    // finalColor = 1.0 - finalColor; 

    gl_FragColor = vec4(finalColor, 1.0);
}