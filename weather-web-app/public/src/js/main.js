let display_date = document.getElementById("date");
let display_day = document.getElementById("day");
let submit_btn = document.getElementById("submit-btn");
let city_val = document.getElementById("city");
let city_name = document.getElementById("city-name");
let display_temp = document.getElementById("temp");
let display_temp_status = document.getElementById("temp-status");

let months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
let days = ["sunday","monday","tuesday","thursday","friday","saturday"];
console.log(display_date)

const getData = (e) =>{
    e.preventDefault();
    if(city_val.value.length == ""){
        city_name.innerHTML = "please input city name"
    }else{
        try{

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_val.value}&appid=52335c0f679987283ac9a81c07c7a535`;
            fetch(url).then((res)=>{
                return res.json();
            }).then((data) => {
                let arr = [data];
                console.log(arr)
               city_name.innerHTML = `${arr[0].name} , ${arr[0].sys.country}`;
               display_temp.innerHTML = Math.floor(arr[0].main.temp - 273);

               let temp_status = arr[0].weather[0].main;
               if(temp_status == "Clouds"){
                 display_temp_status.innerHTML = '<i class="fas fa-cloud"></i>';
               }
               else if(temp_status == "Rain"){
                   console.log("rainy")
               }
               else if(temp_status == "Clear"){
                display_temp_status.innerHTML  = `<i class="fas fa-sun"></i>`;
               }
               
            })
        }catch{
            
            city_name.innerHTML = "please enter city name"
        }

    }
}
submit_btn.addEventListener("click" , getData);