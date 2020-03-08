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
