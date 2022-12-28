const timeProcess = (function(){

    let timePattern = /^\d+$/;
    let h = 3600;
    let m = 60;
    let s = 1;

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
                    console.log(e);
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
            console.log(time);
           time.forEach((e,i,arr)=>{
                if(e<10){
                    console.log(e === '00');
                    arr[i] = e === '00' ? 0: e.slice(1); 
                    console.log('time', arr, arr[i]);
                }
    
            });
            return time;
        },
        
        secondExtraction(total,space){
            [h,m,s].forEach((v,i,arr)=>{
                 total+=space[i]*v;        
            });
            // space-> array -> 깊은 복사 -> 하지만 확실하게 하기 위해
            return [total, space];
        },
        timeExtraction(total,space){
            console.log('4', total, space);
            space[0] = Math.floor(total / h);
            space[1] = Math.floor((total % h) / m);
            space[2] = Math.floor(((total % h) % m));

            return space;
        },
        makeSecond(time){
            // totalTime -> second
            totalT = 0;
            timerSpace = [];
           
            timerSpace = this.notDigit(time.split(':'));

            [totalT,timerSpace] =this.secondExtraction(totalT,timerSpace);
        },
        minerTime(){
            totalT--;
            if(totalT <= 0) timeButton.clearTimer();
            timerSpace =timeProcess.timeExtraction(totalT, timerSpace);
 
            timeData.setProgressText(timeProcess.digit(timerSpace).join(':'));

        },
    }
}());

// time total -> 작동 
// 클릭한 시간 진행에 뿌리는 거 
//휴식시간 설정하는 거 

const timeData = new class{

     #total = 0;
     #timeSpace = [];
     
     #TimeValue = document.getElementsByName('hour');
     #TimerTotal = document.querySelector('#timerTotal');
     #TimerProgress = document.querySelector('#timerProgress');
    constructor(){
        
    }

    totalHour(){
        // 총 -> 초 
        this.#TimeValue.forEach((v,i,arr)=>{
            this.#timeSpace = timeProcess.notDigit(v.innerText.split(':'));
            [this.#total, ...this.#timeSpace] =timeProcess.secondExtraction(this.#total,this.#timeSpace);
        });
        // 초 -> 총
            this.#timeSpace =timeProcess.timeExtraction(this.#total, this.#timeSpace);
            this.#TimerTotal.innerText = (timeProcess.digit(this.#timeSpace)).join(':');
    }
    // 클릭 -> 진행에 시간을 뿌리면 된다 
    getProgressText(){
        return this.#TimerProgress.innerText;
    }
    setProgressText(text){
        this.#TimerProgress.innerText = text;
    }
}


const timeButton = new class{
    
    #Progress = document.querySelector('#progressButton');
    #Start = document.querySelector('#progressStart');
    #Reset = document.querySelector('#progressReset');
    #resetTime;
    #Stop;
    #secondTime = 0;
    #n = 0;
    constructor(){
        this.#Progress.onclick = (e) => {
          
            if(timeData.getProgressText() === '00:00:00') return; 
            
            console.log(e.target.innerText);
            if(e.target.innerText === '시작'){

                this.#resetTime = timeData.getProgressText();
                this.startChange('중단','progressStop');
                
                inputData.formLock(true);
                // 이미 구해졌다면 다시 할 필요가 없다 초기 세팅때만 작동
                // if(this.#secondTime === 0){
                //     this.#secondTime = timeProcess.makeSecond(timeData.getProgressText());  
                // }

                this.startTimer= setInterval(this.startTimer, 1000);
                
            }else if(e.target.innerText === '중단'){
               
                this.startChange('시작','progressStart');
                inputData.formLock(false);
                this.clearTimer();

            }else if(e.target.innerText === '재설정'){
                timeData.setProgressText(this.#resetTime);
                timeProcess.makeSecond(timeData.getProgressText());
            }
        };
    }
    startChange(text,id){
        this.#Start.innerText = text;
        this.#Start.id = id;
    }
    clearTimer(){
        clearInterval(this.startTimer);
    }
    resetButton(){
        this.#Reset.click();
    }
    startTimer(){
        timeProcess.minerTime(); 
    }   
}


// setInterval(timeData.a,1000);
