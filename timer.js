const timerElement = document.getElementById("timer");
const ctfTime = 1717804800000; // Sat 7 June 2024 8 PM EST
const ctfEndTime = 1718064000000;
let interval;
let showSeconds = window.innerWidth > 801;

function updateTime() {
    timerElement.innerHTML = formatTime((ctfTime - Date.now()) / 1000);
}

function formatTime(timeStr) {
    timeStr = Number(timeStr);
    let label = "<p class='time-info'>Competition Starts In: </p>";
    let d = Math.floor(timeStr / (60 * 60 * 24));
    let h = Math.floor(timeStr % (3600 * 24) / 3600);
    let m = Math.floor(timeStr % 3600 / 60);
    let s = Math.floor(timeStr % 60);

    let dDisplay = String(Math.abs(d)).padStart(2, '0') + "<label> Days</label><span class='blue'>,</span> ";
    let hDisplay = String(Math.abs(h)).padStart(2, '0') + "<label> Hours</label><span class='blue'>,</span> ";
    let mDisplay = String(Math.abs(m)).padStart(2, '0') + "<label> Minutes</label>";
    let sDisplay = "<span class='blue'>, and </span>" + String(Math.abs(s)).padStart(2, '0') + "<label> Seconds</label></span>";

    return label + dDisplay + hDisplay + mDisplay + (showSeconds ? sDisplay : "");
}

if (Date.now() >= ctfEndTime) {
    timerElement.innerHTML = "<p class='time-info'>The event is over! See you next year!</p>";
}
else
    if (Date.now() >= ctfTime) {
        timerElement.innerHTML = "<p class='time-info'>The event has started! Good luck!</p>";
    }
    else {
        updateTime();
        interval = setInterval(updateTime, 1000);
    }

window.addEventListener('resize', function () {
    showSeconds = window.innerWidth > 801;
});
