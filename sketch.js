//Create variables here
var dog;
var happyDog;
var database;
var foodS = 0;
var foodStock;
function preload()
{
	//load images here
  dogimg = loadImage("Dog.png");
  happydogimg = loadImage("happydog.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog1 = createSprite(400,300,10,10);
  dog1.addImage(dogimg);
  dog1.scale = 0.15;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);


}
function readStock(data){
foodS = data.val();
}

function draw() {
  background(46, 139, 87);  
  drawSprites();
    if(keyWentDown(UP_ARROW)){
       writeStock(foodS);
       dog1.addImage(happydogimg);
    }
    fill(255,255,254);
   stroke("black");
    text("Food remaining : "+foodS,170,200);
    textSize(13);
      text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
  }

  function writeStock(x){
    if(x<0){
      x = 0;
    }else{
      x= x-1;
    }
    database.ref("/").update({Food:x});
  }
