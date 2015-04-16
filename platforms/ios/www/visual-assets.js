console.log("visual");

  var canvas = document.getElementById("easel"),
  centerX = canvas.width/2,
  centerY = canvas.height/2;

  var lightLabelStyle = "100 30px Avenir-Book";
  var mediumLabelStyle =  "bold 30px Avenir-Heavy";
  var largeLabelStyle =  "bold 40px Avenir-Heavy";
  var green = "#00CA9D";
  var blue = "#4BCAFF";
  var yellow = "#F6D034";
  var pink = "#E01062";
  var white = "#FFF";
  var black = "#333";
  var gray = "#EAEAEA";
  var lightGray = "#C8B2B2";
  var darkGray = "#AA9696";
  var pink = "#E01062";
  var purple = "#A106D0";

  var radius = 75;
  var iconRadius = 40;
  var buttonSize = 130;
  var buttonRow = 0;
  var buttonMargin = 8;

// ----------------- CONSTRUCTORS --------------------

function Grid(gridSize,gridSpacing,gridHeight,labelMargin) {

  var gridLeft = ((canvas.width - ((gridSize-1) * gridSpacing))/2);
  var gridTop = ((gridHeight - ((gridSize-1) * gridSpacing))/2);

  var gridContainer = new createjs.Container();

  var grid = new createjs.Shape();

  grid.graphics.beginStroke(white);
  grid.graphics.setStrokeStyle(2);
  grid.alpha = .2;
  
  for (var i = 0; i < gridSize; i++) {
    grid.graphics.moveTo(gridLeft+(i*gridSpacing),0);
    grid.graphics.lineTo(gridLeft+(i*gridSpacing),gridHeight);
    grid.graphics.moveTo(0,(gridTop+(i*gridSpacing)));
    grid.graphics.lineTo(canvas.width,(gridTop+(i*gridSpacing)));
  }

  gridContainer.addChild(grid);
  grid.cache(0,0,canvas.width,gridHeight);

  for (var i = 0; i < gridSize; i++) {
      var hLabel = new createjs.Text(i, lightLabelStyle, white);
      hLabel.x = (gridLeft-8) + (i*gridSpacing);
      hLabel.y = gridTop - labelMargin;
      hLabel.alpha = .6;
    var vLabel = new createjs.Text(i, lightLabelStyle, white);
      vLabel.x = gridLeft - labelMargin;
      vLabel.y = (gridTop-18) + (i*gridSpacing);
      vLabel.alpha = .6;
    gridContainer.addChild(hLabel);
    gridContainer.addChild(vLabel);
  }
  return gridContainer;
}

function GameObject(tl,tr,br,bl) {

  var gameObject = new createjs.Container();

  var TL = new createjs.Shape();
  var TR = new createjs.Shape();
  var BR = new createjs.Shape();
  var BL = new createjs.Shape();

  if (tl == 1) {
    gameObject.tl = 1;
    TL.graphics.beginFill(white);
    TL.graphics.drawRoundRectComplex(-radius,-radius,radius,radius,radius,0,0,0);
    TL.name = "TL";
  } else {
    gameObject.tl = 0;
    TL.graphics.beginFill(black);
    TL.graphics.drawRoundRectComplex(-radius,-radius,radius,radius,0,0,0,0);
    TL.name = "TL";
  }

  if (tr == 1) {
    gameObject.tr = 1;
    TR.graphics.beginFill(white);
    TR.graphics.drawRoundRectComplex(0,-radius,radius,radius,0,radius,0,0);
    TR.name = "TR";
  } else {
    gameObject.tr = 0;
    TR.graphics.beginFill(black);
    TR.graphics.drawRoundRectComplex(0,-radius,radius,radius,0,0,0,0);
    TR.name = "TR";
  }

  if (br == 1) {
    gameObject.br = 1;
    BR.graphics.beginFill(white);
    BR.graphics.drawRoundRectComplex(0,0,radius,radius,0,0,radius,0);
    BR.name = "BR";
  } else {
    gameObject.br = 0;
    BR.graphics.beginFill(black);
    BR.graphics.drawRoundRectComplex(0,0,radius,radius,0,0,0,0);
    BR.name = "BR";
  }

  if (bl == 1) {
    gameObject.bl = 1;
    BL.graphics.beginFill(white);
    BL.graphics.drawRoundRectComplex(-radius,0,radius,radius,0,0,0,radius);
    BL.name = "BL";
  } else {
    gameObject.bl = 0;
    BL.graphics.beginFill(black);
    BL.graphics.drawRoundRectComplex(-radius,0,radius,radius,0,0,0,0);
    BL.name = "BL";
  }

  gameObject.addChild(TL,TR,BR,BL);

  return gameObject;

}

