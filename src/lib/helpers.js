const deduplicateArray = function(array) {
  let set = new Set(array);
  let iterator = set.values();
  return Array.from(iterator);
};

export {
  deduplicateArray,
}
