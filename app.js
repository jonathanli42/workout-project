//buttons & options for macro calc
const unitBtn1 = document.getElementById('usMeasurement');
const unitBtn2 = document.getElementById('metricMeasurement');
const height1Text = document.getElementById('heightMetric');
const height2Box = document.getElementById('height2');
const height2Text = document.getElementById('heightMetric2');
const genderM = document.getElementById('genderM');
const genderF = document.getElementById('genderF');
const weight = document.getElementById('weight');
const weightUnits = document.getElementById('weightUnits');
const weightGoalM = document.getElementById('weightGoalM');
const weightGoalL = document.getElementById('weightGoalL');
const weightGoalMG = document.getElementById('weightGoalMG');
const activityLevel1 = document.getElementById('activityLevel1');
const activityLevel2 = document.getElementById('activityLevel2');
const activityLevel3 = document.getElementById('activityLevel3');
const diet = document.getElementById('diet');
const diet1 = document.getElementById('diet1');
const diet2 = document.getElementById('diet2');
const heightLabel = document.getElementById('heightLabel');
const getGenderType = document.getElementById('genderType');
const activityLevel = document.getElementById('activityLevel');
const submit = document.getElementById('submit');
const age = document.getElementById('age');
const getActLevel = document.getElementById('actLevel');
const workoutTitle = document.getElementById('workoutTitle');
const totalLength = document.getElementById('totalLength');
const cardioT = document.getElementById('cardioT');
const workoutBreakdown = document.getElementById('workoutBreakdown');
const cardioInput = document.getElementById('cardioInput');
const hoursInput = document.getElementById('hoursInput');
const submitBtn2  = document.getElementById('submitBtn2');
var musclesSelected = [];
var equipmentSelected = [];
var cardioTime = 0;
var numSets = 0;
var workoutLength = 0;
var totalTime = 0;
var hours = 0;
var mins = 0;
var restAndSets = 0;
var totalSets = 0;
var setPerMuscle = 0;
var cardioClick = false;
//unit and weight fixes
let unitType = 'US';
const changeUnits = function(unitType) {
    if(unitType === 'US') {
        height1Text.innerText='ft'
        if(heightLabel.innerText==="") {
            heightLabel.innerHTML += "<input type='text' id='height2Box' style='width:5em; border:none; border-bottom:1px solid #00b159; background-color:#101820FF'> in.";
        }
        if(weightUnits.innerText==="kg") {
            weightUnits.innerText="lbs";
        }
        height2Text.innerText="in";
    } else if (unitType === 'Metric') {
        height1Text.innerText='cm'
        heightLabel.innerText="";
        weightUnits.innerText="kg";
    }
};


unitBtn1.addEventListener('click', function() {
    unitType='US';
    changeUnits(unitType);
});
unitBtn2.addEventListener('click', function() {
    unitType='Metric'
    changeUnits(unitType);
});

//gender
genderM.addEventListener('click', function(){
    genderType.innerHTML='Male';
});
genderF.addEventListener('click', function(){
    genderType.innerHTML='Female';
});

//workoutgoal

weightGoalM.addEventListener('click', function() {
    weightGoal.innerHTML='Maintain';
});
weightGoalL.addEventListener('click', function() {
    weightGoal.innerHTML='Lose Weight';
    
});
weightGoalMG.addEventListener('click', function() {
    weightGoal.innerHTML='Mass Gain';
});

//activity level
var activityMult = 0;

activityLevel1.addEventListener('click', function(){
    activityLevel.innerHTML='Moderately Active (1-2 days a week)';
});
activityLevel2.addEventListener('click', function(){
    activityLevel.innerHTML='Active (3-5 days a week)';
});
activityLevel3.addEventListener('click', function(){
    activityLevel.innerHTML='Very Active (6-7 days a week)';
});
//diet
diet1.addEventListener('click', function() {
    diet.innerHTML='Regular';
});
diet2.addEventListener('click', function(){
    diet.innerHTML='Keto';
});

//calculate macroplan
//age- age.value
//convert 
//height
let heightFt = 0;
let heightInt = 0;
let heightCm = 0;
let getWeight = weight.value;

let gender = "";
const getGender = function() {
    if(genderType.innerHTML === 'Male') {
        gender = 'Male';
    } else if (genderType.innerHTML === 'Female') {
        gender = 'Female';
    }
}

const getHeight = function() {
    if(unitType === 'US') {
        heightFt = height1.value * 30.48;
        heightIn = height2.value * 2.54;
        heightCm = heightFt + heightIn; 
        getWeight = weight.value * 0.453592;
    } else if(unitType === 'Metric') {
        heightCm = height1.value;
        getWeight = weight.value;
    }
}


