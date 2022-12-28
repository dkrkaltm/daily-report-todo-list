const timeSetting = (function(){

    let time = new Array(60).fill(0);
   
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
        }
    }
}());