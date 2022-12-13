

const dateProcess = (function(){
    //들어갈 공간을 결정-> 분류
    // date 오늘:viewToday 오전:viewMorning 오후:viewAfternoon
    
    let dateM = new Map([['오늘','viewToday'],['오전','viewMorning'],['오후','viewAfternoon']]);
    let subdivisionM = new Map([['오늘','viewTodayImf'],['오전','viewMorningImf'],['오후','viewAfternoonImf']])
    return{
        spaceClassification(date){
            // map 사용 법
        
            if(date.options[date.selectedIndex].value === 'Time' ){
                return ['오늘', dateM.get('오늘') , subdivisionM.get('오늘')];
            }
            return [date.options[date.selectedIndex].value,dateM.get(date.options[date.selectedIndex].value),subdivisionM.get(date.options[date.selectedIndex].value)];
          
        }
    }

}());


const timeProcess = (function(){

    let time = new Array(60).fill(0);
    let timePattern = /^\d+$/;

    //space input
    time.forEach((i, index,arr) =>{
        if(index<9){
            arr[index] = `<option value="${index+1}">0${index+1}</option>`;    
        }else{
            arr[index] = `<option value="${index+1}">${index+1}</option>`;
        }
    });

    return {
        save(...e){
                e.forEach((e) => e.innerHTML += time);
        },
       normal([...time]){ 
                time.forEach( (e,i,arr) =>{
                    // 시간이 숫자가 아닐 떄 00으로 초기화
                    if(!timePattern.test(e.options[e.selectedIndex].value)){     
                        time[i]= '00';  
                    }else if(e.options[e.selectedIndex].value<10){
                        
                        time[i] = '0'+e.options[e.selectedIndex].value;  
                    }else{
                        time[i] = e.options[e.selectedIndex].value;  
                    }
                });

                return time;
               
              
        }
    }
}());




