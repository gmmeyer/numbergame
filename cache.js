var numberCache = {}
var responseCache = {}

function addToCache(number, id, originalId) {
  var data = {
    originalNumber: number - 1,
    number: number,
    id: id,
    originalId: originalId,
  }
  numberCache[number] = data
  responseCache[originalId] = data
}

function deleteFromCache(number) {
  var data = numberCache[number]
  delete(numberCache[number])
  delete(responseCache[originalId])
}

exports.lastNumber = 0
