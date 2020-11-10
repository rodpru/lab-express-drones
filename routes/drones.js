const express = require('express');
const Drone = require('../models/Drone');
// require the Drone model here

const router = express.Router();

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const dronesFromDB = await Drone.find();
    console.log(dronesFromDB);
    res.render('drones/list', {drones: dronesFromDB});
  } catch (error) {
    res.render(error);
  }
});

router.get('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    res.render('drones/create-form');
  } catch (error) {
    res.render(error)
  }
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
      let {name, propellers, maxSpeed} = req.body;
      const createdDrone = await Drone.create({name, propellers, maxSpeed})
      res.redirect('/drones');
  } catch (error) {
    res.render(error)
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  try {
    let droneId = req.params.id;
    let foundDroneById = await Drone.findById(droneId);
    res.render('drones/update-form', {drone: foundDroneById});
  } catch (error) {
    res.render(error);
  }
});

router.post('/drones/:id/edit', async (req, res, next) => {
  try {
    let droneId = req.params.id;
    let {name, propellers, maxSpeed} = req.body;
    const updatedDrone = await Drone.findByIdAndUpdate(droneId, {name, propellers, maxSpeed});
    res.redirect('/drones');
  } catch (error) {
    res.render(error);
  }
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', async (req, res, next) => {
  try {
    let droneId = req.params.id;
    await Drone.findByIdAndDelete(droneId);
    res.redirect('/drones');
  } catch (error) {
    res.render(error);
  }
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
