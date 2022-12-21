

// 데이터 이동을 위해
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
    classification(){
        [this.date, this.category, this.subdivision] = dataProcess.spaceClassification(this.date);
    },
    digit(){
     [this.hour,this.minute,this.second] = timeProcess.digit([this.hour,this.minute,this.second])
    },
    notDigit(){
        [this.hour,this.minute,this.second] 
        = timeProcess.notDigit([this.hour,this.minute,this.second]);
    }
};



// 기본적인 데이터를 다루기 위한 편집
const dataProcess = (function(){
    //들어갈 공간을 결정-> 분류
    // date 오늘:viewToday 오전:viewMorning 오후:viewAfternoon
    // category // 세부분류
    let dateCategoryM = new Map([['오늘','viewToday'],['오전','viewMorning'],['오후','viewAfternoon']]);
   
    let subdivisionM = new Map([['오늘','viewTodayImf'],['오전','viewMorningImf'],['오후','viewAfternoonImf']]);
    let colorM = new Map([['select','#FFEBC1'],['cancel','#D7A86E']])



    return{
        spaceClassification(date){
            // map 사용 법
            if(date === 'Time' ){
                return ['오늘', dateCategoryM.get('오늘') , subdivisionM.get('오늘')];
            }
            // date value, date value -> changeCategory, subdivisionM
            return [date,dateCategoryM.get(date),subdivisionM.get(date)];

        },
        colorChange(e,color){
            console.log(e);
            e.style.backgroundColor = colorM.get(color);
        },

    }

}());

// 시간을 관리
const timeProcess = (function(){

    let time = new Array(60).fill(0);
    let timePattern = /^\d+$/;

    //space input
    time.forEach((i, index,arr) =>{
        if(index<9){
            arr[index] = `<option value="${index}">0${index}</option>`;    
        }else{
            arr[index] = `<option value="${index}">${index}</option>`;
        }
    });


    return {
        // 만들어 놓은 숫자 추가하기
        save(...e){
                e.forEach((e) => e.innerHTML += time);
        },
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
                    console.log(e === '00');
                    arr[i] = e === '00' ? 0: e.slice(1); 
                    console.log('time', arr, arr[i]);
                }
    
            });
            return time
            
        }
    }
}());

const buttonFct = new class{

    #Submit = document.querySelector('#contentInputImfSubmit');
    #Correction = document.querySelector('#contentInputImfCorrection');
    #Cancel = document.querySelector('#contentInputImfCancel');
    #Delete = document.querySelector('#contentInputImfDelete');
    
    setButton(name){
        this.#Submit.className = name === '' ? 'hidden' : '';
        this.#Correction.className = name;
        this.#Cancel.className = name;
        this.#Delete.className = name;
    }

}


