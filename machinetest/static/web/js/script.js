const $button  = document.querySelector('#sidebar-toggle');
const $wrapper = document.querySelector('#wrapper');

$button.addEventListener('click', (e) => {
  e.preventDefault();
  $wrapper.classList.toggle('toggled');
});


function myFunction(x) {
  x.classList.toggle("fa-xmark");
}


// ================date ============ 
var showOriginalFieldForDemo = true;
var isAndroid = true;
var fieldDateOfBirth = document.getElementById('dob' );
var fieldStyle = window.getComputedStyle(fieldDateOfBirth);
let month_names = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

if ( window.Intl && window.Intl.DateTimeFormat ) {
      try {
        var formatter = new window.Intl.DateTimeFormat([], { month: 'long', timeZone: 'UTC' });
        var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
          var mm = month < 10 ? '0' + month : month;
          return new Date('0000-' + mm + '-01T00:00:00+00:00');
        });
        month_names = months.map(date => formatter.format(date));
     } catch(e) {}
}

if ( isAndroid ) {
  const dateWrapper = document.createElement('div');
  dateWrapper.id = 'date-select-wrapper';
  fieldDateOfBirth.parentNode.appendChild(dateWrapper);

  const dateFieldDay = document.createElement('select');
  const dateFieldMonth = document.createElement('select');
  const dateFieldYear = document.createElement('select');

  const dateFields = [dateFieldYear, dateFieldMonth, dateFieldDay];

  
  if ( fieldStyle ) {
    var styleOptions = [ 'boxSizing', 'backgroundColor', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'height', 'font', 'verticalAlign' ];
    styleOptions.forEach( function( s ) {
      if ( fieldStyle[s] ) {
        dateFields.forEach( function( f ) {
          f.style[s] = fieldStyle[s];
        } );
      }
    });
  }

  const emptyDayOption = document.createElement('option');
  emptyDayOption.value = '';
  emptyDayOption.textContent = 'DD';
  dateFieldDay.add(emptyDayOption);
  const emptyMonthOption = document.createElement('option');
  emptyMonthOption.value = '';
  emptyMonthOption.textContent = 'MM';
  dateFieldMonth.add(emptyMonthOption);
  const emptyYearOption = document.createElement('option');
  emptyYearOption.value = '';
  emptyYearOption.textContent = 'YYYY';
  dateFieldYear.add(emptyYearOption);

  const dayOptions = [emptyDayOption];
  for ( var i = 1; i <= 31; i++ ) {
    var newOption = document.createElement('option');
    newOption.value = ( i < 10 ? '0' : '' ) + i;
    newOption.textContent = i;
    dayOptions.push( newOption );
    dateFieldDay.add( newOption );
  }

  const monthOptions = [emptyMonthOption];
  for ( var i = 0; i < month_names.length; i++ ) {
    var newOption = document.createElement('option');
    newOption.value = ( i < 9 ? '0' : '' ) + ( i + 1 );
    newOption.textContent = month_names[i];
    monthOptions.push(newOption);
    dateFieldMonth.add(newOption);
  }

  const yearEnd = new Date().getFullYear();
  const yearStart = yearEnd - 120;
  const yearOptions = [emptyYearOption];
  for (var i = yearEnd; i >= yearStart; i--) {
    var newOption = document.createElement('option');
    newOption.value = i;
    newOption.textContent = i;
    yearOptions.push(newOption);
    dateFieldYear.add(newOption);
  }

  dateWrapper.appendChild(dateFieldDay);
  dateWrapper.appendChild(dateFieldMonth);
  dateWrapper.appendChild(dateFieldYear);

  const dateChangeHandler = function() {
    
    const month = parseInt( dateFieldMonth.value, 10 );
    const year = parseInt( dateFieldYear.value, 10 );
    let maxDays = 31;

    if ( month === 2 ) {
      const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
      maxDays = isLeapYear ? 29 : 28;
    } else if ( [2, 4, 6, 9, 11].indexOf( month ) >= 0 ) {
      maxDays = 30;
    }

    dayOptions.filter(function( o, i ) {
      o.hidden = i > maxDays;
      if ( o.hidden && o.selected ) {
        emptyDayOption.selected = true;
      }
    });

    let allSet = true;
    dateFields.forEach(field => {
      const isEmpty = ! field.value;
      if ( isEmpty ) {
        allSet = false;
      }
      field.classList[isEmpty ? 'add' : 'remove']('show-placeholder');
    });

    if ( allSet ) {
      fieldDateOfBirth.value = dateFields.map(function(field) {
        return field.value;
      }).join('-');
    } else {
      fieldDateOfBirth.value = '';
    }
  };

  if ( fieldDateOfBirth.value ) {
    const ymd = fieldDateOfBirth.value.split('-');
    yearOptions.filter(function(o) {
      if ( o.value === ymd[0]) {
        o.selected = true;
      }
    });
    monthOptions[parseInt(ymd[1], 10)].selected = true;
    dayOptions[parseInt(ymd[2], 10)].selected = true;
  }

  dateFieldDay.addEventListener( 'change', dateChangeHandler );
  dateFieldMonth.addEventListener( 'change', dateChangeHandler );
  dateFieldYear.addEventListener( 'change', dateChangeHandler );
  dateChangeHandler();
  if ( ! showOriginalFieldForDemo ) {
    fieldDateOfBirth.type = 'hidden';
  }
}





