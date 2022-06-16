import { PlantModel } from "../schemas/plant";

class Plant{

  static async createPlant(Plant) {
    
    const newPlant = await PlantModel.create(Plant);
    //const lastWater = JSON.parse(JSON.stringify(newPlant.lastWater));
    const lastWater = newPlant.lastWater;
    const copiedLastWater = new Date(lastWater.getTime());
    const termWater = newPlant.termWater;

    //마지막 물 준 날짜로부터 다음 물 주는 스케줄 생성
    //단, 다음 스케줄이 오늘 날짜보다 이전이면 오늘 날짜부터 스케줄 생성
    const nextSchedule = today.setMonth(lastWater.getDate()+termWater);
    const today = new Date();

    //새로 생성한 plant 데이터에 다음 스케줄을 입력한다. 
    
    newPlant.schedule.push({date:copiedLastWater.setDate(copiedLastWater.getDate() + termWater), isChecked:false})

    // while(threeMonthsLater >= lastWater) {
    //   newPlant.schedule.push({date:copiedLastWater.setDate(copiedLastWater.getDate() + termWater), isChecked:false})
    // }

    newPlant.save();

    return newPlant;
  }

  static async findPlantById(plantId) {
    const plant = await PlantModel.findOne({_id: plantId});
    return plant;
  }


  static async findPlantsByUserId(userId) {
    const plants = await PlantModel.find({userId})
    return plants;
  }


  static async update({plantId, fieldToUpdate, newValue}) {
    const filter = {_id: plantId};
    const update = {[fieldToUpdate]: newValue};
    const option = {returnOriginal: false};

    const updatedPlant = await PlantModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPlant;
  }

  static async deletePlantById(plantId) {
    const deleteResult = await PlantModel.deleteOne({_id: plantId});
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export {Plant};