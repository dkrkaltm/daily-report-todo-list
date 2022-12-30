const navProcess = new class{

    constructor(){}

    colorIdChange(e,color){

        e.id = color;

    }
  
};

const navElement = new class{

    #NavContainer = document.querySelector('#viewSelect');
    #AllNav = document.querySelectorAll('#viewSelect > li');
    
    #AllView = this.#AllNav[0];
    #TodayView= this.#AllNav[1];
    #MorningView = this.#AllNav[2];
    #AfternoonView = this.#AllNav[3];

    constructor(){
       
        this.#NavContainer.onclick = (e) =>{
          
            this.#AllNav.forEach((v,i,arr) =>{
                
                if(v !== e.target){
                    
                   v.id = '';
                
                }else{
                    
                    v.id = 'viewAll';
              
                }
            });

            viewElement.viewAreaChange(e.target.innerText);
        };
    }


    con(){
        console.log( [this.#AllView, this.#TodayView, this.#MorningView, this.#AfternoonView]);
    }
};

const viewProcess = new class{

    constructor(){}

    viewAreaClassChange(e,name){

        e.className += name;
    }

};

const viewElement= new class{
    
    #View = document.querySelector('#view');
    #ViewAll = this.#View.querySelectorAll('ol');
    #viewTest  = this.#ViewAll[0].querySelectorAll('li');
    #Today = this.#View.querySelector('#viewToday');
    #Morning = this.#View.querySelector('#viewMorning');
    #Afternoon = this.#View.querySelector('#viewAfternoon');

    #compare = new Map([['전체보기','전체보기'],['오늘','viewToday'],['오전','viewMorning'],['오후','viewAfternoon']]);

    constructor(){}
    
    viewAreaChange(id){

        this.#ViewAll.forEach( (e,i,arr) =>{
            
            
            if(id === '전체보기'){
            
                e.className = 'viewImf';
            
            }else if(e.id !== this.#compare.get(id)){
               
                e.className = 'hidden';
            
            }else{
          
                e.className = 'viewImf';
           
            }
        });
    }
    con3(){
        console.log(this.#viewTest);
    }


};

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
    
   setSetting(space, number){

        this.#space = space;
    
        this.#number = number;

    }
   nextElementSelect(){
        
        //FIFO
       this.#beforeSpace = document.querySelectorAll(`.${this.#space}`)[this.#number];
       
       this.#nowSpace  = this.#beforeSpace.nextSibling;

       this.#beforeSpace.remove()

       this.#nowSpace.onclick();

    }

};