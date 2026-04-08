for(let i=0; i<60; i++) {
  let s = i%10;
  let b = i%12;
  let calc = (s*36 + b*25) % 60;
  if (calc !== i) console.log("Fail for", i, calc);
}
console.log("Done test cycleIndex");
