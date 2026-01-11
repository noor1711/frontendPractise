function sum(a) {
  let curr = a;

  function next(val) {
    curr += val;
    return next;
  }

  next.valueOf = () => {
    return curr;
  };

  return next;
}

// Test cases to pass:
console.log(Number(sum(1)(2))); // Expected: 3
console.log(Number(sum(5)(-1)(2))); // Expected: 6
console.log(Number(sum(0)(1)(2)(3))); //
