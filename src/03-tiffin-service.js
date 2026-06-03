/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if(name =='' || name == undefined) return null
  let price = 0;
  if(mealType == 'veg') price = 80
  else if(mealType == 'nonveg') price = 120
  else if(mealType == 'jain') price = 90
  else return null;
  return {name: name,mealType: mealType, days: days, dailyRate: price, totalCost: price*days}
}

export function combinePlans(...plans) {
  // Your code here
  const n = plans.length
  if(n == 0) return null;
  let veg = 0
  let nonveg = 0
  let totalrev = 0
  for(let i = 0;i<n;i++) {
    if(plans[i].mealType == 'veg') veg++;
    else if(plans[i].mealType == 'nonveg') nonveg++;
    totalrev += plans[i].totalCost;
  }
  return {totalCustomers: n, totalRevenue: totalrev, mealBreakdown: {veg,nonveg}}
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if(plan == null) return null    
  let n = addons.length
  let daily = plan.dailyRate
  let addonNames = []
  for(let i = 0;i<n;i++) {
    daily = daily + addons[i].price
    addonNames.push(addons[i].name)
  }
  let name = plan.name
  let mealType = plan.mealType
  let days = plan.days
  const plan2 = {
    name: name, 
    mealType: mealType, 
    days: days, 
    dailyRate: daily, 
    totalCost: daily*days,
    addonNames: addonNames
  }
  return plan2
}
