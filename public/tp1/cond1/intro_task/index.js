// create the timeline...

// need to add the consent stuff.
// edit instructions and preload instruction pages

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

firebase.auth().signInAnonymously();

// User ID
var uid;

// Consent form
var check_consent = function (elem) {
  if ($('#consent_checkbox1').is(':checked') && $('#consent_checkbox2').is(':checked') &&
      $('#consent_checkbox3').is(':checked') && $('#consent_checkbox4').is(':checked') &&
      $('#consent_checkbox5').is(':checked') && $('#consent_checkbox6').is(':checked') &&
      $('#consent_checkbox7').is(':checked'))
      {
          // When signed in, get the user ID
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              uid = user.uid;
              task(uid);
            }
          });
      }

  else {
      alert("Unfortunately you will not be unable to participate in this research study if you do " +
          "not consent to the above. Thank you for your time.");
      return false;
  }
};

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

function task(uid){

  // get or generate a subjectID

  tpID_num = 1;
  condID_num = 1;

  tpID = tpID_num.toString();
  condID = condID_num.toString();

  // get the prolific ID, // get task version - for counter-balancing
  // get
  if (window.location.search.indexOf('PROLIFIC_PID') > -1) {
    var subjectID = getQueryVariable('PROLIFIC_PID'); // check that this i a string or something...
  }
  else {
      var subjectID_num = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no prolific ID, generate random ID (for testing)
      var subjectID = subjectID_num.toString();
  }

  if (window.location.search.indexOf('STUDY_ID') > -1) {
    var studyID = getQueryVariable('STUDY_ID'); // check that this i a string or something...
  }
  else {
      var studyID_num = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no prolific ID, generate random ID (for testing)
      var studyID = studyID_num.toString();
  }

  if (window.location.search.indexOf('SESSION_ID') > -1) {
    var sessionID = getQueryVariable('SESSION_ID'); // check that this i a string or something...
  }
  else {
      var sessionID_num = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no prolific ID, generate random ID (for testing)
      var sessionID = sessionID_num.toString();
  }

  // get the database going
  // create a reference to the database
  var db = firebase.firestore();

  var run_name = 'tp1';

  ///// change this record new date and start time
  db.collection('lockintask').doc(run_name).collection('subjects').doc(uid).set({
      subjectID: subjectID,
      uid: uid,
      tpID: tpID,
      condID:condID,
      studyID: studyID,
      sessionID: sessionID
  })

  // record new date and start time
  db.collection('lockintask').doc(run_name).collection('subjects').doc(uid).collection('introtask').doc('start').set({
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

timeline = timeline.concat(intro);

// we'll push them to the new place...

  // compute bonus for the main task...
  var end_screen = {
   type: 'html-button-response',
      timing_post_trial: 0,
      choices: ['Continue'],
      is_html: true,
      stimulus: function(){

        var string = 'Press continue to begin the first task!';

        //db.collection('foragetask').doc(run_name).collection('subjects').doc(uid).collection('taskdata').doc('end').set({
         // bonus_points: random_total_points,
          //end_time:  new Date().toLocaleTimeString()
        //})
     return string;
    },
     on_finish: function(){
         // vary this based on task condition number...
         // change this to the location of the first task, ... include prolific ID and uid, and condition..
        if (condID_num == 1){
            var nextlink = "https://lockinstudy.firebaseapp.com/forage_task/?PROLIFIC_PID=" +
             subjectID + "&STUDY_ID=" + studyID +  "&SESSION_ID=" + sessionID +
              "&uid=" + uid + "&tpID=" + tpID  + "&condID=" + condID;
        }else{
            var nextlink = "https://lockinstudy.firebaseapp.com/grid_task/?PROLIFIC_PID=" +
             subjectID + "&STUDY_ID=" + studyID +  "&SESSION_ID=" + sessionID +
              "&uid=" + uid + "&tpID=" + tpID  + "&condID=" + condID;
        }

       window.location = nextlink;
     }
  }
timeline.push(end_screen)

  // recording data...

  // need a screen thanking them for the task and also figuring out the bonus... -- do this tonight
var instruc_images = instruction_pagelinks_a;
//console.log(timeline)

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

document.getElementById('header_title').innerHTML = "Online studies in learning, decision-making and cognition: Information and consent";
document.getElementById('consent').innerHTML = "        <p><b>Who is conducting this research study?</b><p>\n" +
    "        <p>\n" +

    "        This research is being conducted by the Division of Psychiatry and the Max Planck UCL Centre for Computational Psychiatry\n" +
    "        and Ageing Research at University College London, London, UK. The lead researcher(s) for this project is\n" +
    "        <a href=\"mailto:e.russek@ucl.ac.uk\">Dr Evan Russek</a>. This study has been approved by the UCL Research Ethics Committee\n" +
    "        (project ID number 16639/001) and is funded by the Max Planck Society.\n" +
    "        </p>\n" +
    "\n" +
    "        <p><b>What is the purpose of this study?</b><p>\n" +
    "        <p>\n" +
    "        We are interested in how the adult brain controls learning and decision-making. This research aims to provide\n" +
    "        insights into how the healthy brain works to help us understand the causes of a number of different medical\n" +
    "        conditions.\n" +
    "        </p>\n" +
    "\n" +
    "        <p><b>Who can participate in the study?</b><p>\n" +
    "        <p>\n" +
    "            You must be 18 or over to participate in this study. Please confirm this to proceed.\n" +
    "        </p>\n" +
    "            <label class=\"container\">I confirm I am over 18 years old\n" +
    "                <input type=\"checkbox\" id=\"consent_checkbox1\">\n" +
    "                <span class=\"checkmark\"></span>\n" +
    "            </label>\n" +
    "        <br>\n" +
    "\n" +
    "        <p><b>What will happen to me if I take part?</b><p>\n" +
    "        <p>\n" +
    "            The task takes place at two timepoints. Today, you will play two computer games, which will last in total about 45 minutes. Then you will answer some questionairres about your emotional state and personality, which will take about 15 minutes. \n" +
    "             If you complete the task, you will then be contacted again in two weeks to complete the second part of the study. In the second part, you will again play to computer games for about 45 minutes and answer some questionairres for about 15 minutes. If you complete both tasks, you will receve at least \n" +
    "             16 GBP, as well an oppotunity for an additional bonus depending on your choices in both games and accross both tasks. \n" +
    "            Remember, you are free to withdraw at any time without giving a reason.\n" +
    "        </p>\n" +
    "\n" +
    "        <p><b>What are the possible disadvantages and risks of taking part?</b><p>\n" +
    "        <p>\n" +
    "            The task will you complete does not pose any known risks.\n" +
    "        </p>\n" +
    "\n" +
    "        <p><b>What are the possible benefits of taking part?</b><p>\n" +
    "        <p>\n" +
    "            While there are no immediate benefits to taking part, your participation in this research will help us\n" +
    "        understand how people make decisions and this could have benefits for our understanding of mental health problems.\n" +
    "        </p>\n" +
    "\n" +
    "        <p><b>Complaints</b><p>\n" +
    "        <p>\n" +
    "        If you wish to complain or have any concerns about any aspect of the way you have been approached or treated\n" +
    "        by members of staff, then the research UCL complaints mechanisms are available to you. In the first instance,\n" +
    "        please talk to the <a href=\"mailto:e.russek@ucl.ac.uk\">researcher</a> or the chief investigator\n" +
    "        (<a href=\"mailto:q.huys@ucl.ac.uk\">Dr Quentin Huys</a>) about your\n" +
    "        complaint. If you feel that the complaint has not been resolved satisfactorily, please contact the chair of\n" +
    "        the <a href=\"mailto:ethics@ucl.ac.uk\">UCL Research Ethics Committee</a>.\n" +
    "\n" +
    "        If you are concerned about how your personal data are being processed please contact the data controller\n" +
    "        who is <a href=\"mailto:data-protection@ucl.ac.uk\">UCL</a>.\n" +
    "        If you remain unsatisfied, you may wish to contact the Information Commissioner Office (ICO).\n" +
    "        Contact details, and details of data subject rights, are available on the\n" +
    "        <a href=\"https://ico.org.uk/for-organisations/data-protection-reform/overview-of-the-gdpr/individuals-rights\">ICO website</a>.\n" +
    "        </p>\n" +
    "\n" +
    "        <p><b>What about my data?</b><p>\n" +
    "        <p>\n" +
    "        This local privacy notice sets out the information that applies to this particular study. Further information on how UCL uses participant information can be found in our general privacy notice: \n \n " +
    "        For participants in research studies, click <a href=\"https://www.ucl.ac.uk/legal-services/privacy/ucl-general-research-participant-privacy-notice\">here</a>    \n \n   " +
    "        The information that is required to be provided to participants under data protection legislation (GDPR and DPA 2018) is provided across both the local and general privacy notices. \n" +

    "        To help future research and make the best use of the research data you have given us (such as answers" +
    "        to questionnaires) we may keep your research data indefinitely and share these.  The data we collect will\n" +
    "        be shared and held as follows:<br> \n" +
    "        In publications, your data will be anonymised, so you cannot be identified. <br> \n" +
    "        In public databases, your data will be anonymised (your personal details will be removed and a code used e.g. 00001232, instead of your User ID) <br>" +
    "\n" +
    "         Personal data is any information that could be used to identify you, such as your User ID.  When we collect your data, your User ID will be replaced with a non-identifiable random ID number. No personally identifying data will be stored \n" +
    "        If there are any queries or concerns please do not hesitate to contact <a href=\"mailto:e.russek@ucl.ac.uk\">Dr Evan Russek</a>.\n" +
    "        </p>\n" +
    "\n" +
    "        <p><b>If you are happy to proceed please read the statement below and click the boxes to show that you\n" +
    "            consent to this study proceeding</b><p>\n" +
    "\n" +
    "        <label class=\"container\">I have read the information above, and understand what the study involves.\n" +
    "            <input type=\"checkbox\" id=\"consent_checkbox2\">\n" +
    "            <span class=\"checkmark\"></span>\n" +
    "        </label>\n" +
    "\n" +
    "        <label class=\"container\">I understand that my anonymised/pseudonymised personal data can be shared with others\n" +
    "            for future research, shared in public databases and in scientific reports.\n" +
    "            <input type=\"checkbox\" id=\"consent_checkbox3\">\n" +
    "            <span class=\"checkmark\"></span>\n" +
    "        </label>\n" +
    "\n" +
    "        <label class=\"container\">I understand that I am free to withdraw from this study at any time without\n" +
    "            giving a reason and this will not affect my future medical care or legal rights.\n" +
    "            <input type=\"checkbox\" id=\"consent_checkbox4\">\n" +
    "            <span class=\"checkmark\"></span>\n" +
    "        </label>\n" +
    "\n" +
    "        <label class=\"container\">I understand the potential benefits and risks of participating, the support available\n" +
    "            to me should I become distressed during the research, and who to contact if I wish to lodge a complaint.\n" +
    "            <input type=\"checkbox\" id=\"consent_checkbox5\">\n" +
    "            <span class=\"checkmark\"></span>\n" +
    "        </label>\n" +
    "\n" +
    "        <label class=\"container\">I understand the inclusion and exclusion criteria in the Information Sheet.\n" +
    "            I confirm that I do not fall under the exclusion criteria.\n" +
    "            <input type=\"checkbox\" id=\"consent_checkbox6\">\n" +
    "            <span class=\"checkmark\"></span>\n" +
    "        </label>\n" +
    "\n" +
    "        <label class=\"container\">I agree that the research project named above has been explained to me to my\n" +
    "            satisfaction and I agree to take part in this study\n" +
    "            <input type=\"checkbox\" id=\"consent_checkbox7\">\n" +
    "            <span class=\"checkmark\"></span>\n" +
    "        </label>\n" +
    "\n" +
    "        <br><br>\n" +
    "        <button type=\"button\" id=\"start\" class=\"submit_button\">continue</button>\n" +
    "        <br><br>";


document.getElementById("start").onclick = check_consent;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    alert("Sorry, this experiment does not work on mobile devices");
    document.getElementById('consent').innerHTML = "";
}
