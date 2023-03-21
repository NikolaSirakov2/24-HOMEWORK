class Loan {
    constructor(id, name, amount, rate, period, totalAmount){
        this.id = id,
        this.name = name,
        this.amount = amount,
        this.rate = rate,
        this.period = Number(period),
        this.totalAmount = Number(amount) + Number((amount*rate)/100);
    }
}

class StatisticsManager {

    allLoansList = JSON.parse(localStorage.getItem('allLoansList')) || [];

    createLoan = (id, name, amount, rate, period) => {
        this.allLoansList.push(new Loan(id, name, amount, rate, period));
        localStorage.setItem('allLoansList', JSON.stringify(this.allLoansList));
    }
}