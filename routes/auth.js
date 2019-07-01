const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config') // the package, not the folder
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

const router = express.Router()

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)

  } catch (e) {
    console.error(e.message)
    res.status(500).send('server error')
  }
})

// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post('/', [
  check('email', 'Please use a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if(!user) {
      res.status(400).json({ msg: 'Invalid Credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }

    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
      if(err) throw err
      res.json({ token })
    })

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
