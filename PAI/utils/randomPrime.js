function isPrime(num) {
    if (num<2){
        return false;
    }

    for (let i=2;i<=Math.sqrt(num); i++){
        if (num %i==0) {
            return true;
        }
    }

   
    let prime=null;
    while (!prime) {
        const min=Math.floor(Math.random()*(max-1))+2;
        if (isPrime(min)) {
            prime=min;
        }
    }
    return prime;

}

module.exports=isPrime;