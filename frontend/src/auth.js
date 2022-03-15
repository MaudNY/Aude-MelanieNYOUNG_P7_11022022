const fakeAuthProvider = {
    isAuthenticated: false,
    login(callback) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback); // fake async
    },
    logout(callback) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback);
    },
  };
  
export { fakeAuthProvider };