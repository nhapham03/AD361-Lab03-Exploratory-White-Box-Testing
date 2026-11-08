## Step 1: Exploratory Testing

**Charter:** I want to check how the counter reacts when I use the Increment, Decrement, and Reset buttons, both one at a time and mixed together. I'm mainly looking for wrong counts, whether it can go negative, and whether the buttons still work after a reset.

| #   | Action                                      | Expected Result                      | Actual Result                                             | Pass or Fail |
| --- | ------------------------------------------- | ------------------------------------ | --------------------------------------------------------- | ------------ |
| 1   | Opened the page                             | Count is 0 and there are 3 buttons   | It showed "Count: 0" with Increment, Decrement, and Reset | Pass         |
| 2   | Clicked Increment once                      | Count goes up by 1                   | Count went to 1                                           | Pass         |
| 3   | Clicked Decrement at 0                      | Not sure, either -1 or it stays at 0 | It went to -1, so negatives are allowed                   | Pass         |
| 4   | Clicked Increment 5 times fast              | Count is 5                           | Count was 5                                               | Pass         |
| 5   | Clicked Increment 3 times, then Reset       | Count goes back to 0                 | It went back to 0                                         | Pass         |
| 6   | Reset, then clicked Increment and Decrement | Buttons still work after reset       | Went 0 to 1 and back to 0                                 | Pass         |
| 7   | Clicked Reset when it was already 0         | Stays at 0, nothing breaks           | Stayed at 0                                               | Pass         |

## Step 2: Examine the Source Code

- The starting value of `count`: count starts at 0 because of useState(0).
- The statements that change `count`:
- Clicking **Increment**: setCount(count + 1)
- Clicking **Decrement**: setCount(count - 1)
- Clicking **Reset**: setCount(0)
- There are no branches or loops. I didn't see any if, ternary, &&, for, while, or .map().

Branch and loop coverage don't really apply here. Branch coverage checks if you tested True or False route of a decision, and loop coverage checks if a loop ran a number of times. This component has neither, so there's nothing for them to check. Statement coverage is the one that matters. So I just need each of the 3 `setCount` lines to run at least once.

## Step 3 - 6 write test

## Step 7: Run the Tests

All tests have passed

Screenshot: <img width="741" height="483" alt="Screenshot 2026-11-08 013516" src="https://github.com/user-attachments/assets/89bb2361-76f4-466f-afd6-98a7d02e54f2" />


## Step 8: Review Code Coverage

| Coverage Type | Percentage |
| ------------- | ---------- |
| Statements    | 100%       |
| Branches      | 100%       |
| Functions     | 100%       |
| Lines         | 100%       |

Screenshot: <img width="810" height="652" alt="Screenshot 2026-11-08 013549" src="https://github.com/user-attachments/assets/949310f9-81c8-4209-9f96-e43fdc3f9bcd" />


- **Which parts of the component my tests executed:** The component rendered with `count` starting at 0, and my tests clicked all three buttons, so `setCount(count + 1)`, `setCount(count - 1)`, and `setCount(0)` all ran.
- **Whether any statements remained untested:** None. The "Uncovered Line #s" column is empty, so every statement in `App.tsx` ran at least once.
- **Why the component may report few or no branches:** `App.tsx` has no `if` statements, ternaries, `&&`, nor loops, so there are no branches. The tool sees 0 out of 0 branches and reports 100%. But that doesn't mean I tested branches well, there just weren't any.
- **Whether the percentage alone proves the component works:** No. Coverage only shows that the code ran, not that it gave the right result. I could click every button with no `expect` and still get 100%. My "reset at 0" test is a good example: it runs `setCount(0)` and counts toward coverage, but on its own it couldn't catch a broken Reset button, because the count was already 0. That's why I also test Reset after incrementing. Coverage also can't find missing features. If the count wasn't supposed to go below 0, the tests would still show 100%.

## Step 9: Compare the Two Approaches

- **Test idea from exploratory testing:** Clicking Decrement while the count was 0. Without the code, I didn't know if negative numbers were allowed here so I had to try it and it went to -1.
- **Test idea from reading the source code:** I saw exactly 3 `setCount` statements and no conditions, so one test per button covers every statement. Reading the code also showed me that Reset has to be tested from a number other than the default number 0. This proves the Reset button works properly.
- **How viewing the code changed my testing:** I stopped guessing. Once I saw there were no limits or special cases, I could test each statement directly instead of trying random things. It also explained why branch coverage didn't mean much for this component.
- **Limitation of exploratory testing:** It depends on what I think to try, and I can't be sure I've run every line of code.
- **Limitation of white box testing:** It tests what the code does, not what it should do. If a requirement was never coded, like a minimum value, reading the code won't show me it's missing.
