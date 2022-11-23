const data = (function(){

    let id ='';  
    let label;
    const correctNameForm ={
        idTest :'*아이디',
        idc : '아이디가 이미 존재합니다',
        pwTest : '*비밀번호',
        pwcTest: '*비밀번호확인',
        cellphoneTest:'핸드폰번호',
        emailTest:'이메일' 
    }

    const wrongNameForm ={
        idTest :'아이디 형식이 맞지 않습니다',
        idc : '아이디가 이미 존재합니다',
        pwTest : '비밀번호 형식이 맞지 않습니다 특수문자가 하나 이상 존재 해야합니다',
        pwcTest: '비밀번호가 다릅니다',
        cellphoneTest:'핸드폰 양식이 틀립니다',
        emailTest:'이메일형식이 틀립니다' 
    }
    return{
        validation(e){
            label = document.querySelector(`label[for=${e.id}]`);
            id = ((e.id).slice(4,(e.id).length).toLowerCase()).concat('Test');

            // element, id, value;
            Pattern[id](e);
        },
        // label 색상, 이름 변경
        correct(e){
           
            if(label.style.color === 'white'){
                label.innerText = correctNameForm[id];;
            }
            label.style.color = 'green';
            e.style.borderBottom = 'solid 4.6px yellowgreen';
        
        
        },
        wrong(e){
            // 아이디 중복 혹은 형식에 맞지 않음
            if(label.style.color ==='' || label.style.color ==='green'){
                label.innerText = wrongNameForm[id];
            }
            label.style.color = 'white';
            e.style.borderBottom = 'solid 4.6px tomato';

        }
    }


}());



const Pattern =  new class{
    // 클래스필스 
    // 프로퍼티 pattern
    // /^(시작)[조건]{길이}$(끝)/   검사
    // false -> 특수문자가 들어있음
    #id = /^[A-Za-z0-9]{5,10}$/;
    //특수문자 여부 검사 
    #pw= /[^A-Za-z0-9]/gi;
    #pwc ='';
    //핸드폰 양식
    //변경하는 방법이 필요
    #cellphone = /^\d+$/;
    //email
    #email =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    
    
    constructor(){
    }
    idTest(e){
        this.#id.test(e.value) ? data.correct(e) : data.wrong(e);
    }
    pwTest(e){
        this.#pwc = 'e.value';
        this.#pw.test(e.value) ? data.correct(e) : data.wrong(e);
    }
    pwcTest(e){
        //pw 가 조건이 맞으면 pwc에 저장 => pwc 데이와 확인
        this.#pwc === e.value ? data.correct(e) : data.wrong(e); 

    }
    cellphoneTest(e){
        this.#cellphone.test(e.value) ? data.correct(e) : data.wrong(e);
      
    }
    emailTest(e){
        this.#email.test(e.value) ? data.correct(e) : data.wrong(e);
    }

};

// const Data = (function(){

//     const cData ={};
//     const wData ={};

//     return{
//         correct(){

//         },
//         wrong(){

//         }
//     };

// }());
// 선택된 요소 찾기
document.querySelector('#joinContainer').onclick = (e) =>{
    console.log(e.target.id);

    //가공
   
    e.target.onblur = () =>{
        //소문자로 만들기

        data.validation(e.target);
    
    };


};

