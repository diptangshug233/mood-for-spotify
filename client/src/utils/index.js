//convert track time
export const FormatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// higher-order function for  error handling
export const CatchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    });
  };
};

//get year from YYYY-MM-DD
export const GetYear = (date) => date.split("-")[0];

//convert pitch class notation to string
export const PitchClass = (note) => {
  let key = note;

  switch (note) {
    case 0:
      key = "C";
      break;
    case 1:
      key = "D♭";
      break;
    case 2:
      key = "D";
      break;
    case 3:
      key = "E♭";
      break;
    case 4:
      key = "E";
      break;
    case 5:
      key = "F";
      break;
    case 6:
      key = "G♭";
      break;
    case 7:
      key = "G";
      break;
    case 8:
      key = "A♭";
      break;
    case 9:
      key = "A";
      break;
    case 10:
      key = "B♭";
      break;
    case 11:
      key = "B";
      break;
    default:
      return null;
  }

  return key;
};

export const FormatWithCommas = (n) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
