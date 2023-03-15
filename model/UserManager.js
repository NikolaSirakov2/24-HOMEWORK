class User {
    constructor(name, pass) {
      (this.name = name), (this.pass = pass);
    }
  }
  
  class UserManager {
    constructor() {
      let logedUser = JSON.parse(localStorage.getItem("loged")) || null;
      if (logedUser) {
        this.logedUser = new User(logedUser.name, logedUser.pass);
      }
    }
  
    usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    logedUser = null;
  
    logIn = (name, pass) => {
      let existingUser = this.usersList.filter(
        (e) => e.name === name && e.pass === pass
      );
  
      if (existingUser.length > 0) {
        this.logedUser = existingUser;
        let headerUserSign = document.getElementById('userLink'); 
        headerUserSign.innerText = this.logedUser[0].name;
        localStorage.setItem("loged", JSON.stringify(this.logedUser));
        console.log(window.location.hash);
        window.location.hash = "home";
        return true;
      }
  
      return false;
    };
  
    logOut = () => {
      localStorage.removeItem("loged");
      let headerUserSign = document.getElementById('userLink'); 
        headerUserSign.innerText = "User";
    };
  
    createUser = (name, pass, confirm) => {
      let existingUser = this.usersList.filter((e) => e.name === name);
     
  
      if (existingUser.length === 0) {
        this.usersList.push(new User(name, pass));
        localStorage.setItem("usersList", JSON.stringify(this.usersList));
      } 
    };
  }