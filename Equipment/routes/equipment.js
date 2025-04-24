const express=require('express');
const router=express=express.Router();
const auth=require('../middlewares/auth');
const rentControl=require('../middlewares/rentControl');
const deletionWatcher=require('../middlewares/deletionWatcher');

const {
    addEquipment,
    getAllAvailableEquipment,
    getOwnEquipment,
    updateEquipment,
    deleteEquipment,
    rentEquipment
}=require('../controllers/equipmentController');


//owner
router.post('/', auth(['Owner']), addEquipment);
router.get('/owner', auth(['Owner']), getOwnEquipment);
router.put('/:id',auth(['Owner']),updateEquipment);
router.delete('/:id', auth(['Owner']), deletionWatcher, deleteEquipment);

//contractor
router.get('/',auth(), getAllAvailableEquipment);
router.post('/rent/:id', auth(['Contractor']), rentControl, rentEquipment);

module.exports=router;
