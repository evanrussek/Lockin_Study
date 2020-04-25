// for two-stim choice add parameter for whether to limit choice time.
var instruction_pagelinks_a = ['Stimuli/intro_instructions/Slide1.jpg',
                            'Stimuli/intro_instructions/Slide2.jpg'];

var pages_a = [];
for (var i = 0; i < instruction_pagelinks_a.length; i++){
    pages_a.push('<img src= "'+ instruction_pagelinks_a[i] +  '" alt = "" >')
}


// now there's a, b and c...

var instruction_pages_a = {
    type: 'instructions',
    pages: pages_a,
    show_clickable_nav: true
}

var intro = instruction_pages_a;
