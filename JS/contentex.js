





//저장을 위한 데이터는 변경하지 않는다
const contentDate = (function(){

    // 반복 
    let Repeat =  document.querySelector('#contentInputRepeat');
    // 요일
    let Date =  document.querySelector('#Date');
    // selectTime
    let Hour = document.querySelector('#Hour');
    let Minute =document.querySelector('#Minute');
    let Second = document.querySelector('#Second');
    //do
    let Work = document.querySelector('#contentInputWork');
    //target
    let Target = document.querySelector('#contentInputTarget');
    //way
    let Way = document.querySelector('#contentInputWay'); 
    //selectTimeOption  
    let time = new Array(60).fill(0);

    time.forEach((i, index,arr) =>{
        
        if(index<9){
            arr[index] = `<option value="${index+1}">0${index+1}</option>`;    
        }else{
            arr[index] = `<option value="${index+1}">${index+1}</option>`;
        }
    });

    Hour.innerHTML +=time;
    Minute.innerHTML +=time;
    Second.innerHTML +=time;

    return {
        // Repeat, Date, Hour, Minute, Second, Work, Target, Way
      getContentImf(){
            return  {
                repeat:Repeat.checked, //체크 여부
                date:Date.options[Date.selectedIndex].value, // 날
                hour:Hour.options[Hour.selectedIndex].value,
                minute:Minute.options[Minute.selectedIndex].value,
                second:Second.options[Second.selectedIndex].value,
                work:Work.value,
                target:Target.value,
                way:Way.value,
                  };  
                },
      setContentImf(){

      },
    };
    
    

 }());

 // validation
function dataValidation(data){

    if(data.date === 'Time' || data.date ==='오늘'){
        data.date = '오늘';
        data.separator = 'viewToday';
        
    }else{
        //구분자 
        data.separator = (data.date === '오전' ? 'viewMorning' : 'viewAfternoon');
    }
    if(data.hour === 'Hour'){
        data.hour = '00';
    }
    if(data.minute === 'Minute'){
        data.minute ='00';
    }
    if(data.second === 'Second'){
        data.second = '00';
    }

}
 
const dataClassification =(function(){
    
    let num = [0,0,0,0];
    let i =0;
    let name = ['viewToday','viewMorning','viewAfternoon'];
    let viewToday =[];
    let viewMorning =[];
    let viewAfternoon =[];
    let viewTitle = '';
    let viewColor ='';

    return{
        setData(date, Data){
            console.log(Data.separator);
            for(i = 0; i<3; i++){
                if(name[i].search(Data.separator)){
                    //데이터를 저장할 공간을 어떻게 구분할지   
                    //2차원 배열로 date 만들기
                    eval(name[i])[num[i]] = Data;
                    console.log('c',eval(eval(name[i])[num[i]]), viewToday[i], viewMorning[i],viewAfternoon[i]);
                     num[i]++;
                     i = num[i];
                     break;
                }
            }
            if(Data.repeat){
                viewColor ='black';
            }
            //viewTitle 어느 공간에 해당하는 가 
            document.querySelector(`#${Data.separator}`).innerHTML+=`<li >
            <div class="viewImfNav">
                <span style="color:${viewColor}"id="viewImfNavRepeat">반복</span>
                <span>${Data.date}</span>
                <span>${Data.hour}:${Data.minute}:${Data.second}</span>
            </div>
            <div class="viewImfTitle">
                <span>${Data.work}</span>
            </div>
        </li>`;

        },
        getData(name='오늘', number=0){
            
        }
    };

}());


document.querySelector('#viewSelect').onclick = (e) => {
        // 색상이 비었는지 + 색상이 똑같은지
        // 처음 전체보기를 눌렀을 떄 color는 빈 값으로 나온다 
        // if e.target. 색상이 같으면 수행하지 않는다 
        if(e.target.style.color !== 'rgb(255, 235, 193)'){
                //view 선택에 따른 체인지
                //viewSelect 색 변경
                viewS.colorChange(e.target);
                
                //선택 영역변경
                viewS.viewChange(e.target.textContent);
                
                }
    };


class ViewSelect{
    #selectView = document.querySelectorAll('#viewSelect li');
    #viewDate = document.querySelectorAll('#view ol');
    #naemCheck = ['오늘','오전','오후','전체보기'];
    #index =0;
    colorChange(target){

        // 자기 자신을 뺀 나머지 블랙
        this.#selectView.forEach((i, index,arr) =>{
            if( arr[index]!== target){
                arr[index].style.color = 'black';

            }else{
                 target.style.color  = '#FFEBC1';
            }
        
        });
    }
    viewChange(name){
        // name과 변경 class 이름이 다름 
        // findIndex 이름에 해당하는 index로 격차 해결 
        // 그 위치의 인덱스를 찾고 그 인덱스를 제외하고 나머지 hidden
        // hidden 중복
        this.#index =this.#naemCheck.findIndex((item) => item === name);

        this.#viewDate.forEach((i,index,arr) => {
           
            if(this.#index !== 3){ 
                if(this.#index === index){
                        arr[index].classList = 'viewImf';
                }else{
                    arr[index].classList ='hidden';
                }
            }else{
                arr[index].classList = 'viewImf';
            }

        })


    }
}
const viewS = new ViewSelect();


document.querySelector('#view').onclick = (e) =>{
    e.stopPropagation();
    console.log(e.currentTarget);
    
}

function a(b){
    alert(b);
}



// submitData
document.querySelector('#contentInputForm').onsubmit = e => {
    e.preventDefault();
 // Repeat, Date, Hour, Minute, Second, Work, Target, Way
    let Data = contentDate.getContentImf();
   
 // Data Validation
   dataValidation(Data);

 // Data classification
   dataClassification.setData(Data.date,Data);
   dataClassification.getData();
}; 
