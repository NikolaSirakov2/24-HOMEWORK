class ViewController {
    constructor(){
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);
    
        this.userManager = new UserManager();
    }

    handleHashChange = () => {
        

        let hash = window.location.hash.slice(1) || "home";

        let pageIds = ["home", "user"];

        
            if(hash === "home"){
                if(this.userManager.logedUser === null){
                    location.hash = "user";
                    console.log(hash);
                }
            }
        
        ;
        pageIds.forEach(id => {
            let page = document.getElementById(id);

            if(hash === id){
                page.style.display = "flex";
            } else {
                page.style.display = "none";
            }
        });

        switch(hash){
            case 'home':
                this.renderHomePage();
                break;
            case 'user':
                this.renderUserPage();
                break;
        }
    }

    renderUserPage = () => {
        let register = document.getElementById('registerForm');

        if(localStorage.loged !== undefined){
        let logedUser = JSON.parse(localStorage.getItem("loged"));
        let headerUserSign = document.getElementById("userLink");
        headerUserSign.innerText = logedUser[0].name;
        }

        register.onsubmit = (e) => {
            e.preventDefault();
            let username = e.target.elements.username.value.trim();
            let pass = e.target.elements.pass.value.trim();
            let confirm = e.target.elements.confirm.value.trim();

            this.userManager.createUser(username, pass, confirm);

            e.target.elements.username.value = "";
            e.target.elements.pass.value = "";
            e.target.elements.confirm.value = "";
        }

        let form = document.getElementById('loginForm');

        form.onsubmit = (e) => {
            e.preventDefault();
            let username = e.target.elements.username.value.trim();
            let pass = e.target.elements.pass.value.trim();
            
            this.userManager.logIn(username, pass);

            e.target.elements.username.value = "";
            e.target.elements.pass.value = "";
        }

        let logOut = document.getElementById('logoutButt');

        logOut.addEventListener('click', this.userManager.logOut);
    }

    renderHomePage = () => {

        let logedUser = JSON.parse(localStorage.getItem("loged"));
        let headerUserSign = document.getElementById("userLink");
        headerUserSign.innerText = logedUser[0].name;
        let clientName = document.getElementById('borrowerName');
        clientName.placeholder = logedUser[0].name
       
    }
}

let viewController = new ViewController();