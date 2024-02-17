function generateStudyTimetable() {
    
    const userName = document.getElementById("userName").value.trim();
    if (!userName) {
        alert("Please enter your name.");
        return;
    }

    const studyHours = parseInt(document.getElementById("studyHours").value);
    const studyMethod = document.getElementById("studyMethod").value;

   
    if (isNaN(studyHours) || studyHours <= 0 || studyMethod === "") {
        alert("Please enter a valid number of hours to study and choose a study method.");
        return;
    }

    
    const timetableContainer = document.getElementById("timetable");
    timetableContainer.innerHTML = ""; 

    
    let breakTime;
    if (studyMethod.toLowerCase() === "pomodoro") {
       
        breakTime = 5;
    } else {
       
        breakTime = 10;
    }

    
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + (studyHours * 60 + ((studyHours / 60) * breakTime)) * 60000);

   
    const timetableHeader = document.createElement("h2");
    timetableHeader.textContent = "Study Timetable:";
    timetableContainer.appendChild(timetableHeader);

    
    const motivationText = document.createElement("p");
    motivationText.textContent = `Hi ${userName}, remember to stay focused and take regular breaks to maintain productivity,NOTHING WORTHWHILE COMES EASILY!!`;
    timetableContainer.appendChild(motivationText);

   
    const startTimeText = document.createElement("p");
    startTimeText.innerHTML = "<span class='highlight'>Start Time:</span> " + startTime.toLocaleTimeString();
    timetableContainer.appendChild(startTimeText);

    
    let currentTime = new Date(startTime.getTime());
    let studyCount = 1;
    while (currentTime < endTime) {
        
        const studyEndTime = new Date(currentTime.getTime() + 25 * 60000);
        const studySessionText = document.createElement("p");
        studySessionText.textContent = `Study ${studyCount}: ${currentTime.toLocaleTimeString()} - ${studyEndTime.toLocaleTimeString()}`;
        timetableContainer.appendChild(studySessionText);
        currentTime = new Date(studyEndTime.getTime());
        studyCount++;

        
        if (currentTime < endTime) {
            const breakEndTime = new Date(currentTime.getTime() + breakTime * 60000);
            const breakText = document.createElement("p");
            breakText.innerHTML = "<span class='highlight break-time'>Take a break:</span> " + currentTime.toLocaleTimeString() + " - " + breakEndTime.toLocaleTimeString();
            timetableContainer.appendChild(breakText);
            currentTime = new Date(breakEndTime.getTime());
        }
    }

    
    const endTimeText = document.createElement("p");
    endTimeText.innerHTML = "<span class='highlight'>End Time:</span> " + endTime.toLocaleTimeString();
    timetableContainer.appendChild(endTimeText);

    
    const downloadButton = document.getElementById("downloadPDFButton");
    downloadButton.style.display = "block";

    
    let timetableContent = "Study Timetable:\n";
    timetableContent += `Hi ${userName},\n\n`;
    timetableContent += "Start Time: " + startTime.toLocaleTimeString() + "\n";
    currentTime = new Date(startTime.getTime());
    studyCount = 1;
    while (currentTime < endTime) {
        
        const studyEndTime = new Date(currentTime.getTime() + 25 * 60000);
        timetableContent += `Study ${studyCount}: ${currentTime.toLocaleTimeString()} - ${studyEndTime.toLocaleTimeString()}\n`;
        currentTime = new Date(studyEndTime.getTime());
        studyCount++;

        
        if (currentTime < endTime) {
            const breakEndTime = new Date(currentTime.getTime() + breakTime * 60000);
            timetableContent += `Take a break: ${currentTime.toLocaleTimeString()} - ${breakEndTime.toLocaleTimeString()}\n`;
            currentTime = new Date(breakEndTime.getTime());
        }
    }
    timetableContent += "End Time: " + endTime.toLocaleTimeString();

    
    downloadButton.addEventListener("click", function() {
        
        const blob = new Blob([timetableContent], { type: "text/plain;charset=utf-8" });

        
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);

        
        link.download = "study_timetable.txt";

        
        link.click();

        
        window.URL.revokeObjectURL(link.href);
    });
}

