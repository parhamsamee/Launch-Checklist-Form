// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


window.addEventListener("load", function() {
   let form = document.querySelector("form");

   let formData = {
      userPilotName: "",
      userCoPilotName: "",
      userFuelLevel: 0,
      userCargoMass: 0,
   };


   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let userPilotName = document.querySelector("input[name=pilotName");
      let userCoPilotName = document.querySelector("input[name=copilotName");
      let userFuelLevel = document.querySelector("input[name=fuelLevel");
      let userCargoMass = document.querySelector("input[name=cargoMass");
      if (userPilotName.value === "" 
      || userCoPilotName.value === "" 
      || userFuelLevel.value === ""
      || userCargoMass.value === "") {
            alert("All fields are required!");
            return;
      } 
      // if pilot and copilot is not a number (NaN), then error
      if (!isNaN(userPilotName.value) && !isNaN(userCoPilotName.value)) {
         alert("Make sure to enter valid information for each field!");
         return;
      }
      // if fuelLevel and cargoMass is a number, then error
      if (isNaN(userFuelLevel.value) && isNaN(userCargoMass.value)) {
         alert("Make sure to enter valid information for each field!");
         return;
      }
      formData.userPilotName = userPilotName.value;
      formData.userCoPilotName = userCoPilotName.value;
      formData.userFuelLevel = userFuelLevel.value;
      formData.userCargoMass = userCargoMass.value;

      userPilotName.value = "";
      userCoPilotName.value = "";
      userFuelLevel.value = "";
      userCargoMass.value= "";
   // Using template literals, update the li elements pilotStatus and copilotStatus to 
   // include the pilot's name and the co-pilot's name.
      document.getElementById("pilotStatus").innerHTML = `Pilot ${formData.userPilotName} is ready for launch.`;    
      document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${formData.userCoPilotName} is ready for launch.`;  
       
   
   // If the user submits a fuel level that is too low (less than 10,000 liters), 
   // change faultyItems to visible with an updated fuel status stating that there 
   // is not enough fuel for the journey. The text of the h2 element, launchStatus, 
   // should also change to "Shuttle not ready for launch" and the color should change to red.
      let fuelStatusElement = document.getElementById("fuelStatus");
      let launchStatusElement = document.getElementById("launchStatus");
      let faultyItemsElement = document.getElementById("faultyItems");
      faultyItemsElement.style.visibility = "visible";

      if (formData.userFuelLevel < 10000) {
         fuelStatusElement.innerHTML = `Fuel Level too low for launch.`;
         launchStatusElement.innerHTML = `Shuttle not ready for launch.`;
         launchStatusElement.style.color = "red";
      }

   // If the user submits a cargo mass that is too large (more than 10,000 kilograms), 
   // change the list to visible with an updated cargo status stating that there is too 
   // much mass for the shuttle to take off. The text of launchStatus should also change to 
   // "Shuttle not ready for launch" and the color should change to red.
      let cargoStatusElement = document.getElementById("cargoStatus");
      if (formData.userCargoMass > 10000) {
         cargoStatusElement.innerHTML = `Cargo mass too high for launch.`;
         launchStatusElement.innerHTML = `Shuttle not ready for launch.`;
         launchStatusElement.style.color = "red";
      }

   // If the shuttle is ready to launch, change the text of launchStatus to 
   // green and display "Shuttle is ready for launch".
      if (formData.userFuelLevel >= 10000 && formData.userCargoMass <= 10000) {
         launchStatusElement.innerHTML = `Shuttle is ready for launch.`;
         launchStatusElement.style.color = 'green';
      } 

      let missionTarget = document.getElementById('missionTarget');
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(data => {
            let planet = data[0];
            missionTarget.innerHTML = `<h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${planet.name}</li>
                  <li>Diameter: ${planet.diameter}</li>
                  <li>Star: ${planet.star}</li>
                  <li>Distance from Earth: ${planet.distance}</li>
                  <li>Number of Moons: ${planet.moons}</li>
               </ol>
               <img src="${planet.image}"></img>`;
         });
      });
   });
});