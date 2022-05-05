video = "";
status = "";
object = [];

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
    
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("numberofobjects").innerHTML = "Number of Objects Detected: " + object.length;
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            stroke(r, g, b);
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}


function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(2.5);
}

function gotResult( error, result)
{
    if(error)
    {
        console.log(error);
    }
    console.log(result);
    object = result;
}