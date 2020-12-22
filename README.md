# Sort Race
---
The purpose of this project is to display the generational (one row per pass)
progress of four different sorting algorithms (each in their own column). The
program shall run in an interleaved fashion where each algorithm will get a turn
to perform a single Pass in its run, and then show the newly updated array (pass
results) in the next row of that algorithm's column.
Four sorting algorithms in this project are Insertion Sort, Merge sort,
Quick sort, and Gold's Poresort.  

## Input
---
* The input for this sort race project will be one of the several 15-character
hexadecimal strings (for instance "1FAB3D47905C286"). The input string allows
duplicated characters.
* Once the string has been completely sorted by the set of algorithms, then the
original hexadecimal string shall be rotated rightward by one character (shifts
the whole string to the right and inserts the last character in front of the
first character). For instance, "1FAB3D47905C286" would become "61FAB3D47905C28"
after the rotation.
* Since the string is 15 characters long, the program should execute 15 runs
and stop until the rotated string rotates back to the original string.

## Output
---
* Each Pass of the algorithm shall be displayed side-by-side in an HTML page
graphics.
* On the top row (row 0), the algorithm's name will appear.
* On the next (row 1), the input hex string shall appear in each sorting algorithm's
column.
* For each pass, the program shall display all the single pass results in the row
(for each column) before moving on to the next pass.
* If one algorithm finishes its sorting, then it shall not further update its
column until after all the other algorithms have also finished their run.

## Instruction on how to run the program
---
```$firefox index.html```
