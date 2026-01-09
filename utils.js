const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const fetchWithRetry = async (url, options, retries, delayMs) => {
  const retryAttempts = 0;

  while (retries >= retryAttempts) {
    try {
      const result = await fetch(url, options);

      if (!result.ok) {
        throw new Error("Response not ok");
      }
      return result;
    } catch (err) {
      console.log(err);
      retryAttempts += 1;
      await delay(5 * Math.pow(2, retryAttempts));
    }
  }
};

const alarm = (delay, name) => {
  return new Promise((res, rej) => {
    if (["divesh", "tweety bird"].find((person) => name === person)) {
      setTimeout(res("Wake up bitch"), delay);
    }
    rej("No need to wakeup");
  });
};