let protein = 0;
let fats = 0;
let carbs = 0;
let tdeeMult = 0;
const getGoal = function() {
    if(weightGoal.innerHTML==='Maintain') {
        weightGoal.innerHTML==='Maintain';
    } else if (weightGoal.innerHTML==='Lose Weight') {
        weightGoal.innerHTML==='Lose Weight';
    } else if (weightGoal.innerHTML==='Mass Gain') {
        weightGoal.innerHTML==='Mass Gain';
    }
}
const getActivityLevel = function() { 
    if(activityLevel.innerHTML==='Moderately Active (1-2 days a week)') {
        activityMult = 1.375;
    } else if(activityLevel.innerHTML==='Active (3-5 days a week)') {
        activityMult = 1.55;
    } else if(activityLevel.innerHTML==='Very Active (6-7 days a week)') {
        activityMult = 1.725;
    }
}
let tdee = 0;
let isKeto = false;


const getTdee = function() {
    getGoal();
    if(gender==='Male') {
        tdee = ((10*getWeight)+(6.25*heightCm)-(5*age.value)+5)*activityMult;
        if(diet.innerHTML === 'Keto') {
            protein=Math.ceil((tdee*.25)/4);
            carbs=Math.ceil((tdee*.05)/4);
            fats=Math.ceil((tdee*.7)/9);
        } else if(diet.innerHTML==='Regular') {
            if(weightGoal.innerHTML==='Maintain') {
                protein=Math.ceil((tdee*.3)/4);
                carbs=Math.ceil((tdee*.4)/4);
                fats=Math.ceil((tdee*.3)/9);
            } else if (weightGoal.innerHTML==='Lose Weight') {
                tdeeMult=tdee *.2;
                tdee=tdee-tdeeMult;
                carbs=Math.ceil((tdee*.2)/4);
                protein=Math.ceil((tdee*.45)/4);
                fats=Math.ceil((tdee*.35)/9);
            } else if (weightGoal.innerHTML==='Mass Gain') {
                tdee = tdee*1.2;
                carbs = Math.ceil((tdee*.5)/4);
                protein=Math.ceil((tdee*.3)/4);
                fats=Math.ceil((tdee*.2)/9);
            }
        }
    } else if(gender==='Female') {
        tdee = ((10*getWeight)+(6.25*heightCm)-(5*age.value)-161)*activityMult;
        if(diet.innerHTML === 'Keto') {
            protein=Math.ceil((tdee*.25)/4);
            carbs=Math.ceil((tdee*.05)/4);
            fats=Math.ceil((tdee*.7)/9);
        } else if(diet.innerHTML==='Regular') {
            if(weightGoal.innerHTML==='Maintain') {
                protein =Math.ceil(tdee*.3/4);
                carbs =Math.ceil(tdee*.4/4);
                fats =Math.ceil(tdee*.3/9);
            } else if (weightGoal.innerHTML==='Lose Weight') {
                tdeeMult = tdee *.2;
                tdee =tdee-tdeeMult;
                carbs =Math.ceil((tdee*.2)/4);
                protein=Math.ceil((tdee*.45)/4);
                fats=Math.ceil((tdee*.35)/9);
            } else if (weightGoal.innerHTML==='Mass Gain') {
                tdee = tdee*1.2;
                carbs = Math.ceil((tdee*.5)/4);
                protein=Math.ceil((tdee*.3)/4);
                fats=Math.ceil((tdee*.2)/9);
            }
        }
    }
}

const inputP = document.getElementById('inputP');
const inputF = document.getElementById('inputF');
const inputC = document.getElementById('inputC');
const suggestP = document.getElementById('suggestP');
const userResults = function() {
    suggestP.innerHTML = "Suggested Plan";
    inputP.innerHTML = "Protein: " + protein + 'g';
    inputF.innerHTML = "Fats: " + fats + 'g';
    inputC.innerHTML = "Carbohydrates: " + carbs + 'g';
}

submit.addEventListener('click', function() {
    getHeight();
    getGender();
    getActivityLevel();
    getTdee();
    userResults();
});




//Workout Plan
//cardio

let cardioAns = false;

const addCardio = function() {
    if(cardioAns === true) {
        cardioYesBtn.innerHTML="<button type='button' class='btn btn-success' style='color:white; background-color:#00b159; border-color:#00b159;'>Yes</button>";
        cardioNoBtn.innerHTML="<button type='button' class='btn btn-success' style='color:black; background-color:white; border-color:white;'>No</button>";
        cardioInput.innerHTML = "<input type='number' min='1' max='180'  id='cardioTime' style='color:white; text-align:center; width:5em; border:none; border-bottom:1px solid #00b159; background-color:#101820FF'> mins";
    }
    else if (cardioAns === false) {
        cardioYesBtn.innerHTML="<button type='button' class='btn btn-success' style='color:black; background-color:white; border-color:white;'>Yes</button>";
        cardioNoBtn.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>No</button>";
        cardioInput.innerHTML = "";
    }
}
 
const cardioNoBtn = document.getElementById('cardioNo');
const cardioYesBtn = document.getElementById('cardioYes');
cardioNoBtn.addEventListener('click', function() {
    cardioAns = false;
    addCardio();
});
cardioYesBtn.addEventListener('click', function() {
    cardioAns = true;
    addCardio();
});

