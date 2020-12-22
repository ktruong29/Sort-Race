var g_canvas = {cell_size:20, wid:65, hgt:20 }; // JS Global var, w canvas size info.

var array = "1FAB3D47905C286";
var len = array.length;
var insert_ar = array.split("");
var merge_ar  = array.split("");
var pore_ar   = array.split("");
var quick_ar  = array.split("");

var count = 0;      //executes at most 15 times

var x_insert = 64;  //x-coord to print "Insertion" string
var y_insert = 15;  //y-coord to print "Insertion" string

var x_merge = 424;  //x-coord to print "Merge" string
var y_merge = 15;   //y-coord to print "Merge" string

var x_pore  = 744;  //x-coord to print "Pore" string
var y_pore  = 15;   //y-coord to print "Pore" string

var x_quick = 1044;
var y_quick = 15;

var insertion = {i: 1, ar: insert_ar, count: 0, x: 4, y: 35, flag: false};
var merge     = {p: 2, ar: merge_ar, count: 0, x: 324, y: 35, flag: false, newAr: new Array()};
var pore      = {i: 0, ar: pore_ar, x: 644, y: 35, flag:false, prevAr: new Array()};
var quick     = {top: -1, ar: quick_ar, x: 964, y: 35, low: undefined,
                 high: undefined, stack: new Array(), flag: false, prevAr: new Array()};

//This function happens ONCE ONLY
function setup(){
  let sz = g_canvas.cell_size;
  let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
  let height = sz * g_canvas.hgt;
  createCanvas( width, height );  // Make a P5 canvas.
  draw_grid( 20, 20, 'white', 'yellow' ); //draw line in white and text in yellow
  textSize(15);
  DisplayAlgoName();
  DisplayArray();
  frameRate(1);
  //For Quick Sort
  quick.stack[++quick.top] = 0;
  // print("top out1: "+ quick.top);
  quick.stack[++quick.top] = len - 1;
  // print("top out2: " + quick.top);
  for(var i = 0; i < len; ++i){
    quick.prevAr[i] = quick.ar[i];
  }
}

//Order matters
//function draw() is a loop -> execute multiple times
function draw(){
  if(count < len){
    if(!insertion.flag){
      InsertionSort();
      if(insertion.i < len)
      {
        print("Insertion i = " + insertion.i);
        InsertionDisplayPass();
        insertion.i = insertion.i + 1;  //increment i for next pass
      }
      else{
        insertion.flag = true;
      }
    }

    if(!merge.flag){
      if(merge.p <= len){
        MergeSort();
        MergeDisplayPass();
        merge.p = 2 * merge.p;  //next pass
      }
      else if(merge.p > len && Math.floor(merge.p/2) < len){
          var lb = 0;
          var ub = array.length - 1;
          var mid = Math.floor(merge.p/2) - 1;
          // print(merge.p + ' ' + lb + ' ' + ub + ' ' + mid + ' ' + array.length);
          Merge(lb, mid, ub);
          merge.p = 2 * merge.p;
          MergeDisplayPass();
      }
      else{
        merge.flag = true;
      }
    }

    if(!pore.flag){
      if(pore.i < len){
        for(var i = 0; i < len; ++i){
          pore.prevAr[i] = pore.ar[i];
        }
        PoreSort();
        PoreDisplayPass();
        ++pore.i;
      }
      else{
        pore.flag = true;
      }
    }

    if(!quick.flag){
      if(quick.top >= 0){
        QuickSort();
        print("ar: " + quick.ar);
        print("prevAr: " + quick.prevAr);
        if(JSON.stringify(quick.ar) != JSON.stringify(quick.prevAr)){
          QuickDisplayPass();
        }
        // QuickDisplayPass();
        for(var i = 0; i < len; i++){
          quick.prevAr[i] = quick.ar[i];
        }
      }
      else{
        quick.flag = true;
      }
    }
    CompareFlag(insertion.flag, merge.flag, pore.flag, quick.flag);
  }
}

//1-pass
function InsertionSort(){
  let temp = insertion.ar[insertion.i];
  let j = insertion.i - 1;

  while(j >= 0 && insertion.ar[j] > temp){
    // array[j + 1] = array[j];
    insertion.ar[j+1] = insertion.ar[j];
    j = j - 1;
  }
  insertion.ar[j+1] = temp;
}

//1-pass
function MergeSort(){
  var i, l, mid, h;
  var p = merge.p;
  for(i = 0; i+ p -1 < len; i = i+p){
    l = i;
    h = i + p -1;
    mid = Math.floor((l+h)/2);
    Merge(l, mid, h);
  }
  print(" i: " + i + "length: " + len);
  if(i+p-1 >= len && i < len){
    l = i;
    h = len - 1;
    mid = Math.floor((l+h)/2);
    Merge(l, mid, h);
  }
}

//helper function
function Merge(lb, mid, ub){
  let i = lb;
  let j = mid + 1;
  let k = lb;

  while(i <= mid && j <= ub){
    if(merge.ar[i] < merge.ar[j]){
      merge.newAr[k] = merge.ar[i];
      ++i;
    }
    else {
      merge.newAr[k] = merge.ar[j];
      ++j;
    }
    ++k;
  }

  if(i > mid){
    while(j <= ub){
      merge.newAr[k] = merge.ar[j];
      ++j;
      ++k;
    }
  }
  else {
    while(i <= mid){
      merge.newAr[k] = merge.ar[i];
      ++i;
      ++k;
    }
  }
  //
  for(k = lb; k <= ub; ++k){
    merge.ar[k] = merge.newAr[k];
  }
}

