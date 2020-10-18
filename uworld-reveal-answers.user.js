// ==UserScript==
// @name         UWorld Review Answers
// @namespace    mailto:john.ciubuc@ttuhsc.edu
// @version      1.0
// @description  Hides and Reveals Answers
// @author       John Ciubuc
// @match        https://www.uworld.com/ClientApp/v*/apps/qbanktestinterface/index.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var timer;

    function pageLoader() {
        // Get the answer container
        var unansweredBtn = document.getElementById("answerContainer");
        // If we got it, the page is loaded and we're ready for injection
        if (unansweredBtn) {
            clearTimeout(timer);

            // Create CSS 'hide the answer' stylesheet
            var style = document.createElement('style');
            style.innerHTML = `
[ng-if="(launchTestOptions.canShowAnswer || testInfo.testModeId == constants.testMode.search) && (currentQuestion.formatTypeId == constants.questionFormatType.singleBestResponse)"],
.iradio_square-grey,
[class="fal fa-lg fa-check"],
[class="fal fa-lg fa-times"],
.explanation,
[class="answerStatsBarInsideDiv"],
a[class="textHighlight"].a[class^="selection"]{
    visibility: hidden;
    display: none;
}
`;
            // Add it to page so that previous answers and explanations are hidden
            document.head.appendChild(style);

            // Generate button, place it after answers
            var el = document.createElement("span");
            el.innerHTML = "<button id=\"revealAnswers\">Reveal Answers</a>";
            unansweredBtn.parentNode.insertBefore(el, unansweredBtn.nextSibling)

            // Connect button to removing the stylesheet
            el.onclick= ( function () {
                document.head.removeChild(style)
            } );

            // Connect Forward/Back buttons to activating the Style sheet
            // This is so that when you reveal answers, they hide on the next Q
            var btnPrev = document.getElementById("btnPrev");
            var btnNext = document.getElementById("btnNext");
            btnPrev.onclick = (function(){
                document.head.appendChild(style);
            });
            btnNext.onclick = (function(){
                document.head.appendChild(style);
            });
            // Get all the Q numbers on the side bar and hide answers when clicked
            var allNums = document.querySelectorAll("div[ng-click=\"selectQuestion(q.sequenceId)\"]");
            var i;
            for (i = 0; i < allNums.length; i++) {
                allNums[i].onclick = (function(){
                    document.head.appendChild(style);
                });
            }
        }
    }

    timer = setInterval(pageLoader, 250);
})();
