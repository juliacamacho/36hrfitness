function dot_prod_util(A, B, O) {
    // computes dot between OA and OB

    let oa = [A[0] - O[0], A[1] - O[1]];
    let ob = [B[0] - O[0], B[1] - O[1]];

    return oa[0] * ob[0] + oa[1] * ob[1];
}

function comp_knee(a, b) {
    // compute over both left and right knee

}