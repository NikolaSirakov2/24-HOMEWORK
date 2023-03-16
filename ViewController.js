class ViewController {
    constructor(){
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);
    
        this.userManager = new UserManager();
        this.applicationManager = new ApplicationManager();
    }

    handleHashChange = () => {
        

        let hash = window.location.hash.slice(1) || "home";

        let pageIds = ["home", "user", "applications", "statistics"];

        
            if(hash === "home"){
                if(this.userManager.logedUser === null){
                    location.hash = "user";   
                } else if(this.userManager.logedUser[0].name === "Admin"){
                    location.hash = "statistics";
                }
            }

            if(hash === "statistics"){
                if(this.userManager.logedUser[0].name !== "Admin"){
                    location.hash = "home";
                }
            }
        
        
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
                this.renderApplicationOverview();
                break;
            case 'statistics':
                this.renderLoanStatistics();
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
        
        let clientName = document.getElementById('borrowerName');
        clientName.placeholder = logedUser[0].name

        let applicationForm = document.getElementById('applicationForm');
        
     
        applicationForm.onsubmit = (e) => {
            e.preventDefault();  
            let name = logedUser[0].name;
            let income = e.target.elements.income.value;
            let amount = e.target.elements.amount.value;
            let period = e.target.elements.period.value;

            if(income > 200 && amount > 1000 && period > 6){
            this.applicationManager.createApplication(name, income, amount, period);
            }

            e.target.elements.income.value = "";
            e.target.elements.amount.value = "";
            e.target.elements.period.value = "";

            window.location.hash = "applications";
            
        }
    }

    renderApplicationOverview = () => {
        let allAplications = JSON.parse(localStorage.applicationsList);
        let table = document.getElementById("table");
        table.innerHTML = "";
        console.log(allAplications.length);

        allAplications.forEach(application => {
        
            let newRow = document.createElement('tr')
               
                let id = document.createElement("td");
                let requested = document.createElement('td');
                let period = document.createElement('td');
                let status = document.createElement('td');
                let cancel = document.createElement('td')
    
                id.innerText = allAplications.length;
                id.style.width = "4%"
                requested.innerText = `${application.amount} $`;
                requested.style.width = "28%"
                period.innerText = `${application.period} months`;
                period.style.width = "24%"
                status.innerText = "Pending";
                status.style.width = "9%"
                cancel.innerText = "Cancel!";
                cancel.style.width = "10%";
                
    
                newRow.append(id, requested, period, status, cancel);
    
                table.appendChild(newRow);
            })  
        
        
    }

    renderLoanStatistics = () => {

    }
}

let viewController = new ViewController();