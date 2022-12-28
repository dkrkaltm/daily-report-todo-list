







// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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




// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//입력 데이터
const inputData = new class{
     #Par = document.querySelector('#contentInputForm');
    // 반복 
     #Routine =  this.#Par.querySelector('#contentInputRepeat');
    // 요일
     #Date =  this.#Par.querySelector('#Date');
    // selectTime
     #Hour = this.#Par.querySelector('#Hour');
     #Minute =this.#Par.querySelector('#Minute');
     #Second = this.#Par.querySelector('#Second');
     //do
     #Work = this.#Par.querySelector('#contentInputWork');
    //target
     #Target = this.#Par.querySelector('#contentInputTarget');
    //way
     #Way = this.#Par.querySelector('#contentInputWay'); 

     //분류
    #Category= '';
    #Subdivision= '';

    // 변경을 위한 공간
    #Chour; #Cminute; #Csecond;

    //공간
    #spaceCircuit;
    
    //inputMap
    #inputM

    //forReset
    #Select = this.#Par.getElementsByTagName('select');
    #Input = this.#Par.getElementsByTagName('input')
    #Textarea = this.#Par.getElementsByTagName('textarea');
    #Button = this.#Par.getElementsByTagName('button');
        constructor(){
            // 시간 선택 범위
            timeSetting.save(this.#Hour,this.#Minute, this.#Second);
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
        return this.#spaceCircuit;
    
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
            ['subdivision',this.#Subdivision],
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

    formLock(execution){
       [ ...this.#Select,...this.#Input,...this.#Textarea, ...this.#Button].forEach((e,i,arr) => {
            e.disabled = execution;
       });
    }
    formReset(){
        this.#Par.reset();
    }

        
 };
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const selectData = new class{
    #selectElement; #selectContent; #category; #subdivision;
    #routine; #date; #time; #work; #target; #way;
    #changeCategory;
    #space;
    #check;
    #selectM;
    #hour; #minute; #second;
    #timeCancel = '00:00:00';
    constructor(){
    }
       ranges(e){
        // 클로저 아직 이해를 완전히 하지 못 함 
        // onclick -> foreach의 렉시컬 환경을 참조함 
        // forEach가 호출 될 때 마다 onclick도 생겨나며 그 onclick은 서로다른 forEach의 렉시컬 환경을 참조한다
        // 2022.12.14
    
        e.forEach( (e,i,arr) => {
            // 3개의 category 
            // 요소로써 뿌려짐 -> 순서는 상관이 없는 것
            e.onclick = () =>{
                
                console.log(e);
                this.setElement(e);
                //data유형 변경
                this.inputDataForm();
                //선택요소 input에 뿌림
                inputData.setElementData(this.getSelectData());
                // 처음 선택 -> 아무것도 선택되지 않은 상황
                // 자기 자신을 선택 -> 취소 -> 초기화
                timeData.setProgressText(e.querySelector('[name= "hour"]').innerText);
                timeProcess.makeSecond(timeData.getProgressText());  
             
                if(e === this.#check){
                    dataProcess.colorChange(e,'cancel');
                    this.#check = '';
                    timeData.setProgressText(this.#timeCancel);
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
            ['subdivision',this.#subdivision],
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
        // date  변화 -> 저장 공간 변화 
        if(this.#selectM.get('category') != e.get('category')){
            document.querySelector(`#${e.get('category')}`).appendChild(this.#selectElement);    
        }      
        this.#selectElement.className  = e.get('subdivision');
        this.#routine.className = e.get('routine');
        this.#date.innerText = e.get('date');
        this.#time.innerText = [e.get('hour'),e.get('minute'),e.get('second')].join(':');
        this.#work.innerText = e.get('work');
        this.#target.innerText = e.get('target');
        this.#way.innerText = e.get('way');
    }
    removeElement(){
        this.#subdivision = this.#selectElement.className;
        this.#selectElement.remove();
        console.log(document.querySelectorAll(`.${this.#subdivision}`));
    }
    setColorChange(color){
        dataProcess.colorChange(this.#selectElement, color);
    }
    setCheck(name){
        this.#check = name;
    }

};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const buttonFct = new class{

    #Submit = document.querySelector('#contentInputForm');

    #Enrollment = document.querySelector('#contentInputImfSubmit');
    #Correction = document.querySelector('#contentInputImfCorrection');
    #Cancel = document.querySelector('#contentInputImfCancel');
    #Delete = document.querySelector('#contentInputImfDelete');
    
    #submitElement;
    #timeCancel = '00:00:00';
    constructor(){
        // 등록
        this.#Submit.onsubmit = (e) =>{
            console.log('submit');
            e.preventDefault();

            //viewData로 만들기
            inputData.viewDataForm();

            this.#submitElement= inputData.spaceSubmit();
            // 클릭을 위해 요소 렉시컬 환경 요소 등록
            selectData.ranges(this.#submitElement);

            inputData.formReset();
            timeData.totalHour();
        },
        // 수정
        this.#Correction.onclick = (e) => {
            console.log('correct');
            // 수정본저장
            inputData.setChangeData();

            // 수정본 selectData에 저장
            selectData.setElementData(inputData.getChangeData());
            selectData.setColorChange('cancel');
            selectData.setCheck('');
            timeData.setProgressText(this.#timeCancel);
            this.setButton('hidden');

            inputData.formReset();
            timeData.totalHour();
        
        },
        //취소
        this.#Cancel.onclick = (e) => {
            console.log('cancel');
            selectData.setColorChange('cancel');
            selectData.setCheck('');
            timeData.setProgressText(this.#timeCancel);
            this.setButton('hidden');
            
            inputData.formReset();
        }
        ,
        //삭제
        this.#Delete.onclick = (e) => {
            console.log('delete');
            selectData.setColorChange('cancel');
            selectData.setCheck('');
            selectData.removeElement();
            timeData.setProgressText(this.#timeCancel);
            this.setButton('hidden');  
            
            inputData.formReset();
            timeData.totalHour();
        }

    }

    setButton(name){
        this.#Enrollment.className = name === '' ? 'hidden' : '';
        this.#Correction.className = name;
        this.#Cancel.className = name;
        this.#Delete.className = name;
    }

};


(function(){
    document.querySelector(`#viewToday`).innerHTML+= 
    `<li class="viewTodayImf">
    <div class="viewImfNav">
        <span class= 'viewImfNavRoutineF'}>루틴</span>
        <span name ='date' >오늘</span>
        <span name = 'hour' >01:01:01</span>
    </div>
    <div class="viewImfTitle">
        <span name = 'work' >abcd</span>
        <span name = 'target' style="display:none;">abcd</span>
        <span name = 'way' style="display:none;">abcd</span>
    </div>
    </li>`;
    
    selectData.ranges(document.querySelectorAll(".viewTodayImf"));
}());
