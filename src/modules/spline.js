import simpleSmoothingSpline from "@umn-latis/simple-smoothing-spline";
import store from "./store.js";

const createSpline = async function(x, y, freq, id, propA, propB) {
  console.log("created spline");

  let data = x.map((e, i) => {
    let pair = {
      x: e,
      y: y[i],
    };
    return pair;
  });
  data = data.filter(o => o.x && o.y)

  let lambda = 0.00001 * Math.pow(2, 9.9784 * Math.log(freq) + 3.975);
  const spline = await simpleSmoothingSpline(data, { lambda: lambda });

  let xArr = [];
  let yArr = [];
  for (const obj of spline.points) {
    xArr.push(obj.x);
    yArr.push(obj.y);
  }

  // save spline to spline cache in store.js
  let splineObj;
  let splineExists = store.cache.splines[propA].find((o) => o.id == id);
  if (splineExists) {
    splineObj = splineExists;
  } else {
    splineObj = new Object();
    splineObj.id = id;
    // if calculating spline for index, save spline in in raw attribute not index attribute
    let prop = propB ? propB : propA;
    store.cache.splines[prop].push(splineObj);
  }
  splineObj[freq] = {
    x: xArr,
    y: yArr,
    eq: spline,
  };

  return { x: xArr, y: yArr, eq: spline };
};

export default createSpline;