var showOriginalFieldForDemo2 = true;
var isAndroid = true;
var fieldExpireDate = document.getElementById('expireDate' );
var fieldStylesecod = window.getComputedStyle(fieldExpireDate);
let month_namess = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];


if ( window.Intl && window.Intl.DateTimeFormat ) {
      try {
        var formatter = new window.Intl.DateTimeFormat([], { month: 'long', timeZone: 'UTC' });
        var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
          var mm = month < 10 ? '0' + month : month;
          return new Date('0000-' + mm + '-01T00:00:00+00:00');
        });
        month_namess = months.map(date => formatter.format(date));
     } catch(e) {}
}

if ( isAndroid ) {
  const dateWrapper = document.createElement('div');
  dateWrapper.id = 'date-select-wrapper';
  fieldExpireDate.parentNode.appendChild(dateWrapper);

  const dateFieldDay = document.createElement('select');
  const dateFieldMonth = document.createElement('select');
  const dateFieldYear = document.createElement('select');

  const dateFields = [dateFieldYear, dateFieldMonth, dateFieldDay];

 
  if ( fieldStylesecod ) {
    var styleOptions = [ 'boxSizing', 'backgroundColor', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'height', 'font', 'verticalAlign' ];
    styleOptions.forEach( function( s ) {
      if ( fieldStylesecod[s] ) {
        dateFields.forEach( function( f ) {
          f.style[s] = fieldStylesecod[s];
        } );
      }
    });
  }

  const emptyDayOption = document.createElement('option');
  emptyDayOption.value = '';
  emptyDayOption.textContent = 'DD';
  dateFieldDay.add(emptyDayOption);
  const emptyMonthOption = document.createElement('option');
  emptyMonthOption.value = '';
  emptyMonthOption.textContent = 'MM';
  dateFieldMonth.add(emptyMonthOption);
  const emptyYearOption = document.createElement('option');
  emptyYearOption.value = '';
  emptyYearOption.textContent = 'YYYY';
  dateFieldYear.add(emptyYearOption);

  const dayOptions = [emptyDayOption];
  for ( var i = 1; i <= 31; i++ ) {
    var newOption = document.createElement('option');
    newOption.value = ( i < 10 ? '0' : '' ) + i;
    newOption.textContent = i;
    dayOptions.push( newOption );
    dateFieldDay.add( newOption );
  }

  const monthOptions = [emptyMonthOption];
  for ( var i = 0; i < month_namess.length; i++ ) {
    var newOption = document.createElement('option');
    newOption.value = ( i < 9 ? '0' : '' ) + ( i + 1 );
    newOption.textContent = month_namess[i];
    monthOptions.push(newOption);
    dateFieldMonth.add(newOption);
  }

  const yearEnd = new Date().getFullYear();
  const yearStart = yearEnd - 120;
  const yearOptions = [emptyYearOption];
  for (var i = yearEnd; i >= yearStart; i--) {
    var newOption = document.createElement('option');
    newOption.value = i;
    newOption.textContent = i;
    yearOptions.push(newOption);
    dateFieldYear.add(newOption);
  }

  dateWrapper.appendChild(dateFieldDay);
  dateWrapper.appendChild(dateFieldMonth);
  dateWrapper.appendChild(dateFieldYear);

  const dateChangeHandler = function() {
    
    const month = parseInt( dateFieldMonth.value, 10 );
    const year = parseInt( dateFieldYear.value, 10 );
    let maxDays = 31;

    if ( month === 2 ) {
      const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
      maxDays = isLeapYear ? 29 : 28;
    } else if ( [2, 4, 6, 9, 11].indexOf( month ) >= 0 ) {
      maxDays = 30;
    }

    dayOptions.filter(function( o, i ) {
      o.hidden = i > maxDays;
      if ( o.hidden && o.selected ) {
        emptyDayOption.selected = true;
      }
    });

    let allSet = true;
    dateFields.forEach(field => {
      const isEmpty = ! field.value;
      if ( isEmpty ) {
        allSet = false;
      }
      field.classList[isEmpty ? 'add' : 'remove']('show-placeholder');
    });

    if ( allSet ) {
      fieldExpireDate.value = dateFields.map(function(field) {
        return field.value;
      }).join('-');
    } else {
      fieldExpireDate.value = '';
    }
  };

  
  if ( fieldExpireDate.value ) {
    const ymd = fieldExpireDate.value.split('-');
    yearOptions.filter(function(o) {
      if ( o.value === ymd[0]) {
        o.selected = true;
      }
    });
    monthOptions[parseInt(ymd[1], 10)].selected = true;
    dayOptions[parseInt(ymd[2], 10)].selected = true;
  }

  dateFieldDay.addEventListener( 'change', dateChangeHandler );
  dateFieldMonth.addEventListener( 'change', dateChangeHandler );
  dateFieldYear.addEventListener( 'change', dateChangeHandler );
  dateChangeHandler();

  if ( ! showOriginalFieldForDemo2 ) {
    fieldExpireDate.type = 'hidden';
  }
}









