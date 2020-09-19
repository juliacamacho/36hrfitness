const dr = [0, -1, -1], dc = [-1, -1, 0];

function single_pair_cost(a, b) {
    console.assert(a.keypoints.length === b.keypoints.length)

    let ans = 0;

    for (let i = 0; i < a.keypoints.length; i++) {
        let dx = a.keypoints[i].position.x - b.keypoints[i].position.x;
        let dy = a.keypoints[i].position.y - b.keypoints[i].position.y;

        ans += Math.sqrt(dx * dx + dy * dy);
    }

    return ans;
}

function match_video_streams(youtube, webcam) {
    // console.log(single_pair_cost(youtube[0], webcam[0]))

    let n = youtube.length;
    let m = webcam.length

    let dp = new Array(n + 1)
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(m + 1);
        for (let j = 0; j <= m; j++) {
            dp[i][j] = Number.POSITIVE_INFINITY;
        }
    }

    dp[0][0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            let cost = single_pair_cost(youtube[i - 1], webcam[j - 1]);
            dp[i][j] = cost + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }

    let path = new Array(0);

    let r = n, c = m;
    do {
        path.push([r, c]);

        let vals = []
        for (let i = 0; i < dr.length; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];
            if (nr >= 0 && nc >= 0) {
                vals.push([dp[nr][nc], nr, nc]);
            }
        }

        vals.sort((a, b) => {
            return a[0] > b[0] ? 1 : -1;
        });

        r = vals[0][1];
        c = vals[0][2];
    } while (!(!r && !c)); path.push([0, 0]); path.reverse();

    // console.log(dp);
    // console.log(path);
    // console.log(n + " "  + m)
    return [dp[n][m], path]
}