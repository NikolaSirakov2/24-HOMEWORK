class ViewController {
    constructor(){
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);
    
        this.userManager = new UserManager();
        this.applicationManager = new ApplicationManager();
    }

    handleHashChange = () => {
        

        let hash = window.location.hash.slice(1) || "home";

        let pageIds = ["home", "user", "applications"];

        
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
            case 'applications':
                this.renderapplicationOverview();
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

        let applicationForm = document.getElementById('applicationForm');
        let id = 1;
     
        applicationForm.onsubmit = (e) => {
            e.preventDefault();
            console.log(id);
            let name = logedUser[0].name;
            let income = e.target.elements.income.value;
            let amount = e.target.elements.amount.value;
            let period = e.target.elements.period.value;

            this.applicationManager.createApplication(id, name, income, amount, period);

            e.target.elements.income.value = "";
            e.target.elements.amount.value = "";
            e.target.elements.period.value = "";

            window.location.hash = "applications";
            id++;
        }
    }

    renderapplicationOverview = () => {
        let allAplications = JSON.parse(localStorage.applicationsList);

        allAplications.forEach(application => {
            console.log(application.name);
        });
    }
}

let viewController = new ViewController();