var age_question = {
  type: 'survey-text',
  questions: [
    {prompt: "How many years old are you?"}
  ],
  data:{block_number: 'Q', Q_name: 'age'}
};

var sex_question = {
  type: 'evan-quiz',
  questions: [
    {prompt: "What is your sex?", options: ['male', 'female', 'other']}
  ],
  data:{block_number: 'Q', Q_name: 'sex'}
};
var piano_question = {
  type: 'evan-quiz',
  questions: [
    {prompt: "Do you either play piano or regularly engage in a similar sort of fine motor hand movement activity?", options: ['yes', 'no']}
  ],
  data:{block_number: 'Q', Q_name: 'piano'}
};

/////////////////////////////////////////////////////////////////////////////////
//////////////----------------- IDAS ------------------------------/////////////
////////////////////////////////////////////////////////////////////////////////

var idas_Qs = ['1. I did not have much of an appetite',
'2. I had little interest in my usual hobbies and activities',
'3. I felt optimistic',
'4. I slept less than usual',
'5. I felt fidgety, restless ',
'6. I felt exhausted ',
'7. I felt a pain in my chest',
'8. I felt depressed ',
'9. I had trouble making up my mind ',
'10. I was proud of myself ',
'11. I had trouble falling asleep ',
'12. I was furious (Ill Temper)',
'13. I had thoughts of suicide ',
'14. I had disturbing thoughts of something bad that happened to me ',
'15. I felt self-conscious knowing that others were watching me ',
'16. I felt dizzy or lightheaded ',
'17. I woke up early and could not get back to sleep ',
'18. I was worried about embarrassing myself socially ',
'19. I thought a lot about food ',
'20. I became anxious in a crowded public setting ',
'21. I blamed myself for things ',
'22. I cut or burned myself on purpose',
'23. I felt that I had accomplished a lot ',
'24. I ate when I was not hungry ',
'25. I woke up much earlier than usual ',
'26. I felt like eating less than usual ',
'27. I looked forward to things with enjoyment ',
'28. I had nightmares that reminded me of something bad that happened',
'29. I slept more than usual ',
'30. It took a lot of effort for me to get going ',
'31. I felt inadequate ',
'32. I was trembling or shaking ',
'33. I thought that the world would be better off without me ',
'34. I had memories of something scary that happened ',
'35. I felt like breaking things ',
'36. I woke up frequently during the night ',
'37. I felt enraged ',
'38. I hurt myself purposely ',
'39. I felt faint ',
'40. I felt discouraged about things ',
'41. I found it difficult to make eye contact with people ',
'42. I got upset thinking about something bad that happened ',
'43. I had trouble waking up in the morning ',
'44. I lost my temper and yelled at people ',
'45. My heart was racing or pounding ',
'46. I thought about my own death ',
'47. I found it difficult to talk with people I did not know well ',
'48. I found myself worrying all the time ',
'49. I had a very dry mouth ',
'50. I felt hopeful about the future ',
'51. I slept very poorly ',
'52. I thought about hurting myself ',
'53. I felt that I had a lot to look forward to ',
'54. I felt much worse in the morning than later in the day ',
'55. I felt drowsy, sleepy ',
'56. I was short of breath ',
'57. I talked more slowly than usual ',
'58. I felt like I was choking ',
'59. I felt like I had a lot of interesting things to do ',
'60. I did not feel much like eating ',
'61. I had trouble concentrating ',
'62. Little things made me mad ',
'63. I ate more than usual ',
'64. I felt like I had a lot of energy ',
'65. I rearranged things so that they were in a certain order ',
'66. I washed my hands excessively ',
'67. I kept racing from one activity to the next ',
'68. I checked things over and over again ',
'69. I felt the urge to rearrange things so that they were “just right” ',
'70. I worried a lot about germs ',
'71. I spoke so rapidly that others could not understand me',
'72. I felt elated for no special reason ',
'73. I tried not to think about bad things from my past ',
'74. I avoided small spaces ',
'75. I found myself checking things, even though I knew it was not necessary ',
'76. I avoided handling dirty things ',
'77. It felt like my mind was moving a mile a minute ',
'78. I felt like I was on top of the world ',
'79. I avoided situations that bring up bad memories ',
'80. I was afraid of getting trapped in a crowd ',
'81. I felt the urge to check to make sure I had done something ',
'82. I followed the same, fixed order in performing everyday tasks',
'83. My thoughts jumped rapidly from one idea to another ',
'84. I felt anxious in small spaces ',
'85. I felt compelled to follow certain rituals ',
'86. I had difficulty touching something that was dirty ',
'87. My thoughts were moving so quickly it was hard to keep up ',
'88. I had so much energy it was hard for me to sit still ',
'89. I tried to ignore upsetting memories ',
'90. I was afraid of tunnels ',
'91. I had to clean myself because I felt contaminated ',
'92. I felt that I could do things that other people couldn’t ',
'93. I avoided talking about bad experiences from my past ',
'94. I avoided tight, enclosed spaces ',
'95. I had little rituals or habits that took up a lot of my time ',
'96. I avoided using public restrooms,',
'97. I had much more energy than usual',
'98. I used an object (such as a towel) so I could avoid touching something directly',
'99. I was anxious about talking in public'];


