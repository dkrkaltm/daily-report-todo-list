const timeProcess = (function(){

    let timePattern = /^\d+$/;
    
    let h = 3600, m =60, s = 1;

    // timer 
    let totalT;
   
    let timerSpace;
   
    let reset;
    // timeElement -> All로 가져온다
    //space input
    return {
        // 만들어 놓은 숫자 추가하기
        // 자릿수 맞추기, 숫자가 아닐때 교환
       digit(time){ 
        
                time.forEach( (e,i,arr) =>{
                    // 시간이 숫자가 아닐 떄 00으로 초기화
              
                    if(!timePattern.test(e)){     
                      
                        time[i]= '00';  
                   
                    }else if(e<10){
                    
                        time[i] = '0'+e;  
                   
                    }else{
                    
                        time[i] = e;  
                   
                    }
                });
               
                return time;
                
        },
        notDigit(time){
           
            time.forEach((e,i,arr)=>{
                
            if(e<10){
                 
                    arr[i] = e === '00' ? 0: e.slice(1); 
                    
                }
    
            });

            return time;
        },
        
        secondExtraction(second,space){
           
            [h,m,s].forEach((v,i,arr)=>{
                 
                second+=space[i]*v;        
                 
            });
            // space-> array -> 깊은 복사 -> 하지만 확실하게 하기 위해
            return second;
        },
        timeExtraction(total,space){
            
            space[0] = Math.floor(total / h);
            
            space[1] = Math.floor((total % h) / m);
            
            space[2] = Math.floor(((total % h) % m));

            return timeProcess.digit(space).join(':');
        },
    }
}());

// time total -> 작동 
// 클릭한 시간 진행에 뿌리는 거 
//휴식시간 설정하는 거 
// class Time{

//     constructor(){
        
//         this.second = 0;

//         this.timeElement = [];
        
        
//     }

// }

const totalTime = new class{
    
    #total = 0;
  
    #timeSpace = [];
   
    #second = 0;
  
    #TimeValue = document.getElementsByName('hour');
   
    #TimerTotal = document.querySelector('#timerTotal');
    
    constructor(){
        
    }
    setData(){

        this.#second = 0;
        // 총 -> 초 
        this.#TimeValue.forEach((v,i,arr)=>{
            
            this.#timeSpace = timeProcess.notDigit(v.innerText.split(':'));
           
            this.#second =timeProcess.secondExtraction(this.#second,this.#timeSpace);
       
        });
        // 초 -> 총
            this.#total =timeProcess.timeExtraction(this.#second, this.#timeSpace);

            this.#TimerTotal.innerText = this.#total;

    }
    getTime(){
        return this.#total;
    }
}
const RestTime = new class{

    #RestSelect = document.querySelector('#Rest');
    #TimerRest = document.querySelector('#timerRest');

    //시 -> 총 -> 시 
    #second = 0;
    #timeElement = [];
    #reset = 0;
    #viewHour;
    #restInterval;
    constructor(){
        this.#RestSelect.onchange = () =>{
            
            this.#TimerRest.innerText = `00:0${this.#RestSelect.value}:00`;
            this.setRestTimeSecond();
        }
    }
    setRestTimeSecond(){
        
        this.#timeElement = timeProcess.notDigit(this.#TimerRest.innerText.split(':'));

        this.#second = timeProcess.secondExtraction(this.#second, this.#timeElement);
        
        this.#reset = this.#second

    }
    start(){

        this.#second --;

        if(this.#second <= 0){
            // 끝나면 -> 진행 시작 -> 휴식시간 초기화 
            IntervalManage.restStop();
        
        }

        this.#viewHour =timeProcess.timeExtraction(this.#second, this.#timeElement);

        this.#TimerRest.innerText = this.#viewHour;

    }
    
}


const ProgressTime = new class{

     #TimerProgress = document.querySelector('#timerProgress');
     
     #second = 0;
    
     #viewHour = 0;
    
     #resetTime = 0;

     #timeElement = [];

     #restInterval;
     constructor(){
        
    }

    getTime(){
        return this.#TimerProgress.innerText;
    }
    setTime(text){
        this.#TimerProgress.innerText = text;
    }
    setSelectTimeSecond(text){
        
        this.#second = 0;

        this.#TimerProgress.innerText = text;

        this.#timeElement = timeProcess.notDigit(this.#TimerProgress.innerText.split(':'));
  
        this.#second = timeProcess.secondExtraction(this.#second,this.#timeElement);

        this.#resetTime = this.#second;

    }
    start(){
      
        this.#second --;

        if(this.#second <= 0){
            
            order.nextElementSelect();
      
            totalTime.setData();  

            this.#restInterval = setInterval( IntervalManage.restStart,1000);
            
            IntervalManage.setInterval(this.#restInterval, 'rest');

            IntervalManage.stop();
        }

        this.#viewHour =timeProcess.timeExtraction(this.#second, this.#timeElement);

        this.#TimerProgress.innerText = this.#viewHour;
        
    }
    resetTime(){

        this.#second = this.#resetTime+1;
    
    }
   
}


const timeButton = new class{
    
    #Progress = document.querySelector('#progressButton');
    
    #Start = document.querySelector('#progressStart');
    
    #Reset = document.querySelector('#progressReset');
   
    #startTimerInterval;
    
    #resetCriteria= '';

    constructor(){
        this.#Progress.onclick = (e) => {
          
            if(ProgressTime.getTime() === '00:00:00') return; 
            
            if(e.target.innerText === '시작'){
                
                this.startButtonChange('중단','progressStop');            
                
                inputData.formLock(true);
    
                this.#startTimerInterval= setInterval(IntervalManage.startTimer, 1000);
                
                IntervalManage.setInterval(this.#startTimerInterval,'timer');
           
            }else if(e.target.innerText === '중단'){
              
                this.startButtonChange('시작','progressStart');
             
                inputData.formLock(false);
             
                IntervalManage.stop();

            }else if(e.target.innerText === '재설정'){
                
                 ProgressTime.resetTime();

                 if(this.#resetCriteria === '시작'){

                 ProgressTime.start();
                 
                }
                
            }
        };
    }
    startButtonChange(text,id){

        this.#Start.innerText = text;

        this.#Start.id = id;

        this.#resetCriteria = text;

    }
   
    resetButton(){          
    
        this.#Reset.click();             
    
    }
};

const IntervalManage = new class{

    #timerInterV;
    #restInterV;
    constructor(){}


    setInterval(interV,kinds){

        if(kinds === timer){
            this.#timerInterV = interV;
        }else{
            this.#restInterV = interV;
        }
        
    }

    startTimer(){         
        ProgressTime.start();  
    }
    restStart(){
        RestTime.start();
    }
    stop() {
        clearInterval(this.#timerInterV);
     }
    restStop(){
        clearInterval(this.#restInterV);
    }
}

// setInterval(timeData.a,1000);