//intensity 

const lightBtn = document.getElementById('lightInt');
const modBtn = document.getElementById('modInt');
const extBtn = document.getElementById('extInt');

const getIntensity = function() {
    if(intensity==='light') {
        lightBtn.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Light</button>";
        modBtn.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white; border-color:white;'>Moderate</button>";
        extBtn.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white; border-color:white;'>Extreme</button>";
    } else if(intensity==='moderate') {
        lightBtn.innerHTML="<button type='button'class='btn btn-success' style='color:black; background-color:white; border-color:white;'>Light</button>";
        modBtn.innerHTML="<button type='button'class='btn btn-success' style='color:white; background-color:#00b159; border-color:#00b159;'>Moderate</button>";
        extBtn.innerHTML="<button type='button'class='btn btn-success' style='color:black; background-color:white; border-color:white;'>Extreme</button>";
    } else if(intensity==='extreme') {
        lightBtn.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white; border-color:white;'>Light</button>";
        modBtn.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white; border-color:white;'>Moderate</button>";
        extBtn.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Extreme</button>";
    }
}
var intensityTime = 0;
let intensity = "light";
lightBtn.addEventListener('click', function() {
    intensity = "light";
    intensityTime = 2.5;
    getIntensity();
});
modBtn.addEventListener('click', function() {
    intensity="moderate";
    intensityTime=2;
    getIntensity();
});
extBtn.addEventListener('click', function() {
    intensity="extreme";
    intensityTime=1;
    getIntensity();
});

//workout materials
const cables=document.getElementById('cables');
const machines=document.getElementById('machines');
const bw = document.getElementById('bw');
const bb = document.getElementById('bb');
const db = document.getElementById('db');

let cableCount = 0;
cables.addEventListener('click', function() {
    cableCount++;
    if(cableCount % 2 === 1) {
        cables.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Cables</button>";
        equipmentSelected.push("cables");
    } else if (cableCount % 2 === 0) {
        cables.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white;'>Cables</button>";
        equipmentSelected.splice(equipmentSelected.indexOf('cables'),1);   
    }
});
let machinesCount = 0;
machines.addEventListener('click', function() {
    machinesCount++;
    if(machinesCount % 2 === 1) {
        machines.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Machines</button>";
        equipmentSelected.push("machines");
    } else if (machinesCount % 2 === 0) {
        machines.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white;'>Machines</button>";
        equipmentSelected.splice(equipmentSelected.indexOf('machines'),1);
    }
});
let bwCount = 0;
bw.addEventListener('click', function() {
    bwCount++;
    if(bwCount % 2 === 1) {
        bw.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Bodyweight</button>";
        equipmentSelected.push("bodyweight");
    } else if (bwCount % 2 === 0) {
        bw.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white;'>Bodyweight</button>";
        equipmentSelected.splice(equipmentSelected.indexOf('bodyweight'),1);
    }
});
let bbCount = 0;
bb.addEventListener('click', function() {
    bbCount++;
    if(bbCount % 2 === 1) {
        bb.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Barbell</button>";
        equipmentSelected.push("barbell");
    } else if (bbCount % 2 === 0) {
        bb.innerHTML="<button type='button'class='btn btn-success' style='color:black; background-color:white;'>Barbell</button>";
        equipmentSelected.splice(equipmentSelected.indexOf('barbell'),1);
    }
});

let dbCount = 0;
db.addEventListener('click', function() {
    dbCount++;
    if(dbCount % 2 === 1) {
        db.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Dumbbell</button>";
        equipmentSelected.push("dumbbell");
    } else if (dbCount % 2 === 0) {
        db.innerHTML="<button type='button'class='btn btn-success' style='color:black; background-color:white;'>Dumbbell</button>";
        equipmentSelected.splice(equipmentSelected.indexOf('dumbbell'),1);
    }
});
//focus areas

var chestClick = false;
var legsClick = false;
var tricepsClick = false;
var bicepsClick = false;
var backClick = false;
var shouldersClick = false;
var numMuscles = 0;
const chest = document.getElementById('chest');
let chestCount = 0;
var clickCounts = 0;
var firstMuscle = "";
chest.addEventListener('click', function() {
    chestCount++;
    if(chestCount % 2 === 1) {
        chest.innerHTML="<button type='button'class='btn btn-success' style='color:white; background-color:#00b159; border-color:#00b159;'>Chest</button>";
        chestClick = true;
        numMuscles++;
        clickCounts++;
        musclesSelected.push("Chest");
        if(clickCounts ===1 ){
            firstMuscle = "chest";
        }
    } else if (chestCount % 2 === 0) {
        chest.innerHTML="<button type='button'class='btn btn-success' style='color:black; background-color:white;'>Chest</button>";
        chestClick = false;
        numMuscles--;
        musclesSelected.splice(musclesSelected.indexOf('Chest'),1);
    }
});
const legs = document.getElementById('legs');
let legsCount = 0;
legs.addEventListener('click', function() {
    legsCount++;
    if(legsCount % 2 === 1) {
        legs.innerHTML="<button type='button'class='btn btn-success' style='color:white; background-color:#00b159; border-color:#00b159;'>Legs</button>";
        legsClick = true;
        numMuscles++;
        clickCounts++;
        musclesSelected.push("Legs");
        if(clickCounts ===1 ){
            firstMuscle = "legs";
        }
    } else if (legsCount % 2 === 0) {
        legs.innerHTML="<button type='button'class='btn btn-success' style='color:black; background-color:white;'>Legs</button>";
        legsClick = false;
        numMuscles--;
        musclesSelected.splice(musclesSelected.indexOf('Legs'),1);
    }
});