function Box(x,y,w,h,bgColor,color,title,name) {

  var box = new createjs.Container();
  if (arguments.length == 8) {
    box.name = name;
  }

  var bg = new createjs.Shape();
  bg.graphics.beginFill(bgColor);
  bg.graphics.drawRoundRect(0,0,w,h,10);
  bg.name = "bg";

  var header = new createjs.Shape();
  header.graphics.beginFill(color);
  header.graphics.drawRoundRectComplex(0,0,w,76,10,10,0,0);
  var label = new createjs.Text(title, lightLabelStyle, white);
  label.textAlign = "center";
  label.x = w/2;
  label.y = 20;

  box.addChild(bg,header,label);
  box.x = x;
  box.y = y;

  return box;
}

function Tray(x,y,w,h,bgColor,borderColor,alpha,order,type) {

  var tray = new createjs.Shape();
  tray.graphics.beginStroke(borderColor).setStrokeStyle(8).beginFill(bgColor);
  tray.graphics.drawRoundRect(0,0,w,h,5);

  tray.x = x;
  tray.y = y;
  tray.alpha = alpha
  tray.tray = order;
  tray.type = type;

  return tray;
}

function DropZone(x,y,color,alpha,type,slot) {

  var dz = new createjs.Shape();
  dz.graphics.beginFill(color);
  dz.graphics.drawRoundRect(0,0,buttonSize,buttonSize,5);
  
  dz.x = x;
  dz.y = y;
  dz.alpha = alpha;
  dz.type = type
  dz.slot = slot;

  return dz;

}

function Padlock(x,y) {

  var icon = new createjs.Container();
  
  var lock = new createjs.Shape();
  lock.graphics.beginStroke(white).setStrokeStyle(3);
  lock.graphics.arc(15,-5,10,180*(Math.PI/180),0*(Math.PI/180));

  var lockBase = new createjs.Shape();
  lockBase.graphics.beginStroke(white).setStrokeStyle(3);
  lockBase.graphics.drawRoundRect(0,0,30,30,3);
  
  icon.addChild(lock,lockBase);
  icon.x = x;
  icon.y = y;

  return icon;

}

// GENERATE BUTTONS

function PlaceholderButton(x,y) {

  var button = new createjs.Shape();
  button.graphics.beginFill(lightGray);
  button.graphics.drawRoundRect(0,0,buttonSize,buttonSize,5);
  button.alpha = .4;
  button.type = "placeholder";

  button.x = x;
  button.y = y;
  button.cache(0,0,buttonSize,buttonSize);

  return button;
}

function PositionButton(axis,axisW,axisH,axisX,axisY,label,x,y) {

  var posButton = new createjs.Container();

  posButton.type = "position";
  posButton.slotType = "condition";
  posButton.addEventListener("mousedown",grabItem);
  posButton.addEventListener("pressmove",dragAndDrop);
  posButton.addEventListener("pressup",snapTo);
  posButton.originX = x;
  posButton.originY = y;
  posButton.originParent = selectorsBox;

  var button = new createjs.Shape();
  button.graphics.beginFill(green);
  button.graphics.drawRoundRect(0,0,buttonSize,buttonSize,5);

  var axisShape = new createjs.Shape();
  axisShape.graphics.beginFill(darkGray);
  axisShape.graphics.drawRect(0,0,axisW,axisH);
  axisShape.x = axisX;
  axisShape.y = axisY;

  var axisLabel = new createjs.Text(label, lightLabelStyle, white);
  axisLabel.x = 65;
  axisLabel.y = 45;
  axisLabel.textAlign = "center";

  posButton.addChild(button,axisShape,axisLabel);
  posButton.x = x;
  posButton.y = y;
  posButton.name = axis;
  posButton.val = label;
  posButton.inSlot = false;
  posButton.refresh = true;
  posButton.cache(0,0,buttonSize,buttonSize);

  return posButton;
}

