var canvas = document.getElementById("renderCanvas");

var delayCreateScene = function () {

    engine.enableOfflineSupport = false;

    // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
    BABYLON.Animation.AllowMatricesInterpolation = true;

    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.6;
    light.specular = BABYLON.Color3.Black();

    var light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    light2.position = new BABYLON.Vector3(0, 5, 5);

    // Shadows
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    engine.displayLoadingUI();

    BABYLON.SceneLoader.ImportMesh("", "./babylon/", "dummy3.babylon", scene, function (newMeshes, particleSystems, skeletons) {
        var skeleton = skeletons[0];

        shadowGenerator.addShadowCaster(scene.meshes[0], true);
        for (var index = 0; index < newMeshes.length; index++) {
            newMeshes[index].receiveShadows = false;;
        }

        var helper = scene.createDefaultEnvironment({
            enableGroundShadow: true
        });
        helper.setMainColor(BABYLON.Color3.Gray());
        helper.ground.position.y += 0.01;

        // ROBOT
        skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        skeleton.animationPropertiesOverride.enableBlending = true;
        skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
        skeleton.animationPropertiesOverride.loopMode = 1;

        var idleRange = skeleton.getAnimationRange("YBot_Idle");
        var walkRange = skeleton.getAnimationRange("YBot_Walk");
        var runRange = skeleton.getAnimationRange("YBot_Run");
        var leftRange = skeleton.getAnimationRange("YBot_LeftStrafeWalk");
        var rightRange = skeleton.getAnimationRange("YBot_RightStrafeWalk");

        // IDLE
        if (idleRange) scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);

        // UI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var UiPanel = new BABYLON.GUI.StackPanel();
        UiPanel.width = "220px";
        UiPanel.fontSize = "14px";
        UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(UiPanel);
        // ..
        // var button = BABYLON.GUI.Button.CreateSimpleButton("but1", "Play Idle");
        // button.paddingTop = "10px";
        // button.width = "100px";
        // button.height = "50px";
        // button.color = "white";
        // button.background = "green";
        // button.onPointerDownObservable.add(()=> {
        //     if (idleRange) scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true);
        // });
        // UiPanel.addControl(button);
        // ..
        // var button1 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Teach Me!");
        // button1.paddingTop = "10px";
        // button1.width = "100px";
        // button1.height = "50px";
        // button1.color = "white";
        // button1.background = "green";
        // button1.onPointerDownObservable.add(()=> {
        //     if (walkRange) scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);
        // });
        // UiPanel.addControl(button1);
        // // ..
        // var button1 = BABYLON.GUI.Button.CreateSimpleButton("but3", "Play Run");
        // button1.paddingTop = "10px";
        // button1.width = "100px";
        // button1.height = "50px";
        // button1.color = "white";
        // button1.background = "green";
        // button1.onPointerDownObservable.add(()=> {
        //     if (runRange) scene.beginAnimation(skeleton, runRange.from, runRange.to, true);
        // });
        // UiPanel.addControl(button1);
        // // ..
        // var button1 = BABYLON.GUI.Button.CreateSimpleButton("but4", "Play Left");
        // button1.paddingTop = "10px";
        // button1.width = "100px";
        // button1.height = "50px";
        // button1.color = "white";
        // button1.background = "green";
        // button1.onPointerDownObservable.add(()=> {
        //     if (leftRange) scene.beginAnimation(skeleton, leftRange.from, leftRange.to, true);
        // });
        // UiPanel.addControl(button1);
        // // ..
        // var button1 = BABYLON.GUI.Button.CreateSimpleButton("but5", "Play Right");
        // button1.paddingTop = "10px";
        // button1.width = "100px";
        // button1.height = "50px";
        // button1.color = "white";
        // button1.background = "green";
        // button1.onPointerDownObservable.add(()=> {
        //     if (rightRange) scene.beginAnimation(skeleton, rightRange.from, rightRange.to, true);
        // });
        // UiPanel.addControl(button1);
        // // ..
        // var button1 = BABYLON.GUI.Button.CreateSimpleButton("but6", "Play Blend");
        // button1.paddingTop = "10px";
        // button1.width = "100px";
        // button1.height = "50px";
        // button1.color = "white";
        // button1.background = "green";
        // button1.onPointerDownObservable.add(()=> {
        //     if (walkRange && leftRange) {
        //         scene.stopAnimation(skeleton);
        //         var walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.from, walkRange.to, 0.5, true);
        //         var leftAnim = scene.beginWeightedAnimation(skeleton, leftRange.from, leftRange.to, 0.5, true);
        //
        //         // Note: Sync Speed Ratio With Master Walk Animation
        //         walkAnim.syncWith(null);
        //         leftAnim.syncWith(walkAnim);
        //     }
        // });
        // UiPanel.addControl(button1);

        engine.hideLoadingUI();
    });

    return scene;
};


var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = delayCreateScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
