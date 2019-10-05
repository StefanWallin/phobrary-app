export default class AnySuccessfulPromise {
  constructor(promises) {
    this.promises = promises;
    this.successes = [];
    this.errors = [];
    this.thenCallbacks = [];
    this.catchCallback = () => {
      console.error("catch not defined");
    };
    this.finallyCallbacks = [];
    this.raceActive = true;
    this.awaitPromises();
  }

  then(callback) {
    this.thenCallbacks.push(callback);
    return this;
  }

  catch(callback) {
    this.catchCallback = callback;
    return this;
  }

  finally(callback) {
    this.finallyCallbacks.push(callback);
    return this;
  }

  awaitPromises() {
    this.promises.forEach(promise => {
      promise
        .then(result => {
          if (this.thenCallbacks.length == 0) {
            console.error("then not defined");
            return;
          }
          if (this.raceActive) {
            this.thenCallbacks.forEach(thenCallback => thenCallback(result));
          }
          this.successes.push(result);
          this.raceActive = false;
        })
        .catch(result => {
          this.errors.push(result);
        })
        .finally(() => {
          const finishedLength = this.successes.length + this.errors.length;
          if (finishedLength === this.promises.length) {
            this.executeCallbacks();
          }
        });
    });
  }

  executeCallbacks() {
    if (this.successes.length === 0) this.catchCallback(this.errors);
    this.finallyCallbacks.forEach(finallyCallback =>
      finallyCallback(this.successes, this.errors)
    );
  }
}
