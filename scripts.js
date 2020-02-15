let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let dateSchedule = [];

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function jumpToSelectMonth(selectMonth,selectYear){
    showCalendar(selectMonth, selectYear);
}

function openModal(date,month,year){
    let foundFlag = false
    let text = ''
    if(month.length < 2){
        month = "0"+month
    }
    if(date.length < 2){
        date = "0"+date
    }
    let allDate = year+"-"+month+"-"+date
    for(let i = 0 ; i < dateSchedule.length ; i++){
        console.log(dateSchedule[i],allDate)
        if(dateSchedule[i].date_ == allDate){
            console.log(foundFlag)
            if(foundFlag == false){
                foundFlag = true;
                text += 'You got appointment on this day Schedule : \n'
                text += 'date : '+dateSchedule[i].date_+' , time :'+dateSchedule[i].time_+'\n';
                text += 'note : '+dateSchedule[i].note_+'\n'
            }else{
                text += 'date : '+dateSchedule[i].date_+' , time :'+dateSchedule[i].time_+'\n';
                text += 'note : '+dateSchedule[i].note_+'\n'
            }
            
        }
    }
    console.log(foundFlag)
    if(foundFlag){
        alert(text)
    }
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                cell.setAttribute('id',"day"+date+'month'+(month+1)+'year'+year)
                // cell.setAttribute('onclick','callfunction(`'+date+'`,`'+month+'`,`'+year+'`)')
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                cell.setAttribute('id',"day"+date+'month'+(month+1)+'year'+year)
                let cellText = document.createTextNode(date);
                
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                if(checkAppointMent(date,month+1,year) == 'equal'){
                    cell.classList.add("bg-danger");
                    cell.setAttribute('onclick','openModal(`'+date+'`,`'+(month+1)+'`,`'+year+'`)')
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

function checkAppointMent(date,month,year){
    
    for(let i = 0 ; i < dateSchedule.length ; i++){
        
        let yearx = dateSchedule[i].date_.split('-')[0]
        let monthx = dateSchedule[i].date_.split('-')[1]
        let day = dateSchedule[i].date_.split('-')[2]
        console.log(date,month,year,day,monthx,yearx)
        if(date == day && month == monthx && year == yearx ){
            return 'equal'
        }
    }
    return 'not equal'
}

function addSchedule(date,time,note){
    if(date.length > 0 && time.length > 0){
        let temp = {
            date_ : date,
            time_ : time,
            note_ : note
        }
        dateSchedule.push(temp)
        console.log(dateSchedule)
    }
    console.log(dateSchedule)
    showCalendar(currentMonth,currentYear)

}

function removeSearching(){
    let list = document.getElementById('Schedule')
    for(let i = 0 ; i < list.childNodes.length ;i++){
        list.innerHTML = '';
    }
}

function searching(text){
    let tableSearch = document.getElementById('Schedule')
    removeSearching()
    for(let i = 0 ; i < dateSchedule.length ; i++){
        console.log(dateSchedule[i].note_,text,dateSchedule[i].note_.indexOf('text'))
        if(dateSchedule[i].note_.indexOf(text) >= 0){
            console.log(i)
            let row = document.createElement('tr')
            let cell = document.createElement('td')
            // cell.setAttribute('onclick','callfunction('+dateSchedule+')')
            let cellText = document.createTextNode('You have appointment on '+dateSchedule[i].date_ +', '+dateSchedule[i].time_+', note: '+dateSchedule[i].note_)
            cell.appendChild(cellText)
            row.appendChild(cell)      
            tableSearch.appendChild(row)     
        }
    }
    
}