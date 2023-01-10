const wrapper=document.querySelector(".wrapper"),
inputpart=document.querySelector(".input"),
infotext=document.querySelector(".infotxt"),
inputfield=document.querySelector("input"),
locationbtn=document.querySelector("button"),
newicon=document.querySelector(".weatherpart img"),
backbutton=document.querySelector("header i");
inputfield.addEventListener("keyup",e=>{
    // if user pressed enter button and input value is not input
    if(e.key=="Enter" && inputfield.value!="")
    {
        requestApi(inputfield.value);
    }
});
let api;
locationbtn.addEventListener("click",()=>{
    if(navigator.geolocation)// if the browser support the geolocation api
    {
     navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else
    {
      alert("Your browser does not support the Geolocation API");      
    }
});
function onSuccess(position)
{
    const {latitude,longitude} = position.coords;// to get the location of the device
    api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=35514f5338018c120a18ce0c801ad715`;
    fetchdata();
}
function fetchdata()
{
    infotext.innerText=`Getting weather details...`;
    infotext.classList.add("pending");
    //getting api response and returning it with parsing into js obj and in another
    //then function calling weatherDetails function with passing api result as an arguments
    fetch(api).then(response =>response.json()).then(result =>weatherDetails(result));   
}
function onError(error)
{
    infotext.innerText=error.message;
    infotext.classList.add("error");
}
function requestApi(city)
{
    api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=35514f5338018c120a18ce0c801ad715`;
    fetchdata();   
}
function weatherDetails(info)
{
    infotext.classList.replace("pending","error"); 
    if(info.cod=="404")
    {
        infotext.innerText=`${inputfield.value} is not valid city name...`;
    }
    else
    { 
        // lets get the value from the info object
        const city=info.name; // To get the name of the city 
        const country=info.sys.country; // To get the name of the country
        const {description,id}=info.weather[0];     
        const {feels_like,humidity,temp}=info.main;
        if(id==800){newicon.src="clear-sky.png";}
        else if(id>=200 && id<=232){newicon.src="thunderstorms.png";}
        else if(id>=600 && id<=622){newicon.src="snowflake.png";}
        else if(id>=701 && id<=781){newicon.src="right-down.png";}
        else if(id>=801 && id<=804){newicon.src="clouds.png";}
        else if(id>=300 && id<=321){newicon.src="drizzle.png";}

        


        // let pass the values to the particular element
        wrapper.querySelector(".temp .numb").innerText=Math.floor(temp);
        wrapper.querySelector(".weather").innerText=description;
        wrapper.querySelector(".location span").innerText=`${city}`,`${country}`; 
        wrapper.querySelector(".temp .numb-2").innerText=Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText=`${humidity}%`;

        infotext.classList.remove("pending","error");
        infotext.innerText="";
        wrapper.classList.add("active");
    }
}
backbutton.addEventListener("click",()=>{
window.location.reload();
});