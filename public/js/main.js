const dotenv = require('dotenv')
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const currdate = document.getElementById("today_date");
const currtime = document.getElementById("today_time");
const currday = document.getElementById("day");

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
dotenv.config({ path: "/config.env" })
const Key = process.env.KEY;

const getcurrentday = () => {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "THURSDAY";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    let currenttime = new Date();
    return weekday[currenttime.getDay()];
}
currday.innerText = getcurrentday();

const getcurrenttime = () => {
    let currenttime = new Date();
    let hours = currenttime.getHours();
    let min = currenttime.getMinutes();

    let period = "AM";
    if (hours >= 12) {
        period = "PM";
        hours -= 12;
    }
    if (min < 10) {
        min = "0" + min;
    }

    return `${hours}:${min}${period}`;
}
currtime.innerText = getcurrenttime();

const getcurrentdate = () => {
    let mname = new Array(12);
    mname[0] = "Jan";
    mname[1] = "Feb";
    mname[2] = "Mar";
    mname[3] = "Apr";
    mname[4] = "May";
    mname[5] = "June";
    mname[6] = "July";
    mname[7] = "Aug";
    mname[8] = "Sep";
    mname[9] = "Oct";
    mname[10] = "Nov";
    mname[11] = "Dec";
    let currenttime = new Date();
    let month = mname[currenttime.getMonth()];
    let date = currenttime.getDate();
    let year = currenttime.getFullYear();
    return `${date} ${month} ${year}`
}
currdate.innerText = getcurrentdate();


const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    } else {

        try {


            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&APPID=${Key}`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";


        } catch {
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText = `please enter the proper city name`;
            console.log('please add the proper city name');
        }

    }
}

submitBtn.addEventListener('click', getInfo);