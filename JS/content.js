
// 시간을 관리
const timeProcess = (function(){

    let time = new Array(60).fill(0);
    let timePattern = /^\d+$/;

    //space input
    time.forEach((i, index,arr) =>{
        if(index<10){
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

// 기본적인 데이터를 다루기 위한 편집
const dataProcess = (function(){
    //들어갈 공간을 결정-> 분류
    // date 오늘:viewToday 오전:viewMorning 오후:viewAfternoon
    // category // 세부분류
    let dateCategoryM = new Map([['오늘','viewToday'],['오전','viewMorning'],['오후','viewAfternoon']]);
   
    let subdivisionM = new Map([['오늘','viewTodayImf'],['오전','viewMorningImf'],['오후','viewAfternoonImf']]);
    let colorM = new Map([['select','#FFEBC1'],['cancel','#D7A86E']])
    let selectM = '';
    let keyM = []
    
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
            console.log('colorChange',e, color);
            e.style.backgroundColor = colorM.get(color);
        },
    }

}());






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

    // 변경을 위한 공간
    #Chour; #Cminute; #Csecond;

    //공간
    #spaceCircuit;
    
    //inputMap
    #inputM

        constructor(){
            // 시간 선택 범위
            timeProcess.save(this.#Hour,this.#Minute, this.#Second);
        }
        
        // Repeat, Date, Hour, Minute, Second, Work, Target, Way
     viewDataForm(){
            //자릿수 맞추기
            [this.#Chour, this.#Cminute, this.#Csecond] = timeProcess.digit([this.#Hour.value,this.#Minute.value, this.#Second.value]);
            console.log( timeProcess.digit([this.#Hour.value,this.#Minute.value, this.#Second.value]));
            //공간 확보
            [this.#Date.value, this.#Category, this.#Subdivision]=dataProcess.spaceClassification(this.#Date.value);
       }
    // view에 뿌림
     spaceSubmit(){
        document.querySelector(`#${this.#Category}`).innerHTML+= 
        `<li class=${this.#Subdivision}>
        <div class="viewImfNav">
            <span class=${this.#Routine.checked ? 'viewImfNavRoutineT':'viewImfNavRoutineF'}>루틴</span>
            <span name ='date' >${this.#Date.value}</span>
            <span name = 'hour' >${this.#Chour}:${this.#Cminute}:${this.#Csecond}</span>
        </div>
        <div class="viewImfTitle">
            <span name = 'work' >${this.#Work.value}</span>
            <span name = 'target' style="display:none;">${this.#Target.value}</span>
            <span name = 'way' style="display:none;">${this.#Way.value}</span>
        </div>
        </li>`;

        this.#spaceCircuit = document.querySelectorAll(`.${this.#Subdivision}`);
        selectData.ranges(this.#spaceCircuit);
    }
    changeSubmit(){

    }
    getDate(){
        return this.#Date.value();
    }
    getChangeData(){
        return this.#inputM;
    }
    setChangeData(){

        this.viewDataForm();

        this.#inputM = new Map([
            ['category',this.#Category],
            ['subdivison',this.#Subdivision],
            ['routine',this.#Routine.checked ? 'viewImfNavRoutineT':'viewImfNavRoutineF'],
            ['date',this.#Date.value],
            ['hour',this.#Chour],
            ['minute', this.#Cminute],
            ['second', this.#Csecond],
            ['work',  this.#Work.value],
            ['target',this.#Target.value],
            ['way',this.#Way.value]
        ]);

        console.log(this.#inputM);
    }
    setElementData(e){
        this.#Routine.checked =  e.get('routine');
        this.#Date.value = e.get('date');
        this.#Hour.value = e.get('hour');
        this.#Minute.value = e.get('minute');
        this.#Second.value = e.get('second');
        this.#Work.value = e.get('work');
        this.#Target.value = e.get('target');
        this.#Way.value = e.get('way');
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
    #selectM;
    #hour; #minute; #second;
    
    constructor(){
    }
       ranges(e){
        // 클로저 아직 이해를 완전히 하지 못 함 
        // onclick -> foreach의 렉시컬 환경을 참조함 
        // forEach가 호출 될 때 마다 onclick도 생겨나며 그 onclick은 서로다른 forEach의 렉시컬 환경을 참조한다
        // 2022.12.14
        e.forEach( (e,i,arr) => {
            e.onclick = () =>{
                
                this.setElement(e);
                //data유형 변경
                this.inputDataForm();
                //선택요소 input에 뿌림
                inputData.setElementData(this.getSelectData());
                // 처음 선택 -> 아무것도 선택되지 않은 상황
                // 자기 자신을 선택 -> 취소 -> 초기화
       
               if(e === this.#check){
                    dataProcess.colorChange(e,'cancel');
                    this.#check = '';
                    buttonFct.setButton('hidden');
                    inputData.formReset();
                    return;
                }
                // 선택된 요소가 아닌 다른 요소를 선택
                else if(this.#check != '' && this.#check != undefined && e != this.#check){
                    dataProcess.colorChange(this.#check,'cancel');
                }
                
                // 기본 요소 변경
                dataProcess.colorChange(e,'select');
              
                this.#check = e;

                buttonFct.setButton('');
            };
         });
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
    inputDataForm(){
        [this.#hour, this.#minute,this.#second] = timeProcess.notDigit(this.#time.innerText.split(':'));
        // data 유형 맞추기
        this.#selectM = new Map([
            ['category',this.#category.id],
            ['subdivison',this.#subdivision],
            ['routine',this.#routine.className.slice(this.#selectContent[0].className.length -1) === 'T'? true : false],
            ['date',this.#date.innerText],
            ['hour',this.#hour],
            ['minute',this.#minute],
            ['second',this.#second],
            ['work',this.#work.innerText],
            ['target',this.#target.innerText],
            ['way',this.#way.innerText]
        ]);
    }
    getSelectData(){
        return this.#selectM;
    }
    setElementData(e){
     
        if(this.#selectM.get('category') != e.get('category')){
            document.querySelector(`#${e.get('category')}`).appendChild(this.#selectElement);    
        }

        this.#selectElement.className  = e.get('subdivison');
        this.#routine.className = e.get('routine');
        this.#date.innerText = e.get('date');
        this.#time.innerText = [e.get('hour'),e.get('minute'),e.get('second')].join(':');
        this.#work.innerText = e.get('work');
        this.#target.innerText = e.get('target');
        this.#way.innerText = e.get('way');

        this.ranges(document.querySelectorAll(`#${e.get('subdivison')}`));
      
        this.#check = '';
    }
    setColorChange(color){
        dataProcess.colorChange(this.#selectElement, color);
    }
    removeElement(){
        this.#selectElement.remove();
        this.#check = '';
    }
    // setContentValue(e){
    //     this.#changeCategory = e.category;
    //     this.#subdivision = e.subdivision;
    //     //routineColor
    //     this.#routine.className = e.routine ? 'viewImfNavRoutineT' : "viewImfNavRoutineF";
    //     this.#date.innerText = e.date;
    //     this.#time.innerText = [e.hour,e.minute,e.second].join(':');
    //     this.#work.innerText  = e.work;
    //     this.#target.innerText = e.target;
    //     this.#way.innerText = e.way;
    // }
    // getContentValue(e){
    //     // routineCheckbox
    //     e.routine = this.#routine.className.slice(this.#selectContent[0].className.length -1) === 'T'? true : false;
    //     e.category = this.#category.id;
    //     e.subdivision = this.#subdivision;
    //     e.date = this.#date.innerText;
    //     [e.hour,e.minute,e.second] = this.#time.innerText.split(':');
    //     e.work  = this.#work.innerText;
    //     e.target = this.#target.innerText;
    //     e.way = this.#way.innerText;
    // }
    // getSubdivision(){
    //     return this.#subdivision;
    // }

    
  

}
const buttonFct = new class{

    #Submit = document.querySelector('#contentInputImfSubmit');
    #Correction = document.querySelector('#contentInputImfCorrection');
    #Cancel = document.querySelector('#contentInputImfCancel');
    #Delete = document.querySelector('#contentInputImfDelete');
    
    
    constructor(){
        // 등록
        this.#Submit.onchange = (e) => { e.preventDefault(); alert(e);},
        this.#Submit.onclick = (e) =>{
            e.preventDefault();
            //viewData로 만들기
            inputData.viewDataForm();

            inputData.spaceSubmit();

            inputData.formReset();
        },
        // 수정
        this.#Correction.onclick = (e) => {
            //inputData <-> selectData 비교 바꿈
            // 공간 확보를 한 상태
            inputData.setChangeData();

            selectData.setElementData(inputData.getChangeData());

            selectData.setColorChange('cancel');
            this.setButton('hidden');

            inputData.formReset();
        },
        this.#Delete.onclick = (e) => {
            
            selectData.setColorChange('cancel');
            
            this.setButton('hidden');

            inputData.formReset();
            selectData.removeElement();
        }
    }

    setButton(name){
        this.#Submit.className = name === '' ? 'hidden' : '';
        this.#Correction.className = name;
        this.#Cancel.className = name;
        this.#Delete.className = name;
    }

}








// const view = new class{
//     #space;
//     // #selectElement;
//     // #selectIndex;
//     #check = '';
//     // viewTodayImf = [];
//     // viewMorningImf = [];
//     // viewAfternoonImf = [];
//     #spaceCircuit;
//     #changeCategory;

//     constructor(e){
//     }
//     // 클릭을 위해
//     // submitDataSave(data){
//     //      // a라는 공간에 할당 -> 저장 -> a 공간 초기화 -> 다시 new로 새로운 공간 할당
//     //     this.#space = new SaveData(data);
//     //     console.log(data);
//     //      view[data.subdivision].push(this.#space);
//     //     this.#space = '';
//     // }

    
//     modify(){
//         document.querySelector(`#${selectData.getElement.parentElement}`)
//     }
//     cancelElement(){
//         selectData.setColorChange('cancel');
//         this.#check = '';
//     }
//     deleteElement(){
//         console.log(selectData.getElement());
//         selectData.getElement().remove();       
        
//         // reCloser set
//         this.ranges(document.querySelectorAll(`.${selectData.getSubdivision()}`));
//     }
// };


// // input data 부터 다시
// // 동작 과정을 여기에
//  // submitData
// document.querySelector('#contentInputForm').onsubmit = (e) => {
//     e.preventDefault(); 
//     //save -> dataProcess -> submit 

//     //inputData -> processingData 
//     inputData.getContentValue(processingData);
    
//     // Date classification Dictionary
//     processingData.classification();

//     processingData.digit();

//     //view data -> element and click closer
//     view.spaceSubmit(processingData);

//     //inputFormReset
//     inputData.formReset();

//     return;
   
// }; 
// //수정 : 버튼 클릭이 확실한 변화를 인지하기 쉬움 
// // class 밖에서 변경을 차단하겠다 
// document.querySelector('#contentInputImfCorrection').onclick = (e) =>{
   
//     //선택 취소 요소의 직접적인 접근 -> 변경을 따라잡기 어렵다 (생각)
//     selectData.setColorChange('cancel');

//      //data 등록    
//     selectData.setContentValue(dataProcess.dataCompare(processingData));
//     selectData.getContentValue(processingData);
//     console.log(processingData.category);
//     view.ranges(document.querySelectorAll(`.${selectData.getSubdivision()}`));
//     inputData.formReset();
// }

// //         document.querySelector(`#${this.#changeCategory}`).appendChild(selectData.getElement());
        
// //         //갱신
// //         this.#check ='';
// //         console.log(selectData.getSubdivision());
// //         this.ranges(document.querySelectorAll(`.${selectData.getSubdivision()}`));
// //     //버튼 조작
// //     buttonFct.setButton('hidden');
// //     // 리셋
// //     inputData.formReset();
// // };

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
// // // 삭제
// // document.querySelector('#contentInputImfDelete').onclick = (e) =>{

// //     // 초기화
// //     inputData.formReset();
// //     //버튼 숨기기
// //     buttonFct.setButton('hidden');
// //     //delete
// //     view.deleteElement();
    
// //     return;
// // };