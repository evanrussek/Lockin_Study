// for two-stim choice add parameter for whether to limit choice time.
var instruction_pagelinks_a = ['Stimuli/q_instructions/Slide1.jpg',
                            'Stimuli/q_instructions/Slide2.jpg'];

var instruction_pagelinks_b = ['Stimuli/q_instructions/Slide2.jpg'];


var pages_a = [];
for (var i = 0; i < instruction_pagelinks_a.length; i++){
    pages_a.push('<img src= "'+ instruction_pagelinks_a[i] +  '" alt = "" >')
}

var pages_b = [];
for (var i = 0; i < instruction_pagelinks_b.length; i++){
    pages_b.push('<img src= "'+ instruction_pagelinks_b[i] +  '" alt = "" >')
}


// now there's a, b and c...

var instruction_pages_a = {
    type: 'instructions',
    pages: pages_a,
    show_clickable_nav: true
}

var instruction_pages_b = {
    type: 'instructions',
    pages: pages_b,
    show_clickable_nav: true
}