// var showOriginalFieldForDemo3 = true;
// var isAndroid = true;
// var fieldupdateDob = document.getElementById('updateDob' );
// var fieldStylethird = window.getComputedStyle(fieldupdateDob);
// let month_namesedit = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

// // use localized month names
// if ( window.Intl && window.Intl.DateTimeFormat ) {
//       try {
//         var formatter = new window.Intl.DateTimeFormat([], { month: 'long', timeZone: 'UTC' });
//         var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
//           var mm = month < 10 ? '0' + month : month;
//           return new Date('0000-' + mm + '-01T00:00:00+00:00');
//         });
//         month_namesedit = months.map(date => formatter.format(date));
//      } catch(e) {}
// }

// if ( isAndroid ) {
//   const dateWrapper = document.createElement('div');
//   dateWrapper.id = 'date-select-wrapper';
//   fieldupdateDob.parentNode.appendChild(dateWrapper);

//   const dateFieldDay = document.createElement('select');
//   const dateFieldMonth = document.createElement('select');
//   const dateFieldYear = document.createElement('select');

//   const dateFields = [dateFieldYear, dateFieldMonth, dateFieldDay];

//   // copy over styles from text input
//   if ( fieldStylethird ) {
//     var styleOptions = [ 'boxSizing', 'backgroundColor', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'height', 'font', 'verticalAlign' ];
//     styleOptions.forEach( function( s ) {
//       if ( fieldStylethird[s] ) {
//         dateFields.forEach( function( f ) {
//           f.style[s] = fieldStylethird[s];
//         } );
//       }
//     });
//   }

//   const emptyDayOption = document.createElement('option');
//   emptyDayOption.value = '';
//   emptyDayOption.textContent = 'DD';
//   dateFieldDay.add(emptyDayOption);
//   const emptyMonthOption = document.createElement('option');
//   emptyMonthOption.value = '';
//   emptyMonthOption.textContent = 'MM';
//   dateFieldMonth.add(emptyMonthOption);
//   const emptyYearOption = document.createElement('option');
//   emptyYearOption.value = '';
//   emptyYearOption.textContent = 'YYYY';
//   dateFieldYear.add(emptyYearOption);

//   const dayOptions = [emptyDayOption];
//   for ( var i = 1; i <= 31; i++ ) {
//     var newOption = document.createElement('option');
//     newOption.value = ( i < 10 ? '0' : '' ) + i;
//     newOption.textContent = i;
//     dayOptions.push( newOption );
//     dateFieldDay.add( newOption );
//   }

