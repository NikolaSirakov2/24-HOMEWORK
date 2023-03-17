class ViewController {
    constructor(){
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);
    
        this.userManager = new UserManager();
        this.applicationManager = new ApplicationManager();
        this.statisticsManager = new StatisticsManager();
    }

    handleHashChange = () => {
        

        let hash = window.location.hash.slice(1) || "home";

        let pageIds = ["home", "user", "applications", "statistics"];

        
        
            if(hash === "home"){
                if(this.userManager.logedUser === null){
                    location.hash = "user";   
                } else if(this.userManager.logedUser.name === "Admin"){
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
        
        if(logedUser.length > 0){
        let clientName = document.getElementById('borrowerName');
        clientName.placeholder = logedUser[0].name
        }

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
        

        for(let i = 1; i <= allAplications.length; i++){
        
            let newRow = document.createElement('tr')
               
                let id = document.createElement("td");
                let requested = document.createElement('td');
                let period = document.createElement('td');
                let status = document.createElement('td');
                let cancelButton = document.createElement('button');
                let viewOffersButton = document.createElement("button");
    
                id.innerText = i;
                id.style.width = "5.2vw"
                requested.innerText = `${allAplications[i-1].amount} `;
                requested.style.width = "37.3vw"
                period.innerText = `${allAplications[i-1].period} months`;
                period.style.width = "31.8vw"
                status.innerText = "Pending";
                status.style.width = "12vw";

                cancelButton.innerText = "Cancel!";
                cancelButton.style.width = "13.5vw";
                cancelButton.id = "cancelButton"
                cancelButton.addEventListener("click", (e) => {
                    status.innerText = "Rejected";
                });

                viewOffersButton.innerText = "View Offers!";
                viewOffersButton.style.width = "13.5vw";
                viewOffersButton.id = "viewOffersButton"
                viewOffersButton.addEventListener("click", (e) => {
                    status.innerText = "Approved";
                    let offers = document.getElementById("offers");
                            offers.innerHTML = "";
                    let offersNumber = Math.floor(Math.random()*3);
                    console.log(offersNumber);
                        for(let k = 0; k < (offersNumber + 1); k++){
                            
                            let offer = document.createElement('div');
                            offer.id = "offerCard";

                            let interestRate = createElement("div");
                            let loanAmount = createElement("div");
                            let monthlyPayment = createElement("div");
                            let loanTerm = createElement("div");
                            let takeOfferButton = createElement("button");

                            interestRate.innerText = `High Interest`;
                            loanAmount.innerText = '1000 $';
                            monthlyPayment.innerText = '85 $';
                            loanTerm.innerText = '12 months';
                            takeOfferButton.innerText = "Take offer";

                            offer.append(interestRate, loanAmount, monthlyPayment, loanTerm, takeOfferButton);
                            offers.appendChild(offer);
                        }
                });

                const myTimeout = setTimeout(viewOffers, 6000);

                function viewOffers() {
                    cancelButton.parentElement.removeChild(cancelButton);
                    newRow.appendChild(viewOffersButton);
                }
                
                newRow.append(id, requested, period, status, cancelButton);
    
                table.appendChild(newRow);
            }
        
        
    }

    renderLoanStatistics = () => {
        console.log("TEST");
        // let allLoans = JSON.parse(localStorage.allLoansList);
        // console.log(allLoans);
    }
}

let viewController = new ViewController();