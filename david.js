#!/usr/bin/env node

let activities = [
  {name: "Work", start: "2020-02-07 00:00", end: "2020-02-07 03:00"},
  {name: "sleep", start: "2020-02-07 04:00", end: "2020-02-07 12:00"},
  {name: "Run", start: "2020-02-08 00:00", end: "2020-02-08 02:00"},
  {name: "Walk the dog", start: "2020-02-08 04:00", end: "2020-02-08 05:00"},
  {name: "Techtonica meeting", start: "2020-02-09 04:00", end: "2020-02-09 05:00"},
]

let dayNames = "Sunday Monday Tue Wed Thu Fri Sat".split(" ");
let days = []
let times = ["midnight", "01:00 AM", "02:00 am", "03:00 am", "04:00 am"];

activity_matrix = [];

activities.forEach(activity => {
  let name = activity.name;
  let start = new Date(activity.start);
  let time_index = start.getHours();
  let start_window = times[time_index];
  let start_day = `${dayNames[start.getDay()]} ${start.getMonth()+1}/${start.getDate()}`
  let day_index = days.findIndex(day => day === start_day);
  if(day_index < 0) {
    days.push(start_day);
    day_index = days.length - 1;
  }
  let end = new Date(activity.end);

  activity.time_name = start_window;
  activity.time_index = time_index;
  activity.day_index = day_index;
  activity.duration = end.getHours() - start.getHours();

  activity_matrix[day_index] = activity_matrix[day_index] || [];
  activity_matrix[day_index][time_index] = activity;
  for(let hour = start.getHours() + 1; hour < end.getHours(); ++hour)
  {
    // activity_matrix[day_index][hour] = {name: `${activity.name} [continued]`};
    activity_matrix[day_index][hour] = {name: ''};
  }

  // console.log([name, start_window, start_day]);
// [ 'Work', '12:00 AM', 'Fri 2/7' ]
// [ 'sleep', '4am', 'Fri 2/7' ]
// [ 'Run', '12:00 AM', 'Sat 2/8' ]
// [ 'Walk the dog', '4am', 'Sat 2/8' ]
// [ 'Techtonica meeting', '4am', 'Sunday 2/9' ]
})

// console.log(activities);

// console.log(days);
// [ 'Fri 2/7', 'Sat 2/8', 'Sunday 2/9' ]


days.forEach(day => {
  times.forEach(time => {
    // console.log(day, time);
  })
})

console.log(days);
for(let j = 0; j < times.length; ++j) {
  console.log(times[j], days.map((day, i) => {
    let item = activity_matrix[i][j] || {name: '[no items]'}
    if (item.duration) {
      return `${item.name} span=${item.duration}`;
    } else {
      return item.name;
    }
  }));
}
// }

// console.log(activity_matrix);