const tri = document.getElementById('tri');
let triCount = 0;
tri.addEventListener('click', function() {
    triCount++;
    if(triCount % 2 === 1) {
        tri.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Triceps</button>";
        tricepsClick = true;
        numMuscles++;
        clickCounts++;
        musclesSelected.push("Triceps");
        if(clickCounts ===1 ){
            firstMuscle = "triceps";
        }
    } else if (triCount % 2 === 0) {
        tri.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white;'>Triceps</button>";
        tricepsClick = false;
        numMuscles--;
        musclesSelected.splice(musclesSelected.indexOf('Triceps'),1);
    }
});

const bi = document.getElementById('bi');
let biCount = 0;
bi.addEventListener('click', function() {
    biCount++;
    if(biCount % 2 === 1) {
        bi.innerHTML="<button type='button' class='btn btn-success'style='color:white; background-color:#00b159; border-color:#00b159;'>Biceps</button>";
        bicepsClick = true;
        numMuscles++;
        clickCounts++;
        musclesSelected.push("Biceps");
        if(clickCounts ===1 ){
            firstMuscle = "biceps";
        }
    } else if (biCount % 2 === 0) {
        bi.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white;'>Biceps</button>";
        bicepsClick = false;
        numMuscles--;
        musclesSelected.splice(musclesSelected.indexOf('Biceps'),1);
    }
});

const back = document.getElementById('back');
let backCount = 0;
back.addEventListener('click', function() {
    backCount++;
    if(backCount % 2 === 1) {
        back.innerHTML="<button type='button'class='btn btn-success' style='color:white; background-color:#00b159; border-color:#00b159;'>Back</button>";
        backClick = true;
        numMuscles++;
        clickCounts++;
        musclesSelected.push("Back");
        if(clickCounts ===1 ){
            firstMuscle = "back";
        }
    } else if (backCount % 2 === 0) {
        back.innerHTML="<button type='button' class='btn btn-success'style='color:black; background-color:white;'>Back</button>";
        backClick = false;
        numMuscles--;
        musclesSelected.splice(musclesSelected.indexOf('Back'),1);
    }
});
const shoulders = document.getElementById('shoulders');
let shouldersCount = 0;
shoulders.addEventListener('click', function() {
    shouldersCount++;
    if(shouldersCount % 2 === 1) {
        shoulders.innerHTML="<button type='button'class='btn btn-success' style='color:white; background-color:#00b159; border-color:#00b159;'>Shoulders</button>";
        shouldersClick = true;
        numMuscles++;
        clickCounts++;
        musclesSelected.push("Shoulders");
        if(clickCounts ===1 ){
            firstMuscle = "shoulders";
        }
    } else if (shouldersCount % 2 === 0) {
        shoulders.innerHTML="<button type='button'class='btn btn-success' style='color:black; background-color:white;'>Shoulders</button>";
        shouldersClick = false;
        numMuscles--;
        musclesSelected.splice(musclesSelected.indexOf('Shoulders'),1);
    }
});


var chestWorkout = {
    cables: ["two hand simultaneous cable flyes", "one hand alternating cable flyes", "cable push"],
    machines: ["seated push press", "flat machine push press", "incline machine push press"],
    bodyweight: ["push up"],
    barbell: ["flat bench press", "incline bench press", "decline bench press"],
    dumbbell: ["flat bench dumbbell press", "incline dumbbell press", "decline dumbbell press"]
}

var legsWorkout = {
    cables: ["cable squats", "glute kickback", "alternating leg abduction"],
    machines: ["hack squat", "inner thigh machine", "outer thigh machine", "seated leg press", "leg press", "hamstring curl"],
    bodyweight: ["squats", "jump squats", "alternating lunges"],
    barbell: ["barbell back squat", "barbell front squat", "barbell jump squat", "barbell box squat"],
    dumbbell: ["dumbell lunges", "dumbbell lunges", "dumbbell bench step up", "dumbbell deadlift"]
}

