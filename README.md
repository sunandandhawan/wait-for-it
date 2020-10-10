# wait-for-it
## Description
This can be used to automate tasks in web based applications.
## Usage Syntax
```
var waitFor = new waitForIt();
waitFor('#menu')
  .andDo((menu) => {
    menu.click();
  })
.thenWaitFor('#approve')
  .andDo((approve) => {
    approve.click();
  })
.thenWaitFor('#confirmation')
  .andDo((confirmation) => {
    //TODO: Open next item
  })
```
