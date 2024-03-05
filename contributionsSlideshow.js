import { ContributionContent } from "./Components/contributionContent/contributionContent.js";


async function getContributors(filePath) {
    const response = await fetch(`${filePath}`);

    if (!response.ok) {
        throw Error("(-) Response not ok\n", response);
    }
    return response.json();
}

// contrib = contribution
(async function() {
    const contribContainer = document.querySelector(".contribution-container");
    const arrowLeft = document.querySelector(".contribution-arrow-left");
    const arrowRight = document.querySelector(".contribution-arrow-right");

    let contribIndex = 0;
    let contribArr = [];

    try {
        const contribJson = await getContributors("./ContributorData.json");

        contribJson.forEach((contribData) => {
            ContributionContent.createContributionContent(contribContainer, contribData).classList.add("hidden");
        });

        contribArr = contribContainer.querySelectorAll("my-contribution-content");
    } catch (error) {
        console.error(error);
    }

    console.log(contribArr);
    // INITIALIZE first object.
    contribArr[0].classList.remove("hidden");
    // Variable for cleaning intervals.
    let switchingInterval = 0;
    switchingInterval = setInterval(nextButtonHandler, 3000);

    function setCurrContrib(newContribIndex) {
        contribArr[contribIndex].classList.add("hidden");
        contribIndex = newContribIndex;
        contribArr[contribIndex].classList.remove("hidden");
    }

    //TODO: FIX THE TWO HANDLERS BY ADDING THIS FUNCTION ^
    function prevButtonHandler() {
        contribArr[contribIndex].classList.add("hidden");

        contribIndex === 0 ? contribIndex = contribArr.length - 1 : contribIndex--;
        contribArr[contribIndex].classList.remove("hidden");

        clearInterval(switchingInterval);
        switchingInterval = setInterval(prevButtonHandler, 3000);
    }

    function nextButtonHandler() {
        contribArr[contribIndex].classList.add("hidden");

        contribIndex === contribArr.length - 1 ? contribIndex = 0 : contribIndex++;
        contribArr[contribIndex].classList.remove("hidden");

        clearInterval(switchingInterval);
        switchingInterval = setInterval(nextButtonHandler, 3000);
    }

    arrowLeft.addEventListener("click", prevButtonHandler);
    arrowRight.addEventListener("click", nextButtonHandler);

})();
