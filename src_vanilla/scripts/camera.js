/* eslint-disable max-len */


const videoWidth = 600;
const videoHeight = 500;

const guiState = {
    algorithm: 'single-pose',
    singlePoseDetection: {
        minPoseConfidence: 0.1,
        minPartConfidence: 0.5,
    },
    multiPoseDetection: {
        maxPoseDetections: 5,
        minPoseConfidence: 0.15,
        minPartConfidence: 0.1,
        nmsRadius: 30.0,
    },
    output: {
        showVideo: true,
        showSkeleton: true,
        showPoints: true,
        showBoundingBox: false,
    },
    net: null,
};

/**
 * Sets up dat.gui controller on the top-right of the window
 */
function setupGui(cameras, net) {
    guiState.net = net;

    if (cameras.length > 0) {
        guiState.camera = cameras[0].deviceId;
    }
}


/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
            'Browser API navigator.mediaDevices.getUserMedia not available');
    }

    const video = document.getElementById('webcam-video');
    video.width = videoWidth;
    video.height = videoHeight;

    // const mobile = isMobile();
    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
            width: videoWidth,
            height: videoHeight,
        },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadVideo() {
    const video = await setupCamera();
    video.play();

    return video;
}

/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
function detectPoseInRealTime(staticVideo, canvasID, webcamVideo, webcamID, net, n) {
    const canvas = document.getElementById(canvasID);
    const ctx = canvas.getContext('2d');

    // since images are being fed from a webcam, we want to feed in the
    // original image and then just flip the keypoints' x coordinates. If
    // instead we flip the image, then correcting left-right keypoint pairs
    //  requires a permutation on all the keypoints.
    const flipPoseHorizontal = true;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const webcamCanvas = document.getElementById(webcamID);
    const webcamCtx = webcamCanvas.getContext('2d');

    webcamCanvas.width = videoWidth;
    webcamCanvas.height = videoHeight;

    let lastVideoPose = [];
    let lastWebcamPose = [];

    const startTime = n;

    async function staticPoseDetectionFrame() {
        let minPoseConfidence;
        let minPartConfidence;

        const pose = await guiState.net.estimatePoses(staticVideo, {
            flipHorizontal: flipPoseHorizontal,
            decodingMethod: 'single-person',
        });
        lastVideoPose = lastVideoPose.concat(pose);
        minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
        minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;

        ctx.clearRect(0, 0, videoWidth, videoHeight);

        if (guiState.output.showVideo) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-videoWidth, 0);
            ctx.drawImage(staticVideo, 0, 0, videoWidth, videoHeight);
            ctx.restore();
        }

        let d = new Date();
        let nowTime = (d.getTime() - n) / 1000;
        // For each pose (i.e. person) detected in an image, loop through the
        // poses and draw the resulting skeleton and keypoints if over certain
        // confidence scores

        lastVideoPose.slice(-1).forEach(({score, keypoints}) => {
            if (score >= minPoseConfidence) {
                if (guiState.output.showPoints) {
                    drawKeypoints(keypoints, minPartConfidence, ctx);
                }
                if (guiState.output.showSkeleton) {
                    drawSkeleton(keypoints, minPartConfidence, ctx);
                }
                if (guiState.output.showBoundingBox) {
                    drawBoundingBox(keypoints, ctx);
                }
            }
        });

        // End monitoring code for frames per second
        // stats.end();
        lastVideoPose = lastVideoPose.slice(-20); // cap at 20 elements

        requestAnimationFrame(webcamPoseDetectionFrame);
    }

    async function webcamPoseDetectionFrame() {
        let minPoseConfidence;
        let minPartConfidence;

        const pose = await guiState.net.estimatePoses(webcamVideo, {
            flipHorizontal: flipPoseHorizontal,
            decodingMethod: 'single-person',
        });
        lastWebcamPose = lastWebcamPose.concat(pose);
        minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
        minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;

        webcamCtx.clearRect(0, 0, videoWidth, videoHeight);

        if (guiState.output.showVideo) {
            webcamCtx.save();
            webcamCtx.scale(-1, 1);
            webcamCtx.translate(-videoWidth, 0);
            webcamCtx.drawImage(webcamVideo, 0, 0, videoWidth, videoHeight);
            webcamCtx.restore();
        }

        // For each pose (i.e. person) detected in an image, loop through the
        // poses and draw the resulting skeleton and keypoints if over certain
        // confidence scores

        lastWebcamPose.slice(-1).forEach(({score, keypoints}) => {
            if (score >= minPoseConfidence) {
                if (guiState.output.showPoints) {
                    drawKeypoints(keypoints, minPartConfidence, webcamCtx);
                }
                if (guiState.output.showSkeleton) {
                    drawSkeleton(keypoints, minPartConfidence, webcamCtx);
                }
                if (guiState.output.showBoundingBox) {
                    drawBoundingBox(keypoints, webcamCtx);
                }
            }
        });

        // End monitoring code for frames per second
        // stats.end();
        // console.log(lastWebcamPose[0])
        // console.log(lastVideoPose[0])

        // KEVIN LOOK HERE
        let match_res = match_video_streams(lastVideoPose, lastWebcamPose);
        // console.log(path)

        let score = match_res[0];
        let path = match_res[1];

        let d = new Date();
        let nowTime = (d.getTime() - startTime) / 1000;

        let current_score = 20000 / score // Math.floor( nowTime * score / 40000);
        document.getElementById("current_score").innerText = "Current Score: " + current_score
        process_angles(lastWebcamPose, lastVideoPose, path);

        renderChart(current_score);

        lastWebcamPose = lastWebcamPose.slice(-20)  // cap at 20 elements
        requestAnimationFrame(staticPoseDetectionFrame);
    }

    staticPoseDetectionFrame();
}

// eslint-disable-next-line no-unused-vars
async function updateFrameVideo(urls) {
    const url = encodeURIComponent(urls);
    const addedUrl = 'https://1gcnlajurd.execute-api.us-east-2.amazonaws.com/testStage/data?url=' + url;

    const cars = await fetch(addedUrl)
        .then((res) => res.json());

    document.getElementById('video-name').innerText = cars[1];
    document.getElementById('video-container').src = cars[0];
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
 */
async function bindPage(n) {
    console.log("got to bindPage")
    toggleLoadingUI(true);

    const net = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 16,
        inputResolution: {width: 640, height: 480},
        multiplier: 1,
    });
    toggleLoadingUI(false);

    let staticVideo;

    try {
        staticVideo = document.getElementById('video-container');
        // eslint-disable-next-line new-cap
    } catch (e) {
        let info = document.getElementById('info');
        info.textContent = 'Static video loading failed';
        info.style.display = 'block';
        throw e;
    }

    let webcamVideo;

    try {
        webcamVideo = await loadVideo();
    } catch (e) {
        let info = document.getElementById('info');
        info.textContent = 'this browser does not support video capture,' +
            'or this device does not have a camera';
        info.style.display = 'block';
        throw e;
    }
    console.log("got to gui")


    setupGui([], net);
    detectPoseInRealTime(staticVideo, 'output', webcamVideo,
        'webcam-output', net, n);
}

console.log('im here at 282 in cam');

navigator.getUserMedia = navigator.mediaDevices.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// kick off the demo
// updateFrameVideo('www.youtube.com/watch?v=2MoGxae-zyo');


let video = document.getElementById('video-container');
video.addEventListener('loadeddata', function () {
    let d = new Date();
    let n = d.getTime();
    bindPage(n);
}, false);

// video.crossOrigin = 'anonymous';
// video.src = video2;
// video.load();
// video.autoPlay = true;