function ShapeButton(tl,tr,br,bl,x,y) {

  var shapeButton = new createjs.Container();

  shapeButton.type = "shape";
  shapeButton.slotType = "condition";
  shapeButton.addEventListener("mousedown",grabItem);
  shapeButton.addEventListener("pressmove",dragAndDrop);
  shapeButton.addEventListener("pressup",snapTo);
  shapeButton.originX = x;
  shapeButton.originY = y;
  shapeButton.originParent = selectorsBox;

  var button = new createjs.Shape();
  button.graphics.beginFill(green);
  button.graphics.drawRoundRect(0,0,buttonSize,buttonSize,5);

  var TL = new createjs.Shape();
  var TR = new createjs.Shape();
  var BR = new createjs.Shape();
  var BL = new createjs.Shape();

  if (tl == 1) {
    TL.graphics.beginFill(lightGray);
    TL.graphics.drawRoundRectComplex(-iconRadius,-iconRadius,iconRadius,iconRadius,iconRadius,0,0,0);
  } else {
    TL.graphics.beginFill(darkGray);
    TL.graphics.drawRect(-iconRadius,-iconRadius,iconRadius,iconRadius);
  }

  if (tr == 1) {
    TR.graphics.beginFill(lightGray);
    TR.graphics.drawRoundRectComplex(0,-iconRadius,iconRadius,iconRadius,0,iconRadius,0,0);
  } else {
    TR.graphics.beginFill(darkGray);
    TR.graphics.drawRect(0,-iconRadius,iconRadius,iconRadius);
  }

  if (br == 1) {
    BR.graphics.beginFill(lightGray);
    BR.graphics.drawRoundRectComplex(0,0,iconRadius,iconRadius,0,0,iconRadius,0);
  } else {
    BR.graphics.beginFill(darkGray);
    BR.graphics.drawRect(0,0,iconRadius,iconRadius);
  }

  if (bl == 1) {
    BL.graphics.beginFill(lightGray);
    BL.graphics.drawRoundRectComplex(-iconRadius,0,iconRadius,iconRadius,0,0,0,iconRadius);
  } else {
    BL.graphics.beginFill(darkGray);
    BL.graphics.drawRect(-iconRadius,0,iconRadius,iconRadius);
  }

  TL.x = 65;
  TL.y = 65;
  TR.x = 65;
  TR.y = 65;
  BR.x = 65;
  BR.y = 65;
  BL.x = 65;
  BL.y = 65;

  shapeButton.addChild(button,TL,TR,BR,BL);
  shapeButton.x = x;
  shapeButton.y = y;
  shapeButton.name = "shape";
  shapeButton.val = [tl,tr,br,bl];
  shapeButton.inSlot = false;
  shapeButton.refresh = true;
  shapeButton.cache(0,0,buttonSize,buttonSize);

  return shapeButton;

}

function LogicButton(label,x,y) {

  var logicButton = new createjs.Container();

  logicButton.type = "logic";
  logicButton.slotType = "logic";
  logicButton.addEventListener("mousedown",grabItem);
  logicButton.addEventListener("pressmove",dragAndDrop);
  logicButton.addEventListener("pressup",snapTo);
  logicButton.originX = x;
  logicButton.originY = y;
  logicButton.originParent = selectorsBox;

  var button = new createjs.Shape();
  button.graphics.beginFill(blue);
  button.graphics.drawRoundRect(0,0,buttonSize,buttonSize,5);

  var logicLabel = new createjs.Text(label, mediumLabelStyle, white);
  logicLabel.x = 65;
  logicLabel.y = 45;
  logicLabel.textAlign = "center";

  logicButton.addChild(button,logicLabel);
  logicButton.x = x;
  logicButton.y = y;
  logicButton.name = label;
  logicButton.cache(0,0,buttonSize,buttonSize);

  return logicButton;
}

function TransformButton(rX,rY,c1,c2,c3,c4,cX,cY,x,y) {

  var transformButton = new createjs.Container();
  transformButton.type = "action";
  transformButton.slotType = "action";
  transformButton.addEventListener("mousedown",grabItem);
  transformButton.addEventListener("pressmove",dragAndDrop);
  transformButton.addEventListener("pressup",snapTo);
  transformButton.originX = x;
  transformButton.originY = y;
  transformButton.originParent = actionsBox;

  var button = new createjs.Shape();
  button.graphics.beginFill(yellow);
  button.graphics.drawRoundRect(0,0,buttonSize,buttonSize,5);

  var rect = new createjs.Shape();
  rect.graphics.beginFill(black);
  rect.graphics.drawRect(0,0,iconRadius,iconRadius);
  rect.x = rX;
  rect.y = rY;

  var circle = new createjs.Shape();
  circle.graphics.beginFill(white);
  circle.graphics.drawRoundRectComplex(0,0,iconRadius,iconRadius,c1,c2,c3,c4);
  circle.x = cX;
  circle.y = cY;

  transformButton.addChild(button,rect,circle);
  transformButton.x = x;
  transformButton.y = y;
  transformButton.cache(0,0,buttonSize,buttonSize);

  return transformButton;
}

