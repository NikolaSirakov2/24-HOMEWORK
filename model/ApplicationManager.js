class Application {
    constructor(id, name, income, amount, period){
        
        this.id = id;
        this.name = name,
        this.income = income,
        this.amount = amount,
        this.period = period
    }
}

class ApplicationManager {

    applicationsList = JSON.parse(localStorage.getItem("applicationsList")) || [];

    createApplication = (id, name, income, amount, period) => {
        this.applicationsList.push(new Application(id, name, income, amount, period));
        localStorage.setItem("applicationsList", JSON.stringify(this.applicationsList))
    }

}