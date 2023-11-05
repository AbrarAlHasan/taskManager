import {IAccessControl, IAccessObject} from '../Screens/@Types';

export const checkForAccess = (
  accessDetails: IAccessControl[],
  moduleId: String,
) => {
  const accessObject: IAccessObject = {
    readAccess: 0,
    writeAccess: 0,
    updateAccess: 0,
    deleteAccess: 0,
  };

  const moduleAccess = accessDetails.find(item => item.moduleId === moduleId);

  if (moduleAccess) {
    accessObject.readAccess = moduleAccess.readAccess;
    accessObject.writeAccess = moduleAccess.writeAccess;
    accessObject.updateAccess = moduleAccess.updateAccess;
    accessObject.deleteAccess = moduleAccess.deleteAccess;
  }
  return accessObject;
};