//   const monthOptions = [emptyMonthOption];
//   for ( var i = 0; i < month_namesedit.length; i++ ) {
//     var newOption = document.createElement('option');
//     newOption.value = ( i < 9 ? '0' : '' ) + ( i + 1 );
//     newOption.textContent = month_namesedit[i];
//     monthOptions.push(newOption);
//     dateFieldMonth.add(newOption);
//   }

//   const yearEnd = new Date().getFullYear();
//   const yearStart = yearEnd - 120;
//   const yearOptions = [emptyYearOption];
//   for (var i = yearEnd; i >= yearStart; i--) {
//     var newOption = document.createElement('option');
//     newOption.value = i;
//     newOption.textContent = i;
//     yearOptions.push(newOption);
//     dateFieldYear.add(newOption);
//   }

//   dateWrapper.appendChild(dateFieldDay);
//   dateWrapper.appendChild(dateFieldMonth);
//   dateWrapper.appendChild(dateFieldYear);

//   const dateChangeHandler = function() {
//     // var day = parseInt( dateFieldDay.value, 10 );
//     const month = parseInt( dateFieldMonth.value, 10 );
//     const year = parseInt( dateFieldYear.value, 10 );
//     let maxDays = 31;

//     if ( month === 2 ) {
//       const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
//       maxDays = isLeapYear ? 29 : 28;
//     } else if ( [2, 4, 6, 9, 11].indexOf( month ) >= 0 ) {
//       maxDays = 30;
//     }

//     dayOptions.filter(function( o, i ) {
//       o.hidden = i > maxDays;
//       if ( o.hidden && o.selected ) {
//         emptyDayOption.selected = true;
//       }
//     });

//     let allSet = true;
//     dateFields.forEach(field => {
//       const isEmpty = ! field.value;
//       if ( isEmpty ) {
//         allSet = false;
//       }
//       field.classList[isEmpty ? 'add' : 'remove']('show-placeholder');
//     });

//     if ( allSet ) {
//       fieldupdateDob.value = dateFields.map(function(field) {
//         return field.value;
//       }).join('-');
//     } else {
//       fieldupdateDob.value = '';
//     }
//   };

//   // if the original input already has a value, set the selected options accordingly
//   if ( fieldupdateDob.value ) {
//     const ymd = fieldupdateDob.value.split('-');
//     yearOptions.filter(function(o) {
//       if ( o.value === ymd[0]) {
//         o.selected = true;
//       }
//     });
//     monthOptions[parseInt(ymd[1], 10)].selected = true;
//     dayOptions[parseInt(ymd[2], 10)].selected = true;
//   }

//   dateFieldDay.addEventListener( 'change', dateChangeHandler );
//   dateFieldMonth.addEventListener( 'change', dateChangeHandler );
//   dateFieldYear.addEventListener( 'change', dateChangeHandler );
//   dateChangeHandler();

//   // do this last, so in case anything throws an error, we still have the input as a fallback
//   if ( ! showOriginalFieldForDemo3 ) {
//     fieldupdateDob.type = 'hidden';
//   }
// }











// var showOriginalFieldForDemo4 = true;
// var isAndroid = true;
// var fieldupdateExpireDate = document.getElementById('updateExpireDate' );
// var fieldStylefour = window.getComputedStyle(fieldupdateExpireDate);
// let month_namesupdate = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

// // use localized month names
// if ( window.Intl && window.Intl.DateTimeFormat ) {
//       try {
//         var formatter = new window.Intl.DateTimeFormat([], { month: 'long', timeZone: 'UTC' });
//         var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
//           var mm = month < 10 ? '0' + month : month;
//           return new Date('0000-' + mm + '-01T00:00:00+00:00');
//         });
//         month_namesupdate = months.map(date => formatter.format(date));
//      } catch(e) {}
// }

// if ( isAndroid ) {
//   const dateWrapper = document.createElement('div');
//   dateWrapper.id = 'date-select-wrapper';
//   fieldupdateExpireDate.parentNode.appendChild(dateWrapper);

//   const dateFieldDay = document.createElement('select');
//   const dateFieldMonth = document.createElement('select');
//   const dateFieldYear = document.createElement('select');

//   const dateFields = [dateFieldYear, dateFieldMonth, dateFieldDay];

