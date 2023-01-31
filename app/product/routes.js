const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads' })
const { index, view, store, update, destroy } = require('./controller')

router.get('/', index)
router.post('/', upload.single('image'), store)
router.get('/:id', view)
router.put('/:id', upload.single('image'), update)
router.delete('/:id', destroy)

module.exports = router
