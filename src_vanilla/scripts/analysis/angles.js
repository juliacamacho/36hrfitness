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

let moving_stats = {
    'knee': [0, 0],
    'neck': [0, 0],
    'hip': [0, 0],
    'elbow': [0, 0],
}

let upd_int = 5;
let cnter = 0;

function process_angles(yt, wc, path) {
    for (let i = 1; i < path.length; i++) {
        let res = compute_anatomical_angles(yt[path[i][0] - 1], wc[path[i][1] - 1]);

        for (let key in res) {
            const pred = res[key]['left']['wc'];
            const gt = res[key]['left']['yt'];

            const val = 100 - Math.round(Math.abs((pred - gt) / 360) * 100);

            moving_stats[key][0] += val;
            moving_stats[key][1] += 1;

            if (key === 'elbow') console.log(pred, gt)
        }
    }

    if (cnter++ % upd_int === 0) {
        for (let key in moving_stats) {
            knobs[key].setValue(Math.round(moving_stats[key][0] / moving_stats[key][1]));
        }
        moving_stats = {
            'knee': [0, 0],
            'neck': [0, 0],
            'hip': [0, 0],
            'elbow': [0, 0],
        }
    }
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