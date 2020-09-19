function dot_prod_util(oa, ob) {
    return oa[0] * ob[0] + oa[1] * ob[1];
}

function norm_euclidean_util(x) {
    let ans = 0;
    for (let i = 0; i < x.length; i++) {
        ans += x[i] * x[i];
    }
    return Math.sqrt(ans);
}

function angle_util(lst) {
    let A = lst[0], B = lst[1], O = lst[2];

    let oa = [A[0] - O[0], A[1] - O[1]];
    let ob = [B[0] - O[0], B[1] - O[1]];

    let dot_prod = dot_prod_util(oa, ob);
    let norm_oa = norm_euclidean_util(oa);
    let norm_ob = norm_euclidean_util(ob);

    return Math.acos(dot_prod / norm_oa / norm_ob) * 180 / 3.1415;
}

function extract_points(single, param) {
    const lstar = [];
    for (let i = 0; i < 3; i++)
        lstar.push([single.keypoints[param[i]].position.x, single.keypoints[param[i]].position.y]);
    return lstar;
}

function process_angles(yt, wc, path) {
    // compute_anatomical_angles(yt, wc);
}

function compute_anatomical_angles(yt_single, wc_single) {
    const params = {
        'knee': {
            'left': [11, 15, 13],
            'right': [12, 16, 14]
        },
        'elbow': {
            'left': [5, 9, 7],
            'right': [6, 10, 8]
        },
        'hip': {
            'left': [5, 13, 11],
            'right': [6, 14, 12]
        },
        'neck': {
            'left': [0, 11, 5],
            'right': [0, 12, 6]
        }
    };
    let ans = {};

    for (let joint in params) {
        ans[joint] = {}
        for (let dir in params[joint]) {
            ans[joint][dir] = {
                'yt': angle_util(extract_points(yt_single, params[joint][dir])),
                'wc': angle_util(extract_points(wc_single, params[joint][dir]))
            };
        }
    }

    return ans;
}