//   // copy over styles from text input
//   if ( fieldStylefour ) {
//     var styleOptions = [ 'boxSizing', 'backgroundColor', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'height', 'font', 'verticalAlign' ];
//     styleOptions.forEach( function( s ) {
//       if ( fieldStylefour[s] ) {
//         dateFields.forEach( function( f ) {
//           f.style[s] = fieldStylefour[s];
//         } );
//       }
//     });
//   }

//   const emptyDayOption = document.createElement('option');
//   emptyDayOption.value = '23';
//   emptyDayOption.textContent = 'DD';
//   dateFieldDay.add(emptyDayOption);
//   const emptyMonthOption = document.createElement('option');
//   emptyMonthOption.value = '';
//   emptyMonthOption.textContent = 'MM';
//   dateFieldMonth.add(emptyMonthOption);
//   const emptyYearOption = document.createElement('option');
//   emptyYearOption.value = '';
//   emptyYearOption.textContent = 'YYYY';
//   dateFieldYear.add(emptyYearOption);

//   const dayOptions = [emptyDayOption];
//   for ( var i = 1; i <= 31; i++ ) {
//     var newOption = document.createElement('option');
//     newOption.value = ( i < 10 ? '0' : '' ) + i;
//     newOption.textContent = i;
//     dayOptions.push( newOption );
//     dateFieldDay.add( newOption );
//   }

//   const monthOptions = [emptyMonthOption];
//   for ( var i = 0; i < month_namesupdate.length; i++ ) {
//     var newOption = document.createElement('option');
//     newOption.value = ( i < 9 ? '0' : '' ) + ( i + 1 );
//     newOption.textContent = month_namesupdate[i];
//     monthOptions.push(newOption);
//     dateFieldMonth.add(newOption);
//   }

//   const yearEnd = new Date().getFullYear();
//   const yearStart = yearEnd - 120;
//   const yearOptions = [emptyYearOption];
//   for (var i = yearEnd; i >= yearStart; i--) {
//     var newOption = document.createElement('option');
//     newOption.value = i;
//     newOption.textContent = i;
//     yearOptions.push(newOption);
//     dateFieldYear.add(newOption);
//   }

//   dateWrapper.appendChild(dateFieldDay);
//   dateWrapper.appendChild(dateFieldMonth);
//   dateWrapper.appendChild(dateFieldYear);

//   const dateChangeHandler = function() {
//     // var day = parseInt( dateFieldDay.value, 10 );
//     const month = parseInt( dateFieldMonth.value, 10 );
//     const year = parseInt( dateFieldYear.value, 10 );
//     let maxDays = 31;

//     if ( month === 2 ) {
//       const isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
//       maxDays = isLeapYear ? 29 : 28;
//     } else if ( [2, 4, 6, 9, 11].indexOf( month ) >= 0 ) {
//       maxDays = 30;
//     }

//     dayOptions.filter(function( o, i ) {
//       o.hidden = i > maxDays;
//       if ( o.hidden && o.selected ) {
//         emptyDayOption.selected = true;
//       }
//     });

//     let allSet = true;
//     dateFields.forEach(field => {
//       const isEmpty = ! field.value;
//       if ( isEmpty ) {
//         allSet = false;
//       }
//       field.classList[isEmpty ? 'add' : 'remove']('show-placeholder');
//     });

//     if ( allSet ) {
//       fieldupdateExpireDate.value = dateFields.map(function(field) {
//         return field.value;
//       }).join('-');
//     } else {
//       fieldupdateExpireDate.value = '';
//     }
//   };

//   // if the original input already has a value, set the selected options accordingly
//   if ( fieldupdateExpireDate.value ) {
//     const ymd = fieldupdateExpireDate.value.split('-');
//     yearOptions.filter(function(o) {
//       if ( o.value === ymd[0]) {
//         o.selected = true;
//       }
//     });
//     monthOptions[parseInt(ymd[1], 10)].selected = true;
//     dayOptions[parseInt(ymd[2], 10)].selected = true;
//   }

//   dateFieldDay.addEventListener( 'change', dateChangeHandler );
//   dateFieldMonth.addEventListener( 'change', dateChangeHandler );
//   dateFieldYear.addEventListener( 'change', dateChangeHandler );
//   dateChangeHandler();

//   // do this last, so in case anything throws an error, we still have the input as a fallback
//   if ( ! showOriginalFieldForDemo4 ) {
//     fieldupdateExpireDate.type = 'hidden';
//   }
// }
