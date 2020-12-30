//Create variables here
var dog, dogImage, happyDog, happyDogImage, database, foodS, foodStock,lastFed;
var i=0;
function preload()
{
  //load images here
  dogImage=loadImage("Dog.png");
  happyDogImage=loadImage("happydog.png");
 
}

function setup() {
  createCanvas(500, 500);

database=firebase.database();

  food1=new Food();
  dog=createSprite(250,300,50,50);
  dog.addImage(dogImage);
  dog.scale=0.2;
  
  

  var dogy = database.ref('Food');
  dogy.on("value",readPosition);
  feed = createButton("FEED THE DOG");
  feed.position(500,15);
  feed.mousePressed(feedDog);
  
  add = createButton("ADD FOOD");
  add.position(400,15);
  add.mousePressed(AddFood);

}


function draw() {
  background(46, 139, 87);
  
  food1.display();

  drawSprites();
  //add styles here
  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
     lastFed=data.val(); 
    });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("LAST FEED : "+lastFed%12+"PM", 300,30);
  }
  else if(lastFed==0){
    text("LAST FEED : 12 AM",300,30);
  }
  else{
    text("LAST FEED : "+lastFed+"AM",300,30);
  }
    
}

function readPosition(data){
  position=data.val();
  food1.updateFoodStock(position);
}

function writePosition(milk){
  if(milk>0){
    milk=milk-1
  }
  else{
    milk=0
  }

  database.ref('/').set({
    Food : milk
  })

}

function AddFood(){
  position++
  database.ref('/').update({
    Food : position
  })
}

function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
   x=x-1
  }
  database.ref('/').update({
    Food : x
  })
}
function feedDog(){
  food1.updateFoodStock(food1.getFoodStock()-1)
  database.ref('/').update({
    Food : food1.getFoodStock(),
    FeedTime : i++
  })
  dog.addImage(happyDogImage);
}