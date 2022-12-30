// const data = (function(){

//     let id ='';  
//     let label;
//     const correctNameForm ={
//         idTest :'*아이디',
//         idc : '아이디가 이미 존재합니다',
//         pwTest : '*비밀번호',
//         pwcTest: '*비밀번호확인',
//         cellphoneTest:'핸드폰번호',
//         emailTest:'이메일' 
//     }

//     const wrongNameForm ={
//         idTest :'5~10자리 영어와 숫자의 조합으로만 가능합니다',
//         idc : '아이디가 이미 존재합니다',
//         pwTest : '비밀번호 형식이 맞지 않습니다 특수문자가 하나 이상 존재 해야합니다',
//         pwcTest: '비밀번호가 다릅니다',
//         cellphoneTest:'11자리 수가 아닙니다',
//         emailTest:'이메일형식이 틀립니다' 
//     }
//     return{
//         validation(e){
        
//             label = document.querySelector(`label[for=${e.id}]`);
//             id = ((e.id).slice(4,(e.id).length).toLowerCase()).concat('Test');
          
//             // element, id, value;
//             Pattern[id](e);
//         },
//         // label 색상, 이름 변경
//         correct(e){
//             console.log(e,'맞음');
          
//             if(label.style.color === 'white'){
//                 console.log('dd');
//                 label.innerText = correctNameForm[id];
//             }
//             console.log(label);
//             label.style.color = 'green';
//             e.style.borderBottom = 'solid 4.6px yellowgreen';
        
        
//         },
//         wrong(e){ 
//             console.log(e,'틀림');
//             // 아이디 중복 혹은 형식에 맞지 않음
//             if(label.style.color ==='' || label.style.color ==='green'){
                
//                 label.innerText = wrongNameForm[id];
//                 console.log(label.innerText);
//             }
//             label.style.color = 'white';
//             e.style.borderBottom = 'solid 4.6px tomato';

//         }
//     }


// }());



// const Pattern =  new class{
//     // 클래스필스 
//     // 프로퍼티 pattern
//     // /^(시작)[조건]{길이}$(끝)/   검사
//     // false -> 특수문자가 들어있음
//     #id = /^[A-Za-z0-9]{5,10}$/;
//     //특수문자 여부 검사 
//     #pw= /[^A-Za-z0-9]/i;
//     #pwc ='';
//     //핸드폰 양식
//     //변경하는 방법이 필요
//     #cellphone = /^\d{11}$/;
//     //email
//     #email =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;;
    
//     n;
//     constructor(){
//     }
//     idTest(e){
//         this.#id.test(e.value) ? data.correct(e) : data.wrong(e);
//     }
//     pwTest(e){
//           // 한번 이상 비밀번호가 입력 되었을 때
//           // 비밀번호확인은 틀렸다 표시 -> 수정을 위해
//           this.#pwc = e.value;
//         if(this.n === 1){
//             console.log('작동');
//             data.validation(document.querySelector('#joinPwC'));
//             this.n=0;
//             data.validation(e);
            
//         }
//         this.#pw.test(e.value) ? data.correct(e) : data.wrong(e);

//         this.n=1;
//     }
//     pwcTest(e){
//         //pw 가 조건이 맞으면 pwc에 저장 => pwc 데이와 확인

//         if(this.#pwc !== ''){
//             this.#pwc === e.value ? data.correct(e) : data.wrong(e); 
//         }else{
//             data.wrong(e);
//         }
//     }
//     cellphoneTest(e){
//         this.#cellphone.test(e.value) ? data.correct(e) : data.wrong(e);
      
//     }
//     emailTest(e){
//         this.#email.test(e.value) ? data.correct(e) : data.wrong(e);
//     }

// };

// const submitCheck = (function(){

//     const joinLabel = [...document.querySelectorAll('#joinContainer label')];
//     let n  =0;
   
//     console.log(joinLabel);
//     // true green
//     // false white 
//     // 필수 입력 혹은 나머지 입력을 확인해 주세요

//     for(n=0;n<joinLabel.length;n++){

//         if(n<3 && joinLabel[n].style.color === 'white'){
//                 return 'false'
//         }else if(joinLabel[n].style.color === 'black' || joinLabel[n].style.color === 'green' || joinLabel[n].style.color !== 'white'){
//             console.log('b', joinLabel[n]);
//         }
//     }
   
//     return {
//         event2(){
             
//         }
//     }


    
// }());

// 너무 많이 실행되는 단점이 존재한다
// tab을 눌렀을 떄 
// document.onkeydown = (e) => {
//    // console.log((e.path[0].id).includes('join'));

//    console.log('tab 실행');

//     if(e.key ==='Tab' && (e.path[0].id).includes('join')){

//         data.validation(e.path[0]);
//     }
    
// }
// }());
// 선택된 요소 찾기
// document.querySelector('#joinContainer').onclick = (e) =>{
//     console.log('adb',e.target.id);
   
//     //가공
//     if(e.target.id === 'joinBTN'){
//        console.log(submitCheck());
//     }
//     e.target.onblur = () =>{
//         data.validation(e.target);
//     };


// };