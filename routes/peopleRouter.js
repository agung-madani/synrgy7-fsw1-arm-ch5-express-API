const router = require('express').Router();
const { getPeople, getPeopleById, createPerson, updatePerson, deletePerson, uploadImagePeople, cdnUploadImagePeople } = require('../services/peopleService');
const { idChecker } = require('../helper/peopleHelper');
const upload = require('../middlewares/uploadHandler');
const cdnUpload = require('../middlewares/cdnUploadHandler');

router.get('/', getPeople);
router.get('/:id', idChecker, getPeopleById);
router.post('/', createPerson);
router.put('/:id', idChecker, updatePerson);
router.delete('/:id', idChecker, deletePerson);
router.post('/upload', upload.single('image'), uploadImagePeople);
router.post('/upload/cdn', cdnUpload.single('image'), cdnUploadImagePeople);

module.exports = router;