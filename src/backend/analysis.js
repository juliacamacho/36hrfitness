function dot_prod_util(oa, ob) {
    return oa[0] * ob[0] + oa[1] * ob[1];
}

function norm_euclidean_util(x) {
    let ans = 0;
    for (let i = 0; i < x.length; i++) {
        ans += x * x;
    }
    return Math.sqrt(ans);
}

function angle_util(A, B, O) {
    let oa = [A[0] - O[0], A[1] - O[1]];
    let ob = [B[0] - O[0], B[1] - O[1]];

    let dot_prod = dot_prod_util(oa, ob);
    let norm_oa = norm_euclidean_util(oa);
    let norm_ob = norm_euclidean_util(ob);

    return Math.acos(dot_prod / norm_oa / norm_ob);
}

function comp_knee(yt_single, wc_single) {
    // compute over both left and right knee

    // left knee
    let left_knee_yt = angle_util(
        [yt_single.keypoints[11].position.x, yt_single.keypoints[11].position.y],
        [yt_single.keypoints[15].position.x, yt_single.keypoints[15].position.y],
        [yt_single.keypoints[13].position.x, yt_single.keypoints[13].position.y])

    let left_knee_wc = angle_util(
        [wc_single.keypoints[11].position.x, wc_single.keypoints[11].position.y],
        [wc_single.keypoints[15].position.x, wc_single.keypoints[15].position.y],
        [wc_single.keypoints[13].position.x, wc_single.keypoints[13].position.y])

    let right_knee_yt = angle_util(
        [yt_single.keypoints[12].position.x, yt_single.keypoints[12].position.y],
        [yt_single.keypoints[16].position.x, yt_single.keypoints[16].position.y],
        [yt_single.keypoints[14].position.x, yt_single.keypoints[14].position.y])

    let right_knee_wc = angle_util(
        [wc_single.keypoints[12].position.x, wc_single.keypoints[12].position.y],
        [wc_single.keypoints[16].position.x, wc_single.keypoints[16].position.y],
        [wc_single.keypoints[14].position.x, wc_single.keypoints[14].position.y])

    return [[left_knee_yt, left_knee_wc], [right_knee_yt, right_knee_wc]]
}