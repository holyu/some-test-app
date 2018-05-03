const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is my resolved data");
  }, 3000);
});

const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong!");
  }, 3000);
});

promise
  .then(data => {
    console.log("1", data);
  })
  .catch(data => {
    console.log("error: ", data);
  });

promiseTwo.then(
  data => {
    console.log("1", data);
  },
  data => {
    console.log("error: ", data);
  }
);
