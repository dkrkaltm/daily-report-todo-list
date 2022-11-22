const data = (function(){

    let id ='';  

    return{
        validation(e){
            id = ((e.id).slice(4,(e.id).length).toLowerCase()).concat('Test');
            // element, id, value;
            Pattern[id](e);
        },
        correct(e){
            console.log('a',e);
            e.style.borderBottom = 'solid 4.6px yellowgreen';
             
        },
        wrong(e){

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
    #cellphone = /^\d{3}-\d{3,4}-\d{4}$/;
    //email
    #email =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    
    
    constructor(){
    }
    idTest(e){
        alert('작동');
        this.#id.test(e.value) ? data.correct(e) : data.wrong(e);
    }
    pwTest(e){
        this.#pw.test(e.value) ? data.correct(e) : data.wrong(e);
    }
    pwcTest(e){
        //pw 가 조건이 맞으면 pwc에 저장 => pwc 데이와 확인

    }
    cellphoneTest(e){
        this.#id.text(e.value) ? data.correct(e) : data.wrong(e);
      
    }
    emailTest(e){
        this.#id.text(e.value) ? data.correct(e) : data.wrong(e);
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
        // id =(id.toLowerCase()).concat('Test');
        // Pattern[id](value);
    };


};

