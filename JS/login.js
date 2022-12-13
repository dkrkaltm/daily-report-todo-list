




// blur구현 -> 각 blur가 일어났을 때로 수정 


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
    };

    const wrongNameForm ={
        idTest :'5~10자리 영어와 숫자의 조합으로만 가능합니다',
        idc : '아이디가 이미 존재합니다',
        pwTest : '비밀번호 형식이 맞지 않습니다 특수문자가 하나 이상 존재 해야합니다',
        pwcTest: '비밀번호가 다릅니다',
        cellphoneTest:'11자리 수가 아닙니다 빈칸으로 두면 입력하지 않아도 됩니다',
        emailTest:'이메일형식이 틀립니다 빈칸으로 두면 입력하지 않아도 됩니다' 
    };
    return{
        validation(e){
                label = document.querySelector(`label[for=${e.id}]`);
                id = ((e.id).slice(4,(e.id).length).toLowerCase()).concat('Test');
                // element, id, value;
               
                if((e.id === 'joinCellphone' && e.value ==='') ||(e.id ==='joinEmail' && e.value === '' ) ){
                    this.exception(e)
                }else{
                    Pattern[id](e);
                }
                
        },
        // label 색상, 이름 변경
        correct(e){
            label.innerText = correctNameForm[id];
            label.style.color = 'green';
            e.style.borderBottom = 'solid 4.6px yellowgreen';
        },
        wrong(e){ 
          
            // 아이디 중복 혹은 형식에 맞지 않음
            label.innerText = wrongNameForm[id];
            label.style.color = 'white';
            e.style.borderBottom = 'solid 4.6px tomato';

        },
        exception(e){
                label.innerText = correctNameForm[id];
                label.style.color = 'black';
                e.style.borderBottom = 'solid 4.6px black';

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
    #pw= /[^A-Za-z0-9]/i;
    #pwc ='';
    //핸드폰 양식
    //변경하는 방법이 필요
    #cellphone = /^\d{11}$/;
    //email
    #email =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;;
    
    n;
    constructor(){
    }
    idTest(e){
        this.#id.test(e.value) ? data.correct(e) : data.wrong(e);
    }
    pwTest(e){
          // 한번 이상 비밀번호가 입력 되었을 때
          // 비밀번호확인은 틀렸다 표시 -> 수정을 위해
        this.#pwc = e.value;
        if(this.n === 1){
            data.validation(document.querySelector('#joinPwC'));
            this.n=0;
            data.validation(e);
            
        }
        this.#pw.test(e.value) ? data.correct(e) : data.wrong(e);

        this.n=1;
    }
    pwcTest(e){
        //pw 가 조건이 맞으면 pwc에 저장 => pwc 데이와 확인
        if(this.#pwc !== ''){
            this.#pwc === e.value ? data.correct(e) : data.wrong(e); 
        }else{
            data.wrong(e);
        }
    }
    cellphoneTest(e){
        this.#cellphone.test(e.value) ? data.correct(e) : data.wrong(e);
      
    }
    emailTest(e){
        this.#email.test(e.value) ? data.correct(e) : data.wrong(e);
    }

};

const clickCheck = (function(){
    let result;

    return {
        // 배열 형태의 데이터라는 뜻
        color([...label]){
            
         return   label.every((v) => {
                return v.style.color !== 'white'} );
                    
                
                    
        },

        empty(e){
            result = true;
           
            e.forEach((e) =>{
                if(e.value === ''){
                    data.validation(e);
                    result = false;
                }
                
            })

            return result;
           
        }
       
    }


    
}());

const joinData = new class{

    //완료 여부 색 확인
    //nodeList -> 배열로 
    // 스프레드 문법을 이용
    #label = [...document.querySelectorAll('#joinContainer label')];
    #valueCheck = [];

    #id = document.querySelector('#joinId');
    #pw = document.querySelector('#joinPw');
    #pwc = document.querySelector('#joinPwC');
    #cellphone = document.querySelector('#joinCellphone');
    #email  = document.querySelector('#joinEmail');
    #button = document.querySelector('#joinBTN');
    #buttonLabel = document.querySelector('label[for="joinBTN"]');

    constructor(){
        this.#valueCheck  = [this.#id,this.#pw,this.#pwc]; 
        this.#id.onblur = () =>{ data.validation(this.#id)};
        this.#pw.onblur = () =>{ data.validation(this.#pw)};
        this.#pwc.onblur = () =>{ data.validation(this.#pwc)};
        this.#cellphone.onblur = () =>{ data.validation(this.#cellphone)};
        this.#email.onblur = () =>{ data.validation(this.#email)};
        this.#button.onclick = () => { 
    
            if( clickCheck.empty(this.#valueCheck) && clickCheck.color(this.#label)){
                // id pw pwc가 빈 값이 아닌지 검사 
                this.#buttonLabel.style.visibility = 'hidden';
            }else{
                this.#buttonLabel.style.visibility = 'visible';
                this.#buttonLabel.innerText = '작성을 완료 해 주세요 *는 필 수 입니다';
              
            }
        
        
        };
    }

    
}

