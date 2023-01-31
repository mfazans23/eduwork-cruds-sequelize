const router = require('express').Router()

const { index, view, store, update, destroy } = require('./controller')

router.get('/', index)
router.post('/', store)
router.get('/:id', view)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router
