var clock = new Vue({
    el: '#clock',
    data: {
        time: '',
        date: ''
    }
});

var week = ['DOM⋆SUN', 'SEG⋆MON', 'TER⋆TUE', 'QUA⋆WEN', 'QUI⋆THU', 'EX⋆FRI', 'SAB⋆SAT'];
var timerID = setInterval(updateTime, 1000);
updateTime();

function updateTime() {
    var cd = new Date();
    console.log("Current Date Object:", cd); // Log do objeto Date

    var hours = zeroPadding(cd.getHours(), 2);
    var minutes = zeroPadding(cd.getMinutes(), 2);
    var seconds = zeroPadding(cd.getSeconds(), 2);
    console.log("Hours:", hours, "Minutes:", minutes, "Seconds:", seconds); // Log das horas, minutos e segundos

    clock.time = hours + ':' + minutes + ':' + seconds;
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
    console.log("Formatted Time:", clock.time); // Log do tempo formatado
}

function zeroPadding(num, digit) {
    var zero = '';
    for (var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}
