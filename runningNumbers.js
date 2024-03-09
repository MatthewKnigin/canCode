(function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target, 1000);
                return;
            }

            entry.target.innerHTML = 0;
        })
    });

    function countUp(element, limit) {
        const increment = Math.floor(limit / 1000);
        let value = 0;

        const interval = setInterval(() => {
            value += increment;
            if ((element.innerHTML = value) >= limit) {
                element.innerHTML += "+";
                clearInterval(interval);
            }
        }, 1);
    }

    window.addEventListener("load", function() {
        const runningNumbers = document.querySelectorAll(".running-numbers");

        runningNumbers.forEach(num => observer.observe(num));
    });
})();
