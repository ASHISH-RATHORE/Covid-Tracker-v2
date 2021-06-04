class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login(cb) {
      if(localStorage.getItem('token')){
        this.authenticated = true;
        cb();
      }else{
        this.authenticated = false;
      }
    }
  
    logout(cb) {
        localStorage.setItem('token','')
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {

      if(localStorage.getItem('token')){
        return this.authenticated = true;
        
      }else{
        return this.authenticated;
      }
     
    }
  }
  
  export default new Auth();
  