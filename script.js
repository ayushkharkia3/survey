const database= firebase.database();
const uRef=database.ref('/survey');   

function addData()
{
    uRef.child(document.getElementById("contactNumber").value).set({
        name: document.getElementById("name").value,
        email: document.getElementById("emailAddress").value,
        contact: document.getElementById("contactNumber").value,
        question1: document.getElementById("question1").value,
        question2: document.getElementById("question2").value,
        question3: document.getElementById("question3").value
    });
    console.log("ADDED SUCCESSFULLY");
    window.alert("Submission Successful");
}


function viewData(){
    const conNum=document.getElementById("cNumber").value;
    var flag=0;
    var qq1=["JAVA","PYTHON","C++"];
    var qq2=["WEB","APP","AI ML"];
    var qq3=["YES","NO"];
    uRef.on("value",function(snapshot){
        snapshot.forEach(function(childsnapshot){
            var databaseKey=childsnapshot.val();
            var contactNum=databaseKey.contact;
            if(conNum==contactNum){
                flag=1;
            document.getElementById("yName").innerHTML="Name: "+databaseKey.name;
            document.getElementById("eMail").innerHTML="Email id: "+databaseKey.email;
            document.getElementById("contact").innerHTML="Contact Number: "+databaseKey.contact;
            document.getElementById("q1").innerHTML="WHAT IS YOUR PREFERRED CODING LANGUAGE? :"+qq1[parseInt(databaseKey.question1)-1];
            document.getElementById("q2").innerHTML="WHAT DEVELOPMENT DO YOU PREFER? :"+qq2[parseInt(databaseKey.question2)-1];
            document.getElementById("q3").innerHTML="DO PROGRAMMERS HAVE FUTURE? :"+qq3[parseInt(databaseKey.question3)-1];
        }})
    })

    setTimeout(()=>{if(flag==0)
    {
        document.getElementById("yName").innerHTML="INVALID CONTACT NUMBER";
        document.getElementById("eMail").innerHTML=" ";
            document.getElementById("contact").innerHTML=" ";
            document.getElementById("q1").innerHTML=" ";
            document.getElementById("q2").innerHTML=" ";
            document.getElementById("q3").innerHTML=" ";
    }},1500)
}

function percentage(x,y,z){
    var s=parseInt(0);
    var i;
    for(i=0;i<z;i=i+1){
            s=parseInt(s+parseInt(y[i]));
    }
    var percent= (x/s)*100.0;
    
    return percent;

}

function fgetData(){ 
    var cn=document.getElementById("cno").value;
    var ques1=[0,0,0];
    var ques2=[0,0,0];
    var flag=0;
    var ques3=[0,0];
    uRef.on("value",function(snapshot){
        snapshot.forEach(function(childsnapshot){
            var databaseKey=childsnapshot.val();

            if(cn==databaseKey.contact){
                flag=1;
            }

            ques1[parseInt(databaseKey.question1)-1]=parseInt(ques1[parseInt(databaseKey.question1)-1])+parseInt(1);
        ques2[parseInt(databaseKey.question2)-1]=parseInt(ques1[parseInt(databaseKey.question2)-1])+parseInt(1);
        ques3[parseInt(databaseKey.question3)-1]=parseInt(ques1[parseInt(databaseKey.question3)-1])+parseInt(1);
        })});
        setTimeout(()=>{
        if(flag==1){
    document.getElementById("q1a1").innerHTML="JAVA: "+percentage(ques1[0],ques1,3)+"%";
    document.getElementById("q1a2").innerHTML="PYTHON: "+percentage(ques1[1],ques1,3)+"%";
    document.getElementById("q1a3").innerHTML="C++: "+percentage(ques1[2],ques1,3)+"%";
    document.getElementById("q2a1").innerHTML="WEB: "+percentage(ques2[0],ques2,3)+"%";
    document.getElementById("q2a2").innerHTML="APP 1: "+percentage(ques2[1],ques2,3)+"%";
    document.getElementById("q2a3").innerHTML="AI ML: "+percentage(ques2[2],ques2,3)+"%";
    document.getElementById("q3a1").innerHTML="YES : "+percentage(ques3[0],ques3,2)+"%";
    document.getElementById("q3a2").innerHTML="NO: "+percentage(ques3[1],ques3,2)+"%";
        }
        else
        {
            window.alert("CONTACT NUMBER NOT FOUND");
        };},1000);
    
}