
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
};



// 기본적인 데이터를 다루기 위한 편집
const dataProcess = (function(){
    //들어갈 공간을 결정-> 분류
    // date 오늘:viewToday 오전:viewMorning 오후:viewAfternoon
    // category // 세부분류
    let dateM = new Map([['오늘','viewToday'],['오전','viewMorning'],['오후','viewAfternoon']]);
   
    let subdivisionM = new Map([['오늘','viewTodayImf'],['오전','viewMorningImf'],['오후','viewAfternoonImf']]);
  
    return{
        spaceClassification(date){
            // map 사용 법
            if(date.options[date.selectedIndex].value === 'Time' ){
                return ['오늘', dateM.get('오늘') , subdivisionM.get('오늘')];
            }
            // date value, date value -> changeCategory, subdivisionM
            return [date.options[date.selectedIndex].value,dateM.get(date.options[date.selectedIndex].value),subdivisionM.get(date.options[date.selectedIndex].value)];
        },spaceChangeCheck(inputData, selectData){
            return inputData === selectData;
        },
        colorChange(e,color){
            console.log(e);
            e.style.backgroundColor = color;
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
        },
        notNormal(time){
            time.forEach((e,i,arr)=>{
                if(e<10){
                    console.log(e === '00');
                    arr[i] = e === '00' ? 0: e.slice(1); 
                    console.log('time', arr, arr[i]);
                }
    
            });
            return time;
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
        setData(data){
            // 전체 데이터를 가져옴
            this.#Routine.checked = data.routine;
            this.#Date.value =  data.date;
            // 0 잘라내기
            [this.#Hour.value, this.#Minute.value, this.#Second.value]=timeProcess.notNormal(data.time);
            [this.#Work.value, this.#Target.value, this.#Way.value] = [data.work, data.target, data.way];
        }
        formReset(){
            this.#par.reset();
        }
 };

 const selectData = new class{
    #selectElement;
    #selectContent;
    #category;
    #subdivision;
    #routine;
    #date;
    #time;
    #work;
    #target;
    #way;
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
    setClassification(){
        
    }
    setContent(){
        // routine, time, work, target, way
        console.log('routine',inputData.getRoutineCheck());
        this.#routine.className = inputData.getRoutineCheck() === true ? 'viewImfNavRoutineT':'viewImfNavRoutineF';
        // 나온 결과 합치기
        
        this.#time.innerText = (timeProcess.normal(inputData.getTime())).join(':');
        [this.#work.innerText,this.#target.innerText, this.#way.innerText] = inputData.getContentsValue();

    }
    getElement(){
        return this.#selectElement;
    }
    getCategory(){
        return this.#category.id;
    }
    getSubdivision(){
        alert('작동은 함');
        return this.#subdivision.className;
    }
  
    getContent(){
        return {
            subdivision: this.#subdivision.className,
            routine :this.#routine.className.slice(this.#selectContent[0].className.length -1) === 'T'? true : false,
            date :this.#date.innerText,
            time :this.#time.innerText.split(':'),
            work:this.#work.innerText,
            target : this.#target.innerText,
            way  : this.#way.innerText,
        };
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
    #selectColor = '#FFEBC1';
    #cancelColor = '#D7A86E';
    #changeCategory;

    constructor(e){
    }
    
    // view에 뿌림
    spaceSubmit(data){
         document.querySelector(`#${data.category}`).innerHTML+= 
         `<li class=${data.subdivision}>
         <div class="viewImfNav">
             <span class=${data.routine === true ? 'viewImfNavRoutineT':'viewImfNavRoutineF'}>루틴</span>
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
        this.ranges(document.querySelectorAll(`.${data.subdivision}`));
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
                    dataProcess.colorChange(e,this.#selectColor);
                    this.#check = e;
                }
                // 자기 자신을 선택 -> 취소 -> 초기화
                else if(e === this.#check){
                    dataProcess.colorChange(e,this.#cancelColor);
                    this.#check = '';
                    buttonFct.setButton('hidden');
                    inputData.formReset();

                    return;
                }
                // 선택된 요소가 아닌 다른 요소를 선택∫
                else{
                    dataProcess.colorChange(this.#check,this.#cancelColor);
                    dataProcess.colorChange(e,this.#selectColor);
                    this.#check = e;
                }

                // button 요소 변경
                buttonFct.setButton('');

                //선택 요소 저장
                selectData.setElement(e);
                console.log(selectData.contentExtraction());
                // 입력 창 채우기 
                inputData.setData(selectData.contentExtraction());
              
            };
         });
    }
    modifyElement(){

    }

    
    cancelElement(){
        dataProcess.colorChange(selectData.getElement(),this.#cancelColor);
        this.#check = '';
    }
    deleteElement(){
        console.log(selectData.getElement());
        selectData.getElement().remove();       
        // reCloser set
        
        this.ranges(document.querySelectorAll(`.${selectData.getSubdivision()}`));
    }
};




// 동작 과정을 여기에
 // submitData
document.querySelector('#contentInputForm').onsubmit = (e) => {
    e.preventDefault(); 
    // 부모 -> 안에 있는 모든 요소 선택
    // Repeat, Date, Hour, Minute, Second, Work, Target, Way 
     processingData.routine=inputData.getRoutineCheck();
    // Date classification Dictionary
    [processingData.date,processingData.category,processingData.subdivision] = dataProcess.spaceClassification(inputData.getDate());
     // Time processing  text -> 00 Dictionary
    [processingData.hour,processingData.minute,processingData.second] = timeProcess.normal(inputData.getTime());
    // getContents 
    [processingData.work,processingData.target,processingData.way] = inputData.getContentsValue();

    //view data -> element and click closer
    view.spaceSubmit(processingData);
    //view data -> array save


    //inputFormReset
    inputData.formReset();

    return;
   
}; 
//수정
document.querySelector('#contentInputImfCorrection').onclick = (e) =>{
   
    //수정
    // 색상 변화
    dataProcess.colorChange(selectData.getElement(), this.#cancelColor);
    // 수정 값 저장
    selectData.setContent();
    // date추출 -> 입력칸 date랑 비교  다르면 카테고리 변경 부터 진행
    // t 필요없음 f이면 필요함
  selectData.setClassification(dataProcess.spaceChangeCheck(inputData.getDate(), selectData.getContent().date));

        document.querySelector(`#${this.#changeCategory}`).appendChild(selectData.getElement());
        
        //갱신
        this.#check ='';
        console.log(selectData.getSubdivision());
        this.ranges(document.querySelectorAll(`.${selectData.getSubdivision()}`));
    //버튼 조작
    buttonFct.setButton('hidden');
    // 리셋
    inputData.formReset();
};

// 취소
document.querySelector('#contentInputImfCancel').onclick = (e) =>{

    // 초기화
    inputData.formReset();
    //버튼 숨기기
    buttonFct.setButton('hidden');
    // 색상 변경
    view.cancelElement();
    
    return;

};
// 삭제
document.querySelector('#contentInputImfDelete').onclick = (e) =>{

    // 초기화
    inputData.formReset();
    //버튼 숨기기
    buttonFct.setButton('hidden');
    //delete
    view.deleteElement();
    
    return;
};