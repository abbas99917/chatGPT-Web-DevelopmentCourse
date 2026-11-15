

if (sessionStorage.getItem("orderSuccess") === "true") {
    // Yahan confetti animation ka code aayega

    confetti({
    particleCount: 250,
    spread: 100,
    origin: {
        y: 0.6
    }
});
sessionStorage.removeItem("orderSuccess");
}