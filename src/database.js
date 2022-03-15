import { ref, set } from 'firebase/database'

exports.setData = function (db, key, val, data) {
  set(ref(db, key + val), {
    data
  })
}
