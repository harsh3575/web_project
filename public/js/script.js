const btn = document.getElementById("submitBtn");
const city = document.getElementById("cityname");
const cityName = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const today = document.getElementById("today_data");
const dataHide = document.querySelector(".middle_layer");
const temp = document.getElementById("temp");
const day = document.getElementById("day");
        const getCurrentDay = () => {
            var weekday = new Array(7);
            weekday[0] = "Sunday"
            weekday[1] = "Monday"
            weekday[2] = "Tuesday"
            weekday[3] = "Wendsday"
            weekday[4] = "Thursday"
            weekday[5] = "Friday"
            weekday[6] = "Saturday"

            let currentTime = new Date();
            return (weekday[currentTime.getDay()]);
        };
const getcurrentTime = () => {
            var currentTime = new Date();
            const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

            var month_no = currentTime.getMonth();
            var date = currentTime.getDate();

            return `${date} ${month [month_no]}`;

}
day.innerHTML = `${getCurrentDay()}`;
today.innerHTML = `${getcurrentTime()}`;
        
        const getInfo = async (event) => {
            event.preventDefault();
            let cityval = city.value;
            if(cityval === ""){
                cityName.innerHTML = "Please Write The Name Before Search...";
                dataHide.classList.add(`data_hide`);
            }
            else{
                try{
                    console.log(cityval)
                    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=df10279306303a0482e20ab6a39b8ec1`;
                    const respone= await fetch(url);
                    const data = await respone.json();
                    const realdata = await [data];
                    let value = Number.parseInt(realdata[0].main.temp/10);
                    console.log(value)
                    temp.innerHTML = value;
                    cityName.innerHTML = `${realdata[0].name} , ${realdata[0].sys.country}`;
                    // temp.innerHTML = value;
                    
                    let tempMod = realdata[0].weather[0].main;
                    
                    console.log(tempMod)
                  
                    if(tempMod == "Clear") {
                        temp_status.innerHTML = `<i class="fa fa-sun"  style="color : #eccc68;"></i>`;
                    }
                    else if(tempMod == "Clouds"){
                        temp_status.innerHTML = `<i class="fa fa-cloud"  style="color : #f1f2f6;"></i>`;
                    }
                    else if(tempMod == "Rain"){
                        temp_status.innerHTML = `<i class="fa fa-rain"  style="color : #a4b0be;"></i>`;
                    }
                    else{
                        temp_status.innerHTML = `<i class="fa fa-sun"  style="color : #eccc68;"></i>`;
                    }
                    
                    dataHide.classList.remove(`data_hide`);
                }
                catch(err){
                    cityName.innerHTML = "Please Write The Name Properly..."
                    dataHide.classList.add(`data_hide`);

        }

    }
}

btn.addEventListener("click",getInfo);
