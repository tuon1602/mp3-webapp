export function ConvertSong(songLyric) {
//     let string =
//   "[00:00.00] [00:01.24][Aran] la-la-la-la-la-la-la [00:05.89]la-la-la-la-la-la-la [00:09.87] [00:09.91][Aran] A hopeless romantic all my life [00:13.82]Surrounded by couples all the time [00:17.87]I guess I should take it as a sign [00:21.82](oh why oh why, oh why oh why)";

const result = [];
let arr1 = songLyric.split("[");
for (let i = 0; i < arr1.length; i++) {
  const arr = arr1[i].split("]");
  const first = arr[0].trim();
  if (first === "") {
    continue;
  }
  let obj = {};
  if (!/^\d{2}:\d{2}\.\d{2}$/.test(first)) {
    const lastObj = result[result.length - 1];
    const key = Object.keys(lastObj)[0];
    lastObj[key].artist = arr[0];
    lastObj[key].value = arr[1];
  } else {
    obj[first] = { value: arr[1] };
    result.push(obj);
  }
}

let str = "";
for (let i = 0; i < result.length; i++) {
  const key = Object.keys(result[i])[0];
  const artist = result[i][key].artist ? `[${result[i][key].artist}]` : "";
  str += `[${key}]${artist}${result[i][key].value}\n`;
}

// console.log("convert to object");
// console.log(result);

// console.log("convert to string");
// console.log(str);
return str

}