var idas_preamble = "Below is a list of feelings, sensations, problems, and experiences that people sometimes have. "+
"Read each item to determine how well it describes your recent feelings and experiences. Then, " +
"select the choice that best describes how much you have felt or experienced things this way " +
"during the past two weeks, including today.";

var idas_options = ['1: not at all', '2: a little bit', '3: moderately', '4: quite a bit', '5: extremely'];
var idas_questions = [];
for (var i = 0; i < idas_Qs.length; i ++){
    var this_q = {prompt: idas_Qs[i], options: idas_options, required: true};
    idas_questions.push(this_q);
}

var idas_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + idas_preamble + "</p>"],
    questions: idas_questions,
    data: {Q_name: 'IDAS', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...

///////////////////////////////////////////
//////////////// PSS //////////////////////
//////////////////////////////////////////

var pss_preamble = "For each question, please answer how often you have felt as descibed in the last 2 weeks. Please answer fairly quickly. Do not try to count, but rather indicate what seems like a reasonable guess.";

var pss_Qs = ['1. How often have you been upset because of something that happened unexpectedly?',
'2.  How often have you felt that you were unable to control the important things in your life?',
'3. How often have you felt nervous and stressed?',
'4.  How often have you felt confident about your ability to handle your personal problems?',
'5.  How often have you felt that things were going your way?',
'6. How often have you found that you could not cope with all the things that you had to do?',
'7. How often have you been able to control irritations in your life?',
'8. How often have you felt that you were on top of things?',
'9. How often have you been angered because of things that happened that were outside of your control?',
'10. How often have you felt difficulties were piling up so high that you could not overcome them?'];

var pss_options = ['1: never', '2: almost never', '3: sometimes', '4: fairly often', '5: very often'];

var pss_questions = [];
for (var i = 0; i < pss_Qs.length; i ++){
    var this_q = {prompt: pss_Qs[i], options: pss_options, required: true};
    pss_questions.push(this_q);
}

var pss_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + pss_preamble + "</p>"],
    questions: pss_questions,
    data: {Q_name: 'PSS', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...

/////////////////////////////////////////////////////////////////////////////////
//////////////////////// NEO ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var neo_preamble =  'Here are a number of characteristics that may or may not apply to you. Please write a number next to each statement to indicate the extent to which you agreeor disagree with that statement. I see Myself as Someone Who... ';

var neo_Qs = ['1. Is talkative ',
'2. Tends to find fault with others ',
'3. Does a thorough job ',
'4. Is depressed, blue ',
'5. Is original, comes up with new ideas ',
'6. Is reserved ',
'7. Is helpful and unselfish with others ',
'8. Can be somewhat careless ',
'9. Is relaxed, handles stress well ',
'10. Is curious about many different things ',
'11. Is full of energy ',
'12. Starts quarrels with others ',
'13. Is a reliable worker ',
'14. Can be tense ',
'15. Is ingenious, a deep thinker ',
'16. Generates a lot of enthusiasm ',
'17. Has a forgiving nature ',
'18. Tends to be disorganized ',
'19. Worries a lot ',
'20. Has an active imagination ',
'21. Tends to be quiet ',
'22. Is generally trusting ',
'23. Tends to be lazy',
'24. Is emotionally stable, not easily upset',
'25. Is inventive',
'26. Has an assertive personality',
'27. Can be cold and aloof',
'28. Perseveres until the task is finished',
'29. Can be moody',
'30. Values artistic, aesthetic experiences',
'31. Is sometimes shy, inhibited',
'32. Is considerate and kind to almost everyone',
'33. Does things efficiently',
'34. Remains calm in tense situations',
'35. Prefers work that is routine',
'36. Is outgoing, sociable',
'37. Is sometimes rude to others',
'38. Makes plans and follows through with them',
'39. Gets nervous easily',
'40. Likes to reflect, play with ideas',
'41. Has few artistic interests',
'42. Likes to cooperate with others',
'43. Is easily distracted',
'44. Is sophisticated in art, music, or literature '];



var neo_options = ['1: Strongly Disagree', '2: Disagree', '3: Neutral', '4: Agree', '5: Strongly Agree'];

var neo_questions = [];
for (var i = 0; i < neo_Qs.length; i ++){
    var this_q = {prompt: neo_Qs[i], options: neo_options, required: true};
    neo_questions.push(this_q);
}

var neo_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + neo_preamble + "</p>"],
    questions: neo_questions,
    data: {Q_name: 'NEO', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...

//////////////////////////
///////TEPS/////////////
//////////////////////////
var teps_preamble = 'Please rate how true the follow statements are for you';

var teps_Qs = ['When I think about eating my favorite food, I can almost taste how good it is',
'When ordering something off the menu, I imagine how good it will taste',
'I look forward to a lot of things in my life ',
'Looking forward to a pleasurable experience is in itself pleasurable ',
'The sound of crackling wood in the fireplace is very relaxing ',
'I enjoy taking a deep breath of fresh air when I walk outside .',
'When I think of something tasty, like a chocolate chip cookie, I have to have one ',
'I appreciate the beauty of a fresh snowfall ',
'I really enjoy the feeling of a good yawn ',
'I get so excited the night before a major holiday I can hardly sleep ',
'A hot cup of coffee or tea on a cold morning is very satisfying to me ',
'I love the sound of rain on the windows when I am lying in my warm bed ',
'I do not look forward to things like eating out at restaurants',
'When something exciting is coming up in my life, I really look forward to it',
'I love it when people play with my hair',
'When I am on my way to an amusement park, I can hardly wait to ride the roller coasters',
'When I hear about a new movie starring my favorite actor, I can not wait to see it',
'The smell of freshly cut grass is enjoyable to me'];

var teps_options = ['1: very false', '2', '3', '4', '5', '6: very true'];
var teps_questions = [];
for (var i = 0; i < teps_Qs.length; i ++){
    var this_q = {prompt: teps_Qs[i], options: teps_options, required: true};
    teps_questions.push(this_q);
}

var teps_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + teps_preamble + "</p>"],
    questions: teps_questions,
    data: {Q_name: 'TEPS', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...



/////////////////////////////////////////////////////////////////////////////
///////////////// APATHY ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////// finish this in a bit /////////////
/////////////////////////////////////////////////////////////////////////

var apathy_preamble = 'For each statement, select the answer that best describes the your thoughts, feelings, and activity in the past 2 weeks';
var apathy_Qs = ['1. I am interested in things.',
'2. I get things done during the day. ',
'3. Getting things started on my own is important to me.' ,
'4. I am interested in having new experiences.' ,
'5. I am interested in learning new things',
'6. I put little effort into anything. ',
'7. I approach life with intensity. ',
'8. Seeing a job through to the end is important to me. ',
'9. I spend time doing things that interest me. ',
'10. Someone has to tell me what to do each day. ',
'11. I am less concerned about my problems than I should be. ',
'12. I have friends.',
'13. Getting together with friends is important to me.',
'14. When something good happens, I get excited.',
'15. I have an accurate understanding of my problems.',
'16. Getting things done during the day is important to me.',
'17. I have initiative.' ,
'18. I have motivation'];

var apathy_options = ['1: not at all', '2: slightly', '3: somewhat', '4: a lot'];

var apathy_questions = [];
for (var i = 0; i < apathy_Qs.length; i ++){
    var this_q = {prompt: apathy_Qs[i], options: apathy_options, required: true};
    apathy_questions.push(this_q);
}

var apathy_questionairre = { // note - apathy was previously labeled as PSS
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + apathy_preamble + "</p>"],
    questions: apathy_questions,
    data: {Q_name: 'APATHY', block_number: 'Q'}, // note
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...


///////////////////////////////////////////////////////////////////////////////////
//////////////////// COVID ///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

///// question about activities..... how did they change? .... /////////////////////
var cov_ac1_preamble = ['In a typical day over that past year <strong>  (before becoming affected by Covid / lockdown) </strong> , how much time did you spend in each of the following activities? (Please answer these questions relatively quickly. Just provide a reasonable guess.)']
var cov_ac1_options = ['1: < 30 mins',	'2: 30 mins-2 hours', '3: 3-5 hours' ,'4: 6+ hours'];
var cov_ac1_Qs = ['Phoning or video talking with colleagues whilst working remotely',
'Undertaking other work remotely',
'Going to work outside of the house (e.g. to the office)',
'Phoning or video talking with friends or family',
'Communicating with friends or family via email, whatsapp, text or other messaging service',
'Receiving visits from friends, neighbours, family or carers',
'Caring for a friend or relative',
'Volunteering',
'Going out of the house to meet friends, neighbours or family',
'Going out of the house to go shopping',
'Going out for a walk or other gentle physical activity',
'Going out for moderate or high intensity activity (e.g running, cycling or swimming)',
'Going out of the house to engage in a community group',
'Exercising at home (e.g. doing yoga, weights or indoor exercise)',
'Gardening',
'Looking after pets',
'Taking naps during the day',
'Household chores (cooking, cleaning, ironing, tidying, online shopping etc)',
'Caring for children (e.g. bathing, feeding, doing homework with etc)',
'Playing with children (e.g. general play or board games or card games)',
'Playing cards or board games with adults',
'Playing video or computer games with adults or children',
'Watching the news, listening to the radio or browsing the internet for information about Covid-19	Tweeting, blogging or posting content online about Covid-19',
'Watching TV, films, Netflix etc (NOT for information on Covid-19)',
'Listening to the radio or music (NOT for information on Covid-19)',
'Browsing the internet (NOT for information on Covid-19)',
'Tweeting, blogging or posting content (NOT related to Covid-19)',
'Reading for pleasure',
'Engaging in a home-based arts or crafts activity (e.g. painting, creative writing, sewing, playing music, etc)',
'Engaging in a digital arts activity (e.g. streaming a concert, virtual tour of a museum etc)',
'Doing DIY, woodwork, metal work, model making or similar',
'Doing mindfulness or meditation',
'Praying',
'Another hobby not already mentioned',
'Procrastinating or not doing anything in particular'];

var cov_ac1_questions = [];
for (var i = 0; i < cov_ac1_Qs.length; i ++){
    var this_q = {prompt: cov_ac1_Qs[i], options: cov_ac1_options, required: true};
    cov_ac1_questions.push(this_q);
}

var cov_ac1_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + cov_ac1_preamble + "</p>"],
    questions: cov_ac1_questions,
    data: {Q_name: 'cov_ac1', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...

////////////////////////////////////////////////////////
///////// activities part 2 ////////////////////////////
///////////////////////////////////////////////////////
var cov_ac2_preamble = ['In a typical day <strong> since the lockdown due to the coronavirus started </strong>, how much time did you spend in each of the following activities? (Please answer these questions relatively quickly. Just provide a reasonable guess.)']
var cov_ac2_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + cov_ac2_preamble + "</p>"],
    questions: cov_ac1_questions,
    data: {Q_name: 'cov_ac2', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...

//// activities - general
var act_general_question = {
  type: 'evan-quiz',
  questions: [
    {prompt: "How much have your normal activities been altered as a result of covid?", options: ['1:not at all', '2: a little', '3:some', '4: a lot', '5: an extreme amount']}
  ],
  data:{block_number: 'Q', Q_name: 'gen_act'}
};


//////////////////////////////////////////////////////////
//////////// COVID STRESS ///////////////////////////////
////////////////////////////////////////////////////////
var cov_stress1_preamble = 'In the last week how worried have you been about the following (please rate on a scale 1 - 5)?';
var cov_stress1_options = ['1: not worried', '2', '3: somewhat worried', '4', '5: experienced significant stress'];

var cov_stress1_Qs = ['Marriage or other romantic relationship',
'Friends or family living in household',
'Friends or family living outside your household',
'Neighbors',
'Your pet',
'Work',
'Losing your job/unemployment',
'Finances',
'Getting medication',
'Getting food',
'Safety/security',
'Internet access',
'Boredom',
'Future plans',
'Catching covid',
'Becomining seriously ill from Covid-19'];

var cov_stress1_questions = [];
for (var i = 0; i < cov_stress1_Qs.length; i ++){
    var this_q = {prompt: cov_stress1_Qs[i], options: cov_stress1_options, required: true};
    cov_stress1_questions.push(this_q);
}

var cov_stress1_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + cov_stress1_preamble + "</p>"],
    questions: cov_stress1_questions,
    data: {Q_name: 'cov_stress1', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...


var covid_general_stress_question = {
  type: 'evan-quiz',
  questions: [
    {prompt: "How much has your general stress increased a a result of covid?", options: ['1:not at all', '2: a little', '3:some', '4: a lot', '5: an extreme amount']}
  ],
  data:{block_number: 'Q', Q_name: 'gen_stress'}
};

///////////////////////////////////////////////////////
//////////////// COVID - social //////////////////////
//////////////////////////////////////////////////////
var cov_soc1_preamble = 'In a typical week (7 day period),<strong> before being affected by / aware of  COVID </strong> , how many days would you:';

var cov_soc1_Qs = ['Not leaving the house',
'Go outside for 15 minutes or more',
'Have a phone or video call with another person for 15 minutes or more',
'Have face-to-face contact with another person for 15 minutes or more (including someone you live with)',
'Have face-to-face contact with multiple people for 15 minutes or more (including someone you live with)'];

var cov_soc1_options = ['1', '2', '3', '4', '5', '6', '7'];
// how lonely have you felt in the past 7 days?

var cov_soc1_questions = [];
for (var i = 0; i < cov_soc1_Qs.length; i ++){
    var this_q = {prompt: cov_soc1_Qs[i], options: cov_soc1_options, required: true};
    cov_soc1_questions.push(this_q);
}

var cov_soc1_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + cov_soc1_preamble + "</p>"],
    questions: cov_soc1_questions,
    data: {Q_name: 'cov_soc1', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...

////////////////////////////////////////////// SOCIAL post...../////////////////
var cov_soc2_preamble = 'In the past 7 days, how many days have you:';

var cov_soc2_Qs = ['Been self-isolating (not leaving the house)',
'Been outside for 15 minutes or more',
'Had a phone or video call with another person for 15 minutes or more',
'Had face-to-face contact with another person for 15 minutes or more (including someone you live with)',
'Had face-to-face contact with multiple people for 15 minutes or more (including someone you live with)'];

var cov_soc2_options = ['1', '2', '3', '4', '5', '6', '7'];
// how lonely have you felt in the past 7 days?

var cov_soc2_questions = [];
for (var i = 0; i < cov_soc2_Qs.length; i ++){
    var this_q = {prompt: cov_soc2_Qs[i], options: cov_soc2_options, required: true};
    cov_soc2_questions.push(this_q);
}

var cov_soc2_questionairre = {
    type: "evan-quiz", // make sure that this still saves the original thing...
    preamble: ["<p align='center'> " + cov_soc2_preamble + "</p>"],
    questions: cov_soc2_questions,
    data: {Q_name: 'cov_soc2', block_number: 'Q'},
    on_finish: function(){
    //    jsPsych.data.displayData()
    }
} // save this...

var social_general_soc_question = {
  type: 'evan-quiz',
  questions: [
    {prompt: "How much has your general loneliness increased a a result of covid?", options: ['1:not at all', '2: a little', '3:some', '4: a lot', '5: an extreme amount']}
  ],
  data:{block_number: 'Q', Q_name: 'gen_soc'}
};


///////////////////////////////////////////////////////////////////////////////
