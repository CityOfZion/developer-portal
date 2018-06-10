const getVoteTotals = votes => {
    return votes.reduce((a, b) => {
        return a + b.vote;
    }, 0)
};

const getVoteAverage = votes => {
    return getVoteTotals(votes) / votes.length;
};

export {
    getVoteAverage,
    getVoteTotals
}