function RotateButton(type,dir,x,y) {

  var rotateButton = new createjs.Container();
  rotateButton.type = "action";
  rotateButton.slotType = "action";
  rotateButton.addEventListener("mousedown",grabItem);
  rotateButton.addEventListener("pressmove",dragAndDrop);
  rotateButton.addEventListener("pressup",snapTo);
  rotateButton.originX = x;
  rotateButton.originY = y;
  rotateButton.originParent = actionsBox;

  var button = new createjs.Shape();
  button.graphics.beginFill(yellow);
  button.graphics.drawRoundRect(0,0,buttonSize,buttonSize,5);

  var arc = new createjs.Shape();
  arc.graphics.beginStroke(pink);
  arc.graphics.setStrokeStyle(12);

  var arrow = new createjs.Shape();
  arrow.graphics.beginFill(pink);

  var line = new createjs.Shape();
  line.graphics.beginStroke(lightGray);
  line.graphics.setStrokeStyle(8);

  if (type == 90) {
    if (dir == "cc") {
      line.graphics.moveTo(100,30);
      line.graphics.lineTo(100,100);
      line.graphics.lineTo(30,100);
      arc.graphics.arc(74,64,34,180*(Math.PI/180),280*(Math.PI/180));
      arrow.graphics.lineTo(20,58);
      arrow.graphics.lineTo(40,88);
      arrow.graphics.lineTo(60,58);
      
    } else {
      line.graphics.moveTo(30,30);
      line.graphics.lineTo(30,100);
      line.graphics.lineTo(100,100);
      arc.graphics.arc(56,66,34,260*(Math.PI/180),0);
      arrow.graphics.lineTo(110,58);
      arrow.graphics.lineTo(90,88);
      arrow.graphics.lineTo(70,58);
    }

  } else {
      line.graphics.moveTo(30,100);
      line.graphics.lineTo(100,100);
      arc.graphics.arc(65,58,26,180*(Math.PI/180),0);
      arrow.graphics.lineTo(40,88);
      arrow.graphics.lineTo(20,58);
      arrow.graphics.lineTo(60,58);
    }

  arrow.graphics.closePath();

  rotateButton.addChild(button,line,arc,arrow);
  rotateButton.x = x;
  rotateButton.y = y;
  rotateButton.cache(0,0,buttonSize,buttonSize);

  return rotateButton;
}

function FlipButton(a1,a2,a3,a4,a5,a6,b1,b2,b3,b4,b5,b6,x,y) {

  var flipButton = new createjs.Container();
  flipButton.type = "action";
  flipButton.slotType = "action";
  flipButton.addEventListener("mousedown",grabItem);
  flipButton.addEventListener("pressmove",dragAndDrop);
  flipButton.addEventListener("pressup",snapTo);
  flipButton.originX = x;
  flipButton.originY = y;
  flipButton.originParent = actionsBox;

  var button = new createjs.Shape();
  button.graphics.beginFill(yellow);
  button.graphics.drawRoundRect(0,0,buttonSize,buttonSize,5);

  var arrow1 = new createjs.Shape();
  arrow1.graphics.beginFill(lightGray);
  arrow1.graphics.lineTo(a1,a2);
  arrow1.graphics.lineTo(a3,a4);
  arrow1.graphics.lineTo(a5,a6);
  arrow1.graphics.closePath();

  var arrow2 = new createjs.Shape();
  arrow2.graphics.beginFill(pink);
  arrow2.graphics.lineTo(b1,b2);
  arrow2.graphics.lineTo(b3,b4);
  arrow2.graphics.lineTo(b5,b6);
  arrow2.graphics.closePath();

  flipButton.addChild(button,arrow1,arrow2);
  flipButton.x = x;
  flipButton.y = y;
  flipButton.cache(0,0,buttonSize,buttonSize);

  return flipButton;
}
