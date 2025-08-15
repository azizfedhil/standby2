body {
    background-color: #1c1c1e;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
}

#standby-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 5vw;
    box-sizing: border-box;
    gap: 4vw;
}

.panel {
    background-color: #2c2c2e;
    border-radius: 30px;
    padding: 4vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 60vh;
    max-width: 45%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

#clock {
    font-size: 15vw;
    font-weight: 700;
    line-height: 1;
    color: #ff9500;
}

#separator {
    animation: blink 1.5s infinite;
}

@keyframes blink {
    50% {
        opacity: 0.2;
    }
}

#date {
    font-size: 2.5vw;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 10px;
}

#weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

#temperature {
    font-size: 10vw;
    font-weight: 200;
    line-height: 1.1;
}

#weather-description {
    font-size: 2.5vw;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    text-transform: capitalize;
    margin-top: 5px;
}

#weather-icon {
    width: 12vw;
    height: 12vw;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-top: 15px;
    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
}
