/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Your code here
  if(color1 == null || color2 == null) return null;
  if(color1.r == null || color2.r == null) return null
  if(color1.g == null || color2.g == null) return null
  if(color1.b == null || color2.b == null) return null
  let newr,newg,newb
  newr = Math.ceil((color1.r+color2.r)/2)
  newg = Math.ceil((color1.g+color2.g)/2)
  newb = Math.ceil((color1.b+color2.b)/2)

  let newcolor = {
    name: `${color1.name}-${color2.name}`,
    r: newr,
    g: newg,
    b: newb
  }
  return newcolor
}

export function adjustBrightness(color, factor) {
  // Your code here
  if(color == null || typeof(factor) != 'number') return null;
  if(color.r == null) return null
  if(color.g == null) return null
  if(color.b == null) return null
  let newr,newg,newb
  newr = Math.round((color.r*factor))
  newg = Math.round(color.g*factor)
  newb = Math.round(color.b*factor)
  if(newr>255) newr = 255
  if(newg>255) newg = 255
  if(newb>255) newb = 255
  let newcolor = {
    name: `${color.name}`,
    r: newr,
    g: newg,
    b: newb
  }
  return newcolor
}

export function addToPalette(palette, color) {
  // Your code here
  if(!Array.isArray(palette)) {
    return [color]
  }
  let retval = []
  for(let i = 0;i<palette.length;i++) {
    retval.push(palette[i])
  }
  if(color == null) return retval
  
  retval.push(color)
  return retval
}

export function removeFromPalette(palette, colorName) {
  // Your code here
  if(!Array.isArray(palette)) return []
  let retval = []
  let pos = -1;
  for(let i = 0;i<palette.length;i++) {
    retval.push(palette[i])
    if(colorName === palette[i].name) pos = i
  }
  if(pos === -1) return retval
  let temp = retval[pos]
  retval[pos] = retval[retval.length-1]
  retval[retval.length-1] = temp
  retval.pop()
  return retval;
}

export function mergePalettes(palette1, palette2) {
  // Your code here 
  let visited = {}
  let retval = []
  // for(let i = 0;i<n;i++) visited[palette1[i]] = false;
  // for(let i = 0;i<m;i++) visited[palette2[i]] = false;
  if(!Array.isArray(palette1) && !Array.isArray(palette2)) return []
  if(Array.isArray(palette1)) {
    for(let i = 0;i<palette1.length;i++) {
      if(!visited[palette1[i].name]) {
        retval.push(palette1[i]);
        visited[palette1[i].name] = true;
      }
    }
  }
  if(Array.isArray(palette2)) {
    for(let i = 0;i<palette2.length;i++) {
      if(!visited[palette2[i].name]) {
        retval.push(palette2[i]);
        visited[palette2[i].name] = true;
      }
    }
  }
  return retval
}
