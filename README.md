# wait-for-it
## Description
This can be used to automate tasks web based applications.
## Usage
### Example
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
  .andDo((approve) => {
    //TODO: Open next item
  })
```