//입력 데이터
const contentDate = new class{
     #par = document.querySelector('#contentInputForm');
    // 반복 
     #Routine =  this.#par.querySelector('#contentInputRepeat');
    // 요일
     #Date =  this.#par.querySelector('#Date');
    // selectTime
     
     #Hour = this.#par.querySelector('#Hour');
     #Minute =this.#par.querySelector('#Minute');
     #Second = this.#par.querySelector('#Second');
    

     //do
     #Work = this.#par.querySelector('#contentInputWork');
    //target
     #Target = this.#par.querySelector('#contentInputTarget');
    //way
     #Way = this.#par.querySelector('#contentInputWay'); 
    //selectTimeOption  

        constructor(){
            timeProcess.save(this.#Hour,this.#Minute, this.#Second);
        }
        
        // Repeat, Date, Hour, Minute, Second, Work, Target, Way
       getRoutineCheck(){
         return this.#Routine.checked;
       }

        getDate(){
            return this.#Date;
        }
        getTime(){
            return [this.#Hour,this.#Minute, this.#Second];
        }
        getContentsValue(){
            return [this.#Work.value,this.#Target.value,this.#Way.value];
        }
 
        
    
 };

//  // 변경된 값을 다루기 위함
// const processingdata = (function(){
//     let repeat ='';
//     let date = '';
//     let hour = 0;
//     let minute =0;
//     let second = 0;
//     let work = '';
//     let target = '';
//     let way = '';

//     return{
//         getTimeData(){

//         },
//         setTimeData(){

//         }
//     }
// }());

const view = new class{

    #todayChild = document.getElementsByClassName('viewTodayImf');
    #morningChild = document.getElementsByClassName('viewMorningImf');
    #afternoonChild = document.getElementsByClassName('viewAfternoonImf');
    todayli = document.querySelectorAll('.viewImf .viewTodayImf');
    morli = document.querySelectorAll('.viewMorningImf');
    afterli = document.querySelectorAll('.viewAfternoonImf');
    ranges = new Map([['오늘',0],['오전',0],['오후',0]]);   
    i=0;
    // range
    // 시작과 끝을 가져야지 않나
    
    constructor(e){
        this.#todayChild.onclick =(e) => {console.log(e.target)} ;
        this.#morningChild.onclick = (e) => console.log(e.target) ;
        this.#afternoonChild.onclick = (e) => console.log(e.target) ;
        document.getElementsByClassName('viewMorningImf').onclick =(e) => {console.log(e.target)};
    }

    range(){
        this.todayli = document.querySelectorAll('.viewImf .viewTodayImf');
        this.morli = document.querySelectorAll('.viewImf .viewMorningImf');
        this.afterli = document.querySelectorAll('.viewAfternoonImf');
        console.log('a',this.todayli,this.morli,this.afterli);
    }
    space(data){
        document.querySelector(`#${data.category}`).innerHTML+=
        `<li class=${data.subdivision}>
        <div class="viewImfNav">
            <span id=${data.routine === true ? 'viewImfNavRoutineT':'viewImfNavRoutineF'}>루틴</span>
            <span>${data.date}</span>
            <span>${data.hour}:${data.minute}:${data.second}</span>
        </div>
        <div class="viewImfTitle">
            <span>${data.work}</span>
            <span style="display:none;">${data.target}</span>
            <span style="display:none;">${data.way}</span>
        
        </div>
        </li>`;
    }

}
    




const processingData ={
    routine:'',
    category:'',
    subdivision:'',
    date : '',
    hour: 0,
    minute: 0,
    second : 0,
    work : '',
    target : '',
    way : '',
};

// document.querySelector('#view').onclick = (e) => {
    
//     console.log('e',e.target,e.currentTarget);
// };



// function r(e){

//     console.log('e',e,arguments);

//     e.onclick = () =>{
//         alert("됐으면 좋겠어");
//         console.log(e);
//     }

// }

// const r2 = (function(){
//         let i =0;
//         let Par;
//         return{
//             registration(){
//                 Par = document.querySelectorAll('.viewImf li');
//                 for(;i<Par.length;i++){
//                     console.log('p',Par);
//                     r(Par[i]);
//                 }
            
//             },
//             load(e){
//                 console.log(e);
//                 e.onclick = () =>{
//                     alert('됀다');
//                     console.log(e);
//                 }
//             }
//         }


// }());



let i =0;
 // submitData
document.querySelector('#contentInputForm').onsubmit = (e) => {
    e.preventDefault();
    
   
    // 부모 -> 안에 있는 모든 요소 선택
    // Repeat, Date, Hour, Minute, Second, Work, Target, Way
     processingData.routine=contentDate.getRoutineCheck();
     console.log(processingData.routine === true ? 'viewImfNavRoutineT':'viewImfNavRoutineF');
    // Date classification Dictionary
    [processingData.date,processingData.category,processingData.subdivision] = dateProcess.spaceClassification(contentDate.getDate());

     // Time processing  text -> 00 Dictionary
    [processingData.hour,processingData.minute,processingData.second] = timeProcess.normal(contentDate.getTime());;
    
    // getContents 
    [processingData.work,processingData.target,processingData.way] = contentDate.getContentsValue();

    view.space(processingData);
    // r2.registration();
    
    // console.log('par',par[0]);
    // bubble
   
    // par.forEach((e)=>{
    //     console.log(e);
    //     e.onclick = () =>{
            
    //         console.log(e);
    //     }

    // });
 
    // console.log('a',par.length);
    let   Par = document.querySelectorAll('.viewImf li');
    console.log('p',Par);
    // for(;i<Par.length;i++){
    //     console.log(Par[i], i);
    //     r(Par[i]);
    // }
    
    //   Par.forEach((e)=>{
    //     console.log(e);
    //         r(e);
    //     });
    view.range();
    console.dir(view);
    console.log(processingData);
}; 
