import React, { useState } from "react";

const Test = () => {
  // given  array [0, 1, 0, 3, 12],  function should modify the array in-place to [1, 3, 12, 0, 0].
  //   const [arr, setArr] = useState([0, 1, 0, 3, 12]); // 4, 1, 2, 1, 2
  //   const [b, setB] = useState([]);

  //   var count = 0;
  //   console.log(arr);
  var a = [4, 1, 2, 1, 2];
  return (
    <div>
      {/* {arr.sort().map((item, i) => {
        if (arr[i] === 0) {
          count++;
        }
        // if (arr[i] === arr[i + 1]) {
        //   arr.filter((i) =>i!==arr[i])
        // }
      })}
      {arr.splice(0, count)}

      {arr.map((item) => {
        if (item === undefined) {
          arr.push(0);
        }
      })}
      {console.log(arr, arr[4], "Arr")} */}
    </div>
  );
};

export default Test;
