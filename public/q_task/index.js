
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

// make an instruction page.... // and also a you've finished the task page...
timeline = timeline.concat(intro_w_trials);

  // timeline = [];

  var age_question = {
    type: 'survey-text',
    questions: [
      {prompt: "How many years old are you?"}
    ],
    data:{trial_num: 'Q', Q_name: 'age'}
  };
  timeline.push(age_question);

  var sex_question = {
    type: 'evan-quiz',
    questions: [
      {prompt: "What is your sex?", options: ['male', 'female', 'other']}
    ],
    data:{trial_num: 'Q', Q_name: 'sex'}
  };
  timeline.push(sex_question);

  var piano_question = {
    type: 'evan-quiz',
    questions: [
      {prompt: "Do you either play piano or regularly engage in a similar sort of fine motor hand movement activity?", options: ['yes', 'no']}
    ],
    data:{trial_num: 'Q', Q_name: 'piano'}
  };

  timeline.push(piano_question);

  var comment_question = {
    type: 'survey-text',
    questions: [
      {prompt: "Do you have any comments on the task?"}
    ],
    data:{trial_num: 'Q', Q_name: 'comments'},
    on_finish: function(){
      var q_data = jsPsych.data.get().filter({trial_num: 'Q'}).json()
      db.collection('foragetask').doc(run_name).collection('subjects').doc(uid).collection('taskdata').doc('Q_data').set({
        trial_data: q_data
      })
    }
  }
  timeline.push(comment_question);

  // compute bonus for the main task...
  var end_screen = {
   type: 'html-button-response',
      timing_post_trial: 0,
      choices: ['End Task'],
      is_html: true,
      stimulus: function(){

        var random_total_points = jsPsych.randomization.sampleWithoutReplacement(total_points_arr, 1);

        var string = 'You have finished the task. Thank you for your contribution to science! \
                 On a randomly selected round, you recevieved ' + random_total_points + ' points. Your bonus will be based on this number. \
              <b> PLEASE CLICK END TASK TO SUBMIT THE TASK TO PROLIFIC </b>.';

        db.collection('foragetask').doc(run_name).collection('subjects').doc(uid).collection('taskdata').doc('end').set({
          bonus_points: random_total_points,
          end_time:  new Date().toLocaleTimeString()
        })
     return string;
    },
     on_finish: function(){
       window.location = "https://app.prolific.co/submissions/complete?cc=1177C813"
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
