$(() => {
    const queryString = window.location.search;
    const ownerAlias = new URLSearchParams(queryString).get('owner');
    let currentOwner = owners.find((owner) => {return owner.ceo.picture === ownerAlias});

    const support = ["Sales", "Investment", "Employees", "Other"];
    support.forEach(support => displaySupport(support));

    if (currentOwner != undefined) {
        setUpOwner(currentOwner);
    } else {
        $(owners).each((i, owner) => {
            $("main .content").prepend(buildOwnerList(owner.ceo.name, owner.ceo.picture, owner.support, owner.company.title, owner.contact.website));
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

    $("main .content div.owner").click((event) => {
        var target = event.target;
        while (!$(target).hasClass("owner")) {
            target = $(target).parent();
        }

        window.location.href =window.location.href + "?owner=" + $(target).data("alias");
    });
})

let displaySupport = (support) => {
    $("main p.top button." + support.toLowerCase()).click(() => {
        $("main p.top button").removeAttr("disabled");
        $("main .content div.owner").hide();
        $("main .content div.owner div.support span." + support).parent().parent().show();
        $("main p.top button." + support.toLowerCase()).attr("disabled", "disabled");
    });

    $("main p.top button.all").click(() => {
        $("main p.top button").removeAttr("disabled");
        $("main .content div.owner").show();
        $("main p.top button.all").attr("disabled", "disabled");
    })
}

let setUpOwner = (owner) => {
    $("main").prepend("<p class='breadcrumbs'><a href='owners.html'>Diverse Owners</a> | " + owner.ceo.name + "</p>");
    $("main p.top").hide();
    
    $("main .content").prepend(buildOwner(owner));
}

let buildOwner = (owner) => {
    let ownerHighlight = "<div class='owner-highlight card border-success'>";
    ownerHighlight += "<div class='card-header'><h3>" + owner.ceo.name + "</h3><div class='icons'>";
    ownerHighlight += "</div></div><div class='card-body'><img src='content/owners/" + owner.ceo.picture + ".jpg'>";
    ownerHighlight += "<p class='card-text'>" + owner.ceo.biography + "</p>";
    ownerHighlight += "</div></div>";
    
    ownerHighlight += "<div class='owner-highlight company card border-success company'>";
    ownerHighlight += "<div class='card-header'><h3>" + owner.company.title + "</h3><div class='icons'>";

    for (const [key, value] of Object.entries(owner.contact)) {
        var iconClass = `${key}`;
        
        if (iconClass == "email") {
            iconClass = "'fas fa-envelope'";
        } else if (iconClass == "website") {
            iconClass = "'fas fa-link'";
        } else {
            iconClass = "'fab fa-" + `${key}` + "'";
        }

        ownerHighlight += "<a href='" + `${value}` + "' target='_blank'><i class=" + iconClass + "></i></a>";
    }

    ownerHighlight += "</div></div><div class='card-body'>";
    ownerHighlight += "<div class='diversity-highlight bg-light'><h4 class='diversity-title'>Diversity</h4><p><b>Goals:</b> " + owner.company.diversity.goals + "</p>";
    ownerHighlight += "<p><b>Initiatives:</b> " + owner.company.diversity.initiatives + "</p></div>";

    if (owner.contact.website != null) {
        ownerHighlight += "<a href='" + owner.contact.website + "' target='_blank'><img src='content/owners/" + owner.company.logo + ".jpg'></a>";
    } else {
        ownerHighlight += "<img src='content/owners/" + owner.company.logo + ".jpg'>";
    }
    
    ownerHighlight += "<p>" + owner.company.bio + "</p>";
    ownerHighlight += "<p>" + owner.company.origin + "</p>";

    ownerHighlight += "<div class='support'>"

    for (var i = 0; i < owner.support.length; i++) {
        ownerHighlight += "<span class='" + owner.support[i] + "'>" + owner.support[i] + "</span>"
    }

    ownerHighlight += "</div></div></div>";
    return ownerHighlight;
}

let buildOwnerList = (name, photo, support, company, website) => {
    let ownerBlock = "<div class='bg-light owner' data-alias='" + photo + "'>";
    ownerBlock += "<img src='content/owners/" + photo + ".jpg'>";
    ownerBlock += "<h4>" + name + "</h4>";
    if (company != undefined) {
        ownerBlock += "<h6><a href='" + website + "' target='_blank'>" + company + "</a></h6>";
    }
    ownerBlock += "<div class='support'>"

    for (var i = 0; i < support.length; i++) {
        ownerBlock += "<span class='" + support[i] + "'>" + support[i] + "</span>"
    }

    ownerBlock += "</div></div>";
    return ownerBlock;
}