function PoreSort(){
    var i;
    if(pore.i % 2 == 0){
      i = 0;
    }
    else{
      i = 1;
    }
    for(i; i < len; i = i + 2){
      if(pore.ar[i] > pore.ar[i+1]){
        var temp = pore.ar[i];
        pore.ar[i] = pore.ar[i+1];
        pore.ar[i+1] = temp;
      }
    }
}

function QuickSort(){
  //Pop high and low on the stack
  var high = quick.stack[quick.top--];
  print("top1: "+ quick.top);
  var low  = quick.stack[quick.top--];
  print("top2: "+ quick.top);

  //Finding the pivot element
  var p = Partition(low, high);

  //If there are elements on the left side of the pivot, then push to the left
  if(p - 1 > low){
    quick.stack[++quick.top] = low;
    quick.stack[++quick.top] = p-1;
  }
  //If there are elements on the right side of the pivot, then push to the right
  if(p + 1 < high){
    quick.stack[++quick.top] = p + 1;
    quick.stack[++quick.top] = high;
  }
  print("top3: "+ quick.top);
  print("top4: "+ quick.top);
}

function Partition(l, h){
  var x = quick.ar[h];
  var i = l - 1;

  for(var j = l; j <= h-1; j++){
    if(quick.ar[j] <= x){
      i++;
      //Swap quick.ar[i] and quick.ar[j]
      Swap(i, j);
    }
  }
  Swap(i+1, h);
  return (i+1);
}

function Swap(i, j){
  var temp = quick.ar[i];
  quick.ar[i] = quick.ar[j];
  quick.ar[j] = temp;
}

function NewString(){
  array = array[len-1] + array.slice(0, len-1);
}

function CompareFlag(flag1, flag2, flag3, flag4){
  if(flag1 && flag2 && flag3 && flag4){
    NewString();
    background(0,0,0);
    draw_grid(20, 20, 'white', 'yellow' ); //draw line in white and text in yellow
    insertion.i = 1;
    insertion_ar = array.split("");
    insertion.ar = insertion_ar;
    insertion.x = 4;
    insertion.y = 35;
    insertion.flag = false;

    merge_ar = array.split("");
    merge.ar = merge_ar;
    merge.p = 2;
    merge.x = 324;
    merge.y = 35;
    merge.flag = false;

    pore_ar = array.split("");
    pore.ar = pore_ar;
    pore.i = 1;
    pore.x = 644;
    pore.y = 35;
    pore.flag = false;

    quick_ar = array.split("");
    quick.ar = quick_ar;
    quick.top = -1;
    quick.x = 964;
    quick.y = 35;
    quick.stack[++quick.top] = 0;
    quick.stack[++quick.top] = len - 1;
    quick.flag = false;
    DisplayAlgoName();
    DisplayArray();
    ++count;
  }
}

function DisplayAlgoName(){
  var insertion = "Insertion";
  var merge     = "Merge";
  var pore      = "Pore";
  var quick     = "Quick";

  // Displaying Insertion string
  for(var i = 0; i < insertion.length; ++i){
    text(insertion[i], x_insert, y_insert);
    text(merge[i], x_merge, y_merge);
    text(pore[i], x_pore, y_pore);
    text(quick[i], x_quick, y_quick);
    x_insert  = x_insert + 20;
    x_merge   = x_merge + 20;
    x_pore    = x_pore + 20;
    x_quick   = x_quick + 20;
  }
  x_insert = 64;
  y_insert = 15;

  x_merge = 424;
  y_merge = 15;

  x_pore = 744;
  y_pore = 15;

  x_quick = 1044;
  y_quick = 15;
}

function DisplayArray(){
  for(var i = 0; i < array.length; ++i){
    text(array[i], insertion.x, insertion.y);
    text(array[i], merge.x, merge.y);
    text(array[i], pore.x, pore.y);
    text(array[i], quick.x, quick.y);
    insertion.x = insertion.x + 20;
    merge.x = merge.x + 20;
    pore.x  = pore.x + 20;
    quick.x = quick.x + 20;
  }

  //reset to default value of x = 4
  insertion.x = 4;
  insertion.y = insertion.y + 20;
  merge.x = 324;
  merge.y = merge.y + 20;
  pore.x = 644;
  pore.y = pore.y + 20;
  quick.x = 964;
  quick.y = quick.y + 20;
}

function InsertionDisplayPass(){
  fill('green');
  for(var i = 0; i < len; ++i){
    text(insertion.ar[i], insertion.x, insertion.y);
    insertion.x = insertion.x + 20;
  }
  // print(insertion.ar);
  insertion.y = insertion.y + 20;
  insertion.x = 4;
}

function MergeDisplayPass(){
  fill('red');
  for(var i = 0; i < len; ++i){
    text(merge.ar[i], merge.x, merge.y);
    merge.x = merge.x + 20;
  }
  merge.x = 324;
  merge.y = merge.y + 20;
}

function PoreDisplayPass(){
  fill('blue');
  for(var i = 0; i < len; ++i){
    text(pore.ar[i], pore.x, pore.y);
    pore.x = pore.x + 20;
  }
  pore.x = 644;
  pore.y = pore.y + 20;
}

function QuickDisplayPass(){
  fill('pink')
  for(var i = 0; i < len; ++i){
    text(quick.ar[i], quick.x, quick.y);
    quick.x = quick.x + 20;
  }
  quick.x = 964;
  quick.y = quick.y + 20;
}
