

// select time 1~60 
const selectTime =(function(){

    let Hour = document.querySelector('#Hour');
    let Minute =document.querySelector('#Minute');
    let Second = document.querySelector('#Second');;

    let time = new Array(60).fill(0);

    time.forEach((i, index,arr) =>{
        arr[index] = `<option value="${index+1}">${index+1}</option>`;
        console.log(arr[index]);
    });

    Hour.innerHTML +=time;
    Minute.innerHTML +=time;
    Second.innerHTML +=time;

    return{
        get timeValue(){
            return `${Hour.options[Hour.selectedIndex].value}:${Minute.options[Minute.selectedIndex].value}:${Second.options[Second.selectedIndex].value}`;
        },

        set timeValue(val){
           
        }
    };

})();
