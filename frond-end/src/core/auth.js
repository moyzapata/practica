const authProvider = {
    isAuthenticated: false,
    id: null,
    signin(data) {
      authProvider.isAuthenticated = true;
      authProvider.id = data.id
    },
    signout(){
      authProvider.isAuthenticated = false;
    }
  }