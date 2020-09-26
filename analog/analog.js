const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');
const alarmBox = document.querySelector('.alarm__box');
let alarms = [];
const alarmTimes = [
  {
    name: '12.00 am',
    value: '0'
  },
  {
    name: '3.00 am',
    value: '3'
  },
  {
    name: '6.00 am',
    value: '6'
  },
  {
    name: '9.00 am',
    value: '9'
  },
  {
    name: '12.00 pm',
    value: '12'
  },
  {
    name: '3.00 pm',
    value: '15'
  },
  {
    name: '6.00 pm',
    value: '18'
  },
  {
    name: '9.00 pm',
    value: '21'
  }
];
const alarmAudio = new Audio('../audio/alarm.mp3');

const createTimeElement = data => {
  const button = document.createElement('button');
  const textNode = document.createTextNode(data.name);
  const div = document.createElement('div');

  button.setAttribute('value', data.value);
  div.classList.add('alarm__item');

  button.appendChild(textNode);
  div.appendChild(button);
  alarmBox.appendChild(div);

  button.onclick = e => {
    button.classList.toggle('active');

    // Set audio play event when alarm time is reached
    // alarmAudio.pause();
    // alarmAudio.currentTime = 0;
    // setTimeout(() => {
    //   alarmAudio.play();
    // }, 500);
    if (button.className.includes('active')) {
      setAlarm(e.target.value);
    } else removeAlarm(e.target.value);
  };
};

const convertHour = hour => {
  // 90 degrees due to CSS absolute positioning
  return (360 / 12) * (hour % 12) + 90;
};

const convertMinute = minute => {
  // 90 degrees due to CSS absolute positioning
  return (360 / 60) * (minute % 60) + 90;
};

const convertSecond = second => {
  // 90 degrees due to CSS absolute positioning
  return (360 / 60) * (second % 60) + 90;
};

const getDate = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  hourHand.style.transform = `rotate(${convertHour(hour)}deg)`;
  minuteHand.style.transform = `rotate(${convertMinute(minute)}deg)`;
  secondHand.style.transform = `rotate(${convertSecond(second)}deg)`;
};

const getExistingAlarms = () => {
  const existingAlarms = localStorage.getItem('alarms');
  if (existingAlarms) {
    alarms = JSON.parse(existingAlarms);
    alarms.forEach(time => {
      const activeAlarm = document.querySelector(`button[value="${time}"]`);
      activeAlarm.classList.add('active');
    });
  }
};

const setAlarm = time => {
  alarms.push(time);
  localStorage.setItem('alarms', JSON.stringify(alarms));
};

const removeAlarm = time => {
  const newArr = alarms.filter(el => el !== time);
  alarms = [...newArr];
  if (alarms.length > 0) localStorage.setItem('alarms', JSON.stringify(alarms));
  else localStorage.removeItem('alarms');
};

const createAlarmTimes = () => {
  alarmTimes.forEach(time => {
    createTimeElement(time);
  });
};

window.onload = e => {
  getDate();
  createAlarmTimes();
  setInterval(() => {
    getDate();
  }, 1000);

  getExistingAlarms();
};
