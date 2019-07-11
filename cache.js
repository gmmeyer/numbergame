var numberCache = {}
var responseCache = {}

function addToCache(number, originalId, ts) {
  var data = {
    originalNumber: number - 1,
    number: number,
    originalId: originalId,
    ts: ts,
  }
  numberCache[number] = data
  responseCache[originalId] = data
}

function deleteFromCache(number) {
  var data = numberCache[number]
  var originalId = data.originalId
  delete(numberCache[number])
  delete(responseCache[originalId])
}

function getFromCacheByOriginalId(originalId) {
  return responseCache[originalId]
}


exports.lastNumber = 0


exports.getFromCacheByOriginalId = getFromCacheByOriginalId
exports.deleteFromCache = deleteFromCache
exports.addToCache = addToCache
