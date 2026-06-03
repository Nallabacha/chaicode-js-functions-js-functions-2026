/**
 * 🚂 Dabbawala Delivery Tracker - Closures
 *
 * Mumbai ke famous dabbawala system ka tracker bana! Yahan closure ka
 * use hoga — ek function ke andar private state rakhna hai jo bahar se
 * directly access nahi ho sakta. Sirf returned methods se access hoga.
 *
 * Function: createDabbawala(name, area)
 *
 * Returns an object with these methods (sab ek hi private state share karte hain):
 *
 *   - addDelivery(from, to)
 *     Adds a new delivery. Returns auto-incremented id (starting from 1).
 *     Each delivery: { id, from, to, status: "pending" }
 *     Agar from ya to empty/missing, return -1
 *
 *   - completeDelivery(id)
 *     Marks delivery as "completed". Returns true if found and was pending.
 *     Returns false if not found or already completed.
 *
 *   - getActiveDeliveries()
 *     Returns array of deliveries with status "pending" (copies, not references)
 *
 *   - getStats()
 *     Returns: { name, area, total, completed, pending, successRate }
 *     successRate = completed/total as percentage string "85.00%" (toFixed(2) + "%")
 *     Agar total is 0, successRate = "0.00%"
 *
 *   - reset()
 *     Clears all deliveries, resets id counter to 0. Returns true.
 *
 * IMPORTANT: Private state (deliveries array, nextId counter) should NOT
 *   be accessible as properties on the returned object.
 *   Two instances created with createDabbawala should be completely independent.
 *
 * Hint: Use closure to keep variables private. The returned object's methods
 *   form a closure over those variables.
 *
 * @param {string} name - Dabbawala's name
 * @param {string} area - Delivery area
 * @returns {object} Object with delivery management methods
 *
 * @example
 *   const ram = createDabbawala("Ram", "Dadar");
 *   ram.addDelivery("Andheri", "Churchgate"); // => 1
 *   ram.addDelivery("Bandra", "CST");         // => 2
 *   ram.completeDelivery(1);                   // => true
 *   ram.getStats();
 *   // => { name: "Ram", area: "Dadar", total: 2, completed: 1, pending: 1, successRate: "50.00%" }
 */
export function createDabbawala(name, area) {
  // Your code here
  let idmain = 0;
  let arr = []
  let remaining = []
  let completed = 0
  function addDelivery(from,to) {
    if(from == undefined || to == undefined || from == '' || to == '') return -1;
    idmain++;
    arr.push({
      id: idmain,
      from: from,
      to: to,
      status: "pending"
    });
    return idmain;
  }
  function completeDelivery(id) {
    if(id>idmain) return false;
    if (arr[id-1].status === "pending") {
      arr[id-1].status = "completed";
      completed++
      return true;
    }
    return false;
  }
  function getActiveDeliveries() {
    
    let n = arr.length
    for(let i = 0;i<n;i++) {
      if(arr[i].status === 'pending') remaining.push({
          id: arr[i].id,
          from: arr[i].from,
          to: arr[i].to,
          status: arr[i].status
        });
    }
    return remaining;
  }
  function getStats() {
    let retval;
    if(completed == 0) retval = Number(0.00).toFixed(2);
    else retval = Number((completed/idmain)*100).toFixed(2)
    return { 
        name: name,
        area: area,
        total: idmain,
        completed: completed,
        pending: idmain-completed,
        successRate: `${retval}%`
    }
  }

  function reset() {
    arr = []
    idmain = arr.length
    return true
  }
  return {
    addDelivery: addDelivery,
    completeDelivery: completeDelivery,
    getActiveDeliveries: getActiveDeliveries,
    getStats: getStats,
    reset: reset
  }
}
