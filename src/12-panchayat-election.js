/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  let check = {};
  let voted = {};
  
  // dynamic — not hardcoded
  let votes = {};
  const candidateMap = {};
  candidates.forEach(c => {
    votes[c.id] = 0;
    candidateMap[c.id] = true;
  });

  const registerVoter = (voter) => {
    if (voter == null || typeof voter.id !== "string" || voter.age < 18 || check[voter.id])
      return false;
    check[voter.id] = true;
    return true;
  };

  const castVote = (voterId, candidateId, onSuccess, onError) => {
    if (!check[voterId]) return onError("voter not registered");
    if (!candidateMap[candidateId]) return onError("invalid candidate");
    if (voted[voterId]) return onError("voter already voted");

    voted[voterId] = true;
    votes[candidateId] += 1;
    return onSuccess({ voterId, candidateId });
  };

  const getResults = (sortFn) => {
    let retval = candidates.map(c => ({
      id: c.id,
      name: c.name,
      party: c.party,
      votes: votes[c.id]
    }));

    if (typeof sortFn === "function") retval.sort(sortFn);
    else retval.sort((a, b) => b.votes - a.votes);

    return retval;
  };

  const getWinner = () => {
    let winner = null;
    let max = 0; // stays 0, so if no votes cast, winner stays null

    candidates.forEach(c => {
      if (votes[c.id] > max) {
        max = votes[c.id];
        winner = c;
      }
    });

    return winner;
  };

  return { registerVoter, castVote, getResults, getWinner };
}

export function createVoteValidator(rules) {
  return (voter) => {
    // check required fields dynamically using rules.requiredFields
    for (let field of rules.requiredFields) {
      if (voter[field] == null)
        return { valid: false, reason: `missing field: ${field}` };
    }
    if (voter.age < rules.minAge)
      return { valid: false, reason: `age below minimum ${rules.minAge}` };

    return { valid: true, reason: "" };
  };
}

export function countVotesInRegions(regionTree) {
  if (regionTree == null || typeof regionTree !== "object") return 0;

  let total = regionTree.votes || 0;
  if (Array.isArray(regionTree.subRegions)) {
    for (let sub of regionTree.subRegions) {
      total += countVotesInRegions(sub); // recursion
    }
  }
  return total;
}

export function tallyPure(currentTally, candidateId) {
  // spread into new object — never mutate original
  return {
    ...currentTally,
    [candidateId]: (currentTally[candidateId] || 0) + 1
  };
}