import React from 'react';
import { Map } from 'immutable';
import { message } from 'antd';

export function arrayEqual(array1, array2) {
  return array1.sort().toString() === array2.sort().toString();
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => (num > 9 ? '' + num : '0' + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}

export function stringToInt(value, defValue = 0) {
  if (!value) {
    return 0;
  } else if (!isNaN(value)) {
    return parseInt(value, 10);
  }
  return defValue;
}
export function stringToPosetiveInt(value, defValue = 0) {
  const val = stringToInt(value, defValue);
  return val > -1 ? val : defValue;
}

export function addressToString(address) {
  let res = null;

  res = address.street ? address.street : null;
  res = address.wardName
    ? res ? `${res}, ${address.wardName}` : address.wardName
    : res;
  res = address.districtName
    ? res ? `${res}, ${address.districtName}` : address.districtName
    : res;
  res = address.provinceName
    ? res ? `${res}, ${address.provinceName}` : address.provinceName
    : res;
  return res;
}

export function infoTotal(page, limit, total) {
  if (total === 0)
    return <p style={{ textAlign: 'right', fontSize: '13px', fontStyle: 'italic' }}>{total} k???t qu???</p>
  if (total <= limit)
    return <p style={{ textAlign: 'right', fontSize: '13px', fontStyle: 'italic' }}>{total} k???t qu???</p>
  if (page && limit) {
    let startIndex = total === 0 ? 0 : (page - 1) * limit + 1;
    let endIndex = total === 0 ? 0 : page * limit;
    if (endIndex > total)
      endIndex = total;
    return <p style={{ textAlign: 'right', fontSize: '13px', fontStyle: 'italic' }}>{startIndex}-{endIndex} trong {total} k???t qu???</p>
  }
  return <p style={{ textAlign: 'right', fontSize: '13px', fontStyle: 'italic' }}>{total} k???t qu???</p>
}

export function objectToString(obj, character) {
  let res = null;
  character = character || ', ';
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      res = obj[key]
        ? res ? `${res}${character}${obj[key]}` : obj[key]
        : res;
    }
  }
  return res;
}

//#region IMAGES
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function base64toImage(imageUrl, sliceSize) {
  var block = imageUrl.split(";");
  // Get the content type of the image
  var contentType = block[0].split(":")[1];// In this case "image/gif"
  // get the real base64 content of the file
  var b64Data = block[1].split(",")[1];

  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new File(byteArrays, `file_${Date.now()}.png`, { type: contentType });
  return blob;
}

export function beforeUpload(file, messages) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error(messages['common.message.error.wrongImageType']);
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error(messages['common.message.error.imageBiggerThan2MB']);
  }
  return isJpgOrPng && isLt2M;
}

export function getBase64List(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
//#endregion

//#region FORM VALIDATE - Antd
export function validateEmail(rule, value, callback) {
  if (value && !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))) {
    callback("Kh??ng ????ng ?????nh d???ng email!");
  }
  callback();
}
export function validatePassword(rule, value, callback) {
  // if (value && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value))) {
  // if (value && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+|~=`{}\\[\]:";'<>?,.\/])[A-Za-z\d-!@#$%^&*()_+|~=`{}\\[\]:";'<>?,.\/]{8,}$/.test(value))) {
  //   callback("M???t kh???u ??t nh???t 8 k?? t???, bao g???m ??t nh???t c?? 1 ch??? s???, ch??? hoa, ch??? th?????ng v?? k?? t??? ?????c bi???t!");
  // }
  if (value && !(/^.{5,}$/.test(value))) {
    callback("M???t kh???u ph???i c?? ??t nh???t 5 k?? t???");
  }
  callback();
};

export function validateName(rule, value, callback) {
  if (value && (/[\d-!@#$%^&*()_+|~=`{}\\[\]:";'<>?,.\/]/.test(value))) {
    callback("H??? t??n kh??ng bao g???m ch??? s??? v?? k?? t???!");
  }
  callback();
};
export function validateCustomerName(rule, value, callback) {
  if (value && (/[!#$%^*_+|~=`{}\\[\]:";'<>?\/]/.test(value))) {
    callback("C??c k?? t??? h???p l??? &@()");
  }
  callback();
};
export function validateNameWithNumber(rule, value, callback) {
  if (value && (/[!@#$%^&*()_+|~=`{}\\[\]:";'<>?\/]/.test(value))) {
    callback("H??? t??n kh??ng bao g???m k?? t??? ?????c bi???t!");
  }
  callback();
};
export function validatePhoneNumber(rule, value, callback) {
  if (value && !(/^[0-9]{8,10}$/.test(value))) {
    callback("S??? ??i???n tho???i 8 ?????n 10 k?? t??? s???!");
  }
  callback();
}

export function validateNoSpecialCharacter(rule, value, callback) {
  if (value && (/[\-!@#$%^&*()_+|~=`{}\\[\]:";'<>?,.\/]/.test(value))) {
    callback("Kh??ng ???????c ch???a k?? t??? ?????c bi???t!");
  }
  callback();
};

export function validateNumberInt(rule, value, callback) {
  if (value && !(/^[1-9][0-9]*$/.test(value))) {
    callback("Vui l??ng nh???p s??? nguy??n l???n h??n 0.");
  }
  callback();
};
export function validateNumberIntWithZero(rule, value, callback) {
  if (value && !(/(?<=\s|^)\d+(?=\s|$)/.test(value))) {
    callback("Vui l??ng nh???p s??? nguy??n.");
  }
  callback();
};
export function validateNumberGreateThanZero(rule, value, callback) {
  if (value && !(/^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(value))) {
    callback("S??? l???n h??n 0.");
  }
  callback();
};
export const validateNumberTenDigits = value => {
  var re = /^(09|03|05|07|08)[0-9]{8}$/;
  return re.test(String(value).toLowerCase());
}
//#endregion

export function firstAndLastDayOfMonth() {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { firstDay, lastDay }
}

export function getLastMonth() {
  var date = new Date();
  var dayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  return { day: dayLastMonth }
}

export const checkEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const checkPhoneNumber = value => {
  var re = /^[0-9]{8,10}$/;
  return re.test(String(value).toLowerCase());
}
