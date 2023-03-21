function request(url) {

    return new Promise((resolve, reject) =>{
            let data = localStorage.getItem(url);
            if(data){
                resolve(data);
            } else {
                reject("Error!!!")
            }
    })
}

