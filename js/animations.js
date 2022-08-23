class animations {
    constructor(animationTime) {
        this.animationTime = animationTime;
    }
}
export default class SpecialAnimations extends animations {
    constructor(animationTime, animationBtn) {
        super(animationTime);
        this.animationBtn = animationBtn;
    }
    #onBtnClick() {
        $(this.animationBtn).on("click", () => {
            if ($(this.animationBtn).hasClass("active")) {
                $("nav#side").animate({left: -$(".side-nav").outerWidth()}, this.animationTime);
                $("nav#side .side-nav ul li").animate({opacity: 0, marginTop: $("nav#side .side-nav .ul-container").outerHeight()}, this.animationTime);

                $(this.animationBtn).removeClass("fa-xmark");
                $(this.animationBtn).addClass("fa-bars");
                $(this.animationBtn).removeClass("active");
            } else {
                const lis = $("nav#side .side-nav ul li");
                $("nav#side").animate({left: 0}, this.animationTime, null, () => {
                    for (let i = 0; i < $(lis).length; i++) {
                        $(lis).eq(i)
                        .animate({opacity: 1, marginTop: 0}, 1000 + 150 * i);
                    }
                });

                $(this.animationBtn).addClass("fa-xmark");
                $(this.animationBtn).removeClass("fa-bars");
                $(this.animationBtn).addClass("active");
            }
        });
    }
    init() {
        $("nav#side").css("left", -$(".side-nav").outerWidth());
        $("nav#side .side-nav ul li").css("margin-top", $("nav#side .side-nav .ul-container").outerHeight());
        $("nav#side .side-nav ul li").css("opacity", 0);
        this.#onBtnClick();
    }
    changeInputColor(mainText, secText) {
        $("input").on("focus", (e) => {
            $(e.target).addClass(mainText);
            $(e.target).removeClass(secText);
        })
        $("input").on("blur", (e) => {
            $(e.target).addClass(secText);
            $(e.target).removeClass(mainText);
        })
    }
    scroll(offset) {
        $("html, body").animate({scrollTop: offset}, this.animationTime * 2);
    }
    loadPage(loadingScreen) {
        $(loadingScreen).slideUp(this.animationTime * 2, null, () => {
            $(loadingScreen).remove()
            $("body").css("overflow", "visible");
        });
    }
}