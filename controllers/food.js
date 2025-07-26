const express = require('express');
const router = express.Router();

const User = require('../models/user.js')

/* ==========================Create========================== */
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});
/* ==========================Read========================== */
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('foods/index.ejs', {
            pantry: currentUser.pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };

});

router.get('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        const currentFood = currentUser.pantry.id(req.params.foodId);

        res.render('foods/show.ejs', {
            currentFood: currentFood,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

/* ==========================Update========================== */
router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        const currentFood = currentUser.pantry.id(req.params.foodId);

        res.render('foods/edit.ejs', {
            currentFood: currentFood,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

router.put('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        const currentFood = currentUser.pantry.id(req.params.foodId);

        currentFood.set(req.body)

        await currentUser.save() 
        res.redirect(`/users/${currentUser._id}/foods/${req.params.foodId}`);

    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

/* ==========================Delete========================== */
router.delete('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.pantry.id(req.params.foodId).deleteOne();
        
        currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

/* ==========================Export========================== */
module.exports = router;