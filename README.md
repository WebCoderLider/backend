<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matrix Effect</title>
  <style>
    body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background: black;
    color: #00ff00;
    font-family: monospace;
}

.matrix {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: black;
}

.matrix-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

h1, p {
    margin: 0;
    padding: 0;
    font-size: 2em;
    color: #00ff00;
}

@keyframes matrix {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

.matrix-content {
    animation: matrix 1s infinite;
}

/* Matrix rain effect */
@keyframes rain {
    from { top: -100%; }
    to { top: 100%; }
}

.matrix-content::before {
    content: "";
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 255, 0, 0.1) 1px, rgba(0, 255, 0, 0.1) 2px);
    animation: rain 1s linear infinite;
    z-index: -1;
}

  </style>
</head>
<body>
    <div class="matrix">
        <div class="matrix-content">
            <h1>Hacking Tool</h1>
            <p>Welcome to the Matrix environment of your new tool!</p>
        </div>
    </div>
</body>
</html>
