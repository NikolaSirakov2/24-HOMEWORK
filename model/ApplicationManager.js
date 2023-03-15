class Application {
    constructor(name, income, amount, period){
        
        this.name = name,
        this.income = income,
        this.amount = amount,
        this.period = period
    }
}

class ApplicationManager {

    applicationsList = JSON.parse(localStorage.getItem("applicationsList")) || [];

    createApplication = (name, income, amount, period) => {
        this.applicationsList.push(new Application(name, income, amount, period));
        localStorage.setItem("applicationsList", JSON.stringify(this.applicationsList))
    }

}