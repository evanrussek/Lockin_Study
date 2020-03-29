
// firebase stuff
firebase.firestore().enablePersistence().catch(function(err) {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
    }
});

//firebase.auth().signInAnonymously(); // check that you can sign in...

// User ID
var uid;

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// get the prolific ID, // get task version - for counter-balancing
// get
if (window.location.search.indexOf('PROLIFIC_PID') > -1) {
  var subjectID = getQueryVariable('PROLIFIC_PID'); // check that this i a string or something...
}
else {
    var subjectID = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no prolific ID, generate random ID (for testing)
}

if (window.location.search.indexOf('STUDY_ID') > -1) {
  var studyID = getQueryVariable('STUDY_ID'); // check that this i a string or something...
}
else {
    var studyID = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no prolific ID, generate random ID (for testing)
}

if (window.location.search.indexOf('SESSION_ID') > -1) {
  var sessionID = getQueryVariable('SESSION_ID'); // check that this i a string or something...
}
else {
    var sessionID = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no prolific ID, generate random ID (for testing)
}

if (window.location.search.indexOf('condID') > -1) {
  var condID = getQueryVariable('condID'); // check that this i a string or something...
}
else {
    var condID = 3; // if no prolific ID, generate random ID (for testing)
}

if (window.location.search.indexOf('tpID') > -1) {
  var tpID = getQueryVariable('tpID'); // check that this i a string or something...
}
else {
    var tpID = 3; // if no prolific ID, generate random ID (for testing)
}
var uid;
if (window.location.search.indexOf('uid') > -1) {
  console.log('found a UID!')
  var uid = getQueryVariable('uid'); // check that this i a string or something...
  firebase.auth().signInAnonymously();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //uid = user.uid;
      task(uid);
    }
  })
}
else {
    console.log('no uid found')
    // When signed in, get the user ID
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        uid = user.uid;
        task(uid);
      }
  })
}

function task(uid){

  // get or generate a subjectID
  // get or generate a subjectID


  // get the database going
  // create a reference to the database
  var db = firebase.firestore();
  console.log(db)

  var run_name = 'tp1';

  // record new date and start time
  db.collection('lockintask').doc(run_name).collection('subjects').doc(uid).collection('qtask').doc('start').set({
      subjectID: subjectID,  // this refers to the subject's ID from prolific/
      uid:uid,
      tpID: tpID,
      condID:condID,
      studyID: studyID,
      sessionID: sessionID,
      date: new Date().toLocaleDateString(),
      start_time: new Date().toLocaleTimeString()
  })

  var full_screen = {
    type: 'fullscreen',
    fullscreen_mode: true
  };

/* create timeline */
var timeline = [];
timeline.push(full_screen);

// make an instruction page.... // and also a you've finished the task page whcih send them back to prolific
timeline = timeline.concat(instruction_pages_a);

// do you also want teps? //go through all of these and find out how long they take...

timeline.push(age_question);
timeline.push(sex_question);
timeline.push(piano_question);
timeline.push(neo_questionairre)
timeline.push(idas_questionairre)
timeline.push(pss_questionairre)
timeline.push(apathy_questionairre)
timeline.push(teps_questionairre) // this is short...
timeline.push(cov_ac1_questionairre)
timeline.push(cov_ac2_questionairre)
timeline.push(act_general_question) //
timeline.push(cov_stress1_questionairre)
timeline.push(covid_general_stress_question)
timeline.push(cov_soc1_questionairre)
timeline.push(cov_soc2_questionairre)
timeline.push(social_general_soc_question)




  // compute bonus for the main task...
  var end_screen = {
      type: 'html-button-response',
      timing_post_trial: 0,
      choices: ['End Task'],
      is_html: true,
      stimulus: function(){

        var string = 'You have finished this task. Thank you for your contribution to science! \
               As a reminder, you will be contacted in two weeks to complete the second part of the study. \
                You will paid upon completion of the second part of the study, two weeks from now. \
                All bonus payment you have thus far accumulated will carry forward to the payment on that date \
              <b> PLEASE CLICK END TASK TO SUBMIT THIS TASK TO PROLIFIC </b>.';


            var q_data = jsPsych.data.get().json();//jsPsych.data.get().filter({trial_num: 'Q'}).json()
              db.collection('lockintask').doc(run_name).collection('subjects').doc(uid).collection('qtask').doc('qdata').set({
                q_data: q_data,
                end_time:  new Date().toLocaleTimeString()
              })
     return string;
    },
     on_finish: function(){
       // get the window location correct.
       window.location = "https://app.prolific.co/submissions/complete?cc=497ACFD8";
     }
  }
  timeline.push(end_screen)

  // recording data...

  // need a screen thanking them for the task and also figuring out the bonus... -- do this tonight
  var instruc_images = instruction_pagelinks_a.concat(instruction_pagelinks_b);
  instruc_images.push("Stimuli/warrior.svg");

console.log(timeline)

  /* start the experiment */
  jsPsych.init({
    timeline: timeline,
    preload_images: instruc_images,
    show_preload_progress_bar: true,
    on_finish: function() {
      console.log('done')
      // download many files...?
      //jsPsych.data.get().localSave('csv','test_res.csv');
    //on_finish: saveData
    }
  });
}
