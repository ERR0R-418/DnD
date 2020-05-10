// script for babel input
document.onload = function() {
    document.getElementById("buttonOk").addEventListener('click',sendData,false);
}

// calculate and collect all points from answers in form
const collectPoint = () => {
    /// mutable structure where key is type, value - sum points
    let result = new Map();
    /// initial for result. Get all forms in array,
    /// then get all types from forms in Set cuz this initial key for memoryCache with 0 value
    /// then collect all radio.checked = true as sum

    //  all <form> as array collection
    let forms = Array.from(document.getElementById("rootQuestion").getElementsByTagName("form"));
    //  get all exists types from forms
    let specialReducer = (set,form) => {
        set.add(form.getAttribute("type"))
        return set;
    }
    let types = forms.reduce(specialReducer,new Set());
    //  init memoryCache with 0 value
    types.forEach(type=>result.set(type,0));
    //  collect all radio.checked=true from forms
    forms.forEach(form=>{
        let type = form.getAttribute("type");
        let currentTypeValue = result.get(type);
        let additionalTypeValue = Array.from(form).find(radio=>radio.checked===true)?.hasOwnProperty("point") || 0;
        let sum = parseInt(currentTypeValue)+parseInt(additionalTypeValue);
        //  set checked radio
        result.set(type,sum);
    });

    return result;
}
// send result to server
let sendData = () => {
    let result = JSON.stringify([...collectPoint()]);
    fetch('/send',{method: "post",headers:{'Content-Type':"application/json"},body: result})
        .then(e=>e.text())
        .then(e=> {
            document.getElementsByTagName("body")[0].remove()
            document.documentElement.innerHTML = e;
        });

}
