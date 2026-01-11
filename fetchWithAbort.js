// 1. Create a variable in the outer scope to "remember" the previous controller
let currentController = null;

async function fetchSuggestions(query, signal) {
  try {
    const response = await fetch(`https://api.example.com/search?q=${query}`, {
      signal,
    });
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted: older request ignored");
    } else {
      console.error("Fetch error:", error);
    }
  }
}

// TODO: Complete this function
function handleSearch(event) {
  const query = event.target.value;
  if (currentController) {
    currentController.abort();
  }

  currentController = new AbortController();
  signal = currentController.signal;

  fetchSuggestions(query, signal);
}