var tricepsWorkout = {
    cables: ["tricep ez-curl pulldown", "overhead rope extension", "single arm cable pulldown"],
    machines: ["seated dips", "overhead cable extension"],
    bodyweight: ["push ups", "dips"],
    barbell: ["close grip bench press", "barbell skull crushers", "barbell tricep extension"],
    dumbbell: ["dumbbell overhead extension", "dumbbell skull crushers", "dumbbell kick back"]
}

var bicepsWorkout = {
    cables: ["ez-curl bicep curl", "single cable bicep curl", "bicep cable curls (high)"],
    machines: ["alternating hand bicep curl (high)", "machine preacher curl"],
    bodyweight: ["chip ups", "close grip bicep curl"],
    barbell: ["ez-bar bicep curl", "barbell bicep curl", "barbell hammer curl"],
    dumbbell: ["dumbbell standing bicep curl", "dumbell seated incline dumbbell curl", "standing dumbell hammer curl"]
}

var backWorkout = {
    cables: ["standing single arm cable row", "standing rope pull", "lat pulldown", "rope face pull"],
    machines: ["lat machine pulldown", "seated machine pull"],
    bodyweight: ["wide grip pull ups", "close grip chin up"],
    barbell: ["barbell bent over row", "barbell t-bar row"],
    dumbbell: ["standing dumbbell bent over row", "single arm dumbbell row"]
}

var shouldersWorkout = {
    cables: ["cable single arm front frose", "cable single arm lateral raise", "rope facepull"],
    machines: ["machine shoulder press", "machine lateral raise"],
    bodyweight: ["push up"],
    barbell: ["barbell standing shoulder press", "barbell seated shoulder press", "barbell standing upright row"],
    dumbbell: ["dumbbell lateral raise", "dumbbell seated arnold press", "dumbell seated shoulder press", "dumbell standing shoulder press", "standing dumbbell upright row"]
}


//get number of muslces that are selected

var rem3 = 0;
var rem4 = 0;
var rem5 = 0;

numBBEquipment = 0;
numDBEquipment = 0;
numMEqupiment = 0;
numCEquipment = 0;
numBWEqupment = 0;
var setPerEquipment = 0;
var woCardio;




