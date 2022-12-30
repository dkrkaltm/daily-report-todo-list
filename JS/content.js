







// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 기본적인 데이터를 다루기 위한 편집
const dataProcess = (function(){
    //들어갈 공간을 결정-> 분류
    // date 오늘:viewToday 오전:viewMorning 오후:viewAfternoon
    // category // 세부분류
   
    let colorM = new Map([['select','#FFEBC1'],['cancel','#D7A86E']])
    let dataM;
        
        
    return{
     
        colorChange(e,color){
         
            e.style.backgroundColor = colorM.get(color);
        },
        makeMapData(arr){
        

          dataM = new Map ([
            ['routine',arr[0]],
            ['hour', arr[1]],
            ['minute',arr[2]],
            ['second',arr[3]],
            ['work',arr[4]],
            ['target',arr[5]],
            ['way',arr[6]]
          ]);

          return dataM;
        }
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

    // selectTime
     #Hour = this.#Par.querySelector('#Hour');
     #Minute =this.#Par.querySelector('#Minute');
     #Second = this.#Par.querySelector('#Second');
     #Rest = this.#Par.querySelector('#Rest');
     //do
     #Work = this.#Par.querySelector('#contentInputWork');
    //target
     #Target = this.#Par.querySelector('#contentInputTarget');
    //way
     #Way = this.#Par.querySelector('#contentInputWay'); 

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
            timeSetting.save(this.#Hour,this.#Minute, this.#Second,this.#Rest);
        }
        
        // Repeat, Date, Hour, Minute, Second, Work, Target, Way
     viewDataForm(){
            //자릿수 맞추기
            [this.#Chour, this.#Cminute, this.#Csecond] = timeProcess.digit([this.#Hour.value,this.#Minute.value, this.#Second.value]);  
       }
    // view에 뿌림
     spaceSubmit(){
        document.querySelector(`.viewImf`).innerHTML+= 
        `<li>
        <div class="viewImfNav">
            <span class=${this.#Routine.checked ? 'viewImfNavRoutineT':'viewImfNavRoutineF'}>루틴</span>
            <span name = 'hour' >${this.#Chour}:${this.#Cminute}:${this.#Csecond}</span>
        </div>
        <div class="viewImfTitle">
            <span name = 'work' >${this.#Work.value}</span>
            <span name = 'target' style="display:none;">${this.#Target.value}</span>
            <span name = 'way' style="display:none;">${this.#Way.value}</span>
        </div>
        </li>`;

        this.#spaceCircuit = document.querySelectorAll(`.viewImf > li`);
        return this.#spaceCircuit;
    
    }
    setRest(v){
        this.#Rest.value = v;
    }
    getChangeData(){
        return this.#inputM;
    }
    setChangeData(){

        this.viewDataForm();

        // this.#inputM = new Map([
          
        //     ['routine',this.#Routine.checked ? 'viewImfNavRoutineT':'viewImfNavRoutineF'],
        //     ['hour',this.#Chour],
        //     ['minute', this.#Cminute],
        //     ['second', this.#Csecond],
        //     ['work',  this.#Work.value],
        //     ['target',this.#Target.value],
        //     ['way',this.#Way.value]
        // ]);
        this.#inputM = dataProcess.makeMapData(
         
            [
             this.#Routine.checked ? 'viewImfNavRoutineT':'viewImfNavRoutineF'
            ,this.#Chour
            ,this.#Cminute
            ,this.#Csecond
            ,this.#Work.value
            ,this.#Target.value
            ,this.#Way.value
           ]
        
        );
    }
    setElementData(e){
        this.#Routine.checked =  e.get('routine');
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
    #selectElement; #selectContent; 
    #routine; #time; #work; #target; #way;
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
               

                order.setSetting(i);

                this.setElement(e);
                //data유형 변경
                this.inputDataForm();
                //선택요소 input에 뿌림
                inputData.setElementData(this.getSelectData());
                // 처음 선택 -> 아무것도 선택되지 않은 상황
                // 자기 자신을 선택 -> 취소 -> 초기화
                ProgressTime.setSelectTimeSecond(e.querySelector('[name= "hour"]').innerText);
                  
                if(e === this.#check){
                    dataProcess.colorChange(e,'cancel');
                    this.#check = '';
                    ProgressTime.setTime(this.#timeCancel);
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
        this.#routine = this.#selectContent[0];
        this.#time = this.#selectContent[1];
        this.#work  = this.#selectContent[2];
        this.#target = this.#selectContent[3];
        this.#way = this.#selectContent[4];
    }
    inputDataForm(){
        [this.#hour, this.#minute,this.#second] = timeProcess.notDigit(this.#time.innerText.split(':'));
        // data 유형 맞추기
      
        this.#selectM = dataProcess.makeMapData(
            [this.#routine.className.slice(this.#selectContent[0].className.length -1) === 'T'? true : false
                ,this.#hour
                ,this.#minute
                ,this.#second
                ,this.#work.innerText
                ,this.#target.innerText
                ,this.#way.innerText
            ]
        );
    }
    getSelectData(){
        return this.#selectM;
    }
    setElementData(e){
        this.#routine.className = e.get('routine');
        this.#time.innerText = [e.get('hour'),e.get('minute'),e.get('second')].join(':');
        this.#work.innerText = e.get('work');
        this.#target.innerText = e.get('target');
        this.#way.innerText = e.get('way');
    }
    removeElement(){
        
        this.#selectElement.remove();

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

    #Form = document.querySelector('#contentInputForm');

    #Enrollment = document.querySelector('#contentInputImfSubmit');
    #Correction = document.querySelector('#contentInputImfCorrection');
    #Cancel = document.querySelector('#contentInputImfCancel');
    #Delete = document.querySelector('#contentInputImfDelete');
    
    #spaceRenewal;
    #timeCancel = '00:00:00';
    constructor(){
        // 등록
        this.#Form.onsubmit = (e) =>{
          
            e.preventDefault('false');

            inputData.viewDataForm();

            this.#spaceRenewal= inputData.spaceSubmit();
        
            selectData.ranges(this.#spaceRenewal);
            
            inputData.formReset();
            
            totalTime.setData();
       
        },
        // 수정
        this.#Correction.onclick = (e) => {
            // 수정본저장
            inputData.setChangeData();
            // 수정본 selectData에 저장
            selectData.setElementData(inputData.getChangeData());

            this.reNormalSetting();
            
            totalTime.setData();
        
        },
        //취소
        this.#Cancel.onclick = (e) => {
       
            this.reNormalSetting();
        }
        ,
        //삭제
        this.#Delete.onclick = (e) => {
         
            selectData.removeElement();
        
            this.setButton('hidden');  
           
            this.reNormalSetting();
          
            totalTime.setData();
        }

    }

    setButton(name){
       
        this.#Enrollment.className = name === '' ? 'hidden' : '';
        
        this.#Correction.className = name;
       
        this.#Cancel.className = name;
       
        this.#Delete.className = name;
  
    }
    reNormalSetting(){
        
        selectData.setColorChange('cancel');
        
        selectData.setCheck('');
        
        inputData.formReset();
        
        this.setButton('hidden');
        
        ProgressTime.setTime(this.#timeCancel);
   
    }

};

// testCase
(function(){
    document.querySelector(`.viewImf`).innerHTML+= 
    `<li>
    <div class="viewImfNav">
        <span class= 'viewImfNavRoutineF'}>루틴</span>
        <span name = 'hour' >00:00:03</span>
    </div>
    <div class="viewImfTitle">
        <span name = 'work' >abcd</span>
        <span name = 'target' style="display:none;">abcd</span>
        <span name = 'way' style="display:none;">abcd</span>
    </div>
    </li>`;
    
    selectData.ranges(document.querySelectorAll(".viewImf > li"));
    
}());
