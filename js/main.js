import Animations from "./animations.js"
import Apis from "./api.js"
import Regex from "./regex.js"

$(document).ready(() => {
    //#region CRUDS
    let currentMovies = [];

    function makeItem(imgSrc, title, desc, rate, date) {
        const col = document.createElement("div");
        col.classList.add("col-lg-4", "col-md-6");

        const item = document.createElement("div");
        item.classList.add("item", "position-relative", "rounded-3", "overflow-hidden");
        col.append(item);
        
        const img = document.createElement("img");
        img.classList.add("w-100")
        img.setAttribute("src", imgSrc);
        img.setAttribute("alt", title);
        item.append(img);

        const filter = document.createElement("div");
        filter.classList.add(..."filter fw-bolder px-1 w-100 h-100 rounded-3 bg-white bg-opacity-75 position-absolute top-100 d-flex flex-column justify-content-center align-items-center text-center".split(" "));
        item.append(filter);

        const heading = document.createElement("h2");
        heading.classList.add("mb-1");
        heading.textContent = title;
        filter.append(heading);
        
        const p = document.createElement("p");
        p.textContent = desc;
        filter.append(p);

        const innerDiv = document.createElement("div");
        innerDiv.classList.add("my-3");
        filter.append(innerDiv);

        const dateSpan = document.createElement("span");
        dateSpan.classList.add("movie-date");
        dateSpan.textContent = date;
        filter.append(dateSpan);

        const span = document.createElement("span");
        span.textContent = "Rating: ";
        innerDiv.append(span);

        const rateSpan = document.createElement("span");
        rateSpan.classList.add("movie-rate");
        rateSpan.textContent = rate;
        innerDiv.append(rateSpan)

        return col;
    }
    function displayItems(items) {
        $("#main .row").html("");
        for (let i = 0; i < items.length; i++) {
            const {poster_path, title, overview, vote_average, release_date} = items[i];
            $("#main .row").append(makeItem(poster_path, title, overview, vote_average, release_date));
        }
    }
    function searchCurrent(query) {
        query = query.toLowerCase();

        let searchRes = [];
        for (const movie of currentMovies) {
            if (movie.title.toLowerCase().includes(query)) {
                searchRes.push(movie);
            }
        }
        displayItems(searchRes);
    }
    //#endregion

    //#region Animations
    const myAnimations = new Animations(500, $("#side-nav-btn"));

    myAnimations.loadPage(".loading-screen");

    myAnimations.init();
    myAnimations.changeInputColor("text-main", "text-white");

    $("nav#side .side-nav ul a").on("click", (e) => {
        myAnimations.scroll($($(e.target).attr("href")).offset().top)
    })
    //#endregion

    //#region Ajax
    const movieApi = new Apis("eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2rLEtpkEOhy_Eu8srm2ZGjY85ROSBzIA_iPPc_uWFKwValxq8NH6rEC8o");

    function updatelist(movies) {
        displayItems(movies);
        currentMovies = movies
    }

    movieApi.getMoviesByCategory("now_playing", updatelist);

    $("nav .side-nav ul li").on("click", (e) => {
        if ($(e.target).attr("category")) {
            movieApi.getMoviesByCategory($(e.target).attr("category"), updatelist);
            return;
        }
        if ($(e.target).attr("trending")) {
            movieApi.getTrendingMovies(updatelist);
        }
    });
    $("#search-header #search-in-api").on("input", (e) => {
        movieApi.getMoviesByName(e.target.value, updatelist);
    })
    $("#search-header #search-in-current").on("input", (e) => {
        searchCurrent(e.target.value);
    })
    //#endregion

    //#region Regex
    $("footer input").on("blur", () => {
        const isAllValidated = 
        Array.from($("footer input"))
        .every(inp => $(inp).hasClass("validated"));

        console.log(isAllValidated);

        if (isAllValidated) {
            $("footer .btn").removeClass("disabled");
        } else {
            $("footer .btn").addClass("disabled");
        }
    })

    $("footer input[name='name']").on("input", (e) => {
        if (Regex.nameRegex.test(e.target.value)) {
            $(e.target).next(".invalid").removeClass("d-block");
            $(e.target).next(".invalid").addClass("d-none");
            $(e.target).addClass("validated");
        } else {
            $(e.target).next(".invalid").removeClass("d-none");
            $(e.target).next(".invalid").addClass("d-block");
            $(e.target).removeClass("validated");
        }
    })
    $("footer input[name='email']").on("input", (e) => {
        if (Regex.emailRegex.test(e.target.value)) {
            $(e.target).next(".invalid").removeClass("d-block");
            $(e.target).next(".invalid").addClass("d-none");
            $(e.target).addClass("validated");
        } else {
            $(e.target).next(".invalid").removeClass("d-none");
            $(e.target).next(".invalid").addClass("d-block");
            $(e.target).removeClass("validated");
        }
    })
    $("footer input[name='phone']").on("input", (e) => {
        if (Regex.phoneRegex.test(e.target.value)) {
            $(e.target).next(".invalid").removeClass("d-block");
            $(e.target).next(".invalid").addClass("d-none");
            $(e.target).addClass("validated");
        } else {
            $(e.target).next(".invalid").removeClass("d-none");
            $(e.target).next(".invalid").addClass("d-block");
            $(e.target).removeClass("validated");
        }
    })
    $("footer input[name='age']").on("input", (e) => {
        if (Regex.ageRegex.test(e.target.value)) {
            $(e.target).next(".invalid").removeClass("d-block");
            $(e.target).next(".invalid").addClass("d-none");
            $(e.target).addClass("validated");
        } else {
            $(e.target).next(".invalid").removeClass("d-none");
            $(e.target).next(".invalid").addClass("d-block");
            $(e.target).removeClass("validated");
        }
    })
    $("footer input[name='password']").on("input", (e) => {
        let isValid = Regex.passwordRegex.every(re => re.test(e.target.value));

        if (isValid) {
            $(e.target).next(".invalid").removeClass("d-block");
            $(e.target).next(".invalid").addClass("d-none");
            $(e.target).addClass("validated");
        } else {
            $(e.target).next(".invalid").removeClass("d-none");
            $(e.target).next(".invalid").addClass("d-block");
            $(e.target).removeClass("validated");
        }
    })
    $("footer input[name='repassword']").on("input", (e) => {
        if (e.target.value == $("footer input[name='password']").val()) {
            $(e.target).next(".invalid").removeClass("d-block");
            $(e.target).next(".invalid").addClass("d-none");
            $(e.target).addClass("validated");
        } else {
            $(e.target).next(".invalid").removeClass("d-none");
            $(e.target).next(".invalid").addClass("d-block");
            $(e.target).removeClass("validated");
        }
    })
    //#endregion
})