submitBtn2.addEventListener("click", function() {

    totalTime = 0;
    document.getElementById('mins').value = parseInt(document.getElementById("mins").value);
    document.getElementById('hours').value = parseInt(document.getElementById("hours").value);
    hours = parseInt(document.getElementById("hours").value);
    mins = parseInt(document.getElementById("mins").value);
    if(isNaN(hours) === true ) {
        hours = 0;
    }
    if(isNaN(mins) === true) {
        mins = 0;
    }
    totalTime = (hours*60) + mins;
    woCardio = totalTime;
    if(cardioAns === true) {
        cardioTime = document.getElementById('cardioTime').value;
    } else {cardioTime = 0;}

    totalTime = totalTime-cardioTime;
    restAndSets = intensityTime + 1;
    //totalSets
    totalSets = Math.floor(totalTime/restAndSets);
    //get number sets per muscle
    //divisible by 3?
    rem3 = setPerMuscle%3;
    //divisible by 4?
    rem4 = setPerMuscle%4;
    //divisible by 5?
    rem5 = setPerMuscle%5;
    remAns = 0;
    //test all possibilities, choose one with 0
    if(rem3 === 0 && rem4 === 0 && rem5 === 0) {
        remAns = 4;
    } else if (rem3 === 0 && rem4 === 0 && rem5 > 0) {
        remAns = 4;
    } else if (rem3 === 0 && rem4 > 0 && rem4 > 0) {
        remAns = 3;
    } else if (rem3 > 0 && rem4 === 0 && rem5 > 0) {
        remAns = 4;
    } else if (rem3 > 0 && rem4 > 0 && rem5 === 0) {
        remAns = 5;
    } else if((rem3 < rem4) && (rem3 < rem5)) {
        remAns = 3;
    } else if((rem4 < rem3) && (rem4 < rem5)) {
        remAns = 4;
    } else if((rem5 < rem3) && (rem5 < rem4)) {
        remAns = 5;
    } else if((rem3 === rem4) && (rem4 > 0)) {
        remAns = 4;
    } else if((rem3 === rem5) && (rem3 > 0)) {
        remAns = 3;
    } else if((rem4 === rem5) && (rem4 > 0)) { 
        remAns = 4;
    }
    //get first muscle clicked
    //total number of exercises to be performed at workout
    excercisePerMuscle = Math.floor(totalSets/remAns);
    //number of sets per muscle group, add remaining to first one being clicked
    setsPerMuscle = Math.floor(excercisePerMuscle/numMuscles);
    remSets = excercisePerMuscle%numMuscles;

    var muscleSetsArr = [];

    //number of excercises for each muscle
    for(i=0; i < numMuscles; i++) {
        muscleSetsArr.push(setsPerMuscle);
    }
    muscleSetsArr[0] += remSets;

    //firstMuscle provides string of muscle first clicked

    //find which is closer to 3,4,5
    //get number of sets for each equipment used

    //get workout algorithm

    var x = 0;
    var cableCount =0;
    var dbCount = 0;
    var machinesCount=0;
    var bwCount=0;
    var bbCount=0;
    var workout = [];
    var i = 0;
    var y = 0;


    //alert handling

    
    while(y<musclesSelected.length) {
        while(x<muscleSetsArr[i]){
            if(musclesSelected[y]==='Chest') {
                if(equipmentSelected.includes('barbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(chestWorkout.barbell[bbCount] === undefined) {
                        bbCount=0;
                    } 
                    workout.push("Chest: " + chestWorkout.barbell[bbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bbCount++;
                    x++;
                }
                if(equipmentSelected.includes('dumbbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(chestWorkout.dumbbell[dbCount] === undefined) {
                        dbCount=0;
                    } 
                    workout.push("Chest: " + chestWorkout.dumbbell[dbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    dbCount++;
                    x++;
                }
                if(equipmentSelected.includes('cables')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount=0;
                        dbCount=0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(chestWorkout.cables[cableCount] === undefined) {
                        cableCount=0;
                    } 
                    workout.push("Chest: " + chestWorkout.cables[cableCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    cableCount++;
                    x++;
                }
                if(equipmentSelected.includes('machines')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(chestWorkout.machines[machinesCount] === undefined) {
                        machinesCount=0;
                    }                    
                    workout.push("Chest: " + chestWorkout.machines[machinesCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    machinesCount++;
                    x++;
                }
                if(equipmentSelected.includes('bodyweight')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(chestWorkout.bodyweight[bwCount] === undefined) {
                        bwCount=0;
                    }
                    workout.push("Chest: " + chestWorkout.bodyweight[bwCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bwCount++;
                    x++;
                }
            }
            else if(musclesSelected[y]==='Legs') {
                if(equipmentSelected.includes('barbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(legsWorkout.barbell[bbCount] === undefined) {
                        bbCount=0;
                    } 
                    workout.push("Legs: " + legsWorkout.barbell[bbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bbCount++;
                    x++;
                }
                if(equipmentSelected.includes('dumbbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(legsWorkout.dumbbell[dbCount] === undefined) {
                        dbCount=0;
                    } 
                    workout.push("Legs: " + legsWorkout.dumbbell[dbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    dbCount++;
                    x++;
                }
                if(equipmentSelected.includes('cables')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount=0;
                        dbCount=0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(legsWorkout.cables[cableCount] === undefined) {
                        cableCount=0;
                    } 
                    workout.push("Legs: " + legsWorkout.cables[cableCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    cableCount++;
                    x++;
                }
                if(equipmentSelected.includes('machines')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(legsWorkout.machines[machinesCount] === undefined) {
                        machinesCount=0;
                    }                    
                    workout.push("Legs: " + legsWorkout.machines[machinesCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    machinesCount++;
                    x++;
                }
                if(equipmentSelected.includes('bodyweight')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(legsWorkout.bodyweight[bwCount] === undefined) {
                        bwCount=0;
                    }
                    workout.push("Legs: " + legsWorkout.bodyweight[bwCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bwCount++;
                    x++;
                }
            }
            else if(musclesSelected[i]==='Triceps') {
                if(equipmentSelected.includes('barbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(tricepsWorkout.barbell[bbCount] === undefined) {
                        bbCount=0;
                    } 
                    workout.push("Triceps: " + tricepsWorkout.barbell[bbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bbCount++;
                    x++;
                }
                if(equipmentSelected.includes('dumbbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(tricepsWorkout.dumbbell[dbCount] === undefined) {
                        dbCount=0;
                    } 
                    workout.push("Triceps: " + tricepsWorkout.dumbbell[dbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    dbCount++;
                    x++;
                }
                if(equipmentSelected.includes('cables')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount=0;
                        dbCount=0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(tricepsWorkout.cables[cableCount] === undefined) {
                        cableCount=0;
                    } 
                    workout.push("Triceps: " + tricepsWorkout.cables[cableCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    cableCount++;
                    x++;
                }
                if(equipmentSelected.includes('machines')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(tricepsWorkout.machines[machinesCount] === undefined) {
                        machinesCount=0;
                    }                    
                    workout.push("Triceps: " + tricepsWorkout.machines[machinesCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    machinesCount++;
                    x++;
                }
                if(equipmentSelected.includes('bodyweight')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(tricepsWorkout.bodyweight[bwCount] === undefined) {
                        bwCount=0;
                    }
                    workout.push("Triceps: " + tricepsWorkout.bodyweight[bwCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bwCount++;
                    x++;
                }
            }
            else if(musclesSelected[i]==='Biceps') {
                if(equipmentSelected.includes('barbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(bicepsWorkout.barbell[bbCount] === undefined) {
                        bbCount=0;
                    } 
                    workout.push("Biceps: " + bicepsWorkout.barbell[bbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bbCount++;
                    x++;
                }
                if(equipmentSelected.includes('dumbbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(bicepsWorkout.dumbbell[dbCount] === undefined) {
                        dbCount=0;
                    } 
                    workout.push("Biceps: " + bicepsWorkout.dumbbell[dbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    dbCount++;
                    x++;
                }
                if(equipmentSelected.includes('cables')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount=0;
                        dbCount=0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(bicepsWorkout.cables[cableCount] === undefined) {
                        cableCount=0;
                    } 
                    workout.push("Biceps: " + bicepsWorkout.cables[cableCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    cableCount++;
                    x++;
                }
                if(equipmentSelected.includes('machines')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(bicepsWorkout.machines[machinesCount] === undefined) {
                        machinesCount=0;
                    }                    
                    workout.push("Biceps: " + bicepsWorkout.machines[machinesCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    machinesCount++;
                    x++;
                }
                if(equipmentSelected.includes('bodyweight')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(bicepsWorkout.bodyweight[bwCount] === undefined) {
                        bwCount=0;
                    }
                    workout.push("Biceps: " + bicepsWorkout.bodyweight[bwCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bwCount++;
                    x++;
                }
            }
            else if(musclesSelected[i]==='Back') {
                if(equipmentSelected.includes('barbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(backWorkout.barbell[bbCount] === undefined) {
                        bbCount=0;
                    } 
                    workout.push("Back: " + backWorkout.barbell[bbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bbCount++;
                    x++;
                }
                if(equipmentSelected.includes('dumbbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(backWorkout.dumbbell[dbCount] === undefined) {
                        dbCount=0;
                    } 
                    workout.push("Back: " + backWorkout.dumbbell[dbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    dbCount++;
                    x++;
                }
                if(equipmentSelected.includes('cables')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount=0;
                        dbCount=0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(backWorkout.cables[cableCount] === undefined) {
                        cableCount=0;
                    } 
                    workout.push("Back: " + backWorkout.cables[cableCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    cableCount++;
                    x++;
                }
                if(equipmentSelected.includes('machines')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(backWorkout.machines[machinesCount] === undefined) {
                        machinesCount=0;
                    }                    
                    workout.push("Back: " + backWorkout.machines[machinesCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    machinesCount++;
                    x++;
                }
                if(equipmentSelected.includes('bodyweight')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(backWorkout.bodyweight[bwCount] === undefined) {
                        bwCount=0;
                    }
                    workout.push("Back: " + backWorkout.bodyweight[bwCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bwCount++;
                    x++;
                }
            }
            else if(musclesSelected[i]==='Shoulders') {
                if(equipmentSelected.includes('barbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(shouldersWorkout.barbell[bbCount] === undefined) {
                        bbCount=0;
                    } 
                    workout.push("Shoulders: " + shouldersWorkout.barbell[bbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bbCount++;
                    x++;
                }
                if(equipmentSelected.includes('dumbbell')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        x=0;
                        y++;
                        continue;
                    }
                    if(shouldersWorkout.dumbbell[dbCount] === undefined) {
                        dbCount=0;
                    } 
                    workout.push("Shoulders: " + shouldersWorkout.dumbbell[dbCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    dbCount++;
                    x++;
                }
                if(equipmentSelected.includes('cables')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount=0;
                        dbCount=0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        y++;
                        x=0;
                        continue;
                    }
                    if(shouldersWorkout.cables[cableCount] === undefined) {
                        cableCount=0;
                    } 
                    workout.push("Shoulders: " + shouldersWorkout.cables[cableCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    cableCount++;
                    x++;
                }
                if(equipmentSelected.includes('machines')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        y++;
                        x=0;
                        continue;
                    }
                    if(shouldersWorkout.machines[machinesCount] === undefined) {
                        machineCount=0;
                    }                    
                    workout.push("Shoulders: " + shouldersWorkout.machines[machinesCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    machinesCount++;
                    x++;
                }
                if(equipmentSelected.includes('bodyweight')) {
                    if(x===muscleSetsArr[i]) {
                        cableCount =0;
                        dbCount = 0;
                        machinesCount=0;
                        bwCount=0;
                        bbCount=0;
                        i++;
                        y++;
                        x=0;
                        continue;
                    }
                    if(shouldersWorkout.bodyweight[bwCount] === undefined) {
                        bwCount=0;
                    }
                    workout.push("Shoulders: " + shouldersWorkout.bodyweight[bwCount] + " for 12 reps and " + setsPerMuscle + " sets");
                    bwCount++;
                    x++;
                }
            }
        }
        if(x===muscleSetsArr[i]) {
            cableCount =0;
            dbCount = 0;
            machinesCount=0;
            bwCount=0;
            bbCount=0;
            i++;
            x=0;
            y++;
            continue;
        }
    }

    if(document.getElementById('hours').value >= 3 && parseInt(document.getElementById('mins').value) > 0) {
        alert('Maximum workout is 3 hours (180 minutes)');
        document.getElementById('hours').value = 3;
        document.getElementById('mins').value = 0;
        woCardio = 180;
        totalTime = 180;
        workoutTitle.innerHTML="";
        workoutTitle.innerHTML="";
        totalLength.innerHTML=""; 
        cardioT.innerHTML= "";
        workoutBreakdown.innerHTML="";
        //print workout plan
        workoutTitle.innerHTML = "Suggested Plan";
        totalLength.innerHTML = "<h5>Total Length of Workout: " + woCardio + " minutes</h5>";
        cardioT.innerHTML = "<h5>Total Length of Cardio Session: " + cardioTime + " minutes</h5>";
        var i;
        workoutBreakdown.innerHTML += "<h5>Excercise Plan: " + totalTime + " minutes </h5>";
        for(i=0; i<workout.length;i++) {
            workoutBreakdown.innerHTML += workout[i] + "<br/>";
        }
    }
    if(parseInt(document.getElementById('hours').value) < 0 && parseInt(document.getElementById('mins').value < 45)) {
        alert('Minimum work out has to be greater than 45 minutes & negative hours');
        document.getElementById('hours').value = 0;
        document.getElementById('mins').value = 45;
        woCardio = 0;
        totalTime = 0;
        workoutTitle.innerHTML="";
        workoutTitle.innerHTML="";
        totalLength.innerHTML=""; 
        cardioT.innerHTML= "";
        workoutBreakdown.innerHTML="";
        //print workout plan
        workoutTitle.innerHTML = "Suggested Plan";
        totalLength.innerHTML = "<h5>Total Length of Workout: " + woCardio + " minutes</h5>";
        cardioT.innerHTML = "<h5>Total Length of Cardio Session: " + cardioTime + " minutes</h5>";
        var i;
        workoutBreakdown.innerHTML += "<h5>Excercise Plan: " + totalTime + " minutes </h5>";
        for(i=0; i<workout.length;i++) {
            workoutBreakdown.innerHTML += workout[i] + "<br/>";
        }
    }

    if(parseInt(document.getElementById('hours').value) < 0 && document.getElementById('mins').value > 0) {
        alert('Minimum work out has to be greater than negative minutes');
        document.getElementById('mins').value = 0;
        document.getElementById('hours').value = 0;
        woCardio = document.getElementById('hours').value;
        totalTime = document.getElementById('hours').value;
        workoutTitle.innerHTML="";
        workoutTitle.innerHTML="";
        totalLength.innerHTML=""; 
        cardioT.innerHTML= "";
        workoutBreakdown.innerHTML="";
        //print workout plan
        workoutTitle.innerHTML = "Suggested Plan";
        totalLength.innerHTML = "<h5>Total Length of Workout: " + woCardio + " minutes</h5>";
        cardioT.innerHTML = "<h5>Total Length of Cardio Session: " + cardioTime + " minutes</h5>";
        var i;
        workoutBreakdown.innerHTML += "<h5>Excercise Plan: " + totalTime + " minutes </h5>";
        for(i=0; i<workout.length;i++) {
            workoutBreakdown.innerHTML += workout[i] + "<br/>";
        }
    }

    if(document.getElementById('hours').value < 0 && document.getElementById('mins').value < 0) {
        alert('Minimum work out has to be greater than negative minutes and hours');
        document.getElementById('mins').value = 0;
        document.getElementById('hours').value = 0;
        woCardio = 0;
        totalTime = 0;
        workoutTitle.innerHTML="";
        workoutTitle.innerHTML="";
        totalLength.innerHTML=""; 
        cardioT.innerHTML= "";
        workoutBreakdown.innerHTML="";
        //print workout plan
        workoutTitle.innerHTML = "Suggested Plan";
        totalLength.innerHTML = "<h5>Total Length of Workout: " + woCardio + " minutes</h5>";
        cardioT.innerHTML = "<h5>Total Length of Cardio Session: " + cardioTime + " minutes</h5>";
        var i;
        workoutBreakdown.innerHTML += "<h5>Excercise Plan: " + totalTime + " minutes </h5>";
        for(i=0; i<workout.length;i++) {
            workoutBreakdown.innerHTML += workout[i] + "<br/>";
        }
    }

    //clear any recent data

    workoutTitle.innerHTML="";
    workoutTitle.innerHTML="";
    totalLength.innerHTML=""; 
    cardioT.innerHTML= "";
    workoutBreakdown.innerHTML="";
    //print workout plan
    workoutTitle.innerHTML = "Suggested Plan";
    totalLength.innerHTML = "<h5>Total Length of Workout: " + woCardio + " minutes</h5>";
    cardioT.innerHTML = "<h5>Total Length of Cardio Session: " + cardioTime + " minutes</h5>";
    var i;
    workoutBreakdown.innerHTML += "<h5>Excercise Plan: " + totalTime + " minutes </h5>";
    for(i=0; i<workout.length;i++) {
        workoutBreakdown.innerHTML += workout[i] + "<br/>";
    }


});

