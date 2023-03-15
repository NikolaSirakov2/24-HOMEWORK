class ViewController {
    constructor(){
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);
    
        this.userManager = new UserManager();
    }

    handleHashChange = () => {
        

        let hash = window.location.hash.slice(1) || "home";

        let pageIds = ["home", "user"];

        
            if(hash === "home"){
                if(this.userManager.logedUser === null){
                    location.hash = "user";
                    console.log(hash);
                }
            }
        
        ;
        pageIds.forEach(id => {
            let page = document.getElementById(id);

            if(hash === id){
                page.style.display = "flex";
            } else {
                page.style.display = "none";
            }
        });

        // switch(hash){
        //     case 'home':
        //         this.renderHomePage();
        //         break;
        //     case 'user':
        //         this.renderUserPage();
        //         break;
        // }
    }
}

let viewController = new ViewController();