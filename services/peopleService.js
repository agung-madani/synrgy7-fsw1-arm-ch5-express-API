const { data } = require('../data')
const { cloudinary } = require('../middlewares/cloudinary')

const getPeople = (req, res) => {
  res.json({message: 'Success', data})
}

const getPeopleById = (req, res) => {
  const { id } = req.params
  const person = data.find(p => p.id === parseInt(id))
  if (person) {
    res.json({ message: 'Success', data: person})
  } else {
    res.status(404).json({ message: 'Person not found' })
  }
}

const createPerson = (req, res) => {
  const { id, name, username, email } = req.body;
  const newPerson = { id, name, username, email };
  data.push(newPerson);
  res.status(201).json(newPerson);
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name, username, email } = req.body;
  const personIndex = data.findIndex(p => p.id === parseInt(id));
  if (personIndex !== -1) {
    data[personIndex] = { ...data[personIndex], name, username, email };
    res.json(data[personIndex]); // Return the updated person object
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const personIndex = data.findIndex(p => p.id === parseInt(id));
  if (personIndex !== -1) {
    const deletedPerson = data.splice(personIndex, 1);
    res.json({ message: 'Success', dataDeleted: deletedPerson[0]});
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
};

const uploadImagePeople = (req,res) => {
  const url = `/uploads/${req.file.filename}`
  res.status(200).json({message: 'Uploaded', url})
}

const cdnUploadImagePeople = (req, res) => {
  const fileBase64 = req.file.buffer.toString('base64');
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: "Gagal upload file!"
      });
    }

    res.status(200).json({
      message: "Upload image berhasil",
      url: result.url,
    });
  });
};

module.exports = {
  getPeople,
  getPeopleById,
  createPerson,
  updatePerson,
  deletePerson,
  uploadImagePeople,
  cdnUploadImagePeople
};