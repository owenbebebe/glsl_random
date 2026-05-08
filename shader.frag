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
    
    // --- DYNAMIC ROWS LOGIC ---
    float rowChangeTimer = floor(u_time); // Adding a non-linear component to make it less predictable

    float randomRowCount = random(rowChangeTimer);
    float dynamicRows = floor(mix(2.0, 100.0, randomRowCount));

    // Normalize pixel coordinates (from 0 to 1)
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse.xy / u_resolution.xy;
    
    float rowId = floor(st.y * dynamicRows);
    float mouseRowId = floor(mouse.y * dynamicRows);

    // Random direction
    float dir = random(vec2(rowId, 0.0)) > 0.5 ? 1.0 : -1.0;

    // apply mouse hover
    float isNotHovered = step(0.5, abs(rowId - mouseRowId)); 
    dir = isNotHovered == 1.0 ? dir : dir * -1.0;

    // apply random speed
    float randomSpeed = random(vec2(rowId, 456.));
    float rowSpeed = mix(MIN_SPEED, MAX_SPEED, randomSpeed);
    float randomFrequency = random(vec2(rowId, 789.));
    float rowFrequency = mix(FREQUENCY * 0.5, FREQUENCY * 1.5, randomFrequency);
    
    st.x *= rowFrequency;

    // --- GLITCH TIME INJECTION ---
    float globalFreq = random(floor(u_time)) + abs(atan(u_time) * 0.1);
    
    float glitchTime = 60.0 + u_time * (1.0 - globalFreq);

    // --- GLITCH EFFECT LOGIC ---
    float glitchAmount = mix(0.01, 0.15, random(vec2(rowId, 111.1)));

    float shiftedR = st.x + ((glitchTime + glitchAmount) * rowSpeed * dir);
    float shiftedG = st.x + (glitchTime * rowSpeed * dir);
    float shiftedB = st.x + ((glitchTime - glitchAmount) * rowSpeed * dir);

    vec2 iposR = vec2(floor(shiftedR), rowId); 
    vec2 iposG = vec2(floor(shiftedG), rowId); 
    vec2 iposB = vec2(floor(shiftedB), rowId); 

    float r = step(0.5, random(iposR));
    float g = step(0.5, random(iposG));
    float b = step(0.5, random(iposB));

    vec3 finalColor = vec3(r, g, b);

    // finalColor = 1.0 - finalColor; // Invert colors if desired

    gl_FragColor = vec4(finalColor, 1.0);
}