//입력 데이터
const inputData = new class{
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

     //분류
    #Category= '';
    #Subdivision= '';

        constructor(){
            timeProcess.save(this.#Hour,this.#Minute, this.#Second);
        }
        
        // Repeat, Date, Hour, Minute, Second, Work, Target, Way
        getDate(){
            return this.#Date.value;
        }

        getContentValue(e){
            e.routine = this.#Routine.checked;
            e.category= this.#Category;
            e.subdivision = this.#Subdivision;
            e.date = this.#Date.value;
            e.hour = this.#Hour.value;
            e.minute = this.#Minute.value;
            e.second = this.#Second.value;
            e.work = this.#Work.value;
            e.target = this.#Target.value;
            e.way= this.#Way.value;
        }
        setContentValue(e){
            this.#Routine.checked = e.routine;
            this.#Category = e.category;
            this.#Subdivision = e.subdivision;
            this.#Date.value = e.date;
            this.#Hour.value = e.hour ;
            this.#Minute.value = e.minute;
            this.#Second.value = e.second ;
            this.#Work.value = e.work;
            this.#Target.value = e.target;
            this.#Way.value = e.way;
        }
        formReset(){
            this.#par.reset();
        }
 };

 const selectData = new class{
    #selectElement; #selectContent; #category; #subdivision;
    #routine; #date; #time; #work; #target; #way;
    #changeCategory;
    #space;
    #check;
    constructor(){
    }
    setElement(e){
        this.#selectElement = e;
        this.#selectContent  = this.#selectElement.querySelectorAll('span');
        this.#category = this.#selectElement.parentElement;
        this.#subdivision = this.#selectElement.className;
        this.#routine = this.#selectContent[0];
        this.#date = this.#selectContent[1];
        this.#time = this.#selectContent[2];
        this.#work  = this.#selectContent[3];
        this.#target = this.#selectContent[4];
        this.#way = this.#selectContent[5];
    }  
    setColorChange(color){
        dataProcess.colorChange(this.#selectElement, color);
    }
    setContentValue(e){
        this.#subdivision = e.subdivision;
        //routineColor
        this.#routine.className = e.routine ? 'viewImfNavRoutineT' : "viewImfNavRoutineF";
        this.#date = e.date;
        this.#time = [e.hour,e.minute,e.second].join(':');
        this.#work  = e.work;
        this.#target = e.target;
        this.#way = e.way;
    }
    getContentValue(e){
        // routineCheckbox
        e.routine = this.#routine.className.slice(this.#selectContent[0].className.length -1) === 'T'? true : false;
        e.category = this.#category.id;
        e.subdivision = this.#subdivision.className;
        e.date = this.#date.innerText;
        [e.hour,e.minute,e.second] = this.#time.innerText.split(':');
        // [e.hour,e.minute,e.second] = timeProcess.notDigit([e.hour,e.minute,e.second]);
        e.work  = this.#work.innerText;
        e.target = this.#target.innerText;
        e.way = this.#way.innerText;
    }
    
  

}
const view = new class{
    #space;
    // #selectElement;
    // #selectIndex;
    #check = '';
    // viewTodayImf = [];
    // viewMorningImf = [];
    // viewAfternoonImf = [];
    #spaceCircuit;
    #changeCategory;

    constructor(e){
    }
    
    // view에 뿌림
    spaceSubmit(data){
         document.querySelector(`#${data.category}`).innerHTML+= 
         `<li class=${data.subdivision}>
         <div class="viewImfNav">
             <span class=${data.routine ? 'viewImfNavRoutineT':'viewImfNavRoutineF'}>루틴</span>
             <span>${data.date}</span>
             <span>${data.hour}:${data.minute}:${data.second}</span>
         </div>
         <div class="viewImfTitle">
             <span>${data.work}</span>
             <span style="display:none;">${data.target}</span>
             <span style="display:none;">${data.way}</span>
         </div>
         </li>`;
        // 추가된 항목만 순회  
        // 클릭 범위
        this.#spaceCircuit = document.querySelectorAll(`.${data.subdivision}`);
        this.ranges(this.#spaceCircuit);
    }
    // 클릭을 위해
    // submitDataSave(data){
    //      // a라는 공간에 할당 -> 저장 -> a 공간 초기화 -> 다시 new로 새로운 공간 할당
    //     this.#space = new SaveData(data);
    //     console.log(data);
    //      view[data.subdivision].push(this.#space);
    //     this.#space = '';
    // }
    ranges(e){
        // 클로저 아직 이해를 완전히 하지 못 함 
        // onclick -> foreach의 렉시컬 환경을 참조함 
        // forEach가 호출 될 때 마다 onclick도 생겨나며 그 onclick은 서로다른 forEach의 렉시컬 환경을 참조한다
        // 2022.12.14
        e.forEach( (e,i,arr) => {
            e.onclick = (a) =>{
                // 처음 선택 -> 아무것도 선택되지 않은 상황
                if( this.#check === ''){
                    dataProcess.colorChange(e,'select');
                    this.#check = e;
                }
                // 자기 자신을 선택 -> 취소 -> 초기화
                else if(e === this.#check){
                    dataProcess.colorChange(e,'cancel');
                    this.#check = '';
                    buttonFct.setButton('hidden');
                    inputData.formReset();
                    return;
                }
                // 선택된 요소가 아닌 다른 요소를 선택∫
                else{
                    dataProcess.colorChange(this.#check,'cancel');
                    dataProcess.colorChange(e,'select');
                    this.#check = e;
                }

                // button 요소 변경
                buttonFct.setButton('');
                
                //선택 요소 저장
                selectData.setElement(e);
                
                // 입력 창 채우기 
                // select form -> select form  -> not
                // 값의 이전
                selectData.getContentValue(processingData);

                //  select -> input -> 앞 0 제거
                processingData.notDigit();

                inputData.setContentValue(processingData);
              
            };
         });
    }  
    cancelElement(){
        dataProcess.colorChange(selectData.getElement(),'cancel');
        this.#check = '';
    }
    deleteElement(){
        console.log(selectData.getElement());
        selectData.getElement().remove();       
        
        // reCloser set
        this.ranges(document.querySelectorAll(`.${selectData.getSubdivision()}`));
    }
};


// input data 부터 다시
// 동작 과정을 여기에
 // submitData
document.querySelector('#contentInputForm').onsubmit = (e) => {
    e.preventDefault(); 
    //save -> dataProcess -> submit 

    //inputData -> processingData 
    inputData.getContentValue(processingData);
    
    // Date classification Dictionary
    processingData.classification();

    processingData.digit();

    //view data -> element and click closer
    view.spaceSubmit(processingData);

    //inputFormReset
    inputData.formReset();

    return;
   
}; 
//수정 : 버튼 클릭이 확실한 변화를 인지하기 쉬움 
// class 밖에서 변경을 차단하겠다 
document.querySelector('#contentInputImfCorrection').onclick = (e) =>{
   
    //선택 취소 요소의 직접적인 접근 -> 변경을 따라잡기 어렵다 (생각)
    selectData.setColorChange('cancel');
    
    // date 변경 -> 범위, 값 변경

    // t 변경 f 아님
   if(inputData.getDate() != processingData.date){
        processingData.classification();
   }

   processingData.digit();
}

//         document.querySelector(`#${this.#changeCategory}`).appendChild(selectData.getElement());
        
//         //갱신
//         this.#check ='';
//         console.log(selectData.getSubdivision());
//         this.ranges(document.querySelectorAll(`.${selectData.getSubdivision()}`));
//     //버튼 조작
//     buttonFct.setButton('hidden');
//     // 리셋
//     inputData.formReset();
// };

// // 취소
// document.querySelector('#contentInputImfCancel').onclick = (e) =>{

//     // 초기화
//     inputData.formReset();
//     //버튼 숨기기
//     buttonFct.setButton('hidden');
//     // 색상 변경
//     view.cancelElement();
    
//     return;

// };
// // 삭제
// document.querySelector('#contentInputImfDelete').onclick = (e) =>{

//     // 초기화
//     inputData.formReset();
//     //버튼 숨기기
//     buttonFct.setButton('hidden');
//     //delete
//     view.deleteElement();
    
//     return;
// };