

const order = new class{
   
    // click -> nextClick 
    // selectElement -> nextSelectElement
    // class -> subdivision
    
    #ViewElement;
    
    #space;
    #number;
    #beforeSpace;
    #nowSpace;
    constructor(){}
    
   setSetting( number){
    
        this.#number = number;

    }
   nextElementSelect(){
        
        //FIFO
       this.#beforeSpace = document.querySelectorAll('.viewImf > li')[this.#number];
       
       this.#beforeSpace.remove()
       
        if( this.#beforeSpace.nextSibling !== null){
            
            this.#nowSpace  = this.#beforeSpace.nextSibling;
            
            this.#nowSpace.onclick();
        
        }

    }

};