/*
 * 1. Go to your profile page example: https://instagram.com/chor.market
 * 2. Copy and paste this script in browser console
 * 3. Followers who are not following you will be printed in the browser console in a minute
 */
var waitFor = new waitForIt();
waitFor('[href*=followers]')
  .andDo((fllwr) => {
    fllwr.click();
  })
  .thenWaitFor('.eiUFA:content(Followers)').andDo(() => {
    this.followers = [];
    var followersPopUpClosedDiv = document.getElementById('followersPopUpClosed');
    if (followersPopUpClosedDiv)
      followersPopUpClosed.remove();
    scrllr(0, this.followers, 'followersPopUpClosed');
  })
  .thenWaitFor('#followersPopUpClosed').andDo((fllwng) => {
    document.querySelectorAll('[href*=following]')[0].click();
  })
  .thenWaitFor('.eiUFA:content(Following)').andDo(() => {
    this.following = [];
    var followingPopUpClosedDiv = document.getElementById('followingPopUpClosed');
    if (followingPopUpClosedDiv)
      followingPopUpClosed.remove();
    scrllr(0, this.following, 'followingPopUpClosed');
  })
  .thenWaitFor('#followingPopUpClosed').andDo((fllwng) => {
    console.log('followers', this.followers.length);
    console.log('following', this.following.length);
    var followingNotFollower = [];
    for(var i = 0; i < this.following.length; i++) {
      if(this.followers.indexOf(this.following[i]) == -1) {
        followingNotFollower.push(this.following[i]);
      }
    }
    console.log('followingNotFollower', followingNotFollower);
  })
function scrllr(count, arr, onCloseId, height) {
  var scrlContDiv = document.querySelectorAll('.isgrP')[0];
  var itmCont = document.querySelectorAll('.isgrP ul')[0];
  var scrl =  itmCont.offsetHeight;
  scrlContDiv.scroll(0, scrl);
  if (height !== scrl) {
    height = scrl;
    count = 0;
  } else {
    count ++;
  }
  if (count < 5) {
    scrl = height;
    setTimeout(() => scrllr(count, arr, onCloseId, height), 250);
  } else {
    console.log('Scroll end reached');
    itmCont.querySelectorAll('a[title]').forEach(e => arr.push(e.innerText))
    document.querySelectorAll('.WaOAr button')[0].click();
    var div = document.createElement('div');
    div.id = onCloseId;
    document.body.appendChild(div);
  }
}
function waitForIt(processLimit) {
  var processLimit = processLimit ? processLimit : 100;
  var queue = [];
  var processCount = 0;
  var processed = 0;
  var addActionObj = { andDo: addActionToQueue };
  var addQueryObj = { thenWaitFor: addQueryToQueue };
  var isProcessRunning = false;
  function addQueryToQueue(query) {
    queue.push({ query: query });
    console.log(queue);
    return addActionObj;
  }
  function addActionToQueue(callback) {
    queue[queue.length - 1]["callback"] = callback;
    console.log(queue);
    if (!isProcessRunning) {
      isProcessRunning = true;
      processQueue();
    }
    return addQueryObj;
  }
  function getFirstElementByQuery(query) {
    var qSplit = query.split(':content(');
    var query = qSplit[0];
    var innerText = qSplit[1] ? qSplit[1].split(')')[0] : qSplit[1];
    var x = document.querySelectorAll(query);
    if (!innerText)
      return x[0];
    for (var i = 0; i < x.length; i++) {
      if (x[i].innerText === innerText) {
        return x[i];
      }
    }
  }
  function processQueue() {
    var e;
    if (queue[0]) {
      e = getFirstElementByQuery(queue[0].query);
    }
    processCount++;
    if (e) {
      processCount = 0;
      queue[0].callback(e);
      queue.shift();
      processed++;
    }
    if ((processed == 0 || queue.length > 0) && processCount < processLimit) {
      setTimeout(processQueue, 500);
    } else {
      isProcessRunning = false;
    }
  }
  return addQueryToQueue;
};
