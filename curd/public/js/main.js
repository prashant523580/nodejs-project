
const update_btn = document.getElementById("update-button");
let update_btns = document.querySelectorAll(".update-button");
let delete_btns = document.querySelectorAll(".delete-button");
let name = document.getElementById("name");
let address = document.getElementById("address");


for(var i of update_btns){
        i.addEventListener("click",ele => {
            console.log(ele.target.parentElement.parentElement)
            let update_name = ele.target.parentElement.parentElement.children[0].innerText;
            let update_address = ele.target.parentElement.parentElement.children[1].innerText;
            name.value = update_name;
            address.value = update_address;
            update_btn.addEventListener("click", (e) => {
                e.preventDefault();
               fetch("/update",{
                    method : 'put',
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        _id : ele.target.dataset.id,
                        name : name.value,
                        address : address.value
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