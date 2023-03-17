class Loan {
    constructor(id, name, amount, rate, period, totalAmount, montlyPayment){
        this.id = id,
        this.name = name,
        this.amount = amount,
        this.rate = rate,
        this.period = period,
        this.totalAmount = amount + ((amount*rate)/100);
        this.montlyPayment = totalAmount/period;
    }
}

class StatisticsManager {

    allLoansList = JSON.parse(localStorage.getItem('allLoansList')) || [];

    createLoan = (id, name, amount, rate, period) => {
        this.allLoansList.push(new Loan(id, name, amount, rate, period));
        localStorage.setItem('allLoansList', JSON.stringify(this.allLoansList));
    }
}