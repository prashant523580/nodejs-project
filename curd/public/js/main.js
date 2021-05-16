
const update_btn = document.getElementById("update-button");
const update_form = document.getElementById("update-form");

let update_btns = document.querySelectorAll(".update-button");
let delete_btns = document.querySelectorAll(".delete-button");
let name = document.getElementById("name");
let address = document.getElementById("address");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let dob = document.getElementById("dob");


for(var i of update_btns){
        i.addEventListener("click",ele => {
            update_form.style.display  = "block";
            console.log(ele.target.parentElement.parentElement)
            let update_name = ele.target.parentElement.parentElement.children[0].innerText;
            let update_address = ele.target.parentElement.parentElement.children[1].innerText;
            let update_email = ele.target.parentElement.parentElement.children[2].innerText;
            let update_number = ele.target.parentElement.parentElement.children[3].innerText;
            let update_dob = ele.target.parentElement.parentElement.children[4].innerText;
            name.value = update_name;
            address.value = update_address;
            email.value = update_email;
            phone.value = update_number;
            dob.value = update_dob;
            update_btn.addEventListener("click", (e) => {
                e.preventDefault();
               fetch("/update",{
                    method : 'put',
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        _id : ele.target.dataset.id,
                        name : name.value,
                        address : address.value,
                        email : email.value,
                        phone : phone.value,
                        dob: dob.value
                    })
                })
                .then(res =>{
                    if(res.ok) return res.json();
                }).then(data => {
                    window.location.reload(true);
                });
            });
        })
}

for(var i of delete_btns){
    i.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target.dataset.id);
        fetch('/delete',{
            method: "delete",
            headers: {"Content-Type" : 'application/json'},
            body: JSON.stringify({
                _id : e.target.dataset.id
            })
        })
        .then(res =>{
            if(res.ok) return res.json();
        })
        .then(data => {
            window.location.reload(true);
        })

    })
}