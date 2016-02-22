export default function(...args) {
  return function() {
    return args;
  };
};
