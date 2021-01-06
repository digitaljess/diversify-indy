$(() => {
    const queryString = window.location.search;
    const speakerAlias = new URLSearchParams(queryString).get('speaker');
    let currentSpeaker = speakers.find((speaker) => {return speaker.picture === speakerAlias});

    const interests = ["Meetups", "Conferences", "Companies"];
    interests.forEach(interest => displayInterests(interest));

    // If a speaker has been selected in the url, load their page, 
    // otherwise, load all speakers
    if (currentSpeaker != undefined) {
        setUpSpeaker(currentSpeaker);
    } else {
        $(speakers).each((i, speaker) => {
            $("main .content").prepend(buildSpeakerList(speaker.name, speaker.interests, speaker.picture));
        });

        adjustNavSize();
    }

    function adjustNavSize() {
        if (window.innerWidth > 675) {
            $("nav").height($("main").height());
        } else {
            $("nav").height("100%");
        }
    }
      
    window.onresize = adjustNavSize;

    $("main .content div.speaker").click((event) => {
        var target = event.target;
        while (!$(target).hasClass("speaker")) {
            target = $(target).parent();
        }

        window.location.href =window.location.href + "?speaker=" + $(target).data("alias");
    });
})

let displayInterests = (interest) => {
    $("main p.top button." + interest.toLowerCase()).click(() => {
        $("main p.top button").removeAttr("disabled");
        $("main .content div.speaker").hide();
        $("main .content div.speaker div.interests span." + interest).parent().parent().show();
        $("main p.top button." + interest.toLowerCase()).attr("disabled", "disabled");
    });

    $("main p.top button.all").click(() => {
        $("main p.top button").removeAttr("disabled");
        $("main .content div.speaker").show();
        $("main p.top button.all").attr("disabled", "disabled");
    })
}

let setUpSpeaker = (speaker) => {
    $("main").prepend("<p class='breadcrumbs'><a href='index.html'>Diverse Speakers</a> | " + speaker.name + "</p>");
    $("main p.top").hide();
    
    $("main .content").prepend(buildSpeaker(speaker));
}

let buildSpeaker = (speaker) => {
    let speakerHighlight = "<div class='speaker-highlight card border-success'>";
    speakerHighlight += "<div class='card-header'><h3>" + speaker.name + "</h3><h5>" + speaker.pronouns + "</h5><div class='icons'>";
    
    for (const [key, value] of Object.entries(speaker.contact)) {
        var iconClass = `${key}`;
        
        if (iconClass == "email") {
            iconClass = "'fas fa-envelope'";
        } else if (iconClass == "website") {
            iconClass = "'fas fa-link'";
        } else {
            iconClass = "'fab fa-" + `${key}` + "'";
        }

        speakerHighlight += "<a href='" + `${value}` + "' target='_blank'><i class=" + iconClass + "></i></a>";
    }

    speakerHighlight += "</div></div><div class='card-body'><img src='content/speakers/" + speaker.picture + ".jpg'>";
    speakerHighlight += "<p class='card-text'>" + speaker.biography + "</p>";
    speakerHighlight += "<p>Topics: " + speaker.topics + "</p>";
    speakerHighlight += "<div class='interests'>"

    for (var i = 0; i < speaker.interests.length; i++) {
        speakerHighlight += "<span class='" + speaker.interests[i] + "'>" + speaker.interests[i] + "</span>"
    }

    speakerHighlight += "</div></div></div>";
    return speakerHighlight;
}

let buildSpeakerList = (name, interests, photo) => {
    let speakerBlock = "<div class='bg-light speaker' data-alias='" + photo + "'>";
    speakerBlock += "<img src='content/speakers/" + photo + ".jpg'>";
    speakerBlock += "<h4>" + name + "</h4>";
    speakerBlock += "<div class='interests'>"

    for (var i = 0; i < interests.length; i++) {
        speakerBlock += "<span class='" + interests[i] + "'>" + interests[i] + "</span>"
    }

    speakerBlock += "</div></div>";
    return speakerBlock;
}