export default function debounce(func, wait) {
  let timeoutId, latestContext, latestArgs;

  const debounced = function (...args) {
    // 1. Correctly use clearTimeout
    clearTimeout(timeoutId);
    latestContext = this;
    latestArgs = args;

    // 2. Correctly use setTimeout for one-time execution
    timeoutId = setTimeout(() => {
      func.apply(latestContext, latestArgs);
      timeoutId = null; // Clean up
    }, wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  debounced.flush = () => {
    // 3. If a timer is active, execute func immediately
    if (timeoutId) {
      func.apply(latestContext, latestArgs);
      debounced.cancel(); // Stop the pending delayed call
    }
  };

  // 4. Critical: Must return the function!
  return debounced;
}
