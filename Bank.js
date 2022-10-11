let randomCardNumber = (min, max) => {
    min = Math.ceil(0000000000000000);
    max = Math.floor(9999999999999999);
    return Math.floor(Math.random() * (max - min) + min);
}

let randomAccountBalance = (min, max) => {
    min = Math.ceil(0);
    max = Math.floor(100000);
    return Math.floor(Math.random() * (max - min) + min);
}

let Bank = {
    accounts:[],
    createAccount: function(User) {
        let res = this.accounts.find(account => account.__login == User.__login);
        if (res == undefined) {
            return this.accounts.push(User);
        } else {
            return false;
        }
        
    },
    changePinCode: function (login, pinCode, newPin) {
        let res = this.accounts.find(account => account.__login == login && account.__pinCode == pinCode);
        if (res) {
            return res.changePin(newPin);
        } else {
            return "Your login information is wrong. Please try again";
        }
    },
    closeAccount: function (login, pinCode) {
        let res = this.accounts.find(account => account.__login == login && account.__pinCode == pinCode);
            if (res) {
                this.accounts.splice(this.accounts.findIndex(account => account.__login == login && account.__pinCode == pinCode), 1);
                return true;
            } else {
            return false;
            }
    },
    showBalance: function(cardNumber, pinCode) {
        let res = this.accounts.find(account => account.__cardNumber == cardNumber && account.__pinCode == pinCode);
        if (res) {
            return res.getAccountBalance();
        } else {
            return false;
        }
    },
    depositFunds: function (cardNumber, sum) {
        let res = this.accounts.find(account => account.__cardNumber == cardNumber && sum > 0);
        if(res) {
            res.depositFunds(sum);
            return true;
        } else {
            return false;
        }
    },
    withdrawFunds: function (cardNumber, pinCode, sum) {
        let res = this.accounts.find(account => account.__cardNumber == cardNumber && account.__pinCode == pinCode);
        if (res) {
            let commission = 0.02;
            let total = (sum * commission) + sum;
            res.withdrawFunds(total);
            return true;
        } else {
            return false;
        }
    },
    transferFunds: function (cardNumber, pinCode, sum, transferCard) {
        let res = this.accounts.find(account => account.__cardNumber == cardNumber && account.__pinCode == pinCode);
        if (res) {
            let commission = 0.04;
            let total = (sum * commission) + sum;
            res.transferFunds(sum, transferCard);
            res.withdrawFunds(total); 
            return true;
        } else {
            return false;
        }
    },
}
 


function User (login, pinCode, newPin) {
    this.__login = login;
    this.__pinCode = pinCode;
    this.__cardNumber = randomCardNumber();
    this.__accountBalance = randomAccountBalance();

    this.getAccountBalance = function () {
        return this.__accountBalance;
    };

    this.changePin = function (newPin) {
        if (newPin.length >= 4 && newPin.length <= 6){
            this.__pinCode = newPin;
            return "Your PIN code was changed successfully";
        }
        return "Your PIN code should be 4 to 6 characters long. Please try again"
    };

    this.depositFunds = function (sum) {
        return this.__accountBalance += sum;
    },
    this.withdrawFunds = function (total) {
        if (this.__accountBalance >= total) {
            return this.__accountBalance -= total;
        } 
    },
    this.transferFunds = function (sum, transferCard) {
        let res = Bank.accounts.find(account => {
            if (account.__cardNumber == transferCard){
        return account.__accountBalance += sum;
            };
        });
        return res;
    }
}


let breakout = 0;


do {
    let firstQuestion = Number(prompt('1 - Create an account \n2 - Close your account \n3 - Review balance \
     \n4 - Deposit funds \n5 - Withdraw funds \n6 - Transfer funds \n7 - Change PIN \n8 - Exit'));
        switch (firstQuestion) {
        case (1): { 
                let login = prompt("Please enter your login");
                let pinCode = prompt("Please enter your PIN code");
                let user = new User(login, pinCode);
                let res = Bank.createAccount(user);
                if (res) {
                    alert(`Your card number is ${user.__cardNumber}`)
                    alert(`Your balance is ${user.__accountBalance}`);
                } else {
                    alert("The login is already taken. Please try again");
                };
                break;
        };   
            case (2): {
                let login = prompt("Please enter your login");
                let pinCode = prompt("Please enter your PIN code");
                let res = Bank.closeAccount(login, pinCode);
                if (res) {
                    alert("Your account was deleted successfully")
                } else {
                    alert("Your login or password is wrong. Please try again");
                }
                break;
            };

            case (3): {
                let cardNumber = prompt("Please enter your card number");
                let pinCode = prompt("Please enter your PIN code");
                let res = Bank.showBalance(cardNumber, pinCode);
                if (res){
                    alert(`Your account balance is ${res}`);
                } else {
                    alert("Your login or password is wrong. Please try again.")
                }
                break;
            };

                case (4): { 
                let cardNumber = prompt("Please enter your card number");
                let sum = Number(prompt("Please enter the sum you would like to deposit"));
                let res = Bank.depositFunds(cardNumber, sum);
                if (res) {
                    alert("Your funds were deposited successfully");
                } else {
                    alert("Check your card number and deposit sum and try again");
                }
                break;
                };
            
            case (5): {
                let cardNumber = prompt("Please enter your card number");
                let pinCode = prompt("Please enter your PIN code");
                let sum = Number(prompt("Please enter the sum you would like to withdraw"));
                let res = Bank.withdrawFunds(cardNumber, pinCode, sum);
                if (res) {
                    alert("Your funds were withdrawn successfully")
                } else {
                    alert("Your account info or withdraw sum is wrong. Please try again.")
                }
                break;
            };
            case (6): {
                let cardNumber = prompt("Please enter your card number");
                let pinCode = prompt("Please enter your PIN code");
                let sum = Number(prompt("Please enter the sum you would like to transfer"));
                let transferCard = prompt("Please enter a card number of the card that you want to send money to");
                let res = Bank.transferFunds(cardNumber, pinCode, sum, transferCard);
                if (res) {
                    alert("Your funds were transferred successfully");
                } else {
                    alert("Your login information or transfer sum is wrong. Please try again");
                }
                break;
            }
            case (7): {
                let login = prompt("Please enter your login");
                let pinCode = prompt("Please enter your PIN code");
                let newPin = prompt("Please enter your new PIN code");
                let res = Bank.changePinCode(login, pinCode, newPin);
                if (res) {
                    alert(res)
                }
                break;
            };
            
            case (8): {
                breakout = 1;
                console.log(Bank.accounts);
                break;
            };
        }
    } while (breakout == 0);
