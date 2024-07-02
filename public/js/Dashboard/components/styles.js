// components/styles.js

export const mainPageStyles = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

    .shapecontainer {
        display: center;
        flex-direction: column;
        align-items: center;
        height: auto;
        margin: 0;
    }
    #main-page {
        padding: 70px;
        border: none;
        border-radius: 10px 10px 0 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        position: relative;
        background-color: #FFAEDF; /* Match circle color for seamless effect */
    }
    .circle-container {
        display: flex;
        justify-content: center;
        position: relative;
        top: -60px; /* Move circles up to overlap with box */
    }
    .circle {
        width: 120px;
        height: 120px;
        background-color: #FFAEDF;
        border-radius: 50%;
        margin: 0; /* No margin for seamless effect */
    }

    #welcome h1{
        text-align: center;
        font-size: 36px;
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        color: black;
    }
    #welcome p {
        font-size: 25px;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        margin: 0;
    }
    .glitzvogue-logo {
        height: auto;
    }
`;

export function injectStyles(styles) {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}
