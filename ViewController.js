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

            try {
            if(hash === "statistics"){
                if(this.userManager.logedUser[0].name !== "Admin"){
                    location.hash = "home";
                }
            }
            } catch {
                console.log("Error!");
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
        
        try { 
            if(logedUser.length){
            let clientName = document.getElementById('borrowerName');
             clientName.placeholder = logedUser[0].name
        } 
        } catch {
            console.log("There is no loged user!");
        }

        let applicationForm = document.getElementById('applicationForm');
        
        let idNumber = 0;
     
        applicationForm.onsubmit = (e) => {
            e.preventDefault();  
            
            let id = idNumber;
            let name = logedUser[0].name;
            let income = e.target.elements.income.value;
            let amount = e.target.elements.amount.value;
            let period = e.target.elements.period.value;

            if(income > 200 && amount > 1000 && period > 6){
            this.applicationManager.createApplication(id, name, income, amount, period);
            }

            e.target.elements.income.value = "";
            e.target.elements.amount.value = "";
            e.target.elements.period.value = "";

            window.location.hash = "applications";
            
        }
        
        
    }

    renderApplicationOverview = () => {
       
        try {
        let allAplications = JSON.parse(localStorage.applicationsList);
        let table = document.getElementById("table");
        table.innerHTML = "";
        

        for(let i = 0; i < allAplications.length; i++){

            let newRow = document.createElement('tr')
               
                let id = document.createElement("td");
                let requested = document.createElement('td');
                let period = document.createElement('td');
                let status = document.createElement('td');
                let cancelButton = document.createElement('button');
                let viewOffersButton = document.createElement("button");
    
                id.innerText = allAplications[i].id;
                id.style.width = "5.2vw"
                requested.innerText = `${allAplications[i].amount} $`;
                requested.style.width = "37.3vw"
                period.innerText = `${allAplications[i].period} months`;
                period.style.width = "31.8vw"
                status.innerText = "Pending";
                status.style.width = "12vw";

                cancelButton.innerText = "Cancel!";
                cancelButton.style.width = "13.5vw";
                cancelButton.id = "cancelButton"
                cancelButton.addEventListener("click", (e) => {
                    status.innerText = "Rejected";
                });

                let yearlyIncome = 12*allAplications[i].income;
                let rate = 0;
                let offersNumber = 0;

                if(yearlyIncome < 20000){
                    rate = 10;
                    offersNumber = 3;
                } else if (yearlyIncome >= 20000 && yearlyIncome <= 50000){
                    rate = 8;
                    offersNumber = 2;
                } else {
                    rate = 6;
                    offersNumber = 1;
                }

                
                let number = 1;

                if(yearlyIncome/2 > allAplications[i].amount || (yearlyIncome > allAplications[i].amount && allAplications[i].period)){
                viewOffersButton.innerText = "View Offers!";
                viewOffersButton.style.width = "13.5vw";
                viewOffersButton.id = "viewOffersButton"

                viewOffersButton.addEventListener("click", (e) => {
                    status.innerText = "Approved";
                    let offers = document.getElementById("offers");
                            offers.innerHTML = "";
                    
                    
                        for(let k = 0; k < offersNumber ; k++){
                            
                            
                            let offer = document.createElement('div');
                            offer.id = "offerCard";

                            let interestRate = createElement("div");
                            let loanAmount = createElement("div");
                            let monthlyPayment = createElement("div");
                            let loanTerm = createElement("div");
                            let takeOfferButton = createElement("button");

                            interestRate.innerText = `${rate} %`;
                            loanAmount.innerText = `${allAplications[i].amount} $`;
                            
                            loanTerm.innerText = `${allAplications[i].period} months`;
                            monthlyPayment.innerText = `${(allAplications[i].amount/allAplications[i].period).toFixed(2)}$`;
                            takeOfferButton.innerText = "Take offer";
                            takeOfferButton.addEventListener('click', () => {
                                this.statisticsManager.createLoan(allAplications[i].id, allAplications[i].name, allAplications[i].amount, rate, allAplications[i].period);
                                newRow.style.display = "none";
                                console.log(i);
                                viewController.applicationManager.applicationsList.splice(i, 1);
                                localStorage.setItem("applicationsList", JSON.stringify(viewController.applicationManager.applicationsList))
                                offers.innerHTML = "";
                            })

                            offer.append(interestRate, loanAmount, monthlyPayment, loanTerm, takeOfferButton);
                            offers.appendChild(offer);
                            number++;
                        
                    }

                    
                }) 

                const myTimeout = setTimeout(viewOffers, 6000);

                function viewOffers() {
                    cancelButton.parentElement.removeChild(cancelButton);
                    newRow.appendChild(viewOffersButton);
                }

                

                } else {
                    cancelButton.innerText = "No offers!";
                    status.innerText = "Canceled!";
                }
                
                newRow.append(id, requested, period, status, cancelButton);
    
                table.appendChild(newRow);
            }
        } catch {
            console.log("There is no applications!");
        }
        
        
    }

    renderLoanStatistics = () => {
        
        let test = request("allLoansList")
        .then(response => {
            let loansList = JSON.parse(response);
            
            let loansTable = document.getElementById("loansTable");
            loansTable.innerHTML = "";
            console.log(loansList[0]);

            for(let i = 0; i < loansList.length; i++){
                
                console.log(loansList[0].totalAmount/loansList[0].period);
                
                let newRow = document.createElement('tr')
                   
                    let id = document.createElement("td");
                    let amount = document.createElement('td');
                    let period = document.createElement('td');
                    let clientName = document.createElement('td');
                    let rate = document.createElement('td');
                    let monthlyPayment = document.createElement('td');
                    let totalAmount = document.createElement('td');

                    // let cancelButton = document.createElement('button');
                    // let viewOffersButton = document.createElement("button");
        
                    id.innerText = loansList[i].id;
                    id.style.width = "3.6vw"
                    amount.innerText = `${loansList[i].amount} $`;
                    amount.style.width = "15.2vw"
                    period.innerText = `${loansList[i].period} months`;
                    period.style.width = "12.2vw"
                    clientName.innerText = loansList[i].name;
                    clientName.style.width = "23.38vw";
                    rate.innerText = `${loansList[i].rate} %`;
                    rate.style.width = "8.7vw";
                    monthlyPayment.innerText =`${(loansList[0].totalAmount/loansList[0].period).toFixed(2)} $`;
                    monthlyPayment.style.width = "31vw";
                    totalAmount.innerText = `${loansList[i].totalAmount} $`;
                    totalAmount.style.width = "26.7vw";


    
                    // cancelButton.innerText = "Cancel!";
                    // cancelButton.style.width = "13.5vw";
                    // cancelButton.id = "cancelButton"
                    // cancelButton.addEventListener("click", (e) => {
                    //     status.innerText = "Rejected";
                    // });
    
                    // let yearlyIncome = 12*allAplications[i].income;
                    // let rate = 0;
                    // let offersNumber = 0;
    
                    // if(yearlyIncome < 20000){
                    //     rate = 10;
                    //     offersNumber = 3;
                    // } else if (yearlyIncome >= 20000 && yearlyIncome <= 50000){
                    //     rate = 8;
                    //     offersNumber = 2;
                    // } else {
                    //     rate = 6;
                    //     offersNumber = 1;
                    // }
    
                    
    
    
                    
                    // viewOffersButton.innerText = "View Offers!";
                    // viewOffersButton.style.width = "13.5vw";
                    // viewOffersButton.id = "viewOffersButton"
    
                    // viewOffersButton.addEventListener("click", (e) => {
                    //     status.innerText = "Approved";
                    //     let offers = document.getElementById("offers");
                    //             offers.innerHTML = "";
                        
                    //     console.log(allAplications[i]);
                    //         for(let k = 0; k < offersNumber ; k++){
                                
                                
                    //             let offer = document.createElement('div');
                    //             offer.id = "offerCard";
    
                    //             let interestRate = createElement("div");
                    //             let loanAmount = createElement("div");
                    //             let monthlyPayment = createElement("div");
                    //             let loanTerm = createElement("div");
                    //             let takeOfferButton = createElement("button");
    
                    //             interestRate.innerText = `${rate} %`;
                    //             loanAmount.innerText = `${allAplications[i].amount} $`;
                                
                    //             loanTerm.innerText = `${allAplications[i].period} months`;
                    //             monthlyPayment.innerText = `${(allAplications[i].amount/allAplications[i].period).toFixed(2)}$`;
                    //             takeOfferButton.innerText = "Take offer";
                    //             takeOfferButton.addEventListener('click', () => {
                    //                 this.statisticsManager.createLoan(1, allAplications[i].name, allAplications[i].amount, rate, allAplications[i].period);
                    //                 offers.innerHTML = "";
                    //             })
    
                    //             offer.append(interestRate, loanAmount, monthlyPayment, loanTerm, takeOfferButton);
                    //             offers.appendChild(offer);
                            
                    //     }
                    // }) 
    
                 
                    
                    newRow.append(id, clientName, amount, rate, period, monthlyPayment, totalAmount);
        
                    loansTable.appendChild(newRow);
                }            
          })
        
        
         
    }
}

let viewController = new ViewController();