yt = [
    {
        "score": 0.32371445304906,
        "keypoints": [
            {
                "position": {
                    "y": 76.291801452637,
                    "x": 253.36747741699
                },
                "part": "nose",
                "score": 0.99539834260941
            },
            {
                "position": {
                    "y": 71.10383605957,
                    "x": 253.54365539551
                },
                "part": "leftEye",
                "score": 0.98781454563141
            },
            {
                "position": {
                    "y": 71.839515686035,
                    "x": 246.00454711914
                },
                "part": "rightEye",
                "score": 0.99528175592422
            },
            {
                "position": {
                    "y": 72.848854064941,
                    "x": 263.08151245117
                },
                "part": "leftEar",
                "score": 0.84029853343964
            },
            {
                "position": {
                    "y": 79.956565856934,
                    "x": 234.26812744141
                },
                "part": "rightEar",
                "score": 0.92544466257095
            },
            {
                "position": {
                    "y": 98.34538269043,
                    "x": 399.64068603516
                },
                "part": "leftShoulder",
                "score": 0.99559044837952
            },
            {
                "position": {
                    "y": 95.082359313965,
                    "x": 458.21868896484
                },
                "part": "rightShoulder",
                "score": 0.99583911895752
            },
            {
                "position": {
                    "y": 94.626205444336,
                    "x": 163.94561767578
                },
                "part": "leftElbow",
                "score": 0.9518963098526
            },
            {
                "position": {
                    "y": 150.2349395752,
                    "x": 245.06030273438
                },
                "part": "rightElbow",
                "score": 0.98052614927292
            },
            {
                "position": {
                    "y": 113.9603729248,
                    "x": 393.19735717773
                },
                "part": "leftWrist",
                "score": 0.94009721279144
            },
            {
                "position": {
                    "y": 186.47859191895,
                    "x": 257.98034667969
                },
                "part": "rightWrist",
                "score": 0.98029226064682
            },
            {
                "position": {
                    "y": 208.5266418457,
                    "x": 284.46710205078
                },
                "part": "leftHip",
                "score": 0.97870296239853
            },
            {
                "position": {
                    "y": 209.9910736084,
                    "x": 243.31219482422
                },
                "part": "rightHip",
                "score": 0.97424703836441
            },
            {
                "position": {
                    "y": 281.61965942383,
                    "x": 310.93188476562
                },
                "part": "leftKnee",
                "score": 0.98368924856186
            },
            {
                "position": {
                    "y": 282.80120849609,
                    "x": 203.81164550781
                },
                "part": "rightKnee",
                "score": 0.96947449445724
            },
            {
                "position": {
                    "y": 360.62716674805,
                    "x": 292.21047973633
                },
                "part": "leftAnkle",
                "score": 0.8883239030838
            },
            {
                "position": {
                    "y": 347.41177368164,
                    "x": 203.88229370117
                },
                "part": "rightAnkle",
                "score": 0.8255187869072
            }
        ]
    },
    {
        "score": 0.32371445304906,
        "keypoints": [
            {
                "position": {
                    "y": 76.291801452637,
                    "x": 253.36747741699
                },
                "part": "nose",
                "score": 0.99539834260941
            },
            {
                "position": {
                    "y": 71.10383605957,
                    "x": 253.54365539551
                },
                "part": "leftEye",
                "score": 0.98781454563141
            },
            {
                "position": {
                    "y": 71.839515686035,
                    "x": 246.00454711914
                },
                "part": "rightEye",
                "score": 0.99528175592422
            },
            {
                "position": {
                    "y": 72.848854064941,
                    "x": 263.08151245117
                },
                "part": "leftEar",
                "score": 0.84029853343964
            },
            {
                "position": {
                    "y": 79.956565856934,
                    "x": 234.26812744141
                },
                "part": "rightEar",
                "score": 0.92544466257095
            },
            {
                "position": {
                    "y": 98.34538269043,
                    "x": 399.64068603516
                },
                "part": "leftShoulder",
                "score": 0.99559044837952
            },
            {
                "position": {
                    "y": 95.082359313965,
                    "x": 458.21868896484
                },
                "part": "rightShoulder",
                "score": 0.99583911895752
            },
            {
                "position": {
                    "y": 94.626205444336,
                    "x": 163.94561767578
                },
                "part": "leftElbow",
                "score": 0.9518963098526
            },
            {
                "position": {
                    "y": 150.2349395752,
                    "x": 245.06030273438
                },
                "part": "rightElbow",
                "score": 0.98052614927292
            },
            {
                "position": {
                    "y": 113.9603729248,
                    "x": 393.19735717773
                },
                "part": "leftWrist",
                "score": 0.94009721279144
            },
            {
                "position": {
                    "y": 186.47859191895,
                    "x": 257.98034667969
                },
                "part": "rightWrist",
                "score": 0.98029226064682
            },
            {
                "position": {
                    "y": 208.5266418457,
                    "x": 284.46710205078
                },
                "part": "leftHip",
                "score": 0.97870296239853
            },
            {
                "position": {
                    "y": 209.9910736084,
                    "x": 243.31219482422
                },
                "part": "rightHip",
                "score": 0.97424703836441
            },
            {
                "position": {
                    "y": 281.61965942383,
                    "x": 310.93188476562
                },
                "part": "leftKnee",
                "score": 0.98368924856186
            },
            {
                "position": {
                    "y": 282.80120849609,
                    "x": 203.81164550781
                },
                "part": "rightKnee",
                "score": 0.96947449445724
            },
            {
                "position": {
                    "y": 360.62716674805,
                    "x": 292.21047973633
                },
                "part": "leftAnkle",
                "score": 0.8883239030838
            },
            {
                "position": {
                    "y": 347.41177368164,
                    "x": 203.88229370117
                },
                "part": "rightAnkle",
                "score": 0.8255187869072
            }
        ]
    }
];
wc = [
    {
        "score": 0.32371445304906,
        "keypoints": [
            {
                "position": {
                    "y": 253.36747741699,
                    "x": 76.291801452637
                },
                "part": "nose",
                "score": 0.99539834260941
            },
            {
                "position": {
                    "y": 71.10383605957,
                    "x": 253.54365539551
                },
                "part": "leftEye",
                "score": 0.98781454563141
            },
            {
                "position": {
                    "y": 71.839515686035,
                    "x": 246.00454711914
                },
                "part": "rightEye",
                "score": 0.99528175592422
            },
            {
                "position": {
                    "y": 72.848854064941,
                    "x": 263.08151245117
                },
                "part": "leftEar",
                "score": 0.84029853343964
            },
            {
                "position": {
                    "y": 79.956565856934,
                    "x": 234.26812744141
                },
                "part": "rightEar",
                "score": 0.92544466257095
            },
            {
                "position": {
                    "y": 98.34538269043,
                    "x": 399.64068603516
                },
                "part": "leftShoulder",
                "score": 0.99559044837952
            },
            {
                "position": {
                    "y": 95.082359313965,
                    "x": 458.21868896484
                },
                "part": "rightShoulder",
                "score": 0.99583911895752
            },
            {
                "position": {
                    "y": 94.626205444336,
                    "x": 163.94561767578
                },
                "part": "leftElbow",
                "score": 0.9518963098526
            },
            {
                "position": {
                    "y": 150.2349395752,
                    "x": 245.06030273438
                },
                "part": "rightElbow",
                "score": 0.98052614927292
            },
            {
                "position": {
                    "y": 113.9603729248,
                    "x": 393.19735717773
                },
                "part": "leftWrist",
                "score": 0.94009721279144
            },
            {
                "position": {
                    "y": 186.47859191895,
                    "x": 257.98034667969
                },
                "part": "rightWrist",
                "score": 0.98029226064682
            },
            {
                "position": {
                    "y": 208.5266418457,
                    "x": 284.46710205078
                },
                "part": "leftHip",
                "score": 0.97870296239853
            },
            {
                "position": {
                    "y": 209.9910736084,
                    "x": 243.31219482422
                },
                "part": "rightHip",
                "score": 0.97424703836441
            },
            {
                "position": {
                    "y": 281.61965942383,
                    "x": 310.93188476562
                },
                "part": "leftKnee",
                "score": 0.98368924856186
            },
            {
                "position": {
                    "y": 282.80120849609,
                    "x": 203.81164550781
                },
                "part": "rightKnee",
                "score": 0.96947449445724
            },
            {
                "position": {
                    "y": 360.62716674805,
                    "x": 292.21047973633
                },
                "part": "leftAnkle",
                "score": 0.8883239030838
            },
            {
                "position": {
                    "y": 347.41177368164,
                    "x": 203.88229370117
                },
                "part": "rightAnkle",
                "score": 0.8255187869072
            }
        ]
    },
    {
        "score": 0.32371445304906,
        "keypoints": [
            {
                "position": {
                    "y": 76.291801452637,
                    "x": 253.36747741699
                },
                "part": "nose",
                "score": 0.99539834260941
            },
            {
                "position": {
                    "y": 71.10383605957,
                    "x": 253.54365539551
                },
                "part": "leftEye",
                "score": 0.98781454563141
            },
            {
                "position": {
                    "y": 71.839515686035,
                    "x": 246.00454711914
                },
                "part": "rightEye",
                "score": 0.99528175592422
            },
            {
                "position": {
                    "y": 72.848854064941,
                    "x": 263.08151245117
                },
                "part": "leftEar",
                "score": 0.84029853343964
            },
            {
                "position": {
                    "y": 79.956565856934,
                    "x": 234.26812744141
                },
                "part": "rightEar",
                "score": 0.92544466257095
            },
            {
                "position": {
                    "y": 98.34538269043,
                    "x": 399.64068603516
                },
                "part": "leftShoulder",
                "score": 0.99559044837952
            },
            {
                "position": {
                    "y": 95.082359313965,
                    "x": 458.21868896484
                },
                "part": "rightShoulder",
                "score": 0.99583911895752
            },
            {
                "position": {
                    "y": 94.626205444336,
                    "x": 163.94561767578
                },
                "part": "leftElbow",
                "score": 0.9518963098526
            },
            {
                "position": {
                    "y": 150.2349395752,
                    "x": 245.06030273438
                },
                "part": "rightElbow",
                "score": 0.98052614927292
            },
            {
                "position": {
                    "y": 113.9603729248,
                    "x": 393.19735717773
                },
                "part": "leftWrist",
                "score": 0.94009721279144
            },
            {
                "position": {
                    "y": 186.47859191895,
                    "x": 257.98034667969
                },
                "part": "rightWrist",
                "score": 0.98029226064682
            },
            {
                "position": {
                    "y": 208.5266418457,
                    "x": 284.46710205078
                },
                "part": "leftHip",
                "score": 0.97870296239853
            },
            {
                "position": {
                    "y": 209.9910736084,
                    "x": 243.31219482422
                },
                "part": "rightHip",
                "score": 0.97424703836441
            },
            {
                "position": {
                    "y": 281.61965942383,
                    "x": 310.93188476562
                },
                "part": "leftKnee",
                "score": 0.98368924856186
            },
            {
                "position": {
                    "y": 282.80120849609,
                    "x": 203.81164550781
                },
                "part": "rightKnee",
                "score": 0.96947449445724
            },
            {
                "position": {
                    "y": 360.62716674805,
                    "x": 292.21047973633
                },
                "part": "leftAnkle",
                "score": 0.8883239030838
            },
            {
                "position": {
                    "y": 347.41177368164,
                    "x": 203.88229370117
                },
                "part": "rightAnkle",
                "score": 0.8255187869072
            }
        ]
    }
];

console.log(compute_anatomical_angles(yt[0], wc[0]));
