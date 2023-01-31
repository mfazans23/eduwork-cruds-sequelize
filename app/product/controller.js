const fs = require('fs')
const path = require('path')
const { Op } = require('sequelize')
const Product = require('./model')

const index = async (req, res) => {
  const { search } = req.query

  try {
    await Product.sync()
    if (search) {
      const product = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      })

      if (product.length === 0) failed_response(res, { message: 'not found' })
      else success_response(res, product)
    } else {
      const product = await Product.findAll()
      success_response(res, product)
    }
  } catch (error) {
    failed_response(res, error)
  }
}

const view = async (req, res) => {
  const { id } = req.params
  try {
    await Product.sync()
    const product = await Product.findByPk(id)
    success_response(res, product)
  } catch (error) {
    failed_response(res, error)
  }
}

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body
  const image = req.file

  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname)
    fs.renameSync(image.path, target)
  }

  try {
    await Product.sync()
    const product = await Product.create({
      users_id,
      name,
      price,
      stock,
      status,
      image_url: image && `/public/${image.originalname}`,
    })
    success_response(res, product)
  } catch (error) {
    failed_response(res, error)
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { name, price, stock, status } = req.body
  const image = req.file

  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname)
    fs.renameSync(image.path, target)
  }

  try {
    await Product.sync()
    await Product.update(
      {
        name: name && name,
        price: price && price,
        stock: stock && stock,
        status: status && status,
        image_url:
          image && `http://localhost:3000/public/${image.originalname}`,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    )

    const updatedRecord = await Product.findByPk(id)
    success_response(res, updatedRecord)
  } catch (error) {
    failed_response(res, error)
  }
}

const destroy = async (req, res) => {
  const { id } = req.params
  try {
    await Product.sync()
    const result = await Product.destroy({
      where: {
        id,
      },
      force: true,
    })
    if (result !== 0) {
      const product = await Product.findAll()
      success_response(res, product)
    } else {
      failed_response(res, { message: 'product with the id not found' })
    }
  } catch (error) {
    failed_response(res, error)
  }
}

const success_response = (res, data) =>
  res.json({
    status: 'success',
    data,
  })

const failed_response = (res, error) =>
  res.json({
    status: 'failed',
    message: error.message,
  })

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
}
