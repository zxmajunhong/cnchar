var cnchar = require('./cnchar/index')
var poly = require('./poly/index')
var order = require('./order/index')
var trad = require('./trad/index')

cnchar.use(order,trad,poly)
console.log(cnchar.stroke("一个",'order'))
console.log(cnchar.stroke('長城','count','order','name'))
console.log(cnchar.orderToWord(['横','撇','捺']))
console.log('美好的地方'.spell('tone'))
// module.exports = cnchar